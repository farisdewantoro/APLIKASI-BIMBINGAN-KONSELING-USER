import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_ADMIN, LOGIN_ADMIN_LOADING, LOGIN_ADMIN_LOADING_STOP } from './types';

// Login - Get Admin Token


export const loginAdmin = adminData => dispatch => {
    dispatch(setLoginLoading());
    axios.post('/api/admin/login', adminData)
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
            dispatch(setCurrentAdmin(decoded));
        })
        .catch(err => {
            dispatch(setLoginLoadingStop());
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// LOGIN ADMIN LOADING
export const setLoginLoading = () => {
    return {
        type: LOGIN_ADMIN_LOADING
    }
}

// LOGIN ADMIN LOADING STOP
export const setLoginLoadingStop = () => {
    return {
        type: LOGIN_ADMIN_LOADING_STOP
    }
}



// Set logged in admin
export const setCurrentAdmin = (decoded) => {
    return {
        type: SET_CURRENT_ADMIN,
        payload: decoded
    }
}


// Logout admin
export const logoutAdmin = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth Header for future request
    setAuthToken(false);
    // Set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}));
}