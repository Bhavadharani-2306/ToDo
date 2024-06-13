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