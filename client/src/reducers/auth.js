import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS: case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILURE: case AUTH_ERROR: case LOGIN_FAILURE: case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}