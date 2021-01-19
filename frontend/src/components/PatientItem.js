import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "./PatientItem.css";

const PatientItem = ({ patient }) => {
  return (
    <Col>
      <Card className="my-2  border-dark rounded patient-item">
        <Link
          className="disabled-link"
          to={`/admin/patientlist/${patient._id}`}
        >
          <Row className="d-flex justify-content-between align-items-center">
            <Col as="h5" className="text-left patient-item-Col">
              Name: {patient.name}
            </Col>
            <Col as="h5" className="text-center patient-item-Col">
              Sex: {patient.sex}
            </Col>
            <Col as="h5" className="text-right patient-item-Col">
              Birth: {patient.birth}
            </Col>
          </Row>
        </Link>
      </Card>
    </Col>
  );
};

export default PatientItem;
