import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import interceptorsHandler from '../../../hoc/interceptorsHandler/interceptorsHandler';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {

    state = {
       orderForm: {        
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                messageError: ''
            },            
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                messageError: ''
            }, 
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                messageError: ''
            }, 
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                messageError: ''
            },             
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                messageError: ''
            },      
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid:true,
                validation: {}
            }
       },
       formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price  ,
            orderData: formData,
            userId: this.props.userId      
        }

        this.props.onOrderBurger(order, this.props.token);
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //Clonei o objecto orderForm        
        //Clonei o objeto que eu quero alterar, exemplo "name"
        //Se fosse alterar as configurações do elemento "name" teria que clonar inclusive o elementConfig

        const formElement =  this.state.orderForm[inputIdentifier];
        
        const validation = checkValidity(event.target.value, formElement.validation);
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: validation.isValid,
            message:validation.message,
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid= true;
        for (let inputIdentifier in updatedOrderForm){
            if (!updatedOrderForm[inputIdentifier].valid){
                formIsValid = false;
                break;
            }            
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((element) => {
                    return <Input 
                        key={element.id}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} 
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        message={element.config.message}/>
                })}    
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        )

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(interceptorsHandler(ContactData, axios));