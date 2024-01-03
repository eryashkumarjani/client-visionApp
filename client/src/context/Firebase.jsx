import { createContext, useContext, useState, useEffect } from "react";
//connect to Firebase
import { initializeApp } from "firebase/app";
//auth for implement the authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
//initialize the Firestore for Database in App.
import { getFirestore, collection, addDoc } from 'firebase/firestore';
//initialize the storage for upload profile image.
import { getStorage, ref, uploadBytes } from 'firebase/storage';

//context created.
const FirebaseContext = createContext(null);

//Firebase configuration to connect firebase
const firebaseConfig = {
    apiKey: "AIzaSyDQXIdzgWjUrTGb9SFa5sjj8OlJ4SVbR-M",
    authDomain: "visionapp-4e367.firebaseapp.com",
    projectId: "visionapp-4e367",
    storageBucket: "visionapp-4e367.appspot.com",
    messagingSenderId: "836680147149",
    appId: "1:836680147149:web:3edeed1bc0c50ae593c984"
};

//hook created to use Firebase.
export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase to connect Firebase
const firebaseApp = initializeApp(firebaseConfig);
// instance of firebaseAuth
const firebaseAuth = getAuth(firebaseApp);
// instance for google auth provider
const googleAuthProvider = new GoogleAuthProvider();
// instance of Firestore
const firestore = getFirestore(firebaseApp);
export { firestore };
// instance of storage
const storage = getStorage(firebaseApp);

//Make provider.
export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            console.log("User", user);
            if (user) setUser(user);
            else setUser(null);
        })
    })

    const isLoggedIn = user ? true : false;
    const isAdmin = user?.email === "pesto@gmail.com" ? true : false;

    // const registerUserDetails = async (username, email, password, gender) => {
    const registerUserDetails = async (username, email, password, dob, gender, profileImage) => {
        const profileImgRef = ref(storage, `uploads/images/${Date.now()}-${username}`);
        const uploadResult = await uploadBytes(profileImgRef, profileImage);
        return await addDoc(collection(firestore, 'profiles'), {
            username,
            email,
            password,
            dob,
            gender,
            profileImage: uploadResult.ref.fullPath,
        })
    };

    const registerUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const loginWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleAuthProvider);
    };

    const logoutUser = () => {
        signOut(firebaseAuth);
    }

    const resetEmailPassword = (email) => {
        sendPasswordResetEmail(firebaseAuth, email);
    }

    return (
        <FirebaseContext.Provider value={{
            registerUserDetails,
            registerUserWithEmailAndPassword,
            loginUserWithEmailAndPassword,
            loginWithGoogle, isLoggedIn,
            logoutUser,
            resetEmailPassword, isAdmin
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
};


