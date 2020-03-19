import React from 'react';

export function NavbarCollapse(props: { children: React.ReactNode }) {
    return (
        <div className="navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ml-auto">
                {props.children}
            </ul>
        </div >
    );
}
