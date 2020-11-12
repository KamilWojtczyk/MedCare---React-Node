import React, { useState, useEffect } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [birth, setBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [stepcount, setStepcount] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
        setSex(user.sex);
        setBirth(user.birth);
        setHeight(user.height);
        setWeight(user.weight);
        setStepcount(user.stepcount);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          age,
          sex,
          birth,
          weight,
          height,
          stepcount,
        })
      );
    }
  };

  return (
    <>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading && <Loader />}

      {/* <Card className="mb-3 border-dark">
        <Card.Header as="h5">Personal Informations</Card.Header>
        <Card.Body> */}
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} variant="flush" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="confirmpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} variant="flush" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="age"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="sex">
            <Form.Label>Sex</Form.Label>
            <Form.Control
              type="sex"
              placeholder="Enter sex (female/male)"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="birth">
            <Form.Label>Birth</Form.Label>
            <Form.Control
              type="birth"
              placeholder="Enter birth"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} variant="flush" controlId="height">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="height"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="weight"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} variant="flush" controlId="stepcount">
            <Form.Label>Stepcount</Form.Label>
            <Form.Control
              type="stepcount"
              placeholder="Enter stepcount"
              value={stepcount}
              onChange={(e) => setStepcount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      {/* </Card.Body>
      </Card> */}
    </>
  );
};

export default ProfileScreen;
