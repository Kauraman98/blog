import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogTile from '../components/blog-tile';
import { useState } from 'react';


function Home() {
    const [blogs, setBlogs] = useState([1,2,3,5])
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <h1>Home</h1>
        
      
      </Row>
      <Row>
        {blogs.map((_, i) => <BlogTile/>)}
      </Row>
    </Container>
  );
}

export default Home;