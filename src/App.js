import './App.css';

import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useMediaQuery } from '@mui/material'

//server URL
const serverURL = "http://localhost:3000/"

function App() {

  //state variables
  let [thinScreen, setThinScreen] = useState(false)

  //screen size state
  const thinScreenBool = useMediaQuery('(max-width: 900px)')

  //cookies for login
  let cookieUser = Cookies.get('user')
  if(cookieUser){
    cookieUser = JSON.parse(cookieUser)
  }

  useEffect(()=>{
    console.log('App.js is mounted.')
    //screen size
    setThinScreen(thinScreenBool)
  })

  return (
    <div className="App">
      {/* Top hero/nav panel with sub-menu */}
      {/* List component and bulk of website */}
      {/* Small bottom panel: attributions, etc. */}
    </div>
  );
}

export default App;
