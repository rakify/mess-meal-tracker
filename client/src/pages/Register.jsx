import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, register } from "./../redux/apiCalls";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Form = styled.form``;
const Fieldset = styled.fieldset`
  border: 1px solid grey;
`;
const Legend = styled.legend`
  font-weight: bolder;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: whitesmoke;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-bottom: 3px;
`;
const Input = styled.input`
  outline: none;
  width: 30%;
  margin: 10px;
  padding: 10px;
`;
const Error = styled.span`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: #059;
  background-color: #bef;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    register(user).then((res) => setError(res.request));
    login(dispatch, { username: user.username, password: user.password });
  };

  return (
    <>
      <Topbar />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Create Account</Legend>
          <Wrapper>
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
              type={!show?"password":"text"}
              name="password"
              placeholder="Password *"
              onChange={handleChange}
              minLength="4"
              required
            />
            <Label>
              <input type="checkbox" onChange={() => setShow(!show)} />
              {show ? "Hide Password" : "Show Password"}
            </Label>

            <Button disabled={user.isFetching}>Register</Button>
          </Wrapper>
          {/* Fetching Error from Server Side */}
          {error !== "" && (
            <Error style={{ color: "#D8000C", backgroundColor: "#FFBABA" }}>
             ☹ Username or email already exists!
            </Error>
          )}

          {/* VALIIDATION from Client Side */}
          {(inputs.username.length < 3 ||
            inputs.password.length < 4 ||
            !inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) && (
            <Error>
              {inputs.username.length < 3 && (
                <>
                  ✯ Username must be atleast 3 characters long. <br />
                </>
              )}
              {inputs.password.length < 4 && (
                <>
                  ✯ Password must be atleast 4 characters long.
                  <br />
                </>
              )}
              {!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                <>✯ Email address must be valid.</>
              )}
            </Error>
          )}
        </Fieldset>
      </Form>

      {/* USEFULL LINKS */}
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
        ✿ LOGIN HERE
      </Link>
      <hr style={{ width: "50%" }} />
      <Link
        to="/forgot_pass"
        style={{
          margin: "30%",
          width: "50%",
          fontSize: "12px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        ✿ FORGOT PASSWORD
      </Link>
      <hr style={{ width: "50%" }} />
    </>
  );
}
