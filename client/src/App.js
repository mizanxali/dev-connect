import { Route, Switch } from 'react-router-dom' 
import './App.css'
import Login from './components/layout/auth/Login'
import Register from './components/layout/auth/Register'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Route path='/' exact component={Landing} />
      <section className="container">
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </section>
    </div>
  )
}

export default App
