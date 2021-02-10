import { Route, Switch } from 'react-router-dom' 
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'

const App = () => {
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
