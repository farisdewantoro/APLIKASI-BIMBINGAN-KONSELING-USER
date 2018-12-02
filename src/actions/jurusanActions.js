import axios from 'axios';
import { LOADING_JURUSAN, GET_ALL_JURUSAN,DELETE_JURUSAN,GET_JURUSAN} from './types';
import { loadingPertanyaan, getAllPertanyaan} from './pertanyaanActions';
import { URL_API } from '../keys/config';
export const setNewJurusan = (dataJurusan,history) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.post('/api/konsultasi/jurusan/create',dataJurusan)
        .then(res=>{
            history.push('/jurusan');
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.response.data);
        });
};

export const deleteJurusan = (id) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.delete('/api/konsultasi/jurusan/delete/'+id)
        .then(res=>{
            disbatch({
                type:DELETE_JURUSAN,
                payload:res.data
            });
            disbatch(getAllPertanyaan());
        })
        .catch(err=>{
            console.log(err.response.data)
        });
}

export const getAllJurusan = () => disbatch =>{
    disbatch(loadingJurusan());
    axios.get(URL_API +'/api/konsultasi/jurusan')
        .then(res=>{
            disbatch({
                type:GET_ALL_JURUSAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        });
}

export const getJurusan = (_id) => disbatch =>{
    disbatch(loadingJurusan());
    axios.get(URL_API +'/api/konsultasi/jurusan/edit/'+_id)
        .then(res=>{
            disbatch({
                type:GET_JURUSAN,
                payload:res.data
            });
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}


export const loadingJurusan = () => {
    return {
        type: LOADING_JURUSAN
    }
}


