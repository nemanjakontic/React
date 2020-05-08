import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span
                    style={{textTransform: 'capitalize'}}
                >{igKey}</span>:
                {props.ingredients[igKey]}
            </li>);
        });
    return (
        <>
            <h3>Your Order</h3>
            <p>A Delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Price:</strong> {props.price.toFixed(2)}</p>
            <p>Continue for Checkout?</p>
            <Button btnType="Danger" clicked={props.modalClosed}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </>
    );
};

export default OrderSummary;
