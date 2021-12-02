import React, { useEffect } from 'react';
import AllPizza from '../pizza-data';
import { Container,Row,Col} from 'react-bootstrap';
import Food from '../Component/Food';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoods } from '../actions/foodaction';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const foodState = useSelector(state=>state.getFoodReducer);
    const {loading,food,error}=foodState;

    useEffect(()=>{
        dispatch(getAllFoods());
    },[dispatch])

    return (
        <>
          <Container>
              {
                  loading ? (
                      <h1>Loading Foods</h1>
                  ):error ? <h1>Error Loading</h1> :(
                    <Row>
                    {
                        food.map((food)=>(
                          <Col md={4}>
                              <Food food={food}/>
                          </Col>
                        ))
                    }
                </Row>
                  )
              }
       
          </Container>
        </>
    )
}

export default HomeScreen
