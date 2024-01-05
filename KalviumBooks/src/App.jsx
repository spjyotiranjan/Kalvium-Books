import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import PageNotFound from './Components/PageNotFound'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
