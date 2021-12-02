import React from 'react';
import { Navbar, Nav, Container, Image,LinkCo } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'

const Navs = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state)=>state.cartReducer);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src="images/logo.png"  alt="Logo" style={{
                            height:"50px"
                        }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/features">
                            <Nav.Link>Features</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Login">
                            <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Signup">
                            <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                            <Nav.Link>Cart {cartState.cartItems.length} </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navs
