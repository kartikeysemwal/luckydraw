import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { eventGenerate } from "../actions/eventActions";
import { EVENT_GENERATE_RESET } from "../constants/eventConstants";

const EventGenerateScreen = ({ location, history }) => {
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");

    const dispatch = useDispatch();

    const eventGenerateReq = useSelector((state) => state.eventGenerate);
    const { loading, error, success } = eventGenerateReq;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (success) {
            dispatch({ type: EVENT_GENERATE_RESET });
            history.push(redirect);
        }
    }, [history, success, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(eventGenerate(date, price, qty));
    };

    return (
        <FormContainer>
            <h1>Generate Event</h1>
            <h5>
                Admin only! If event is already present for the date then only
                tickets will be generated
            </h5>
            <h5>
                If event not present, date and price is mandatory, qty is set as
                10 for default
            </h5>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter date in mm/dd/yyyy format"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the price for winner"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="qty">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="How many ticket to generate"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Generate event
                </Button>
            </Form>
        </FormContainer>
    );
};

export default EventGenerateScreen;
