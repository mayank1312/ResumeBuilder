import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import UserProvider from './context/UserContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EditResume from './components/EditResume.jsx'

function App() {
  return (
   <UserProvider>
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/resume/:resumeId" element={<EditResume/>}/>
    </Routes>
   </UserProvider>
  )
}

export default App