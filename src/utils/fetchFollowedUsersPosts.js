// import { collection, getDocs, where, orderBy, query } from "firebase/firestore";

// export const fetchFollowedUsersPosts = async (
//   firestore,
//   userProfileData,
//   setUserPosts
// ) => {
//   try {
//     // Get the followed users
//     const followedUsersCollection = collection(firestore, "users");

//     const followedUsersQuery = await getDocs(
//       query(
//         followedUsersCollection,
//         where("followers", "array-contains", userProfileData.uid)
//       )
//     );

//     console.log("Followed Users Snapshot:", followedUsersQuery);

//     if (!followedUsersQuery.empty) {
//       // Array to store posts from followed users
//       const followedUsersPosts = [];

//       for (const doc of followedUsersQuery.docs) {
//         // Get the posts of each followed user
//         const userPostsCollection = collection(
//           firestore,
//           "users",
//           doc.id,
//           "posts"
//         );
//         const userPostsQuery = query(
//           userPostsCollection,
//           orderBy("createdAt", "desc")
//         );
//         const userPostsSnapshot = await getDocs(userPostsQuery);

//         console.log("User Posts Snapshot:", userPostsSnapshot);

//         // Extracting the post data
//         const userPostsData = userPostsSnapshot.docs.map((postDoc) => ({
//           postId: postDoc.id,
//           uid: doc.id, // User ID of the followed user
//           ...postDoc.data(),
//         }));

//         // Concatenate posts from each followed user to the main array
//         followedUsersPosts.push(...userPostsData);
//       }

//       // Sort the combined posts array by createdAt in descending order
//       followedUsersPosts.sort((a, b) => b.createdAt - a.createdAt);

//       setUserPosts(followedUsersPosts);
//     } else {
//       console.log("No followed users found.");
//     }
//   } catch (error) {
//     console.error("Error fetching followed users' posts:", error);
//   }
// };
