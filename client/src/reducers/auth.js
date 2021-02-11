import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILURE:
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