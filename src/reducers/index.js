import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import muridReducer from './muridReducer';
import rapotReducer from './rapotReducer';
import pertanyaanReducer from './pertanyaanReducer';
import jurusanReducer from './jurusanReducer';
import konsultasiReducer from './konsultasiReducer';

export default combineReducers({
    auth:authReducer,
    errors: errorReducer,
    murids:muridReducer,
    rapot:rapotReducer,
    pertanyaan:pertanyaanReducer,
    jurusan:jurusanReducer,
    konsultasi:konsultasiReducer,
  
});