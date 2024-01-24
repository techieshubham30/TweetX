import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../context/Firebase";
import {
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  query,
  where,
} from "firebase/firestore";

import UserItem from "../../component/UserItem";
import { handleFollowClick } from "../../utils/handleFollowClick";

const User = () => {
  const [users, setUsers] = useState([]);
  const { firestore, userProfileData, setUserProfileData } =
    useContext(FirebaseContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleFollowUnfollow = (selectedUser) => {
    handleFollowClick(
      selectedUser,
      userProfileData,
      setUserProfileData,
      setUsers,
      firestore
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column user-page-container">
        {users.map((user) => (
          <UserItem
            key={user.userId}
            user={user}
            onFollowClick={handleFollowUnfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default User;
