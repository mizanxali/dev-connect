import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const showAlert = (msg, alertType) => dispatch => {
    const id = uuidv4()
    dispatch({type: SET_ALERT, payload: {msg, alertType, id}})

    //wait for 5 seconds and dispatch removealert
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), 5000)
}