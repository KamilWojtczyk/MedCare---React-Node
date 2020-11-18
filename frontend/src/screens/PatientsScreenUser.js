import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroupItem, ListGroup } from "react-bootstrap";
import PatientItem from "../components/PatientItem";
import { listPatients } from "../actions/patientActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const PatientsScreenUser = () => {
  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

  useEffect(() => {
    dispatch(listPatients());
  }, [dispatch]);

  return (
    <>
      <h1>Patients list</h1>
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
    </>
  );
};

export default PatientsScreenUser;
