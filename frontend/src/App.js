import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import BookScreen from "./screens/BookScreen";
import UserScreen from "./screens/UserScreen";
import EventScreen from "./screens/EventScreen";
import EventFutureScreen from "./screens/EventFutureScreen";
import EventWinnerScreen from "./screens/EventWinnerScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen} />
                    <Route
                        path="/bookticket/:ticketId"
                        component={BookScreen}
                    />
                    <Route path="/mytickets" component={UserScreen} />
                    <Route path="/allevents" component={EventScreen} />
                    <Route path="/futureevents" component={EventFutureScreen} />
                    <Route path="/lastwinners" component={EventWinnerScreen} />
                    <Route path="/" component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
