import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Col, Button } from "react-bootstrap";
import { listPatientDetails, updatePatient } from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_UPDATE_RESET } from "../constants/patientConstants";

const PatientEditScreen = ({ match, history }) => {
  const patientId = match.params.id;
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [pesel, setPesel] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [stepcount, setStepcount] = useState(0);
  const [isArchived, setIsArchived] = useState(false);

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET });
      history.push("/admin/patientlist");
    } else {
      if (!patient.name || patient._id !== patientId) {
        dispatch(listPatientDetails(patientId));
      } else {
        setName(patient.name);
        setSex(patient.sex);
        setBirth(patient.birth);
        setPhone(patient.phone);
        setPesel(patient.pesel);
        setWeight(patient.weight);
        setHeight(patient.height);
        setStepcount(patient.stepcount);
        setEmail(patient.email);
        setIsArchived(patient.isArchived);
      }
    }
  }, [dispatch, history, patientId, patient, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePatient({
        _id: patientId,
        name,
        sex,
        birth,
        phone,
        pesel,
        email,
        weight,
        height,
        stepcount,
        isArchived,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/admin/patientlist">
        Go Back
      </Link>
      <h1>Edit Patient</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card className="mb-3 border-dark">
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Row>
                  <Form.Group controlId="name" as={Col} variant="flush">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="sex" as={Col} variant="flush">
                    <Form.Label as="h5">Sex</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Enter Sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option>Female</option>
                      <option>Male</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="pesel" as={Col} variant="flush">
                    <Form.Label as="h5">Pesel Number</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="11"
                      pattern="[0-9]*"
                      placeholder="Enter Pesel"
                      value={pesel}
                      onChange={(e) => setPesel(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="birth" as={Col} variant="flush">
                    <Form.Label as="h5">Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Birth"
                      value={birth}
                      onChange={(e) => setBirth(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="phone" as={Col} variant="flush">
                    <Form.Label as="h5">Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="11"
                      data-mask="999-999-999"
                      pattern="^[0-9]*\d{3}[\s.-]?\d{3}[\s.-]?\d{3}"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email" as={Col} variant="flush">
                    <Form.Label as="h5">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="weight" as={Col} variant="flush">
                    <Form.Label as="h5">Weight</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="height" as={Col} variant="flush">
                    <Form.Label as="h5">Height</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="stepcount" as={Col} variant="flush">
                    <Form.Label as="h5">Step Count</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Step count"
                      value={stepcount}
                      onChange={(e) => setStepcount(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group variant="flush" controlId="isArchived">
                  <Form.Check
                    type="checkbox"
                    label="Archive the patient"
                    checked={isArchived}
                    onChange={(e) => setIsArchived(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default PatientEditScreen;
