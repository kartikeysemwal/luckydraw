import axios from "axios";
import {
    TICKET_LIST_REQUEST,
    TICKET_LIST_SUCCESS,
    TICKET_LIST_FAIL,
} from "../constants/ticketConstants";

export const listTickets = () => async (dispatch) => {
    try {
        dispatch({ type: TICKET_LIST_REQUEST });

        const { data } = await axios.get("/api/tickets/getalltickets");

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
