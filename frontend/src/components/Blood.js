import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav, Table, Form, Button } from "react-bootstrap";
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

  const patientBloodpressureCreate = useSelector(
    (state) => state.patientBloodpressureCreate
  );
  const {
    success: successPatientBloodpressure,
    error: errorPatientBloodpressure,
  } = patientBloodpressureCreate;

  useEffect(() => {
    if (successPatientBloodpressure) {
      setBlood("");
      setTime("");
      dispatch({ type: PATIENT_CREATE_BLOODPRESSURE_RESET });
    }
    dispatch(listPatientDetails(match.params.id));
  }, [dispatch, match, successPatientBloodpressure]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPatientBloodpressure(match.params.id, { blood, time }));
  };
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
                <Nav.Link eventKey="personal informations">
                  Personal Informations
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/bloodpressure`}
              >
                <Nav.Link>Blood Pressure</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/admin/patientlist/${patient._id}/heartrate`}>
                <Nav.Link eventKey="heartrate">Heart Rate</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/bloodsugar`}
              >
                <Nav.Link eventKey="bloodsugar">Blood Sugar</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/saturation`}
              >
                <Nav.Link eventKey="saturation">Saturation</Nav.Link>
              </LinkContainer>
            </Nav>
          </Card.Header>
          <Card.Body>
            <h2>Blood pressure Measurement</h2>
            {errorPatientBloodpressure && (
              <Message variant="danger">{errorPatientBloodpressure}</Message>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Form.Group as={Col} variant="flush" controlId="blood">
                  <Form.Label>Blood pressure</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="6"
                    pattern="^[0-9]*\d{3}[\/]?\d{2}"
                    data-mask="999/99"
                    placeholder="Enter Blood pressure measure"
                    value={blood}
                    onChange={(e) => setBlood(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group as={Col} variant="flush" controlId="time">
                  <Form.Label>Date time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Enter date time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
              <Button
                className="my-1"
                size="sm"
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Form>
            {patient.bloodpressure.length === 0 ? (
              <Message>No measurement</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Measure</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.bloodpressure.reverse().map((pressure) => (
                    <tr key={pressure._id}>
                      <td>{pressure._id}</td>
                      <td>{pressure.blood}</td>
                      <td>{pressure.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Blood;
