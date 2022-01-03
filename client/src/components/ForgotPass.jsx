import styled from "styled-components";
import { useState } from "react";
import { forgotPass, resetPass } from "../redux/apiCalls";
import { useParams } from "react-router";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";

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
const Label = styled.label`
  font-style: italic;
  color: #064e06;
`;
const Input = styled.input`
  outline: none;
  margin-bottom: 10px;
  padding: 10px;
  width: 30%;
  `;
const Button = styled.button`
  width: 100px;
  padding: 5px;
  border: 1px solid black;
  background-color: #daeeda;
`;
const Success = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: #270;
  background-color: #dff2bf;
`;
const Error = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: #d8000c;
  background-color: #ffbaba;
`;

const ForgotPass = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);
  const [res, setRes] = useState();
  const { token, userId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    email && forgotPass(email.toLocaleLowerCase()).then((res) => setRes(res));
    password && resetPass(password, userId, token).then((res) => setRes(res));
  };

  return (
    <>
      <Topbar />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>{title}</Legend>

          {!token && !userId && (
            <>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                disabled={
                  email.length > 0 && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                }
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </>
          )}
          {token && userId && (
            <>
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={password}
                minLength="4"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                type={show ? "text" : "password"}
                name="password2"
                value={password2}
                minLength="4"
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <Label>
                <Input type="checkbox" onChange={() => setShow(!show)} />
                {show ? "Hide Password" : "Show Password"}
              </Label>
              {password !== password2 && (
                <span style={{ color: "red", fontSize: "10px" }}>
                  ☹ Passwords doesn't match!
                </span>
              )}
              {(password.length < 4 || password2.length < 4) && (
                <span style={{ color: "red", fontSize: "10px" }}>
                  ✯ Password must be at least 4 characters long!
                </span>
              )}

              <Button
                disabled={
                  password !== password2 ||
                  password.length < 4 ||
                  password2.length < 4
                }
              >
                Submit
              </Button>
            </>
          )}

          {/* If Error Fetched By Server or Client */}
          {res && res.status === 200 && <Success>🌟 {res.data}</Success>}
          {res && res.status !== 200 && <Error>☹ {res.data}</Error>}
          {email.length > 0 && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
            <Error>☹ Invalid email!</Error>
          )}
        </Fieldset>
      </Form>

      {/* Useful Links */}
      <hr style={{ width: "50%" }} />
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
        ✿ REGISTER HERE
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
        ✿ LOGIN HERE
      </Link>
      <hr style={{ width: "50%" }} />
    </>
  );
};

export default ForgotPass;
