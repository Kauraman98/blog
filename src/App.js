//import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"; 

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Home from './home/home';
import { Todo } from './todo/todo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './components/navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './components/main-wrapper';
import Blog from './blog/blog';
import Author from './author/author';

var list = [3,5,3,6,  {name: "asd", age: 78}, {name: "abc", age:89}];

// creatng object
var user = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  age: 67,

  //nested object
  address: {
    city: "New york",
    country: "USA",
    pincode: 57696
  }
}

user.name = "hello there"

//user.address.city


const router = createBrowserRouter(
  [
    {
      path: "/todo",
      element: <Todo/>
    },
    {
      path: '/',
      element: <MainWrapper
      />,
      children: [
        {
          path: "/signup",
          element: <SignUpForm></SignUpForm>
    
        },
    
        {
          path: "/signin",
          element: <SignInForm/>
        },
        {path: "/blog", element: <Blog/>},
        {path:'/author',element: <Author/>},

        {path: "", element:<Home/>}
       
      ]
    }
  ]

);


function App() {
  return (
    <RouterProvider router={router}>

   
    </RouterProvider>

  );
}






export default App;
