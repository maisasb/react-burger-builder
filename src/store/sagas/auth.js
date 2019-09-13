import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

//Generator - funções que podem executar incremental
export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANkqotr9IEvalfpfmMvlMS09IqyepPb4o';
    if (!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANkqotr9IEvalfpfmMvlMS09IqyepPb4o';
    }
    try{
    
        const response = yield axios.post(url, authData);
                    
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);                
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSucess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }catch(err){            
        yield put(actions.authFail(err.response.data.error));
    }

}

export function* authCheckStateSaga(action){

    const token = yield localStorage.getItem('token');
    if (!token){
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()){
            yield put(actions.logout());
        }else{
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSucess(token,userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        }            
    }
    
}