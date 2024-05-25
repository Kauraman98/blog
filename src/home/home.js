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
        
        <Col xs={12} md={{ offset: 2, span: 8 }}>
          {blogs.map((blog) => <BlogTile key={blog.id} blog={blog} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;