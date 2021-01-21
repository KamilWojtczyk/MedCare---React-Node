import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav, Table, Form, Button } from "react-bootstrap";
import {
  listPatientWithDataDetails,
  createPatientBloodpressure,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_CREATE_BLOODPRESSURE_RESET } from "../constants/patientConstants";
import { LinkContainer } from "react-router-bootstrap";

const Blood = ({ match }) => {
  const [systolic, setSystolic] = useState();
  const [diastolic, setDiastolic] = useState();
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patientDetailsWithData);
  const { loading, error, patientwithdata } = patient;

  const patientBloodpressureCreate = useSelector(
    (state) => state.patientBloodpressureCreate
  );
  const {
    success: successPatientBloodpressure,
    error: errorPatientBloodpressure,
  } = patientBloodpressureCreate;

  useEffect(() => {
    if (successPatientBloodpressure) {
      setSystolic("");
      setDiastolic("");
      setTime("");
      dispatch({ type: PATIENT_CREATE_BLOODPRESSURE_RESET });
    }
    dispatch(listPatientWithDataDetails(match.params.id));
  }, [dispatch, match, successPatientBloodpressure]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPatientBloodpressure(match.params.id, { systolic, diastolic, time })
    );
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
          <h5>Patient created by: {patientwithdata.patient.nameUser}</h5>
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
              <LinkContainer to={`/admin/patientlist/${patientwithdata.patient._id}`}>
                <Nav.Link eventKey="personal informations">
                  Personal Informations
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}/bloodpressure`}
              >
                <Nav.Link>Blood Pressure</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/admin/patientlist/${patientwithdata.patient._id}/heartrate`}>
                <Nav.Link eventKey="heartrate">Heart Rate</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}/bloodsugar`}
              >
                <Nav.Link eventKey="bloodsugar">Blood Sugar</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}/saturation`}
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
            <h5>Add new Measure</h5>
            <Form className="mb-sm-2" inline onSubmit={submitHandler}>
              <Form.Control
                style={{ width: "250px" }}
                className="mr-sm-2"
                type="number"
                maxLength="3"
                pattern="^[0-9]*"
                data-mask="99"
                placeholder="Entere systolic pressure"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
              ></Form.Control>

              <Form.Control
                style={{ width: "250px" }}
                className="mr-sm-2"
                type="number"
                maxLength="2"
                pattern="^[0-9]*"
                data-mask="99"
                placeholder="Entere diastolic pressure"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
              ></Form.Control>

              <Form.Control
                className="mr-sm-2"
                type="datetime-local"
                placeholder="Enter date time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Form.Control>

              <Button
                className="mr-sm-2"
                size="sm"
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Form>
            {patientwithdata.patient.bloodpressure.length === 0 ? (
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
                  {patientwithdata.patient.bloodpressure.reverse().map((pressure) => (
                    <tr key={pressure._id}>
                      <td>{pressure._id}</td>
                      <td>
                        {pressure.systolic >= 120 &&
                        pressure.systolic <= 130 &&
                        pressure.diastolic >= 80 &&
                        pressure.diastolic <= 85 ? (
                          <span style={{ color: "green" }}>
                            {pressure.systolic}/{pressure.diastolic}mmHg - the
                            measurement is normal
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {pressure.systolic}/{pressure.diastolic}mmHg - the
                            measurement is below normal
                          </span>
                        )}
                      </td>
                      <td>{pressure.time}</td>
                    </tr>
                  ))}
                  {patientwithdata.data.map((datas) =>
                          datas.message.bloodpressure.map((pressure) => (
                            <tr key={pressure._id}>
                              <td>{datas.message.id}</td>
                              <td>
                        {pressure.diastolic >= 120 &&
                        pressure.diastolic <= 130 &&
                        pressure.systolic >= 80 &&
                        pressure.systolic <= 85 ? (
                          <span style={{ color: "green" }}>
                            {pressure.diastolic}/{pressure.systolic}mmHg - the
                            measurement is normal
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {pressure.diastolic}/{pressure.systolic}mmHg - the
                            measurement is below normal
                          </span>
                        )}
                      </td>
                              <td>{pressure.time}</td>
                            </tr>
                          ))
                        )}
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
