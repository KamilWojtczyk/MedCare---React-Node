import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Col } from "react-bootstrap";
import Blood from "../components/Blood";
import Heart from "../components/Heart";
import BloodSugar from "../components/BloodSugar";
import Saturation from "../components/Saturation";
import { listPatientDetails } from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const PatientInfo = ({ match }) => {
  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  useEffect(() => {
    dispatch(listPatientDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/admin/patientlist">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card className="mb-3 border-dark">
            <Card.Header as="h5">Personal Informations</Card.Header>
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
          <Card className="mb-3 border-dark">
            <Card.Header as="h5">Blood Pressure</Card.Header>
            <Card.Body>
              <Blood bloodpressure={patient.bloodpressure} />
            </Card.Body>
          </Card>
          <Card className="mb-3 border-dark">
            <Card.Header as="h5">Heart Rate</Card.Header>
            <Card.Body>
              <Heart heartrate={patient.heartrate} />
            </Card.Body>
          </Card>
          <Card className="mb-3 border-dark">
            <Card.Header as="h5">Blood Sugar</Card.Header>
            <Card.Body>
              <BloodSugar bloodsugar={patient.bloodsugar} />
            </Card.Body>
          </Card>
          <Card className="mb-3 border-dark">
            <Card.Header as="h5">Saturation</Card.Header>
            <Card.Body>
              <Saturation saturation={patient.saturation} />
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default PatientInfo;
