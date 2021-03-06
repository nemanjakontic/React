import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import './SideDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
    let attachedClasses = ["SideDrawer", "Close"];
    if(props.show) {
        attachedClasses = ["SideDrawer", "Open"];
    }
    return (
        <>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;
