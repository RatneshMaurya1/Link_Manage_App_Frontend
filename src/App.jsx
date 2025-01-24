import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from "./pages/Login/Login"
import Dashboard from './pages/Dashboard/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  const DefaultRoute = () => {
    const isLoggedIn = localStorage.getItem("token");   
  
    return isLoggedIn ? <Navigate to={`/dashboard/${localStorage.getItem("userId")}`} replace /> : <Navigate to="/landing" replace />;
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DefaultRoute/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard/:id' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App
