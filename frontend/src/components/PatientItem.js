import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "./PatientItem.css";

const PatientItem = ({ patient }) => {
  return (
    <Card className="my-3 p-3 border-dark rounded user-item">
      <Link to={`/admin/patientlist/${patient._id}`}>
        <Row>
          <Col as="h5" className="user-item-Col">
            Name: {patient.name}
          </Col>
          <Col as="h5" className="user-item-Col">
            Age: {patient.age}
          </Col>
          <Col as="h5" className="user-item-Col">
            Sex: {patient.sex}
          </Col>
          <Col as="h5" className="user-item-Col">
            Birth: {patient.birth}
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default PatientItem;
