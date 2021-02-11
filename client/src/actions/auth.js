import axios from 'axios'
import { showAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAILURE, SET_ALERT } from '../actions/types'


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