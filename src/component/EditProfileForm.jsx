// EditProfileForm.js
import React, { useState, useContext, useRef } from "react";
import { FirebaseContext } from "../context/Firebase";
import { Modal, Form, Button } from "react-bootstrap";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import usePreviewImg from "../hook/usePreviewImage";

const EditProfileForm = ({ show, handleClose }) => {
  const { userProfileData, firestore, setUserProfileData, storage } =
    useContext(FirebaseContext);

  const [newUserName, setNewUserName] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);

  const fileRef = useRef(null);

  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImg(fileRef);

  const handleSave = async () => {
    try {
      const storageRef = ref(storage, `profilePics/${userProfileData.uid}`);
      let URL = "";

      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(
          ref(storage, `profilePics/${userProfileData.uid}`)
        );
      }

      const userCollection = collection(firestore, "users");

      // Use the update function to update specific fields in the document
      const userQuery = query(
        userCollection,
        where("uid", "==", userProfileData.uid)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDocRef = userSnapshot.docs[0].ref;
        await updateDoc(userDocRef, { userName: newUserName });

        // If needed, you can also update the local state here
        setUserProfileData((prevData) => ({
          ...prevData,
          userName: newUserName,
          profilePic: URL || userProfileData.profilePic,
        }));

        handleClose();
      } else {
        console.error("User document not found.");
        // Handle the case where the user document is not found
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error or provide feedback to the user
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProfilePicFile">
            <Form.Label>Upload Profile Picture</Form.Label>
            <Form.Control
              type="file"
              ref={fileRef}
              onChange={handleImageChange}
            />
            {selectedFile && (
              <img
                src={selectedFile}
                alt="Profile Preview"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            )}
          </Form.Group>
          <Form.Group controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileForm;
