import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, replace, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from "./pages/Login/Login"
import Dashboard from './pages/Dashboard/Dashboard'
import Link from './pages/Link/Link'
import Analytics from "./pages/Analytics/Analytics"
import Setting from "./pages/Setting/Setting"


function App() {
  const [count, setCount] = useState(0)

  const DefaultRoute = () => {
    const isLoggedIn = localStorage.getItem("token");   
  
    return isLoggedIn ? <Navigate to={`/dashboard/${localStorage.getItem("userId")}`} replace /> : <Navigate to="/login" replace />;
  };
  useEffect(() => {
    if(!localStorage.getItem("token")){
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("name")
    }
  },[])

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DefaultRoute/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard/:id' element={<Dashboard/>}/>
      <Route path='/link/:id' element={<Link/>}/>
      <Route path='/analytics/:id' element={<Analytics/>} />
      <Route path='/setting/:id' element={<Setting/>}/>
    </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App
