import { useEffect, useState } from 'react'
import './App.css'
import CategoryBar from './Components/CategoryBar/CategoryBar'
import axios from 'axios';
import Home from './Components/Home/Home.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
 

  return <>
   <Home/>
    <Toaster position="top-right" reverseOrder={false} />
  </>
}

export default App

