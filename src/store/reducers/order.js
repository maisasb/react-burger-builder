import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    purchased: false
};

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
            
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
               
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                purchased: true
            });
           
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {});
            
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders});
            
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {});            
            //loading: false            
        default:
            return state;
    }
};

export default reducer;