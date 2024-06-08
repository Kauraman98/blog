import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogTile from '../components/blog-tile';
import BlogPostPage from './blog-post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlog, searchBlogs } from '../services/blog-service';
import * as Quill from 'quill';



  


function Blog() {
  const blogId = useParams().blogId;
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    if (blogId) {
      setIsLoading(true);
      getBlog(blogId).then((blog) => {
        setBlog(blog);
        setIsLoading(false);
      });
    }
  }, [blogId]);





  

  return (
    <Container>
      <Row>
        <Col>
       </Col>
      </Row>
      <Row>
        <Col xs={12} md={{ offset: 2, span: 8 }}>
          {isLoading && <h1>Loading...</h1>}
          {!isLoading && blog && <BlogPostPage {...blog} />}</Col>
      </Row>
      
    </Container>
  );
}

export default Blog;  