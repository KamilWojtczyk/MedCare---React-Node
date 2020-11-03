import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./screens/About";
import Auth from "./screens/Auth";
import UserInfo from "./screens/UserInfo";
import UsersScreen from "./screens/UsersScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/about" component={About} exact/>
          <Route path="/users/:id" component={UserInfo} exact/>
          <Route path="/auth" component={Auth} exact/>
          <Route path="/users" component={UsersScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
