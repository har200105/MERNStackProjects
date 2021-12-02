import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderAction';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const userFood = useSelector(state => state.getUserOrderReducer);
    const { error, success, loading, orders } = userFood;

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);

    return (
        <>
            {error && <div>Error</div>}
            {loading && <div>Loading</div>}

            {
                <div>
                    {
                        orders.map((s) => (
                            <div className="container border p-4 bg-light">
                                <Row>
                                    <Col md={4}>
                                        {s.foodOrdered.map((a) => (
                                            <div className="container">
                                                <h6 key={a.foodname}>
                                                    {a.foodname}
                                                </h6>
                                            </div>
                                        ))}
                                    </Col>
                                    <Col md={4}>

                                    </Col>
                                    <Col md={4}>

                                    </Col>
                                </Row>
                            </div>
                        ))
                    }

                </div>
            }

        </>

    )
}

export default OrderScreen
