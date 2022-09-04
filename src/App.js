import './App.css';

import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useMediaQuery } from '@mui/material'
import HeroNav from './components/HeroNav';

//components
import ListPanel from './components/ListPanel';
import LoginReg from './components/LoginReg';

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
    // const fetchUserDB = async ()=>{
    //   let response = await fetch(serverURL + "users")
    // }
    // const fetchUserItems = async ()=>{
    //   let userID = cookieUser.user_id
    //   let response = await fetch (serverURL + "items" + userID)
    // }
    //screen size
    setThinScreen(thinScreenBool)
  })


  return (
    <div className="App">
      <Router>
        <HeroNav></HeroNav>
        <Routes>
          <Route path='/' element={<ListPanel></ListPanel>}></Route>
          <Route path='/user' element={<LoginReg></LoginReg>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
