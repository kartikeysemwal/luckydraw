import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTickets } from "../actions/ticketActions";

const HomeScreen = ({}) => {
    const dispatch = useDispatch();

    const ticketList = useSelector((state) => state.ticketList);
    const { loading, tickets, error } = ticketList;

    useEffect(() => {
        dispatch(listTickets());
    }, [dispatch]);

    return (
        <>
            <h1>Tickets</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>TicketNo</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td>{ticket.ticketNo}</td>
                                <td>{ticket.eventDetail.date}</td>
                                <td>{ticket.eventDetail.price}</td>
                                <td>
                                    <LinkContainer
                                        to={`/api/users/bookTicket/${ticket._id}`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                            disabled={ticket.user != null}
                                        >
                                            Book Ticket
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default HomeScreen;
