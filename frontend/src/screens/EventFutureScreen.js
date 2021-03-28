import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAllFutureEvents } from "../actions/eventActions";

const EventFutureScreen = ({}) => {
    const dispatch = useDispatch();

    const eventFutureList = useSelector((state) => state.eventFutureList);
    const { loading, events, error } = eventFutureList;

    useEffect(() => {
        dispatch(listAllFutureEvents());
    }, [dispatch]);

    return (
        <>
            <h1>Future Events</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default EventFutureScreen;
