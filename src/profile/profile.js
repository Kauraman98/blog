
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Container, Row,Col } from 'react-bootstrap';
import {auth as authInstance} from '../services/firebase-config';
import { GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'firebaseui';
import { uploadProfileImage, getProfile, updateProfile } from '../services/profile-service';
import { UserContext } from '../context/user-context';

function Profile() {  
    const user = useContext(UserContext)||{};
  const [profile, setProfile] = useState({
    name: '',
    about: '',
    photourl: ''
  });
console.log("current user", authInstance.currentUser);
  const [isUpdating, setIsUpdating] = useState(false);

  const [error, setError] = useState(null);

  useEffect( () => {
      if(user.uid) {
        getProfile(user.uid).then((profile) => {
          setProfile(profile);
        });
      }
    
  
  
  },[user.uid]);
  
  
  const handleSaveProfile= () => {
    setIsUpdating(true);
    setError(null); 
    updateProfile(profile, user.uid).then(() => {
      console.log('Profile Updated');
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
    .finally(() => {
      setIsUpdating(false);
    });
  }

  const handleNameChange = (event) => {
    setProfile({ ...profile, name: event.target.value });
  }
  const handleAboutChange = (event) => {
    setProfile({ ...profile, about: event.target.value });
  }
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    uploadProfileImage(file, user.uid).then((photourl) => {
      setProfile({ ...profile, photourl });
    });
  } 
  return (
    <Container>
      <Row>
        
        <Col xs={{offset:  3, span:6}} className='justify-conten-center'>
        <Form>
          <h4> My Profile</h4>
     <Row className='justify-content-center mb-5'>
     <Image style={{width:'200px'}} src={profile.photourl ||'https://placehold.jp/200x200.png'} roundedCircle />
     
      </Row>   
          <Form.Control type="file" onChange={handlePhotoChange} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={profile.name} onChange={handleNameChange} placeholder="Enter Name" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" disabled  value={user.email} placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>About</Form.Label>
        <Form.Control type="textarea" value={profile.about} placeholder="About yourself" onChange={handleAboutChange} />
      </Form.Group>
      {error && <Form.Text>{error}</Form.Text>}
      <div className="d-grid gap-2 mt-5">
      
      <Button disabled={isUpdating} variant="primary" size='sm' onClick={handleSaveProfile}>
        Update Profile
      </Button>
      </div> 
      
         </Form>

        </Col>
        </Row>   
   
    </Container>

  )
}
export default Profile