import {
  collection,
  getDocs,
  where,
  orderBy,
  query,
  getDoc,
  doc,
} from "firebase/firestore";

export const fetchFollowedUsersPosts = async (
  firestore,
  userProfileData,
  setUserPosts
) => {
  try {
    const usersCollection = collection(firestore, "users");

    // Query to get users whom the current user is following
    const followingQuery = query(
      usersCollection,
      where("followers", "array-contains", userProfileData?.uid)
    );

    const followingSnapshot = await getDocs(followingQuery);

    const fetchedFollowing = followingSnapshot.docs.map((doc) => ({
      userId: doc.id,
      ...doc.data(),
    }));

    // console.log(fetchedFollowing);
    // Get the list of users the current user is following
    const followingList = userProfileData.following || [];

    // Array to store posts from followed users
    const allPosts = [];

    // Iterate through the list of followed users
    for (const followedUser of followingList) {
      const followedUserId = followedUser.uid;

      // Assume "posts" is a subcollection under each user document
      const userPostsCollectionRef = collection(
        firestore,
        "users",
        followedUserId,
        "posts"
      );

      // Get all documents from the "posts" subcollection
      const querySnapshot = await getDocs(userPostsCollectionRef);

      // Extract post data from each document
      //   const posts = querySnapshot.docs.map((doc) => doc.data());
      const posts = querySnapshot.docs.map((doc) => {
        const postData = doc.data();

        // Find the corresponding user data from fetchedFollowing
        const correspondingUser = fetchedFollowing.find(
          (user) => user.uid === followedUserId
        );

        return {
          createdAt: postData.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
          postId: doc.id,
          text: postData.text,
          uid: correspondingUser.uid,
          userName: correspondingUser.userName,
          profilePic: correspondingUser.profilePic,
        };
      });

      // Add posts to the array
      allPosts.push(...posts);
    }

    setUserPosts((prevPosts) => {
      const existingPostIds = prevPosts.map((post) => post.postId);
      const newPosts = allPosts.filter(
        (post) => !existingPostIds.includes(post.postId)
      );
      const orderedNewPosts = newPosts.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return [...prevPosts, ...newPosts];
    });
  } catch (error) {
    console.error("Error fetching followed users' posts:", error);
  }
};
