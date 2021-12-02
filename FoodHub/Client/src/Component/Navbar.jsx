import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Navbars = () => {
    return (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
              <h6>Foodify</h6>
              <Nav className="ms-auto">
                  <LinkContainer to="/" activeClassName>
                      <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/streetfood" activeClassName>
                      <Nav.Link>Street Food</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/orders" activeClassName>
                      <Nav.Link>Orders</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login" activeClassName>
                      <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
              </Nav>
          </Container>
          </Navbar>
        </> 
    )
}

export default Navbars
