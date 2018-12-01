import isEmpty from '../validation/is-empty';
import { SET_CURRENT_ADMIN, LOGIN_ADMIN_LOADING,LOGIN_ADMIN_LOADING_STOP} from '../actions/types';
const initialState ={
    isAuthenticated:false,
    admin:{},
    loading:false,
}

export default function(state = initialState,action){
    switch(action.type){
        case LOGIN_ADMIN_LOADING:
            return {
                ...state,
                loading:true
            }
        case LOGIN_ADMIN_LOADING_STOP:
            return{
                ...state,
                loading:false
            }
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                admin:action.payload,
                loading:false
            }
        default:
            return state;
    }
}