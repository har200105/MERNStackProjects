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
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
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
