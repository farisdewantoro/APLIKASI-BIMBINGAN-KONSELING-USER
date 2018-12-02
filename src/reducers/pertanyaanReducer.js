import { GET_LAST_KODEPERTANYAAN, LOADING_CREATE_PERTANYAAN, SET_NEW_PERTANYAAN, GET_PERTANYAAN, GET_ALL_PERTANYAAN, DELETE_PERTANYAAN } from '../actions/types';

const initialState={
    lastPertanyaan:null,
    loading:false,
    pertanyaan:null
}


export default function(state = initialState, action){
    switch (action.type){
        case LOADING_CREATE_PERTANYAAN:
            return{
                ...state,
                loading:true,
                pertanyaan: null
            }
        case SET_NEW_PERTANYAAN:
            return{
                ...state,
                loading:false
            }
        case GET_PERTANYAAN:
            return{
                ...state,
                loading:false,
                pertanyaan:action.payload
            }
        case DELETE_PERTANYAAN:
            return{
                ...state,
                loading:false,
                pertanyaan:action.payload
            }
        case GET_ALL_PERTANYAAN:
            return{
                ...state,
                loading:false,
                pertanyaan:action.payload
            }
        case GET_LAST_KODEPERTANYAAN:
            return{
                ...state,
                lastPertanyaan:action.payload,
                loading:false,
                pertanyaan: null
            }
        default:
            return state;
    }

} 