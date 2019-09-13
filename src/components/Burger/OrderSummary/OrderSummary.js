import React, { Component } from 'react';
import Content from '../../../hoc/Content/Content';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        //console.log("OrderSummary update");
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                        <span 
                            style={{textTransform: 'capitalize'}}>{igKey}
                        </span>: {this.props.ingredients[igKey]}
                    </li>);
        });

        return (
            <Content>
                <h3>Your Order</h3>
                <p> A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Content>
        );
    }

};

export default OrderSummary;