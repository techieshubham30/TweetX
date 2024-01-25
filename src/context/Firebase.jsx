import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getStorage } from "firebase/storage";

export const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDzXhndwx92cdlQbD41RRFni0tBVBGtIgc",
  authDomain: "tweetx-7d145.firebaseapp.com",
  projectId: "tweetx-7d145",
  storageBucket: "tweetx-7d145.appspot.com",
  messagingSenderId: "948909140161",
  appId: "1:948909140161:web:b7d944a3d714cdcaec4c40",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-info"))
  );
  const [userProfileData, setUserProfileData] = useState(null);

  const signupUserWithEmailAndPassword = async (email, password, name) => {
    try {
      // Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      console.log(newUser);

      // Add user data to Firestore
      const userCollection = collection(firestore, "users");
      const userDocRef = await addDoc(userCollection, {
        uid: newUser.uid,
        userName: name,
        email: newUser.email,
        profilePic: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
        // Add any other user-related data you want to store in Firestore
      });

      localStorage.setItem("user-info", JSON.stringify(userDocRef));
      toast.success("Signup successful!");

      console.log("User added to Firestore with ID: ", userDocRef.id);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorCode, errorMessage);
    }
  };

  const signinUserWithEmailAndPassword = async (email, password) => {
    // return await signInWithEmailAndPassword(auth, email, password);
    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Fetch user data from Firestore
      const userCollection = collection(firestore, "users");
      const userQuery = query(userCollection, where("uid", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        // Get the first document (should be only one matching UID)
        const userData = userSnapshot.docs[0].data();
        console.log(userData);

        // Save user information to localStorage
        localStorage.setItem("user-info", JSON.stringify(userData));
        toast.success("Login successful!");
      }

      return userCredential;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user-info");
        toast.success("Logout successful!");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log(user);
      setUser(user);
      if (user) {
        const userCollection = collection(firestore, "users");
        const userQuery = query(userCollection, where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          userSnapshot.forEach((doc) => {
            const userData = doc.data();
            // console.log(userData);
            setUserProfileData(userData); // Update userData state
          });
        }
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        logout,
        user,
        userProfileData,
        firestore,
        setUserProfileData,
        storage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
