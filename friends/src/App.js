import React, { useEffect, useState } from 'react'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Login from './components/Login' 

import './App.css'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if(window.localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  }, [])

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <div className='App'>
          {isLoggedIn ?
          <nav>
          <Link to='/friends'>Friends</Link>
          <Link to='/login' onClick={logout}>Logout</Link>
          </nav>
          : <nav><Link to='/login'>Login</Link></nav>
          }
        <Switch>
          <Route path='/login' render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}/>
          <PrivateRoute exact path='/friends' component={FriendsList} />
          <Route component={Login}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}