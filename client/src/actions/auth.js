import axios from 'axios'
import { showAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR } from '../actions/types'
import setAuthToken from '../utils/setAuthToken'

//load user
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({type: USER_LOADED, payload: res.data})
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: AUTH_ERROR})
    }
}

//register user
export const registerUser = (userData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(userData)
    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({type: REGISTER_SUCCESS, payload: res.data})

    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: REGISTER_FAILURE})
    }
}