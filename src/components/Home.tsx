import React from 'react'
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();

    const handleNavigate = () => {
    navigate("/register")
    }

  return (
    <div>
        <span></span>Welcome to the Home Page
        <button onClick={handleNavigate}>Get started</button></div>
  )
}

export default Home