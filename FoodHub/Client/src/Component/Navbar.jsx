import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Navbars = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container fluid>
                    <Link to="/" style={{
                        textDecoration: "none"
                    }}>
                        <h6 style={{
                            color: "white",
                            fontSize: "40px"
                        }}>Foodhub</h6>
                    </Link>
                    <Nav className="ms-auto">
                        <LinkContainer to="/" activeClassName>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>


                        <LinkContainer to="/orders" activeClassName>
                            <Nav.Link>Restaurants</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/login" activeClassName>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/Signup" activeClassName>
                            <Nav.Link>Signup</Nav.Link>
                        </LinkContainer>



                        <LinkContainer to="/login" activeClassName>
                            <Nav.Link>Apply For Your Restaurant</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars
