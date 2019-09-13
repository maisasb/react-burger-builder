import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action){
    
    try{
        const response = yield axios.post('/orders.json?auth=' + 
            action.token, 
            action.orderData);
        yield put(actions.purchaseBurgerSuccess(
            response.data.name, 
            action.orderData));
            //this.props.history.push('/');
     
    }catch(error){
        yield put(actions.purchaseBurgerFail(error));
    };
    
}

export function* fetchOrdersSaga(action){
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try{
        const response = yield axios.get('orders.json' + queryParams);
        let fetchedOrders = [];                
        for (let id in response.data){                    
            fetchedOrders.push({
                ...response.data[id],
                id: id
            });    
        }
        yield put(actions.fetchOrdersSucess(fetchedOrders));            
    }catch(err){
        yield put(actions.fetchOrdersFail(err))
    };
}