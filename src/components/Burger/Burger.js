import React from "react";

import './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>;
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients.length === 0 ? 'Please Start Adding Ingredients' : transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
