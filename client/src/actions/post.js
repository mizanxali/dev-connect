import axios from 'axios'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from './types'
import  {showAlert } from './alert'

//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({type: GET_POSTS, payload: res.data})
    } catch(err) {
        dispatch({type: POST_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//like post
export const likePost = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/${post_id}/likes`)
        dispatch({type: UPDATE_LIKES, payload: {id: post_id, likes: res.data}})
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: POST_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//unlike post
export const unlikePost = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/${post_id}/unlike`)
        dispatch({type: UPDATE_LIKES, payload: {id: post_id, likes: res.data}})
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: POST_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//delete post
export const deletePost = (post_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}`)
        dispatch({type: DELETE_POST, payload: {id: post_id}})
        dispatch(showAlert('Post removed.', 'success'))
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: POST_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

//add post
export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/posts', body, config)
        dispatch({type: ADD_POST, payload: res.data})
        dispatch(showAlert('Post added.', 'success'))
    } catch(err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(showAlert(error.msg, 'danger')))
        }

        dispatch({type: POST_ERROR, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}