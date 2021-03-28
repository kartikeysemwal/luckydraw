import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BookScreen from "./screens/BookScreen";
import UserScreen from "./screens/UserScreen";
import EventScreen from "./screens/EventScreen";
import EventFutureScreen from "./screens/EventFutureScreen";
import EventWinnerScreen from "./screens/EventWinnerScreen";
import EventFindWinnerScreen from "./screens/EventFindWinnerScreen";
import EventGenerateScreen from "./screens/EventGenerateScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route
                        path="/bookticket/:ticketId"
                        component={BookScreen}
                    />
                    <Route path="/mytickets" component={UserScreen} />
                    <Route path="/allevents" component={EventScreen} />
                    <Route path="/futureevents" component={EventFutureScreen} />
                    <Route path="/lastwinners" component={EventWinnerScreen} />
                    <Route
                        path="/admin/findwinner"
                        component={EventFindWinnerScreen}
                    />
                    <Route
                        path="/admin/generateevent"
                        component={EventGenerateScreen}
                    />
                    <Route path="/" component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
