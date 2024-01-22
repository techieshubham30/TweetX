import React, { useEffect, useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FirebaseContext } from "../context/Firebase";

const UserItem = ({ user, onFollowClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { firestore, userProfileData, setUserProfileData } =
    useContext(FirebaseContext);

  useEffect(() => {
    // Check if the user is already being followed

    const currentUserId = userProfileData.uid;
    setIsFollowing(user.followers.includes(currentUserId));
  }, [user, userProfileData]);

  console.log(user);

  return (
    <Card style={{ width: "18rem", marginBottom: "20px" }}>
      <Card.Img
        variant="top"
        src={user.profilePic}
        alt="User Avatar"
        className="rounded-circle"
        style={{ width: "100px", height: "100px" }}
      />
      <Card.Body>
        <Card.Title>{user.userName}</Card.Title>
        <Card.Text>
          Followers: {user.followers.length} | Following:{" "}
          {user.following.length}
        </Card.Text>
        <Button onClick={() => onFollowClick(user)}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserItem;
