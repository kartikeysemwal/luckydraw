import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
    ticketListReducer,
    ticketBookReducer,
    userTicketListReducer,
} from "./reducers/ticketReducers";
import {
    eventListReducer,
    eventFutureListReducer,
    eventWinnerListReducer,
    eventFindWinnerReducer,
    eventGenerateReducer,
} from "./reducers/eventReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    ticketList: ticketListReducer,
    ticketBook: ticketBookReducer,
    userTicketList: userTicketListReducer,
    eventList: eventListReducer,
    eventFutureList: eventFutureListReducer,
    eventWinnerList: eventWinnerListReducer,
    eventFindWinner: eventFindWinnerReducer,
    eventGenerate: eventGenerateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
