import axios from 'axios';
import {  GET_QUESTION_KONSULTASI, LOADING_NEXT_QUESTION_KONSULTASI,GET_JAWABAN_KONSULTASI, RESET_JAWABAN_KONSULTASI} from './types';
import { URL_API } from '../keys/config';

export const getJawabanKonsultasi = (id)=>disbatch=>{
    disbatch(loadingKonsultasi());
    axios.get(URL_API+'/api/jawabans/get/'+id)
    .then(res=>{
        disbatch({
            type: GET_JAWABAN_KONSULTASI,
            payload:res.data
        })
    })
    .catch(err=>{
        console.log(err.response.data);
    })
}

export const resetJawabanKonsultasi = (id) =>disbatch=>{
    disbatch(loadingKonsultasi());
    axios.delete(URL_API+'/api/jawabans/reset/'+id)
        .then(res=>{
            window.location = "/konsultasi";

      
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}


export const getQuestionKonsultasi = (jawabanUser) =>disbatch=>{

    disbatch(loadingKonsultasi());
    axios.post(URL_API +'/api/konsultasi/jawaban/konsul',jawabanUser) 
        .then(res=>{
            disbatch({
                type:GET_QUESTION_KONSULTASI,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        })
}

export const saveHasilKonsultasi = (hasilAkhir) => disbatch => {
    axios.post(URL_API+'/api/konsultasi/hasil/submit', hasilAkhir)
        .then(res => {
            window.location.href = "/konsultasi";
        })
        .catch(err => {
            console.log(err.response.data);
        })
}


export const loadingKonsultasi = () =>{
    return{
        type:LOADING_NEXT_QUESTION_KONSULTASI
    }
}