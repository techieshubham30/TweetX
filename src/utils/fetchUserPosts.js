import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const fetchUserPosts = async (
  firestore,
  userProfileData,
  setUserPosts
) => {
  try {
    // Query to get the user's posts
    const userPostsQuery = query(
      collection(firestore, "users", userProfileData.uid, "posts"),
      orderBy("createdAt", "desc")
    );

    const userPostsSnapshot = await getDocs(userPostsQuery);

    // Extracting the post data
    const userPostsData = userPostsSnapshot.docs.map((doc) => ({
      postId: doc.id,
      uid: userProfileData.uid,
      userName: userProfileData.userName,
      profilePic: userProfileData.profilePic,
      ...doc.data(),
    }));

    setUserPosts((prevPosts) => {
      const existingPostIds = prevPosts.map((post) => post.postId);
      const newPosts = userPostsData.filter(
        (post) => !existingPostIds.includes(post.postId)
      );
      // Order posts by createdAt in descending order
      const orderedNewPosts = newPosts.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return [...prevPosts, ...newPosts];
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};
