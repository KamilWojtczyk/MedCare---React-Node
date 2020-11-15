import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./screens/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PatientInfo from "./screens/PatientInfo";
import PatientsScreen from "./screens/PatientsScreen";
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PatientListScreen from "./screens/PatientListScreen";
import PatientEditScreen from "./screens/PatientEditScreen";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/about" component={About} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/patients" component={PatientsScreen} exact />
          <Route
            path="/admin/patientlist"
            component={PatientListScreen}
            exact
          />
          <Route path="/admin/patientlist/:id" component={PatientInfo} exact />
          <Route path="/admin/patient/:id/edit" component={PatientEditScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
