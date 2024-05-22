
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './form.css';
import { Container, Row,Col } from 'react-bootstrap';
import {auth as authInstance} from './services/firebase-config';
import { GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'firebaseui';
const ui = new auth.AuthUI(authInstance);
function SignInForm() {

  const [emailPassword, setEmailPassword] = useState({
    email: '',
    password: '',
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    ui.start('#firebase-google-auth-container', { signInOptions: [GoogleAuthProvider.PROVIDER_ID] });
    
  };

  const handleSignIn= () => {
    setIsSigningIn(true);
    setError(null);
    signInWithEmailAndPassword(authInstance, emailPassword.email, emailPassword.password).then((userCredential) => {
      navigate('/');
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
    .finally(() => {
      setIsSigningIn(false);
    });
  }

  const handleEmailChange = (event) => {
    setEmailPassword({ ...emailPassword, email: event.target.value });
  
  };
  const handlePasswordChange = (event) => {
    setEmailPassword({ ...emailPassword, password: event.target.value });
  }
  
  return (
    <Container>
      <Row>
        
        <Col xs={{offset:  3, span:6}}>
        <Form>
          <h4>SignIn</h4>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={handleEmailChange} placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      {error && <Form.Text>{error}</Form.Text>}
      <div className="d-grid gap-2 mt-5">
      
      <Button disabled={isSigningIn} variant="primary" size='sm' onClick={handleSignIn}>
        Submit
      </Button>

      <div>
        Don't have an account? <Link to="/SignUp">Sign Up</Link>
      </div>
      </div> 
      {/* <div className="d-grid gap-2 mt-5">
      <Button disabled={isSigningIn} variant="secondary" size='sm' onClick={handleGoogleSignIn}>
        Sign in With Google
      </Button>
      </div>
       */}
         </Form>

        </Col>
        </Row>   
    <Container id="firebase-google-auth-container" className="mt-5" fluid>
      </Container>
    </Container>

  )
}
export default SignInForm