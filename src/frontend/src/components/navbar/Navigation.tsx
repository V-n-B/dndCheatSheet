import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavbarToggler, NavItem, UncontrolledDropdown } from 'reactstrap';
import { useAuth } from '../../auth/useAuth';
import { LogoutConfirm } from '../../utils/LogoutConfirm';
import { NavbarCollapse } from './NavbarCollapse';

export function Navigation() {
    const [isNavbarTogglerOpen, setIsNavbarTogglerOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { authState } = useAuth();

    const toggleNavbar = () => setIsNavbarTogglerOpen(!isNavbarTogglerOpen);
    return (
        <>
            <LogoutConfirm isOpen={isLogoutModalOpen} toggle={() => setIsLogoutModalOpen(false)} />
            <Nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <Container>
                    <NavItem>
                        <FontAwesomeIcon icon={['fab', 'd-and-d']} size="4x" />
                        <Link to="/" className="navbar-brand">DnD Cheatsheet</Link>
                    </NavItem>
                    <NavbarToggler className="navbar-toggler navbar-toggler-right" onClick={toggleNavbar}>
                        <FontAwesomeIcon icon="bars" />
                    </NavbarToggler>
                    <Collapse isOpen={isNavbarTogglerOpen} navbar>
                        <NavbarCollapse>
                            {authState.loggedIn ?
                                renderLoggedInItems() :
                                renderAnonymousItems()
                            }
                        </NavbarCollapse>
                    </Collapse>
                </Container>
            </Nav>
        </>
    );

    function renderLoggedInItems() {
        return (
            <>
                <NavItem className="nav-item">
                    <Link className="nav-link" to="/dashboard"  >Dashboard</Link>
                </NavItem>
                <NavItem className="nav-item">
                    <Link className="nav-link" to="/app">The Cheatsheet</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <FontAwesomeIcon icon="dice-d20" size="2x" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header className="lower-case">{authState.username}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => setIsLogoutModalOpen(true)}>
                            Logout
                                </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </>
        );
    }

    function renderAnonymousItems() {
        return (
            <>
                <NavItem className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </NavItem>
                <NavItem className="nav-item">
                    <Link className="nav-link" to="register">Register</Link>
                </NavItem>
            </>
        );
    }
}
