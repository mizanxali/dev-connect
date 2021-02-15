import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom' 
import './App.css'

import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'

import setAuthToken from './utils/setAuthToken'
import store from './store'
import { loadUser } from './actions/auth'
import Routes from './components/Routing/Routes'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  //runs once when component is mounted
  useEffect(async () => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/' exact component={Landing} />
        <Routes />
      </Switch>
    </div>
  )
}

export default App
