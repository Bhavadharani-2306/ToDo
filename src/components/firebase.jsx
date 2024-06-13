// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcMi_0DRf9yXiVv8f5zhNXg9cVY2-mylI",
  authDomain: "todo-web-devop.firebaseapp.com",
  projectId: "todo-web-devop",
  storageBucket: "todo-web-devop.appspot.com",
  messagingSenderId: "916734255315",
  appId: "1:916734255315:web:0015b5d3894ce05f9bf426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth()  //for authentication
const provider=new GoogleAuthProvider() //for provider

const db=getFirestore(app) 

export {auth,provider,db}