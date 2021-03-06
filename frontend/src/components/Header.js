import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Lucky Draw</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/allevents">
                        <Navbar.Brand>All Events</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/futureevents">
                        <Navbar.Brand>Future Events</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/lastwinners">
                        <Navbar.Brand>Winners</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {userInfo ? (
                                <>
                                    <LinkContainer to="/mytickets">
                                        <Nav.Link>
                                            <i className="fas fa-shopping-cart"></i>{" "}
                                            My Tickets
                                        </Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown
                                        title={userInfo.name}
                                        id="username"
                                    >
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/generateEvent">
                                        <NavDropdown.Item>
                                            Generate Ticket and Event
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/findWinner">
                                        <NavDropdown.Item>
                                            Find Winner
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <h5 className="text-center py-3">
                    Welcome to the lucky draw. Winner will be announced everyday
                    at 8:00 am
                </h5>
                <h5 className="text-center">
                    You can book ticket till 7:00 am before the event
                </h5>
            </Container>
        </header>
    );
};

export default Header;
