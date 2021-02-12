import axios from 'axios'
import  {showAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types'

//get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({type: GET_PROFILE, payload: res.data})
    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//create/update profile
export const setProfile = (formData, history, edit=false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/profile', body, config)
        dispatch({type: GET_PROFILE, payload: res.data})

        dispatch(showAlert(edit ? 'Profile updated.' : 'Profile created', 'success'))

        // if(!edit) {
            history.push('/dashboard')
        // }

    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}