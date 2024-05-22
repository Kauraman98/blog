
import React, { useState } from 'react'

import './form.css';
import {Link} from 'react-router-dom';


function SignUpForm() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  
  
const handleSubmit=async(e)=>{
e.preventDefault()
try{


 // firebase.auth.createUserWithEmailAndpassword(auth ,email,password)
  console.log("account Created")
}catch(err){
console.log(err)


}
}
  return (
    <div className='signup-container'>


      <form className='signup-from' onSubmit={handleSubmit}>
        <h2 className="signup-title">Register</h2>

        <div className="form-group">

          <label htmlFor="email">
            Email:
            <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
          </label><br></br>
          <label htmlFor="password" >
            Password:
            <input type="text"  onChange={(e)=> setPassword(e.target.value)}></input>
          </label><br></br>
          
          <button type="submit" >Sign Up</button>
          <p>Already Registered?<Link to ='/SignIn'>Sign In</Link></p>
        </div>
      </form>
    </div>
  )
}
export default SignUpForm