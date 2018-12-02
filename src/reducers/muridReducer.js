import { GET_ALL_MURID, RAPOT_MURID_LOADING} from '../actions/types';

const initialState ={
    murids:null,
    loading:false
}

export default function(state = initialState,action ){
    switch(action.type){
        case GET_ALL_MURID:
            return{
                ...state,
                murids:action.payload,
                loading:false
            }
        case RAPOT_MURID_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state;
    }
}