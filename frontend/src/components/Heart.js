import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Nav, Table, Form, Button } from "react-bootstrap";
import {
  listPatientWithDataDetails,
  createPatientHeartrate,
} from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PATIENT_CREATE_HEARTRATE_RESET } from "../constants/patientConstants";
import { LinkContainer } from "react-router-bootstrap";

const Heart = ({ match }) => {
  const [chartData, setChartData] = useState({});

  const [heart, setHeart] = useState();
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patientDetailsWithData);
  const { loading, error, patientwithdata } = patient;

  let hearts = [];
  let times = [];
  for (const dataObj of patientwithdata.patient.heartrate) {
    hearts.push(parseInt(dataObj.heart));
    times.push(dataObj.time);
  }
  const chart = () => {
    setChartData({
      labels: times,
      datasets: [
        {
          label: "Heartrate",
          data: hearts,
          backgroundColor: ["#F0F8FF"],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(chart, []);

  const patientHeartrateCreate = useSelector(
    (state) => state.patientHeartrateCreate
  );
  const {
    success: successPatientHeartrate,
    error: errorPatientHeartrate,
  } = patientHeartrateCreate;

  useEffect(() => {
    if (successPatientHeartrate) {
      setHeart("");
      setTime("");
      dispatch({ type: PATIENT_CREATE_HEARTRATE_RESET });
    }
    dispatch(listPatientWithDataDetails(match.params.id));
  }, [dispatch, match, successPatientHeartrate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPatientHeartrate(match.params.id, { heart, time }));
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
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}`}
              >
                <Nav.Link eventKey="personal informations">
                  Personal Informations
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}/bloodpressure`}
              >
                <Nav.Link eventKey="bloodpressure">Blood Pressure</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/admin/patientlist/${patientwithdata.patient._id}/heartrate`}
              >
                <Nav.Link>Heart Rate</Nav.Link>
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
            <h2>Heart rate Measurement</h2>
            {errorPatientHeartrate && (
              <Message variant="danger">{errorPatientHeartrate}</Message>
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
                placeholder="Enter heart rate measure"
                value={heart}
                onChange={(e) => setHeart(e.target.value)}
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
            {patientwithdata.patient.heartrate.length === 0 ? (
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
                  {patientwithdata.patient.heartrate
                    .reverse()
                    .map((heartrate) => (
                      <tr key={heartrate._id}>
                        <td>{heartrate._id}</td>
                        <td>
                          {heartrate.heart >= 70 && heartrate.heart <= 100 ? (
                            <span style={{ color: "green" }}>
                              {heartrate.heart}bpm - the measurement is normal
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              {heartrate.heart}bpm- the measurement is below
                              normal
                            </span>
                          )}
                        </td>
                        <td>{heartrate.time}</td>
                      </tr>
                    ))}
                  {patientwithdata.data.map((datas) =>
                    datas.message.heartrate.map((heartrate) => (
                      <tr key={heartrate._id}>
                        <td>{datas.message.id}</td>
                        <td>
                          {heartrate.heart >= 70 && heartrate.heart <= 100 ? (
                            <span style={{ color: "green" }}>
                              {heartrate.heart}bpm - the measurement is normal
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              {heartrate.heart}bpm- the measurement is below
                              normal
                            </span>
                          )}
                        </td>
                        <td>{heartrate.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Heartrate measurement", display: true },
            scales: {
              yAxes: [
                {
                  tricks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
};

export default Heart;
