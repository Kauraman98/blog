// src/BlogPostPage.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthor } from '../components/useAuthor';

const BlogPostPage = ({ title, updatedOn, content, authorId, photourl }) => {

  const author = useAuthor(authorId);

  //format date in format mmm dd, yyyy
  const _updatedOn = updatedOn && new Date(updatedOn);

  const updatedOnDate = _updatedOn && _updatedOn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Image src={photourl} style={{ maxHeight: 500, width: '100%' }} height={500} fluid alt={title} className="img-fluid mb-4" />
          <h1>{title}</h1>
          <p className="text-muted">{updatedOnDate}</p>
          <p>{content}</p>
          <hr />
          <Row className="mt-4">
            <Col md={2}>
              <Image
                src={author.photourl}
                alt={author.name}
                roundedCircle
                fluid
                style={{ width: '50px' }}
              />
            </Col>
            <Col md={10}>
              <p className="text-muted"><Link to="/author">By {author.name} </Link></p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostPage;
