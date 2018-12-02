import axios from 'axios';
import { RAPOT_LIST, RAPOT_MURID_LOADING, GET_DATA_RAPOT_MURID } from './types';
import { URL_API } from '../keys/config';

export const getRapotList = (idMurid) => disbatch=>{
    disbatch(rapotMuridLoading());
    axios.get(URL_API+'/api/rapots/get/'+idMurid)
        .then(res=>{
            disbatch({
                type:RAPOT_LIST,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}

export const getDataRapotMurid = (nis, kelas, semester) => disbatch => {
    disbatch(rapotMuridLoading());
    axios.get(`${URL_API}/api/rapots/show/${nis}/${kelas}/${semester}`)
        .then(res => {
            disbatch({
                type: GET_DATA_RAPOT_MURID,
                payload: res.data
            })
        })
}



export const rapotMuridLoading =()=>{
    return{
        type:RAPOT_MURID_LOADING
    }
}