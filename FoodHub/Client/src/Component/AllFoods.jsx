import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoods } from '../actions/foodaction';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const AllFoods = () => {


    const dispatch = useDispatch();
    const foodState = useSelector(state => state.getFoodReducer);
    const { loading, food, error } = foodState;

    useEffect(() => {
        dispatch(getAllFoods());
    }, [dispatch])


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Food Image</th>
                        <th>Food Name</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food && food.map((a) => (
                            <tr>
                                <td>
                                    <img src={a.foodImage} alt="food" width="100px" height="100px" style={{
                                       borderRadius:"20px"
                                    }}/>
                                </td>
                                <td>{a.foodname}</td>
                                <td>
                                    {a.foodprice[0]['small']}
                                </td>
                                <td>{a.category}</td>
                                <td>
                                    <AiFillEdit />  &nbsp; <AiFillDelete />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default AllFoods
