// import React, { useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// const Feed = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [postContent, setPostContent] = useState("");

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handlePostContentChange = (e) => {
//     setPostContent(e.target.value);
//   };

//   const handlePost = () => {
//     // Add logic to post the content (e.g., send to backend)
//     console.log("Post content:", postContent);

//     // Close the modal after posting
//     handleCloseModal();
//   };

//   return (
//     <div>
//       <Button variant="primary" onClick={handleShowModal}>
//         Write
//       </Button>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Write a Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="postContent">
//               <Form.Label>Write your post (max 2 sentences)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 maxLength={280} // Adjust as needed
//                 value={postContent}
//                 onChange={handlePostContentChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handlePost}>
//             Post
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Feed;

import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../context/Firebase";
import PostForm from "../../component/PostForm";
import { fetchUserPosts } from "../../utils/fetchUserPosts";
import UserPosts from "../../component/UserPosts";
import { fetchFollowedUsersPosts } from "../../utils/fetchFollowedUsersPosts";
import "../../commonStyle.css";

const Feed = () => {
  const { firestore, userProfileData } = useContext(FirebaseContext);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const showAllPosts = false;

  // Function to open the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserPosts(firestore, userProfileData, setUserPosts);
      //   await fetchFollowedUsersPosts(firestore, userProfileData, setUserPosts);
    };

    fetchData();
  }, [firestore, userProfileData]);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Button
            variant="primary"
            onClick={handleShowModal}
            className="write-post"
          >
            Write
          </Button>

          {/* PostForm component */}
          <PostForm showModal={showModal} handleClose={handleCloseModal} />

          {userPosts.length === 0 ? (
            <p>No posts yet. Start tweeting!</p>
          ) : (
            <UserPosts userPosts={userPosts} showAllPosts={showAllPosts} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
