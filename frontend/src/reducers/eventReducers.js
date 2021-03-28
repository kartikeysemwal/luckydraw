import {
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,
    EVENT_FUTURE_LIST_REQUEST,
    EVENT_FUTURE_LIST_SUCCESS,
    EVENT_FUTURE_LIST_FAIL,
    EVENT_WINNER_LIST_REQUEST,
    EVENT_WINNER_LIST_SUCCESS,
    EVENT_WINNER_LIST_FAIL,
} from "../constants/eventConstants";

export const eventListReducer = (state = { events: [] }, action) => {
    switch (action.type) {
        case EVENT_LIST_REQUEST:
            return { loading: true };
        case EVENT_LIST_SUCCESS:
            return {
                loading: false,
                events: action.payload,
            };
        case EVENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const eventFutureListReducer = (state = { events: [] }, action) => {
    switch (action.type) {
        case EVENT_FUTURE_LIST_REQUEST:
            return { loading: true };
        case EVENT_FUTURE_LIST_SUCCESS:
            return {
                loading: false,
                events: action.payload,
            };
        case EVENT_FUTURE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const eventWinnerListReducer = (state = { events: [] }, action) => {
    switch (action.type) {
        case EVENT_WINNER_LIST_REQUEST:
            return { loading: true };
        case EVENT_WINNER_LIST_SUCCESS:
            return {
                loading: false,
                events: action.payload,
            };
        case EVENT_WINNER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
