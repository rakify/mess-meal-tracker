import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./../redux/apiCalls";
import axios from "axios";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Form = styled.form``;
const Fieldset = styled.fieldset`
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
`;
const Legend = styled.legend`
  font-weight: bolder;
`;
const Input = styled.input`
  outline: none;
  width: 30%;
  margin-bottom: 10px;
  padding: 10px;
`;
const Error = styled.div`
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
  white-space: pre-line;
`;
const Button = styled.button`
  width: 100px;
  padding: 5px;
  background-color: #daeeda;
`;

export default function Register() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  const user = useSelector((state) => state.user);

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

{/* INPUT FIELDS */}

          <Input
            type="text"
            placeholder="Username *"
            name="username"
            onChange={handleChange}
            minLength="3"
            maxLength="30"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email *"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password *"
            onChange={handleChange}
            minLength="4"
            required
          />
          <Button disabled={user.isFetching}>Register</Button>

{/* ERROR VALIIDATION */}

          {user.error && (
            <Error style={{ color: "#D8000C",
              backgroundColor: "#FFBABA",
              backgroundImage: `url(${"https://i.imgur.com/GnyDvKN.png"})` }}>
              Username or Email Already Exists!
            </Error>
          )}

          {(inputs.username.length <= 3 ||
            inputs.password.length <= 4 ||
            !inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) && (
            <Error
              style={{
                color: "#9F6000",
                backgroundColor: "#FEEFB3",
                backgroundImage: `url(${"https://i.imgur.com/Z8q7ww7.png"})`,
              }}
            >
              {inputs.username.length <= 3 &&
                `* Username must be atleast 3 characters long.\n`}
              {inputs.password.length <= 4 &&
                `* Password must be atleast 4 characters long.\n`}
              {!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
                "* Email address must be valid."}
            </Error>
          )}


        </Fieldset>
      </Form>

{/* USEFULL LINKS */}
      
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
      <hr style={{ width: "50%" }} />
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
      <hr style={{ width: "50%" }} />
    </>
  );
}
