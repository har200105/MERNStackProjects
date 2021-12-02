import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../actions/cartAction';

const Food = ({ food }) => {

    const [varients, setVarient] = useState("small");
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const addCart = () =>{
        dispatch(addToCart(food,quantity,varients));
    }


    return (
        <>
            <Card style={{ width: '18rem', marginTop: "10px" }}>
                <Card.Img variant="top" src={food.foodImage} style={{ height: '250px',cursor:"pointer" }}
                    onClick={handleShow}
                />
                <Card.Body>
                    <Card.Title>{food.foodname}</Card.Title>
                    <hr />
                    <Card.Text>
                        <Row>
                            <Col md={6}>
                                <h6>Variants</h6>
                                <select onChange={(e) => setVarient(e.target.value)} value={varients}>
                                    {food.varients.map((v) => (
                                        <option value={v}>{v}</option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <h6>Quantity</h6>
                                <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    {[...Array(10).keys()].map((a, i) => (
                                        <option value={i + 1} >
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                    </Card.Text>
                    <Row>
                        <Col md={6}>Price :{food.foodprice[0][varients] * quantity}</Col>
                        <Col md={6}>

                            <Button className="bg-primary text-white" onClick={addCart}>Add to Cart</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{food.foodname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <Card.Img variant="top" src={food.foodImage} style={{ height: '250px'}}/>
                    </div>
                    <div>
                        <h5>Description:</h5>
                        <h6>{food.foodDescription}</h6>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Food
