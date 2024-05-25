import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogTile from '../components/blog-tile';
import { useEffect, useState } from 'react';
import { getBlogs } from '../services/blog-service';


function Home() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogs().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <h1>Home</h1>
        
      
      </Row>
      <Row>
        
        {blogs.map((blog) => <BlogTile key={blog.id} blog={blog} />)}
      </Row>
    </Container>
  );
}

export default Home;