import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./../redux/apiCalls";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addUser = async (user) => {
    try {
      await axios.post(`/auth/register`, user);
      login(dispatch, { username: user.username, password: user.password });
    } catch (err) {
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    addUser(user);
  };

  return (
    <>
      Create a New Account
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          minLength="3"
          maxLength="30"
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          minLength="4"
          required
        />
        <br />
        {error && <>Email or Username already exists</>}

        <button>Register</button>
      </form>
      <Link
        to="/forgot-password"
        style={{
          margin: "5px 0",
          width: "50%",
          fontSize: "12px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        FORGOT PASSWORD?
      </Link>
      <hr />
      <Link
        to="/register"
        style={{
          margin: "5px 0",
          width: "50%",
          fontSize: "12px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        LOGIN HERE
      </Link>
      <hr />
    </>
  );
}
