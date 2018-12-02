import {  
    RAPOT_LIST,
    RAPOT_MURID_LOADING,
    GET_DATA_RAPOT_MURID 

} from '../actions/types';

const initialState = {
    murid: null,
    loading: false,
    rapotList:null,
    rapot: null,
    loadingImport:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA_RAPOT_MURID:
            return{
                ...state,
                loading:false,
                rapot:action.payload
            }
        case RAPOT_MURID_LOADING:
            return{
                ...state,
                loading:true
            }
        case RAPOT_LIST:
            return {
                ...state,
                rapotList:action.payload,
                loading: false
            }
      
    
        default:
            return state;
    }
}