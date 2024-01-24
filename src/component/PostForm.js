import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FirebaseContext } from "../context/Firebase";

const PostForm = ({ showModal, handleClose }) => {
  const [tweetText, setTweetText] = useState("");
  const { firestore, userProfileData, setUserProfileData } =
    useContext(FirebaseContext);

  console.log(userProfileData);

  const handlePostTweet = async () => {
    try {
      //   Create a reference to the posts subcollection of the current user
      const postsCollection = collection(
        firestore,
        "users",
        userProfileData.uid,
        "posts"
      );

      // Add a new document to the posts subcollection
      const newPostRef = await addDoc(postsCollection, {
        text: tweetText,
        createdAt: serverTimestamp(),
      });

      console.log(newPostRef);

      // Update the current user's posts array
      const currentUserQuery = query(
        collection(firestore, "users"),
        where("uid", "==", userProfileData.uid)
      );

      const currentUserSnapshot = await getDocs(currentUserQuery);

      if (!currentUserSnapshot.empty) {
        const currentUserDocRef = currentUserSnapshot.docs[0].ref;

        // Update the current user's posts array
        await updateDoc(currentUserDocRef, {
          posts: arrayUnion(newPostRef.id),
        });
      }

      setUserProfileData((prevData) => {
        return {
          ...prevData,
          posts: [...prevData.posts, newPostRef.id],
        };
      });

      // Close the modal after posting

      handleClose();
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a Tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tweetTextArea">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePostTweet}>
          Post Tweet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostForm;
