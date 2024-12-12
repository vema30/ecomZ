import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Cart from './components/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile  from './components/Profile';
import {  Routes, Route } from "react-router-dom";
import ChangePassword from './components/ChangePassword';

const App = () => {
  return (
    <div className=' text-white'>
        <Navbar/>
       
        <Routes>
        <Route path='/' element={<p>home</p>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
       
        <Route path='/changepassword' element={<ChangePassword/>}></Route>
        </Routes>
    </div>
  )
}

export default App
