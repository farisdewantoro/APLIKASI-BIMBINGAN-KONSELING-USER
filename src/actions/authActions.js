import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { URL_API} from '../keys/config';
import { GET_ERRORS, SET_CURRENT_MURID, LOGIN_MURID_LOADING, LOGIN_MURID_LOADING_STOP } from './types';

// Login - Get MURID Token


export const loginMurid = muridData => dispatch => {
    
    dispatch(setLoginLoading());
    axios.post(URL_API + '/api/murids/login', muridData)
        .then(res => {
            // Save to localstorage
            const { token } = res.data;
            // set token to localstorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentMurid(decoded));
        })
        .catch(err => {
            dispatch(setLoginLoadingStop());
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// LOGIN MURID LOADING
export const setLoginLoading = () => {
    return {
        type: LOGIN_MURID_LOADING
    }
}

// LOGIN MURID LOADING STOP
export const setLoginLoadingStop = () => {
    return {
        type: LOGIN_MURID_LOADING_STOP
    }
}



// Set logged in MURID
export const setCurrentMurid = (decoded) => {
    return {
        type: SET_CURRENT_MURID,
        payload: decoded
    }
}


// Logout MURID
export const logoutMurid = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth Header for future request
    setAuthToken(false);
    // Set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentMurid({}));
}