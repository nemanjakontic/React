import React, {Component} from "react";

import './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawetClosedHandler= () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    }

    toggleMenu = () => {
        if(this.state.showSideDrawer) {
            this.sideDrawetClosedHandler();
        } else {
            this.sideDrawerOpenedHandler();
        }
    }

    render() {
        return (
            <>
                <Toolbar toggle={this.toggleMenu}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawetClosedHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </>
        );
    };
}

export default Layout;
