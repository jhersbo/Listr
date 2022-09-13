import './FontImports.css'
import './sassStyles/sassStyles.scss'
import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useMediaQuery } from '@mui/material'

//components
import ListArea from './components/ListArea';
import LoginReg from './components/LoginReg';
import Footer from './components/Footer';
import HeroNav from './components/HeroNav';
import CreateList from './components/CreateList';

//server URL
const serverURL = "http://localhost:3000/"

//local address
const clientURL = "http://localhost:3001/"

function App() {

  let cookieUser = Cookies.get('user')
  if(cookieUser){
    // Cookies.set('user', undefined)
    cookieUser = JSON.parse(cookieUser)
  }

  // Cookies.expire('active')
  
  let cookieActiveList = Cookies.get('active')
  if(cookieActiveList){
      cookieActiveList = JSON.parse(cookieActiveList)
  }
  let [activeList, setActiveList] = useState(cookieActiveList)

  //app-wide state variables
  let [thinScreen, setThinScreen] = useState(false)
  let [user, setUser] = useState(cookieUser)
  let [userDB, setUserDB] = useState('')
  let [listDB, setListDB] = useState(null)
  let [windowAddress, setWindowAddress] = useState(null)

  //user-specific states
  let [userListDB, setUserListDB] = useState(null)
  let [noLists, setNoLists] = useState(false)
  
  
  //screen size state
  const thinScreenBool = useMediaQuery('(max-width: 900px)')

  useEffect(()=>{
    console.log('App.js is mounted.')
    const fetchUserDB = async ()=>{
      let response = await fetch(serverURL + "users")
      let rData = await response.json()
      setUserDB(rData)
    }

    const fetchListDB = async ()=>{
      let response = await fetch (serverURL + "lists")
      let rData = await response.json()
      setListDB(rData)
      console.log(listDB)
    }
    fetchUserDB()
    fetchListDB()
    //screen size
    setThinScreen(thinScreenBool)
    setWindowAddress(window.location.href)
  },[thinScreenBool, user, activeList])


  
  return (
    <div className="App">
      <Router>
        <HeroNav thinScreen={thinScreen} user={user} setUser={setUser}></HeroNav>
        <Routes>
          <Route path='/' element={
            <ListArea thinScreen={thinScreen} user={user} setUser={setUser} userDB={userDB} listDB={listDB} setListDB={setListDB} userListDB={userListDB} setUserListDB={setUserListDB} noLists={noLists} setNoLists={setNoLists} activeList={activeList} setActiveList={setActiveList}></ListArea>
            }>
          </Route>
          <Route path='/create' element={
            <CreateList></CreateList>
          }></Route>
          <Route path='/user' element={
          <LoginReg thinScreen={thinScreen} user={user} setUser={setUser} userDB={userDB} setUserDB={setUserDB} activeList={activeList} setActiveList={setActiveList}></LoginReg>
          }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
