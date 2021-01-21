import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav, Table, Form, Button } from "react-bootstrap";
import {
  listPatientWithDataDetails,
  createPatientSaturation,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_CREATE_SATURATION_RESET } from "../constants/patientConstants";
import { LinkContainer } from "react-router-bootstrap";

const Saturation = ({ match }) => {
  const [sat, setSat] = useState();
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patientDetailsWithData);
  const { loading, error, patientwithdata } = patient;

  const patientSaturationCreate = useSelector(
    (state) => state.patientSaturationCreate
  );
  const {
    success: successPatientSaturation,
    error: errorPatientSaturation,
  } = patientSaturationCreate;

  useEffect(() => {
    if (successPatientSaturation) {
      setSat("");
      setTime("");
      dispatch({ type: PATIENT_CREATE_SATURATION_RESET });
    }
    dispatch(listPatientWithDataDetails(match.params.id));
  }, [dispatch, match, successPatientSaturation]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPatientSaturation(match.params.id, { sat, time }));
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
                <Nav.Link eventKey="bloodpressure">Blood Pressure</Nav.Link>
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
                <Nav.Link>Saturation</Nav.Link>
              </LinkContainer>
            </Nav>
          </Card.Header>
          <Card.Body>
            <h2>Saturation Measurement</h2>
            {errorPatientSaturation && (
              <Message variant="danger">{errorPatientSaturation}</Message>
            )}
            <h5>Add new Measure</h5>
            <Form className="mb-sm-2" inline onSubmit={submitHandler}>
              <Form.Control
                style={{ width: "250px" }}
                className="mr-sm-2"
                type="number"
                maxLength="2"
                pattern="^[0-9]*"
                data-mask="99"
                placeholder="Enter saturation measure"
                value={sat}
                onChange={(e) => setSat(e.target.value)}
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
            {patientwithdata.patient.saturation.length === 0 ? (
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
                  {patientwithdata.patient.saturation.reverse().map((sat) => (
                    <tr key={sat._id}>
                      <td>{sat._id}</td>
                      <td>
                        {sat.sat >= 95 ? (
                          <span style={{ color: "green" }}>
                            {sat.sat}% - the measurement is normal{" "}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {sat.sat}% - the measurement is below normal
                          </span>
                        )}
                      </td>
                      <td>{sat.time}</td>
                    </tr>
                  ))}
                   {patientwithdata.data.map((datas) =>
                          datas.message.saturation.map((sat) => (
                            <tr key={sat._id}>
                              <td>{datas.message.id}</td>
                              <td>
                        {sat.sat >= 95 ? (
                          <span style={{ color: "green" }}>
                            {sat.sat}% - the measurement is normal{" "}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {sat.sat}% - the measurement is below normal
                          </span>
                        )}
                      </td>
                      <td>{sat.time}</td>
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

export default Saturation;
