import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";

import { Tab, Tabs } from "react-bootstrap";
import Followers from "../../component/Followers";
import Following from "../../component/Following";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("followers");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
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
      </Tabs>
    </div>
  );
};

export default Profile;
