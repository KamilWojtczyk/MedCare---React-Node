import React, { useEffect } from "react";
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
import {
  listPatients,
  deletePatient,
  createPatient,
} from "../actions/patientActions";
import { PATIENT_CREATE_RESET } from "../constants/patientConstants";

const PatientListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

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
      dispatch(listPatients());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdPatient,
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
      <Row className="align-items-center">
        <Col>
          <h1>Patients List</h1>
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
        <ListGroup>
          <ListGroupItem className="border-dark">
            {patients.map((patient) => (
              <Row key={patient._id} className="align-items-center">
                {patient.isArchived ? (
                  <>
                    <Col>
                      <Card className="my-3 p-3 border-dark rounded patient-item">
                        <Link
                          style={{ background: "#dddddd" }}
                          className="disabled-link"
                          to={`/admin/patientlist/${patient._id}`}
                        >
                          <Row>
                            <Col
                              md="auto"
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Name: {patient.name}
                            </Col>
                            <Col
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Age: {patient.age}
                            </Col>
                            <Col
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Sex: {patient.sex}
                            </Col>
                            <Col
                              md="auto"
                              as="h5"
                              className="text-center patient-item-Col"
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
                      <Card className="my-3 p-3 border-dark rounded patient-item">
                        <Link to={`/admin/patientlist/${patient._id}`}>
                          <Row>
                            <Col
                              md="auto"
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Name: {patient.name}
                            </Col>
                            <Col
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Age: {patient.age}
                            </Col>
                            <Col
                              as="h5"
                              className="text-center patient-item-Col"
                            >
                              Sex: {patient.sex}
                            </Col>
                            <Col
                              md="auto"
                              as="h5"
                              className="text-center patient-item-Col"
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
                    <Button id="button" variant="secondary" className="btn-sm">
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
      )}
    </>
  );
};

export default PatientListScreen;
