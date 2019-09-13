import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import interceptorsHandler from '../../hoc/interceptorsHandler/interceptorsHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

    componentDidMount(){
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders = this.props.orders.map((order) => {
           return  <Order key={order.id} 
                        price={order.price} 
                        ingredients={order.ingredients}/>
        });      

        return (
            <div>
                {orders}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(interceptorsHandler(Orders, axios));