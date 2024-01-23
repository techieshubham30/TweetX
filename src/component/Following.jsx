// Following.js
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/Firebase";
import UserItem from "./UserItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { handleFollowClick } from "../utils/handleFollowClick";

const Following = () => {
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
    const fetchFollowing = async () => {
      try {
        const usersCollection = collection(firestore, "users");

        // Query to get users whom the current user is following
        const followingQuery = query(
          usersCollection,
          where("followers", "array-contains", userProfileData.uid)
        );

        const followingSnapshot = await getDocs(followingQuery);

        const fetchedFollowing = followingSnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedFollowing);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFollowing();
  }, [userProfileData, firestore]);

  console.log(users);

  return (
    <div>
      <h2>Following</h2>
      {users.map((following) => (
        <UserItem
          key={following.userId}
          user={following}
          onFollowClick={handleFollowUnfollow}
        />
      ))}
    </div>
  );
};

export default Following;
