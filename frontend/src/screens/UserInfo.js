import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Card, Col } from "react-bootstrap";
import Blood from "../components/Blood";
import Heart from "../components/Heart";
import BloodSugar from "../components/BloodSugar";
import Saturation from "../components/Saturation";
import axios from 'axios';

const UserInfo = ({ match }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users/${match.params.id}`)

      setUser(data)
    }

    fetchUser()
  }, [match.params.id])
  return (
    <>
      <Link className="btn btn-dark my-3" to="/users">
        Go Back
      </Link>
      <Card className="mb-3 border-dark">
        <Card.Header as="h5">Personal Informations</Card.Header>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Name</Form.Label>
                <Form.Control as="elementType">{user.name}</Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Age</Form.Label>
                <Form.Control as="elementType">{user.age}</Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Sex</Form.Label>
                <Form.Control as="elementType">{user.sex}</Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Birth</Form.Label>
                <Form.Control as="elementType">{user.birth}</Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Weight</Form.Label>
                <Form.Control as="elementType">{user.weight}kg</Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Height</Form.Label>
                <Form.Control as="elementType">{user.height}cm</Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Step Count</Form.Label>
                <Form.Control as="elementType">{user.stepcount}</Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Blood Pressure</Form.Label>
                <Form.Control as="elementType">
                  {/* {user.bloodpressure} */}
                  /min
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Heart Rate</Form.Label>
                <Form.Control as="elementType">
                  {/* {user.heartrate[0]}/min */}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Blood Sugar</Form.Label>
                <Form.Control as="elementType">
                  {/* {user.bloodsugar[0]}mg/dL */}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} variant="flush">
                <Form.Label as="h5">Saturation </Form.Label>
                <Form.Control as="elementType">
                  {/* {user.saturation[0]}% */}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mb-3 border-dark">
        <Card.Header as="h5">Blood Pressure</Card.Header>
        <Card.Body>
          <Blood bloodpressure={user.bloodpressure} />
        </Card.Body>
      </Card>
      <Card className="mb-3 border-dark">
        <Card.Header as="h5">Heart Rate</Card.Header>
        <Card.Body>
          <Heart heartrate={user.heartrate} />
        </Card.Body>
      </Card>
      <Card className="mb-3 border-dark">
        <Card.Header as="h5">Blood Sugar</Card.Header>
        <Card.Body>
          <BloodSugar bloodsugar={user.bloodsugar} />
        </Card.Body>
      </Card>
      <Card className="mb-3 border-dark">
        <Card.Header as="h5">Saturation</Card.Header>
        <Card.Body>
          <Saturation saturation={user.saturation} />
        </Card.Body>
      </Card>
    </>
  );
};

export default UserInfo;
