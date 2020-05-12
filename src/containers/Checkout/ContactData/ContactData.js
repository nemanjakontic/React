import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";

import axios from '../../../axios-orders';
import Spinner from "react-bootstrap/Spinner";

import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandle = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nemanja Kontic',
                address: {
                    street: 'Resnicki put 9g',
                    zipCode: '11194',
                    country: 'Serbia'
                },
                email: 'nemanja.kontic28@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
            this.setState({loading: false});
        });
    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your name"/>
                <input className="Input"  type="email" name="email" placeholder="Your email"/>
                <input className="Input"  type="text" name="street" placeholder="Your street"/>
                <input className="Input"  type="text" name="postal" placeholder="Your postal code"/>
                <Button btnType="Success" clicked={this.orderHandle}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>;
        }
        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
