import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../context/Firebase";
import {
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  query,
  where,
} from "firebase/firestore";

import UserItem from "../../component/UserItem";

const User = () => {
  const [users, setUsers] = useState([]);
  const { firestore, userProfileData, setUserProfileData } =
    useContext(FirebaseContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleFollowClick = async (selectedUser) => {
    console.log(selectedUser);
    try {
      const currentUserId = userProfileData.uid;
      // Check if the user is already being followed
      const isFollowing = selectedUser.followers.includes(currentUserId);
      const usersCollection = collection(firestore, "users");

      if (isFollowing) {
        // Unfollow logic

        // Find the document reference for the current user
        const currentUserQuery = query(
          usersCollection,
          where("uid", "==", currentUserId)
        );

        const currentUserSnapshot = await getDocs(currentUserQuery);

        if (!currentUserSnapshot.empty) {
          const currentUserDocRef = currentUserSnapshot.docs[0].ref;

          // Update the current user's following array
          await updateDoc(currentUserDocRef, {
            following: arrayRemove(selectedUser.uid),
          });
        }

        // Find the document reference for the selected user
        const selectedUserQuery = query(
          usersCollection,
          where("uid", "==", selectedUser.uid)
        );

        const selectedUserSnapshot = await getDocs(selectedUserQuery);

        if (!selectedUserSnapshot.empty) {
          const selectedUserDocRef = selectedUserSnapshot.docs[0].ref;

          // Update the selected user's followers array
          await updateDoc(selectedUserDocRef, {
            followers: arrayRemove(currentUserId),
          });
        }

        console.log(`Followed ${selectedUser.userName} successfully`);
      } else {
        console.log(isFollowing);

        // Find the document reference for the current user
        const currentUserQuery = query(
          usersCollection,
          where("uid", "==", currentUserId)
        );

        const currentUserSnapshot = await getDocs(currentUserQuery);

        if (!currentUserSnapshot.empty) {
          const currentUserDocRef = currentUserSnapshot.docs[0].ref;

          // Update the current user's following array
          await updateDoc(currentUserDocRef, {
            following: arrayUnion(selectedUser.uid),
          });
        }

        // Find the document reference for the selected user
        const selectedUserQuery = query(
          usersCollection,
          where("uid", "==", selectedUser.uid)
        );

        const selectedUserSnapshot = await getDocs(selectedUserQuery);

        if (!selectedUserSnapshot.empty) {
          const selectedUserDocRef = selectedUserSnapshot.docs[0].ref;

          // Update the selected user's followers array
          await updateDoc(selectedUserDocRef, {
            followers: arrayUnion(currentUserId),
          });
        }

        console.log(`Followed ${selectedUser.userName} successfully`);
      }

      setUserProfileData((prevData) => {
        if (isFollowing) {
          // If the user is following, remove the selected user from the following array
          return {
            ...prevData,
            following: prevData.following.filter(
              (followedUser) => followedUser.uid !== selectedUser.uid
            ),
          };
        } else {
          // If the user is not following, add the selected user to the following array
          return {
            ...prevData,
            following: [...prevData.following, selectedUser.uid],
          };
        }
      });

      // Update the 'users' state with the modified user data
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.uid === selectedUser.uid) {
            return {
              ...user,
              followers: isFollowing
                ? user.followers.filter(
                    (follower) => follower.uid !== currentUserId
                  )
                : [...user.followers, currentUserId],
            };
          } else {
            return user;
          }
        })
      );
    } catch (error) {
      console.error("Error following user:", error);
      // Handle errors or provide feedback to the user
    }
  };

  return (
    <div>
      <h1>User Page</h1>
      {users.map((user) => (
        <UserItem
          key={user.userId}
          user={user}
          onFollowClick={handleFollowClick}
        />
      ))}
    </div>
  );
};

export default User;
