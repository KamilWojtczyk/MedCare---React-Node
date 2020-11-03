import React, { useState, useEffect } from "react";
import { ListGroupItem, ListGroup } from "react-bootstrap";
import UserItem from "../components/UserItem";
import axios from 'axios';

const UsersScreen = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users')

      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <>
      <h1>Patients list</h1>
      <ListGroup>
        <ListGroupItem className="border-dark">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default UsersScreen;
