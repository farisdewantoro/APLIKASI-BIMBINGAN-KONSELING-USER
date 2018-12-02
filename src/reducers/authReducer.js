import isEmpty from '../validation/is-empty';
import { SET_CURRENT_MURID, LOGIN_MURID_LOADING,LOGIN_MURID_LOADING_STOP} from '../actions/types';
const initialState ={
    isAuthenticated:false,
    murid:{},
    loading:false,
}

export default function(state = initialState,action){
    switch(action.type){
        case LOGIN_MURID_LOADING:
            return {
                ...state,
                loading:true
            }
        case LOGIN_MURID_LOADING_STOP:
            return{
                ...state,
                loading:false
            }
        case SET_CURRENT_MURID:
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                murid:action.payload,
                loading:false
            }
        default:
            return state;
    }
}