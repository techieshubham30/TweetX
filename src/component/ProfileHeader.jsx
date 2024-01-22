import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/Firebase";
import { Image, Button } from "react-bootstrap";
import EditProfileForm from "./EditProfileForm";

const ProfileHeader = () => {
  const { userProfileData, user } = useContext(FirebaseContext);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const isCurrentUserProfile =
    user && userProfileData && user.uid === userProfileData.uid;

  const handleEditProfile = () => {
    setShowEditProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  return (
    <div>
      {userProfileData && (
        <>
          <Image
            src={
              userProfileData.profilePic ||
              "https://pbs.twimg.com/profile_images/1592810849521266689/mOOLdO15_400x400.jpg"
            }
            alt="Profile Avatar"
            roundedCircle
            style={{ width: "100px", height: "100px" }}
          />
          <h1>{userProfileData.userName}</h1>
          <div>
            <p>Posts: {userProfileData.posts.length}</p>
            <p>Followers: {userProfileData.followers.length}</p>
            <p>Following: {userProfileData.following.length}</p>
          </div>

          {isCurrentUserProfile && (
            <>
              <Button variant="outline-primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
              <EditProfileForm
                show={showEditProfileModal}
                handleClose={handleCloseEditProfileModal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
