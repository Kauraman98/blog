import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user-context';
import { getCurrentuserAllBlogs } from '../services/author-blog-service';
import { set } from 'firebase/database';
import { Container } from 'react-bootstrap';
import BlogRow from '../components/blog-row';
import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    // read query params called filter from react-router-dom assign default value to published
    const [filter, setFilter] = useState('published');
    const [isLoading, setIsLoading] = useState(false);


    const user = useContext(UserContext) || {};

    useEffect(() => {
        if (user.uid) {
            setIsLoading(true);
            getCurrentuserAllBlogs(user.uid, filter).then((blogs) => {
                setBlogs(blogs);
                setIsLoading(false);
            });
        }
    }, [user.uid, filter]);



    return (
        <Container >
            <Row xs={12} >
                <Col md={{ offset: 3, span: 6 }} xs={12}>
                    <Row>
                        <Col>
                            <h2>My Blogs</h2>

                        </Col>

                    </Row>

                    <Row>

                        <Col xs={12}>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={filter}
                                onSelect={(k) => setFilter(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="published" title="Published">

                                </Tab>
                                <Tab eventKey="draft" title="Draft">

                                </Tab>
                                <Tab eventKey="archived" title="Archived">

                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {isLoading && <h1>Loading...</h1>}
                            {!isLoading && blogs.length === 0 && <div><h2>No blogs found</h2> <p><Link to="/create-blog">Please create blogs !</Link></p></div>}
                        </Col>
                    </Row>
                    {!isLoading && blogs.map((blog) => {
                        return (
                            <BlogRow key={blog.id} blog={blog} />
                        );
                    })}
                </Col>
            </Row>
        </Container>

    );

}