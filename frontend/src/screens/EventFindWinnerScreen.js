import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { findWinner } from "../actions/eventActions";

const EventFindWinner = ({ match }) => {
    const dispatch = useDispatch();

    const findWinnerReq = useSelector((state) => state.eventFindWinner);
    const { loading, success, error } = findWinnerReq;

    useEffect(() => {
        dispatch(findWinner());
    }, [dispatch]);

    return (
        <>
            <h1>Find Winner </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Message variant="success">
                    {"Success, the winner of the event is declared"}
                </Message>
            )}
        </>
    );
};

export default EventFindWinner;
