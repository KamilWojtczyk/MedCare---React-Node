import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBoxUsers from "../components/SearchBoxUsers";
import Paginate from "../components/Paginate";
import { ListGroupItem, ListGroup, Row, Col } from "react-bootstrap";
import PatientItem from "../components/PatientItem";
import { listPatients } from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const PatientsScreenUser = ({ match, history }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients, page, pages } = patientList;

  useEffect(() => {
    dispatch(listPatients(keyword, pageNumber));
  }, [dispatch, history, keyword, pageNumber]);

  return (
    <>
      <h1>Patients list</h1>
      <Row className="align-items-center">
        <Col>
          <Route
            render={({ history }) => <SearchBoxUsers history={history} />}
          />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup>
          <ListGroupItem className="border-dark">
            {patients.map((patient) => (
              <PatientItem key={patient._id} patient={patient} />
            ))}
          </ListGroupItem>
        </ListGroup>
      )}
      <Row>
        <Col></Col>
        <Col>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default PatientsScreenUser;
