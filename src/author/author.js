import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useAuthor } from '../components/useAuthor';
import Image from 'react-bootstrap/Image';
import { getBlogsByAuthor } from '../services/blog-service';
import { useEffect, useState } from 'react';
import BlogTile from '../components/blog-tile';

function Author() {
  const authorId = useParams().authorId;

  const author = useAuthor(authorId);
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogsByAuthor(authorId).then((blogs) => {
      setBlogs(blogs);
    });
  }, [authorId]);
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col xs={12} md={{ offset: 2, span: 8 }}>

          <Row>
            <Col className='d-flex flex-col align-items-center mt-3 border-bottom pb-2 mb-4'>
              <Image src={author.photourl} width={200} height={200} style={{ height: 200, width: 200 }} roundedCircle />
              <h1>{author.name}</h1>
              <p className='text align-left'>{author.about}</p>
            </Col>
          </Row>

          {blogs.map((blog) => <BlogTile key={blog.id} blog={blog} />)}


        </Col>

      </Row>
    </Container>
  );
}

export default Author;