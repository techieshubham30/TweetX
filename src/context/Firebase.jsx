import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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

const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signup Successfull");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Successfull");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPassword }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
