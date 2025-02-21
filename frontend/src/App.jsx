import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div data-theme={theme}>

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>

      </Routes>

      <Toaster />
    </div>
  )
}

export default App