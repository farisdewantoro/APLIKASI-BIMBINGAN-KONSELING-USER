import { GET_QUESTION_KONSULTASI, LOADING_NEXT_QUESTION_KONSULTASI, GET_JAWABAN_KONSULTASI, RESET_JAWABAN_KONSULTASI } from '../actions/types';

const initialState = {
    pertanyaan:[],
    loading: false,
    historyJawaban:null
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JAWABAN_KONSULTASI:
            return{
                ...state,
                loading:false,
                historyJawaban:action.payload,

            }
        case RESET_JAWABAN_KONSULTASI:
            return{
                ...state,
                loading:false,
                historyJawaban:null,
                pertanyaan:[]
            }
        case LOADING_NEXT_QUESTION_KONSULTASI:
            return {
                ...state,
                loading: true
            }
        case GET_QUESTION_KONSULTASI:
            return {
                ...state,
                loading: false,
                pertanyaan: action.payload
            }
        default:
            return state;
    }
} 