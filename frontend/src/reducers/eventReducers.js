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
    EVENT_FIND_WINNER_REQUEST,
    EVENT_FIND_WINNER_SUCCESS,
    EVENT_FIND_WINNER_FAIL,
    EVENT_GENERATE_REQUEST,
    EVENT_GENERATE_SUCCESS,
    EVENT_GENERATE_FAIL,
    EVENT_GENERATE_RESET,
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

export const eventFindWinnerReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_FIND_WINNER_REQUEST:
            return { loading: true };
        case EVENT_FIND_WINNER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case EVENT_FIND_WINNER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const eventGenerateReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_GENERATE_REQUEST:
            return { loading: true };
        case EVENT_GENERATE_SUCCESS:
            return { loading: false, success: true, event: action.payload };
        case EVENT_GENERATE_FAIL:
            return { loading: false, error: action.payload };
        case EVENT_GENERATE_RESET:
            return (state = {});
        default:
            return state;
    }
};
