import React from 'react';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
export default function MainWrapper() {
    return <>
        <Container fluid>
    <NavBar></NavBar>
    <Outlet/>
        </Container>
    </>
}