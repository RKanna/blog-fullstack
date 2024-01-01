import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAjDphZtNzYL2HdJykYKiIPG5Bh-XBaxZE",
  authDomain: "another-f000d.firebaseapp.com",
  projectId: "another-f000d",
  storageBucket: "another-f000d.appspot.com",
  messagingSenderId: "833410272072",
  appId: "1:833410272072:web:fe821139e5877fdfb3017d",
};

const app = initializeApp(firebaseConfig);

//Authentication
const appAuth = getAuth(app);
//Sign in with Google

const googleProvider = new GoogleAuthProvider();

const signInWithGooglePopup = async () =>
  await signInWithPopup(appAuth, googleProvider);

//for User normal SignUP and Sign In using Email and password
//For Sign Up
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(appAuth, email, password);
};
//For Sign In
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(appAuth, email, password);
};

//firestore DB
const appDB = getFirestore(app);
//here additionalInformation ={} this is a optional argument
const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(appDB, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating User", err.message);
    }
  }
  return userDocRef;
};

export {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  appDB,
};
