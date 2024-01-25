import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";

import { Tab, Tabs } from "react-bootstrap";
import Followers from "../../component/Followers";
import Following from "../../component/Following";
import UserPosts from "../../component/UserPosts";
import { fetchUserPosts } from "../../utils/fetchUserPosts";
import { FirebaseContext } from "../../context/Firebase";
import "../.././commonStyle.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const [userPosts, setUserPosts] = useState([]);

  const { firestore, userProfileData, setUserProfileData } =
    useContext(FirebaseContext);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserPosts(firestore, userProfileData, setUserPosts);
    };

    fetchData();
  }, [firestore, userProfileData, setUserProfileData]);

  return (
    <div className=" d-flex align-items-center flex-column">
      <ProfileHeader />
      <Tabs
        id="profileTabs"
        activeKey={activeTab}
        onSelect={(tab) => handleTabChange(tab)}
      >
        <Tab eventKey="followers" title="Followers">
          <Followers />
        </Tab>
        <Tab eventKey="following" title="Following">
          <Following />
        </Tab>
        <Tab eventKey="posts" title="Posts">
          <UserPosts userPosts={userPosts} />
        </Tab>
      </Tabs>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Profile;
