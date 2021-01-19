import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Card,
  Row,
  Col,
  Nav,
  ListGroupItem,
  ListGroup,
  Button,
} from "react-bootstrap";
import {
  listPatientDetails,
  createPatientComment,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { PATIENT_CREATE_COMMENT_RESET } from "../constants/patientConstants";

const PatientInfo = ({ match }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const patientCommentCreate = useSelector(
    (state) => state.patientCommentCreate
  );
  const {
    success: successPatientComment,
    error: errorPatientComment,
  } = patientCommentCreate;

  useEffect(() => {
    if (successPatientComment) {
      setTitle("");
      setText("");
      dispatch({ type: PATIENT_CREATE_COMMENT_RESET });
    }
    dispatch(listPatientDetails(match.params.id));
  }, [dispatch, match, successPatientComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPatientComment(match.params.id, { title, text }));
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
                  <Nav.Link eventKey="bloodpressure">Blood Pressure</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to={`/admin/patientlist/${patient._id}/heartrate`}
                >
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
              <Form>
                <Form.Row>
                  <Form.Group as={Col} variant="flush">
                    <Form.Label as="h5">Name</Form.Label>
                    <Form.Control disabled value={patient.name} />
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
          <Row>
            <Col>
              <h2>Notes</h2>
              {errorPatientComment && (
                <Message variant="danger">{errorPatientComment}</Message>
              )}
              <ListGroup className="py-3 border-dark">
                <ListGroupItem>
                  <h2>Add Note</h2>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Title of a note"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="text">
                      <Form.Label>Note</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                </ListGroupItem>
              </ListGroup>
              {patient.comment.length === 0 ? (
                <Message>No Notes</Message>
              ) : (
                <ListGroup variant="flush">
                  {patient.comment.reverse().map((comment) => (
                    <ListGroupItem key={comment._id}>
                      <h5>Added by: {comment.name}</h5>
                      <h5>{comment.createdAt.substring(0, 10)}</h5>
                      <h6>Title: {comment.title}</h6>
                      <p>{comment.text}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PatientInfo;
