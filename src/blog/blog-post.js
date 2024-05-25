// src/BlogPostPage.js
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthor } from '../components/useAuthor';

const BlogPostPage = ({ title, updatedOn, content, authorId, photourl }) => {

  const author = useAuthor(authorId);
  console.log("author", author);
  const contentRef = useRef();
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  //format date in format mmm dd, yyyy
  const _updatedOn = updatedOn && new Date(updatedOn);

  const updatedOnDate = _updatedOn && _updatedOn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>{title}</h1>
          <Row className="mt-1 border-bottom mt-4 mb-4 align-items-end pb-2">
            <Col md={1}>
              <Image
                src={author.photourl}
                alt={author.name}
                roundedCircle
                fluid
                style={{ width: '50px', height: 50 }}
              />
            </Col>
            <Col md={10}>
              <p className="text-muted m-0"><Link className='app-link' to={`/author/${authorId}`}>{author.name} </Link></p>
              <p className="text-muted m-0">{updatedOnDate}</p>

            </Col>
          </Row>
          <Image src={photourl || "/blog-cover.jpg"} style={{ maxHeight: 350, width: '100%' }} height={500} fluid alt={title} className="img-fluid mb-4" />
          <div ref={contentRef}>{content}</div>
          <hr />

        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostPage;
