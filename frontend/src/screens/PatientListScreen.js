import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  ListGroupItem,
  ListGroup,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Paginate from "../components/Paginate";
import {
  listPatients,
  deletePatient,
  createPatient,
} from "../actions/patientActions";
import { PATIENT_CREATE_RESET } from "../constants/patientConstants";

const PatientListScreen = ({ match, history }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients, page, pages } = patientList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDelete = useSelector((state) => state.patientDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = patientDelete;

  const patientCreate = useSelector((state) => state.patientCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    patient: createdPatient,
  } = patientCreate;

  useEffect(() => {
    dispatch({ type: PATIENT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/patient/${createdPatient._id}/edit`);
    } else {
      dispatch(listPatients(keyword, pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdPatient,
    keyword,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePatient(id));
    }
  };
  const createPatientHandler = () => {
    dispatch(createPatient());
  };

  return (
    <>
      <h1>Patients List</h1>
      <Row className="align-items-center">
        <Col>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createPatientHandler}>
            <i className="fas fa-plus"></i> Create Patient
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ListGroup>
            <ListGroupItem className="border-dark">
              {patients.map((patient) => (
                <Row key={patient._id} className="align-items-center">
                  {patient.isArchived ? (
                    <>
                      <Col>
                        <Card className="my-2  border-dark rounded patient-item">
                          <Link
                            style={{ background: "#dddddd" }}
                            className="disabled-link"
                            to={`/admin/patientlist/${patient._id}`}
                          >
                            <Row className="d-flex justify-content-between align-items-center">
                              <Col
                                as="h5"
                                className="aside text-left patient-item-Col"
                              >
                                Name: {patient.name}
                              </Col>
                              <Col
                                as="h5"
                                className="aside text-center patient-item-Col"
                              >
                                Sex: {patient.sex}
                              </Col>
                              <Col
                                as="h5"
                                className="aside text-center patient-item-Col"
                              >
                                Birth: {patient.birth}
                              </Col>
                            </Row>
                          </Link>
                        </Card>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col>
                        <Card className="my-2  border-dark rounded patient-item">
                          <Link to={`/admin/patientlist/${patient._id}`}>
                            <Row className="d-flex justify-content-between align-items-center">
                              <Col
                                as="h5"
                                className="text-left patient-item-Col"
                              >
                                Name: {patient.name}
                              </Col>
                              <Col
                                as="h5"
                                className="text-center patient-item-Col"
                              >
                                Sex: {patient.sex}
                              </Col>
                              <Col
                                as="h5"
                                className="text-right patient-item-Col"
                              >
                                Birth: {patient.birth}
                              </Col>
                            </Row>
                          </Link>
                        </Card>
                      </Col>
                    </>
                  )}
                  <Col md="auto" className="text-right">
                    <LinkContainer to={`/admin/patient/${patient._id}/edit`}>
                      <Button
                        id="editbutton"
                        variant="secondary"
                        className="btn-sm"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(patient._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              ))}
            </ListGroupItem>
          </ListGroup>
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
      )}
    </>
  );
};

export default PatientListScreen;
