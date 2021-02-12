import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom' 
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import setAuthToken from './utils/setAuthToken'
import store from './store'
import { loadUser } from './actions/auth'
import axios from 'axios'

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
      <Route path='/' exact component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </section>
    </div>
  )
}

export default App
