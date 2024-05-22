// src/BlogPostPage.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogPostPage = ({ title, date, content, author, coverImage }) => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Image src={coverImage} alt={title} className="img-fluid mb-4" />
          <h1>{title}</h1>
          <p className="text-muted">{date}</p>
          <p>{content}</p>
          <hr />
          <Row className="mt-4">
            <Col md={2}>
              <Image
                src={author.image}
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
