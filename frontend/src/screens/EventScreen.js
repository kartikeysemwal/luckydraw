import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAllEvents } from "../actions/eventActions";

const EventScreen = ({}) => {
    const dispatch = useDispatch();

    const eventList = useSelector((state) => state.eventList);
    const { loading, events, error } = eventList;

    useEffect(() => {
        dispatch(listAllEvents());
    }, [dispatch]);

    return (
        <>
            <h1>All Events</h1>
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
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                                <td>
                                    {event.winner != null
                                        ? event.winner.name
                                        : "Not decided"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default EventScreen;
