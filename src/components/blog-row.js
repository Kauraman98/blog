
import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

export default function BlogRow({ blog }) {
    const navigate = useNavigate();
    return (
        <Row className='blog-row pb-3 pt-3' onClick={e => navigate(`/edit-blog/${blog.id}`)}>
            <Col xs={2} className='m-0 p-0'>
                <Image src={blog.photourl} width={200} height={200} rounded />
            </Col>
            <Col xs={10}>
                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>
            </Col>
        </Row>
    );

};