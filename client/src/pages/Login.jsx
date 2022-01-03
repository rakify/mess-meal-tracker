import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  align-items: center;
  justify-content: space-around;
  background-color: whitesmoke;
  ${mobile({ flexDirection: "column" })}
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
  border: 1px solid black;
  background-color: #daeeda;
`;
const ButtonOnLoad = styled.button`
  background-color: #04aa6d;
  width: 100px;
  border: none;
  color: white;
  padding: 5px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }).then((res) =>
      setError(res.request.responseText)
    );
  };

  return (
    <>
      <Topbar />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Login To Your Account</Legend>
          <Wrapper>
            {/* Input Fields */}
            <Input
              type="text"
              placeholder="Username *"
              onChange={(e) => setUsername(e.target.value)}
              minLength="3"
              required
            />
            <Input
              type={!show?"password":"text"}
              placeholder="Password *"
              minLength="4"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label>
              <input type="checkbox" onChange={() => setShow(!show)} />
              {show ? "Hide Password" : "Show Password"}
            </Label>

            {/* If Button is Loading */}
            {user.isFetching && (
              <ButtonOnLoad disabled>
                <i className="fa fa-spinner fa-spin"></i> Logging In
              </ButtonOnLoad>
            )}

            {/* Normal Button */}
            {!user.isFetching && <Button>Login</Button>}
          </Wrapper>



          {/* If Error Fetched By Server */}
          {error !== "" && (
            <Error
              style={{
                color: "#D8000C",
                backgroundColor: "#FFBABA",
              }}
            >
              {error.slice(1, -1)}
            </Error>
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
};

export default Login;
