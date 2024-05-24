
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import { auth as authInstance } from '../services/firebase-config';
import { GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseui';
import { uploadProfileImage, getProfile, updateProfile } from '../services/profile-service';
import { UserContext } from '../context/user-context';
import { getBlogObject, getCurrentuserBlog, updateBlog, uploadBlogImage, createBlog, publishBlog, archiveBlog, deleteBlog } from '../services/author-blog-service';

function CreateBlog({ isEdit }) {
  const user = useContext(UserContext) || {};
  const { blogId } = useParams();
  const [blog, setBlog] = useState(
    getBlogObject()
  );
  console.log("current user", authInstance.currentUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (blogId && user.uid) {
      getCurrentuserBlog(user.uid, blogId).then((blog) => {
        setBlog(blog);
      });
    }
    if (!blogId && user.uid) {
      setBlog(getBlogObject());
    }



  }, [blogId, user.uid]);


  const handleSaveBlog = () => {
    setIsUpdating(true);
    setError(null);
    const _blog = { ...blog, updatedOn: new Date() };
    updateBlog(_blog, blogId, user.uid).then(() => {
      console.log('Blog Updated');
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
      .finally(() => {
        setIsUpdating(false);
      });
  }

  const handleCreateBlog = () => {
    setIsUpdating(true);
    setError(null);
    const _blog = { ...blog, createdOn: new Date(), authorId: user.uid, updatedOn: new Date() };
    createBlog(_blog, user.uid).then((id) => {
      console.log('Blog Created', id);
      navigate(`/edit-blog/${id}`);
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
      .finally(() => {
        setIsUpdating(false);
      });
  }

  const handleTitleChange = (event) => {
    setBlog({ ...blog, title: event.target.value });
  }
  const handleSummaryChange = (event) => {
    setBlog({ ...blog, summary: event.target.value });
  }
  const handleContentChange = (event) => {
    setBlog({ ...blog, content: event.target.value });
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    uploadBlogImage(file, blogId || new Date().getTime(), user.uid).then((photourl) => {
      setBlog({ ...blog, photourl });
    });
  }

  const handlePublishBlog = async () => {
    setIsUpdating(true);
    setError(null);
    const _blog = { ...blog, state: 'published', updatedOn: new Date() };
    await publishBlog(_blog, blogId, user.uid);
    updateBlog(_blog, blogId, user.uid).then(() => {
      console.log('Blog Updated');
      setBlog(_blog);
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
      .finally(() => {
        setIsUpdating(false);
      });
  }
  const handleArchiveBlog = async () => {
    const _blog = { ...blog, state: 'archived', updatedOn: new Date() };
    await archiveBlog(_blog, blogId, user.uid);
    updateBlog(_blog, blogId, user.uid).then(() => {
      console.log('Blog Updated');
      setBlog(_blog);
    }).catch((error) => {
      console.error(error);
      setError(error.message);
    })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  const handleDeleteBlog = () => {
    deleteBlog(blogId, user.uid).then(() => {
      console.log('Blog Deleted');
      navigate('/my-blogs');
    });
  };

  return (
    <Container>
      <Row className='justify-content-space-between'>
        <Col xs={8}>

          {isEdit && <h1>Edit Blog</h1>}
          {!isEdit && <h1>Create Blog</h1>}</Col>


        {
          isEdit && <Col xs={4} >
            {blog.state === 'draft' && <Button variant="outline-primary" size='sm' onClick={handlePublishBlog}> Publish Blog</Button>}
            {blog.state === 'published' && <Button variant="outline-primary" size='sm' onClick={handleArchiveBlog}> Archive Blog</Button>}
            {blog.state === 'archived' && <Button variant="outline-primary" size='sm' onClick={handlePublishBlog}> Publish Blog</Button>}
            {blog.state != 'published' && <Button variant="outline-danger" size='sm' onClick={handleDeleteBlog}> Delete Blog</Button>}
          </Col>
        }

      </Row>
      <Row>

        <Col xs={{ offset: 2, span: 8 }} className='justify-conten-center'>
          <Form>
            <Row className='justify-content-center mb-5'>
              <Image style={{ width: '100%', height: 250 }} src={blog.photourl || 'https://placehold.jp/500x250.png'} fluid />

            </Row>
            <Form.Control type="file" onChange={handlePhotoChange} />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={blog.title} onChange={handleTitleChange} placeholder="Title" />

            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Summary</Form.Label>
              <Form.Control as="textarea" value={blog.summary} placeholder="Short Summary" onChange={handleSummaryChange} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" value={blog.content} placeholder="Content" onChange={handleContentChange} />
            </Form.Group>
            {error && <Form.Text>{error}</Form.Text>}
            <div className="d-grid gap-2 mt-5">
              {blogId &&
                <Button disabled={isUpdating} variant="primary" size='sm' onClick={handleSaveBlog}>
                  Update Blog
                </Button>}


              {!blogId && <Button disabled={isUpdating} variant="primary" size='sm' onClick={handleCreateBlog}>
                Create Blog
              </Button>}
            </div>

          </Form>

        </Col>
      </Row>

    </Container>

  )
}


export default CreateBlog