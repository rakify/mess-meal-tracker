import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./../redux/apiCalls";
import axios from "axios";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Form = styled.form`

`;
const Fieldset = styled.fieldset`
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
`;
const Legend = styled.legend`
font-weight: bolder;
`
const Input = styled.input`
  outline: none;
  width: 90px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  width: 100px;
  background-color: #daeeda;
`;
const Label = styled.label`
`;

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
    <Topbar />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Create Account</Legend>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            onChange={handleChange}
            minLength="3"
            maxLength="30"
            required
          />
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            minLength="4"
            required
          />
          {error && <>Email or Username already exists</>}

          <Button>Register</Button>
        </Fieldset>
      </Form>
      <Link
        to="/#"
        style={{
          margin: "30%",
          width: "50%",
          fontSize: "12px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        FORGOT PASSWORD?
      </Link>
      <hr style={{width:"50%"}} />
      <Link
        to="/login"
        style={{
          margin: "30%",
          width: "50%",
          fontSize: "12px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        LOGIN HERE
      </Link>
      <hr style={{width:"50%"}} />
    </>
  );
}
