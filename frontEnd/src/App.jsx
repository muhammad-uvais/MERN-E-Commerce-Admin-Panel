import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import AddProducts from './Components/AddProducts'
import UpdateProducts from './Components/UpdateProducts'
import Logout from './Components/Logout'
import Profile from './Components/Profile'
import SignUp from './Components/SignUp'
import Private from './Components/Private'
import SignIn from './Components/SignIn'
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Private />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/add' element={<AddProducts />}></Route>
            <Route path='/update/:id' element={<UpdateProducts />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
          </Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App