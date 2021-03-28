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
    EVENT_FIND_WINNER_REQUEST,
    EVENT_FIND_WINNER_SUCCESS,
    EVENT_FIND_WINNER_FAIL,
    EVENT_GENERATE_REQUEST,
    EVENT_GENERATE_SUCCESS,
    EVENT_GENERATE_FAIL,
} from "../constants/eventConstants";

export const listAllEvents = () => async (dispatch) => {
    try {
        dispatch({ type: EVENT_LIST_REQUEST });

        const { data } = await axios.get("/api/events/allevents");

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

export const findWinner = () => async (dispatch, getState) => {
    try {
        dispatch({ type: EVENT_FIND_WINNER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get("/api/users/findwinner", config);

        dispatch({ type: EVENT_FIND_WINNER_SUCCESS });
    } catch (error) {
        dispatch({
            type: EVENT_FIND_WINNER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const eventGenerate = (date, price, qty) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: EVENT_GENERATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/users/generateevent`,
            { date, price, qty },
            config
        );

        dispatch({
            type: EVENT_GENERATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EVENT_GENERATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
