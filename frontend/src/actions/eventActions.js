import axios from "axios";
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

export const listAllEvents = () => async (dispatch) => {
    try {
        dispatch({ type: EVENT_LIST_REQUEST });

        const { data } = await axios.get("/api/events/allevents");

        console.log(data);

        dispatch({
            type: EVENT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EVENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listAllFutureEvents = () => async (dispatch) => {
    try {
        dispatch({ type: EVENT_FUTURE_LIST_REQUEST });

        const { data } = await axios.get("/api/events/futureevents");

        dispatch({
            type: EVENT_FUTURE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EVENT_FUTURE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listWinners = () => async (dispatch) => {
    try {
        dispatch({ type: EVENT_WINNER_LIST_REQUEST });

        const { data } = await axios.get("/api/events/lastwinners");

        dispatch({
            type: EVENT_WINNER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EVENT_WINNER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
