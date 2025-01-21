import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PagenotFound from './pages/PagenotFound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './Context/ContextShare'

function App() {

  const {loginResponse} = useContext(loginResponseContext)

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Projects' element={loginResponse? <Projects/> :<PagenotFound/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/Register' element={<Auth register={true} />} />
      <Route path='/Dashboard' element={loginResponse ? <Dashboard/> : <PagenotFound/>} />
      <Route path='*' element={<PagenotFound/>} />
    </Routes>
    <Footer/>

    </>
  )
}

export default App
