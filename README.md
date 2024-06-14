# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Web Development 

Welcome to the Web Development Bootcamp.Here we are going to see how to design a web page and deploy the website in Cloudflare.Below is a detailed summary of what we learned:


## Creation of Vite React 
React and Vite are two popular tools in the web development ecosystem and can be used together to efficiently create modern web applications. 


### How to install and run vite react?

1. **Create a new file named app.jsx.**


2. **Open Your Terminal or Command Prompt**
     ```
     npm create vite@latest
     ```
    
3. **Install**
     ```
     npm install
     ```
     
4. **Run**
     ```
     npm run dev
     ```


## ToDo Image
This is the image which we are going to insert in the web page for building the ToDo List.
![image](https://github.com/Bhavadharani-2306/ToDo/assets/171047714/dbf21f3c-2572-42cb-b28b-0bdd12ef1e4b)


## React Router DOM
- **Install**
  ```jsx
  npm install react-router-dom
  ```
    

- **Code for setup**
    ```jsx
    import './App.css'
    import Content from './components/Content'
    import Signin from './components/Signin'
    import { BrowserRouter,Routes,Route } from 'react-router-dom'



    function App() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' Component={Signin}> </Route>
            <Route path='/home' Component={Content}></Route>
            </Routes>
        </BrowserRouter>
    )
    }

    export default App
    ```
- **Switching between routes**
  
    ```jsx
      <Link to="/home">
        <button>
            <img src= {google} alt="" className='google' />
            Continue with Google
        </button>
      </Link>
    ```


## Integrate Firebase
- **Install**
  
    ```
    npm install firebase
    ```
- **API Key**

  ```jsx
  import { initializeApp } from "firebase/app";
  import { GoogleAuthProvider,getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
     apiKey: "AIzaSyBcMi_0DRf9yXiVv8f5zhNXg9cVY2-mylI",
     authDomain: "todo-web-devop.firebaseapp.com",
     projectId: "todo-web-devop",
     storageBucket: "todo-web-devop.appspot.com",
     messagingSenderId: "916734255315",
     appId: "1:916734255315:web:0015b5d3894ce05f9bf426"
  };
  const app = initializeApp(firebaseConfig);
  const auth=getAuth()  //for authentication
  const provider=new GoogleAuthProvider() //for provider
  const db=getFirestore(app) 
  export {auth,provider,db}
  ```

 - **Sign-In Page**
 
```jsx
import React, { useState } from 'react'
import "../styles/signin.css"
import google from "../assets/google.png"
import tasking from "../assets/tasking.png"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import {auth,provider} from './firebase'

function Signin() {

const [redirect,setRedirect]=useState(false)
const navigate=useNavigate()

const handleClick=()=>{
  signInWithPopup(auth,provider).then(()=>{
    setRedirect(true)
  })
}

  return (
    <div className='signcontent'>
        <div className='signdiv'>
            <h1 className='h1'>Sign-In</h1>
            <img src={tasking} width='300px' alt="" />
            <button onClick={handleClick}>
                <img src= {google} alt="" className='google' />
                <h3>Continue with Google</h3>
            </button>
          </div>
          {redirect?navigate("/home"):console.log("error")}
    </div>
  )
}

export default Signin
```

- **Content Page**

  ```jsx
  const navigate=useNavigate()
  const [name,setName]=useState()
  const [dp,setDp]=useState()


  useEffect(()=>{
    const displayData=auth.onAuthStateChanged(user=> {

    if (user){
      setName(user.displayName)
      setDp(user.photoURL)
    }
    else{
      navigate("/")
    }
  })
    return()=>displayData()
  },[navigate])
  ```

- **Display of 'Dp' and 'Name'**

    ```jsx
     {/* leftcontent */}
        <div className='leftcontent'>
            <img src={dp} alt="" className='img1' />
            <h2 className='h2'>Hi {name}</h2>
            <img src={image} alt="" className='tasking'/>
        </div>
    ```

    ## Importing documents from Firebase

   ```javascript
   import { getDocs, collection } from "firebase/firestore";
   import { db } from "./firebase-config"; 
   useEffect(() =>{
   const gettasks = async() => {
   const data = await getDocs(taskref)
   const filtereddata = data.docs.map(doc => ({...doc.data(),id:doc.id}))
   setTasks(filtereddata)
   }

   gettasks()
   ```

   ## Integrate Firebase

   ## Deploy the website in CloudFlare

   ### Steps to Deploy

   1. **Login**
   2. **Connect to the repository**
   3. **Configure**
   4. **Deploy**
