import {React,useState} from 'react'
import Navbar from './components/navbar/navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Book from './pages/Book/Book'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Placeitem from './components/Placeitem/Placeitem'
import Mybooking from './pages/Mybooking/Mybooking'
import Verify from './pages/Verify/Verify'




const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
  <>
  {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
    <Route path='/' element ={<Home/>}/>
    <Route path='/cart' element ={<Cart/>}/>
    <Route path='/book' element ={<Book/>}/>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/mybookings' element={<Mybooking/>}/>
    
  
    

    </Routes>
      
    </div>
    <Footer/>
  </>
  )
}

export default App
