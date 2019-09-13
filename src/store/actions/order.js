import * as actionTypes from './actionTypes';
//import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
    //thunk
    /*
    return dispatch => {        
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            //this.props.history.push('/');
        }).catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    }
    */
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        errpr: error
    }
};

export const fetchOrders = (token, userId) => {
    return{
        type:actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
    //thunk
    /*
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' + queryParams)
        .then(res => {
            let fetchedOrders = [];                
            for (let id in res.data){                    
                fetchedOrders.push({
                    ...res.data[id],
                    id: id
                });    
            }
            dispatch(fetchOrdersSucess(fetchedOrders));            
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err))
        });
    }
    */
}