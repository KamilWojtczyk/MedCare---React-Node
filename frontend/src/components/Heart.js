import React from "react";
import { Row, Col } from "react-bootstrap";

const Heart = ({ heartrate }) => {
  return (
    <>
      {heartrate.map((heart) => (
        <Row key={heart._id} className="text-center">
          <Col as="h5">Measurement: {heart.heart}</Col>
          <Col as="h5">Date: {heart.time}</Col>
        </Row>
      ))}
    </>
  );
};

export default Heart;
