import React, { useContext } from "react";
import { FirebaseContext } from "../context/Firebase";

const ProfileHeader = () => {
  const { userProfileData } = useContext(FirebaseContext);

  return (
    <div>
      <h1>{userProfileData.userName}</h1>
      <div>
        <p>Posts: {userProfileData.posts.length}</p>
        <p>Followers: {userProfileData.followers.length}</p>
        <p>Following: {userProfileData.following.length}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
