import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route , Link} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AddListings from './pages/AddListings'
import Home from './pages/Home'

import MyNavbar from './components/Navbar'

function App() {


  return (
    <>
    <MyNavbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/add-listings' element={<AddListings>Add your books lists</AddListings>} />
     </Routes>
    </>
  )
}

export default App
