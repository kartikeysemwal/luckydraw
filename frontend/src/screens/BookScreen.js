import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { bookTicket } from "../actions/ticketActions";

const BookScreen = ({ match }) => {
    const dispatch = useDispatch();

    const ticketBookReq = useSelector((state) => state.ticketBook);
    const { loading, success, error } = ticketBookReq;

    useEffect(() => {
        dispatch(bookTicket(match.params.ticketId));
    }, [dispatch]);

    return (
        <>
            <h1>Ticket Book </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Message variant="success">
                    {"You have successfully bought the ticket"}
                </Message>
            )}
        </>
    );
};

export default BookScreen;
