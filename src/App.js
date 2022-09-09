import './App.css';
import './FontImports.css'
import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useMediaQuery } from '@mui/material'

//components
import ListPanel from './components/ListPanel';
import LoginReg from './components/LoginReg';
import Footer from './components/Footer';
import HeroNav from './components/HeroNav';

//server URL
const serverURL = "http://localhost:3000/"

function App() {

  let cookieUser = Cookies.get('user')
  if(cookieUser){
    // Cookies.set('user', undefined)
    cookieUser = JSON.parse(cookieUser)
  }
  //state variables
  let [thinScreen, setThinScreen] = useState(false)
  let [user, setUser] = useState(cookieUser)
  let [userDB, setUserDB] = useState('')
  let [listDB, setListDB] = useState('')
  
  //screen size state
  const thinScreenBool = useMediaQuery('(max-width: 900px)')

  useEffect(()=>{
    console.log('App.js is mounted.')
    const fetchUserDB = async ()=>{
      let response = await fetch(serverURL + "users")
      let rData = await response.json()
      setUserDB(rData)
    }

    //depricated
    const fetchListDB = async ()=>{
      let response = await fetch (serverURL + "lists")
      let rData = await response.json()
      console.log(rData)
      let parsed = rData.map((element) => element.list_arr)
      let jsParsed = parsed.map(element => JSON.parse(element))
      console.log(parsed)
      console.log(jsParsed)
      setListDB(rData)
    }
    fetchUserDB()
    fetchListDB()
    //screen size
    setThinScreen(thinScreenBool)
  },[thinScreenBool, user])


  return (
    <div className="App">
      <Router>
        <HeroNav thinScreen={thinScreen} user={user} setUser={setUser}></HeroNav>
        <Routes>
          <Route path='/' element={<ListPanel thinScreen={thinScreen} user={user} setUser={setUser} listDB={listDB} ></ListPanel>}></Route>
          <Route path='/user' element={<LoginReg thinScreen={thinScreen} user={user} setUser={setUser} userDB={userDB} setUserDB={setUserDB}></LoginReg>}></Route>
        </Routes>
        <Footer thinScreen={thinScreen}></Footer>
      </Router>
    </div>
  );
}

export default App;
