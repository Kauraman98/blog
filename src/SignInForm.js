
import React from 'react';
import {Link} from 'react-router-dom';
import './form.css';

function SignInForm() {
  return (
    <div className='signup-container'>


      <form className='signup-from'>
        <h2 className="signup-title">Login</h2>
        
        <div className="form-group">

          <label htmlFor="email">
            Email:
            <input type="text"></input>
          </label><br></br>
          <label htmlFor="password">
            Password:
            <input type="text"></input>
          </label><br></br>
          
          <button >Sign Up</button>
          <p>Not  Registered?<Link to ='/SignUp'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}
export default SignInForm