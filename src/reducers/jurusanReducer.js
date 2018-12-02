import { LOADING_JURUSAN, GET_ALL_JURUSAN,DELETE_JURUSAN,GET_JURUSAN} from '../actions/types';

const initialState ={
    jurusans:[],
    loading:null
}


export default function (state = initialState,action){
    switch(action.type){
        case LOADING_JURUSAN:
            return{
                ...state,
                loading:true,
                jurusans:[]
            }
        case DELETE_JURUSAN:
            return{
                ...state,
                loading:false,
                jurusans:action.payload
            }
        case GET_ALL_JURUSAN:
            return{
                ...state,
                loading:false,
                jurusans:action.payload
            }
        case GET_JURUSAN:
            return{
                ...state,
                loading:false,
                jurusans:action.payload
            }
        default:
            return state;
    }
} 