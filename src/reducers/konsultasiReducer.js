import { GET_QUESTION_KONSULTASI, LOADING_NEXT_QUESTION_KONSULTASI } from '../actions/types';

const initialState = {
    pertanyaan:[],
    loading: false
}


export default function (state = initialState, action) {
    switch (action.type) {
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