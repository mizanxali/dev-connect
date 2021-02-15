import React from 'react'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import { Route, Switch } from 'react-router-dom'

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact component={Login} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/create-profile' exact component={CreateProfile} />
                <Route path='/edit-profile' exact component={EditProfile} />
                <Route path='/add-experience' exact component={AddExperience} />
                <Route path='/add-education' exact component={AddEducation} />
                <Route path='/profiles' exact component={Profiles} />
                <Route path='/profile/:id' exact component={Profile} />
                <Route path='/posts' exact component={Posts} />
                <Route path='/post/:id' exact component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes
