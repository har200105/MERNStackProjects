import React, { useEffect } from 'react'
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { BrowserRouter, Switch, Route ,useHistory, Link} from "react-router-dom";
import AllUsers from '../Component/AllUsers';
import AllRestaurants from '../Component/AllRestaurants';
import RestaurantReq from '../Component/RestaurantReq';
import AllPosts from '../Component/AllPosts';
import AllOrders from '../Component/AllOrders';
import AllFoods from '../Component/AllFoods';
import {useSelector} from 'react-redux';
import AddFood from '../Component/AddFood';



const AdminScreen = () => {
    const history = useHistory();
    const userState = useSelector(state=>state.loginUser);
    const {currentUser} = userState;

    useEffect(()=>{
        if(localStorage.getItem("currentUser")===null || !currentUser.isAdmin){
            // history.push("/");
        }
    },[])

    return (
        <>
            <Container>
                <Row>
                    <h1 className="text-center bg-dark text-light p-2">Restaurant Panel</h1>
                    <Col md={2}>
                        <ButtonGroup vertical style={{ minHeight: '400px' }}>
                            
                            <Link to="/admin/allusers">
                            <Button>All Users</Button>
                            </Link>

                            <Link to="/admin/allrestaurants">
                            <Button>All Restaurants</Button>
                            </Link>

                            <Link to="/admin/restaurantsReq">
                            <Button>Restaurant Requests</Button>
                            </Link>
                            
                            <Link to="/admin/allPosts">
                            <Button>All Posts</Button>
                            </Link>
                            
                            <Link to="/admin/allOrders">
                            <Button>All Orders</Button>
                            </Link>

                            <Link to="/admin/addFood">
                            <Button>Add Food</Button>
                            </Link>

                            <Link to="/admin/allFoods">
                            <Button>All Foods</Button>
                            </Link>

                        </ButtonGroup>
                    </Col>
                    <Col md={10}>
                        <Switch>
                            <Route path="/admin" component={AllUsers} exact/>
                            <Route path="/admin/allusers" component={AllUsers} exact/>
                            <Route path="/admin/allrestaurants" component={AllRestaurants} exact/>
                            <Route path="/admin/restaurantsReq" component={RestaurantReq} exact/>
                            <Route path="/admin/allPosts" component={AllPosts} exact/>
                            <Route path="/admin/allOrders" component={AllOrders} exact/>
                            <Route exact path="/admin/allFoods" component={AllFoods} />
                            <Route exact path="/admin/addFood" component={AddFood}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminScreen
