import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";

import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FirebaseContext } from "../../context/Firebase";
import Followers from "../../component/Followers";

const Profile = () => {
  return (
    <div>
      <ProfileHeader />
      <Followers />
    </div>
  );
};

export default Profile;
