import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Failed to fetch users: ${error.message}`);
        setLoading(false);
      });
  }, []); //the empty array where dependancys would normally go makes sure this only runs once

  if (loading) return <p>Loading users...</p>;
  if (error)
    return (
      <p>
        {error}
      </p>
    );

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Phone:</b> {user.phone}
            </p>
            <Link to={`/user-todos/${user.id}`}>Todo List</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Users;
