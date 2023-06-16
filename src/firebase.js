// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const SUCCESS = 'success';
const ERROR = 'error';

const firebaseConfig = {
    apiKey: "AIzaSyAcnewFe9tkt5qUTRmzUY5-ZpxUtw3TB7Y",
    authDomain: "crce-social.firebaseapp.com",
    projectId: "crce-social",
    storageBucket: "crce-social.appspot.com",
    messagingSenderId: "5007455863",
    appId: "1:5007455863:web:f99216a6680c9c190f3872",
    measurementId: "G-YMES28HN58"
  };


function googleAuth(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    return SUCCESS;
  }).catch((error) => {
    console.log(error);
    alert(error);
    return ERROR;
    // ...
  });
}

function logout(){
  return auth.signOut();
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
const storage = getStorage(app);
export {app, auth, user, googleAuth, logout, db, storage};