import React, { useState } from 'react';
import { Container, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavbarCollapse } from './NavbarCollapse';




export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <Container>
                <NavItem>
                    <Link to="/" className="navbar-brand" onClick={() => null}>DnD Cheatsheet</Link>
                </NavItem>
                <NavbarToggler className="navbar-toggler navbar-toggler-right" onClick={toggle}>
                    <FontAwesomeIcon icon="bars" />
                </NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <NavbarCollapse>
                        <NavItem className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </NavItem>
                        <NavItem className="nav-item">
                            <Link className="nav-link" to="register">Register</Link>
                        </NavItem>
                    </NavbarCollapse>
                </Collapse>
            </Container>
        </Nav>
    );
}
