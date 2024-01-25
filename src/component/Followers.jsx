// Followers.js
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/Firebase";
import UserItem from "./UserItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { handleFollowClick } from "../utils/handleFollowClick";

const Followers = () => {
  const { userProfileData, firestore, setUserProfileData } =
    useContext(FirebaseContext);
  const [users, setUsers] = useState([]);

  const handleFollowUnfollow = (selectedUser) => {
    handleFollowClick(
      selectedUser,
      userProfileData,
      setUserProfileData,
      setUsers,
      firestore
    );
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const usersCollection = collection(firestore, "users");

        // Query to get users of the current user
        const followersQuery = query(
          usersCollection,
          where("following", "array-contains", userProfileData?.uid)
        );

        const followersSnapshot = await getDocs(followersQuery);

        const fetchedFollowers = followersSnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedFollowers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFollowers();
  }, [userProfileData, firestore, setUserProfileData]);

  return (
    <div>
      {users.map((follower) => (
        <UserItem
          key={follower.userId}
          user={follower}
          onFollowClick={handleFollowUnfollow}
        />
      ))}
    </div>
  );
};

export default Followers;
