import axios from 'axios'
import  {showAlert } from './alert'
import { CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, GET_GITHUB_REPOS } from './types'

//get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({type: GET_PROFILE, payload: res.data})
    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile')
        dispatch({type: GET_PROFILES, payload: res.data})
    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//get profile by user ID
export const getProfileById = (user_id) => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get(`/api/profile/user/${user_id}`)
        dispatch({type: GET_PROFILE, payload: res.data})
    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//get github repos
export const getGithubRepos = (githubUsername) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${githubUsername}`)
        dispatch({type: GET_GITHUB_REPOS, payload: res.data})
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
        history.push('/dashboard')
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//add experience
export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData)
    try {
        const res = await axios.put('/api/profile/experience', body, config)
        dispatch({type: UPDATE_PROFILE, payload: res.data})
        dispatch(showAlert('Experience added.', 'success'))
        history.push('/dashboard')
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//add education
export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData)
    try {
        const res = await axios.put('/api/profile/education', body, config)
        dispatch({type: UPDATE_PROFILE, payload: res.data})
        dispatch(showAlert('Education added.', 'success'))
        history.push('/dashboard')
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//delete experience
export const deleteExperience = (exp_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`)
        dispatch({type: UPDATE_PROFILE, payload: res.data})
        dispatch(showAlert('Experience removed.', 'success'))

    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//delete education
export const deleteEducation = (edu_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${edu_id}`)
        dispatch({type: UPDATE_PROFILE, payload: res.data})
        dispatch(showAlert('Education removed.', 'success'))

    } catch(err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//delete account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account?')) {
        try {
            const res = await axios.delete('/api/profile/')
            dispatch({type: CLEAR_PROFILE, payload: res.data})
            dispatch({type: ACCOUNT_DELETED, payload: res.data})
            dispatch(showAlert('Your account has been permanently deleted.', 'success'))
        } catch(err) {
            dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
        }
    }
}