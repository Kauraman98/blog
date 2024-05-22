import React from 'react';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
export default function MainWrapper() {
    return <>
    <NavBar></NavBar>
    <Outlet/>
    </>
}