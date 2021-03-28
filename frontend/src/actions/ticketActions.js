import axios from "axios";
import {
    TICKET_LIST_REQUEST,
    TICKET_LIST_SUCCESS,
    TICKET_LIST_FAIL,
    TICKET_BOOK_REQUEST,
    TICKET_BOOK_SUCCESS,
    TICKET_BOOK_FAIL,
    USER_TICKET_LIST_SUCCESS,
    USER_TICKET_LIST_REQUEST,
    USER_TICKET_LIST_FAIL,
} from "../constants/ticketConstants";

export const listTickets = () => async (dispatch) => {
    try {
        dispatch({ type: TICKET_LIST_REQUEST });

        const { data } = await axios.get("/api/tickets/alltickets");

        dispatch({
            type: TICKET_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TICKET_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const bookTicket = (ticketId) => async (dispatch, getState) => {
    try {
        dispatch({ type: TICKET_BOOK_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/users/bookticket/${ticketId}`,
            config
        );

        dispatch({
            type: TICKET_BOOK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TICKET_BOOK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const userTickets = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_TICKET_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/mytickets`, config);

        dispatch({
            type: USER_TICKET_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_TICKET_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
