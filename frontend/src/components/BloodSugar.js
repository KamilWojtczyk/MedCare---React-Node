import React from "react";
import { Row, Col } from "react-bootstrap";

const BloodSugar = ({ bloodsugar }) => {
  return (
    <>
      {bloodsugar.map((sugar) => (
        <Row key={sugar._id} className="text-center">
          <Col as="h5">Measurement: {sugar.bloodsugar}</Col>
          <Col as="h5">Date: {sugar.time}</Col>
        </Row>
      ))}
    </>
  );
};

export default BloodSugar;
