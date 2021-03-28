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
    USER_TICKET_LIST_RESET,
} from "../constants/ticketConstants";

export const ticketListReducer = (state = { tickets: [] }, action) => {
    switch (action.type) {
        case TICKET_LIST_REQUEST:
            return { loading: true };
        case TICKET_LIST_SUCCESS:
            return {
                loading: false,
                tickets: action.payload,
            };
        case TICKET_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ticketBookReducer = (state = {}, action) => {
    switch (action.type) {
        case TICKET_BOOK_REQUEST:
            return { loading: true };
        case TICKET_BOOK_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case TICKET_BOOK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userTicketListReducer = (state = { tickets: [] }, action) => {
    switch (action.type) {
        case USER_TICKET_LIST_REQUEST:
            return { loading: true };
        case USER_TICKET_LIST_SUCCESS:
            return {
                loading: false,
                tickets: action.payload,
            };
        case USER_TICKET_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_TICKET_LIST_RESET:
            return { tickets: [] };
        default:
            return state;
    }
};
