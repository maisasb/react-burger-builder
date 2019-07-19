import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        
        let ingredients = {};
       
        for (let i in this.state.ingredients){            
            ingredients[i] = +query.get(i);            
        }

        let price = query.get('price');
        
        this.setState({ingredients: ingredients, totalPrice: price}, () => {
            console.log(this.state.ingredients);
        });
        
        
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.url + "/contact-data"} 
                    render={(props) => (<ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }

}

export default Checkout;