import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import profile from './profile'

export default combineReducers({
    alert: alert,
    auth: auth,
    profile: profile
})