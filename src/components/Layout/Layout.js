import React from "react";

import './Layout.css';

const Layout = props => (
    <>
        <div>Toolbar, SideDrawer, backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </>
);

export default Layout;
