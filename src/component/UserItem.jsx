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
    <Card style={{ marginBottom: "20px", padding: "1rem" }}>
      <div
        className="d-flex gap-5 align-items-center  "
        style={{ justifyContent: "space-between" }}
      >
        <div className="d-flex justify-content-space-between align-items-center gap-3">
          <Card.Img
            variant="top"
            src={user.profilePic}
            alt="User Avatar"
            className="rounded-circle"
            style={{
              width: "100px",
              height: "100px",
              border: "0.5px solid gray",
            }}
          />

          <Card.Title>{user.userName}</Card.Title>
        </div>

        <div>
          <Button onClick={() => onFollowClick(user)}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>

      <Card.Body>
        <div style={{ display: "flex" }}></div>
        <Card.Text>
          Followers: {user.followers.length} | Following:{" "}
          {user.following.length}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserItem;
