import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav } from "react-bootstrap";
import {
  listPatientDetails,
  createPatientBloodpressure,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_CREATE_BLOODPRESSURE_RESET } from "../constants/patientConstants";
import { LinkContainer } from "react-router-bootstrap";

const Blood = ({ match }) => {
  const [blood, setBlood] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientBloodpressureCreate = useSelector(
    (state) => state.patientBloodpressureCreate
  );
  const {
    success: successPatientBloodpressure,
    error: errorPatientBloodpressure,
  } = patientBloodpressureCreate;

  useEffect(() => {
    dispatch(listPatientDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <Link className="btn btn-dark my-3" to="/admin/patientlist">
            Go Back
          </Link>
        </Col>
        <Col className="text-right">
          <h5>Patient created by: {patient.nameUser}</h5>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card className="mb-3 border-dark">
          <Card.Header>
            <Nav variant="pills">
              <LinkContainer to={`/admin/patientlist/${patient._id}`}>
                <Nav.Link>Personal Informations</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/bloodpressure`}
              >
                <Nav.Link eventKey="link-1">Blood Pressure</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/admin/patientlist/${patient._id}/heartrate`}>
                <Nav.Link eventKey="link-1">Heart Rate</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/bloodsugar`}
              >
                <Nav.Link eventKey="link-1">Blood Sugar</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/saturation`}
              >
                <Nav.Link eventKey="link-1">Saturation</Nav.Link>
              </LinkContainer>
            </Nav>
          </Card.Header>
          <Card.Body>
            {patient.bloodpressure.map((pressure) => (
              <Row key={pressure._id} className="text-center">
                <Col>Measurement: {pressure.blood}/min</Col>
                <Col as="h5">Date: {pressure.time}</Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Blood;
