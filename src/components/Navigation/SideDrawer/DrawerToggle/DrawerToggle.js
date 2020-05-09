import React from "react";

import './DrawerToggle.css';

const DrawerToggle = props => (
    <div onClick={props.toggle} className="DrawerToggle">
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;
