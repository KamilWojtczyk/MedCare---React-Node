import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <Card className="my-3 p-3 border-dark rounded user-item">
      <Link to={`/users/${user.id}`}>
        <Row>
          <Col as="h5" className="user-item-Col">
            Name: {user.name}
          </Col>
          <Col as="h5" className="user-item-Col">
            Age: {user.age}
          </Col>
          <Col as="h5" className="user-item-Col">
            Sex: {user.sex}
          </Col>
          <Col as="h5" className="user-item-Col">
            Birth: {user.birth}
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default UserItem;
