import React, {Component} from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler';
import Spinner from "react-bootstrap/Spinner";

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://reactfullcourse.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => { this.setState({error: true}) });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if(this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                modalClosed={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
        }



        let burger =this.state.error ? <p>Ingredients can not be loaded!</p> :
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>;


        if(this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </>
            );
        }

        if (this.state.loading) {
            orderSummary = (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
