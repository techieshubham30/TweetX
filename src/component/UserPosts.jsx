import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FirebaseContext } from "../context/Firebase";
import { fetchUserPosts } from "../utils/fetchUserPosts";

const UserPosts = ({ userPosts, showAllPosts }) => {
  const { userProfileData } = useContext(FirebaseContext);

  if (!userProfileData) {
    return <p>Loading...</p>;
  }
  const currentUserId = userProfileData.uid;

  const filteredPosts = showAllPosts
    ? userPosts
    : userPosts.filter((post) => post.uid === currentUserId);

  // console.log(filteredPosts);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6 }} style={{ width: "100%" }}>
          {filteredPosts.length === 0 ? (
            <p>
              No posts yet.{" "}
              {showAllPosts ? "Start exploring!" : "Start posting!"}
            </p>
          ) : (
            filteredPosts.map((post, index) => (
              <Card key={index} className="mb-3" style={{ width: "100%" }}>
                <Card.Body>
                  <Col>
                    <div
                      className="d-flex justify-content-space-between align-items-center gap-3"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <img
                        src={post.profilePic}
                        alt="Profile Pic"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Card.Title>{post.userName}</Card.Title>

                      <small className="text-muted">
                        {post.createdAt instanceof Date
                          ? post.createdAt.toLocaleString()
                          : new Date(
                              post.createdAt.seconds * 1000 +
                                post.createdAt.nanoseconds / 1000000
                            ).toLocaleString()}
                      </small>
                    </div>
                  </Col>
                  <Col>
                    <Card.Text>{post.text}</Card.Text>
                  </Col>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPosts;
