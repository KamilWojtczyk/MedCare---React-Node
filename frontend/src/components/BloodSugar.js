import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav, Table, Form, Button } from "react-bootstrap";
import {
  listPatientDetails,
  createPatientBloodsugar,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_CREATE_BLOODSUGAR_RESET } from "../constants/patientConstants";
import { LinkContainer } from "react-router-bootstrap";

const BloodSugar = ({ match }) => {
  const [sugar, setSugar] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const patientBloodsugarCreate = useSelector(
    (state) => state.patientBloodsugarCreate
  );
  const {
    success: successPatientBloodsugar,
    error: errorPatientBloodsugar,
  } = patientBloodsugarCreate;

  useEffect(() => {
    if (successPatientBloodsugar) {
      setSugar("");
      setTime("");
      dispatch({ type: PATIENT_CREATE_BLOODSUGAR_RESET });
    }
    dispatch(listPatientDetails(match.params.id));
  }, [dispatch, match, successPatientBloodsugar]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPatientBloodsugar(match.params.id, { sugar, time }));
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
                <Nav.Link eventKey="bloodpressure">Blood Pressure</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/admin/patientlist/${patient._id}/heartrate`}>
                <Nav.Link eventKey="heartrate">Heart Rate</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/bloodsugar`}
              >
                <Nav.Link>Blood Sugar</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patient._id}/saturation`}
              >
                <Nav.Link eventKey="saturation">Saturation</Nav.Link>
              </LinkContainer>
            </Nav>
          </Card.Header>
          <Card.Body>
            <h2>Blood sugar Measurement</h2>
            {errorPatientBloodsugar && (
              <Message variant="danger">{errorPatientBloodsugar}</Message>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Row>
                <Form.Group as={Col} variant="flush" controlId="bloodsugar">
                  <Form.Label>Blood Sugar</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="2"
                    pattern="^[0-9]*"
                    data-mask="99"
                    placeholder="Enter blood sugar measure"
                    value={sugar}
                    onChange={(e) => setSugar(e.target.value)}
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
            {patient.bloodsugar.length === 0 ? (
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
                  {patient.bloodsugar.reverse().map((sugar) => (
                    <tr key={sugar._id}>
                      <td>{sugar._id}</td>
                      <td>{sugar.sugar}</td>
                      <td>{sugar.time}</td>
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

export default BloodSugar;
