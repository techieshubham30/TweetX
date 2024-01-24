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
    console.log(userPostsSnapshot);

    // Extracting the post data
    const userPostsData = userPostsSnapshot.docs.map((doc) => ({
      postId: doc.id,
      uid: userProfileData.uid,
      ...doc.data(),
    }));

    setUserPosts(userPostsData);
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};
