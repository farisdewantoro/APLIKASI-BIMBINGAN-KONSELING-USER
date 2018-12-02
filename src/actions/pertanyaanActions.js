import axios from 'axios';
import { GET_LAST_KODEPERTANYAAN, LOADING_CREATE_PERTANYAAN, SET_NEW_PERTANYAAN, GET_PERTANYAAN, GET_ALL_PERTANYAAN, DELETE_PERTANYAAN} from './types';
import { URL_API} from '../keys/config';
export const getLastCode = () => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.get(URL_API+'/api/konsultasi/pertanyaan/lastkode')
        .then(res=>{
            disbatch({
                type: GET_LAST_KODEPERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response)
        });
}

export const deletePertanyaan = (data) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.delete('/api/konsultasi/pertanyaan/delete/'+data)
        .then(res=>{
            disbatch({
                type:DELETE_PERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}


export const setNewPertanyaan = (dataPertanyaan,history) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.post('/api/konsultasi/pertanyaan/create',dataPertanyaan)
        .then(res=>{
            disbatch({
                type: SET_NEW_PERTANYAAN
            });
            history.push('/pertanyaan/list');
        });
}

export const getAllPertanyaan = () => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.get(URL_API +'/api/konsultasi/pertanyaan')
        .then(res=>{
            disbatch({
                type: GET_ALL_PERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        });
}

export const getPertanyaan = (kodeSoal) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.get(URL_API +'/api/konsultasi/pertanyaan/edit/'+kodeSoal)
        .then(res=>{
            disbatch({
                type: GET_PERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data);
        });
}



export const loadingPertanyaan = () =>{
    return {
        type: LOADING_CREATE_PERTANYAAN
    }
}
