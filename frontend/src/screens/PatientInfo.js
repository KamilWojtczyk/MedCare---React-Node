import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Row, Col, Nav } from "react-bootstrap";
import { listPatientDetails } from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

const PatientInfo = ({ match }) => {
  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
        <>
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
                <LinkContainer
                  to={`/admin/patientlist/${patient._id}/heartrate`}
                >
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
              <Form>
                <Form.Row>
                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Name</Form.Label>
                    <Form.Control disabled value={patient.name} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Age</Form.Label>
                    <Form.Control disabled value={patient.age} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Sex</Form.Label>
                    <Form.Control disabled value={patient.sex} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Pesel Number</Form.Label>
                    <Form.Control disabled value={patient.pesel} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Birth</Form.Label>
                    <Form.Control disabled value={patient.birth} />
                  </Form.Group>
                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Phone Number</Form.Label>
                    <Form.Control disabled value={patient.phone} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Email Address</Form.Label>
                    <a href={`mailto:${patient.email}`}>
                      <Form.Control disabled value={patient.email} />
                    </a>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Weight</Form.Label>
                    <Form.Control disabled value={`${patient.weight} kg`} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Height</Form.Label>
                    <Form.Control disabled value={`${patient.height} cm`} />
                  </Form.Group>

                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Step Count</Form.Label>
                    <Form.Control disabled value={patient.stepcount} />
                  </Form.Group>
                </Form.Row>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default PatientInfo;
