import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
    return (
        <Router>
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" component={BurgerBuilder} exact/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
