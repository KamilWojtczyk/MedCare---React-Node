import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./screens/About";
import Auth from "./screens/Auth";
import PatientInfo from "./screens/PatientInfo";
import PatientsScreen from "./screens/PatientsScreen";
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
          <Route path="/about" component={About} exact />
          <Route path="/patients/:id" component={PatientInfo} exact />
          <Route path="/auth" component={Auth} exact />
          <Route path="/patients" component={PatientsScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
