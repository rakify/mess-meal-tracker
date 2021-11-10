import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';


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
const Label = styled.label`
`;
const Input = styled.input`
  outline: none;
  width: 10%;
  margin-bottom: 10px;
`;
const Button = styled.button`
  width: 10%;
  background-color: #daeeda;
`;



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
    <Topbar />
    <Form onSubmit={handleSubmit}>
      <Fieldset><Legend>Login To Your Account</Legend>
      <Label>Username</Label>
      <Input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Label>Password</Label>
      <Input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button>
        Login
      </Button>
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
    to="/register"
    style={{
      margin: "30%",
      width: "50%",
      fontSize: "12px",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    REGISTER HERE
  </Link>
  <hr style={{width:"50%"}} />
</>
  );
};

export default Login;
