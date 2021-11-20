import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

          {/* Input Fields */}
          <Input
            type="text"
            placeholder="Username *"
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            required
          />
          <Input
            type="password"
            placeholder="Password *"
            minLength="4"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* If Button is Loading */}
          {user.isFetching && (
            <ButtonOnLoad disabled>
              <i className="fa fa-spinner fa-spin"></i> Logging In
            </ButtonOnLoad>
          )}

          {/* Normal Button */}
          {!user.isFetching && <Button>Login</Button>}

          {/* If Error Fetched By Server */}
          {error !== "" && (
            <Error
              style={{
                color: "#D8000C",
                backgroundColor: "#FFBABA",
                backgroundImage: `url(${"https://i.imgur.com/GnyDvKN.png"})`,
              }}
            >
              {error.slice(1, -1)}
            </Error>
          )}

          {/* Validation from Client Side */}
          {(username.length <= 3 || password.length <= 4) && (
            <Error
              style={{
                color: "#00529B",
                backgroundColor: "#BDE5F8",
                backgroundImage: `url(${"https://i.imgur.com/ilgqWuX.png"})`,
              }}
            >
              {username.length <= 3 &&
                <div>* Username must be atleast 3 characters long.</div>}
              {password.length <= 4 &&
                <div>* Password must be atleast 4 characters long.</div>}
            </Error>
          )}
        </Fieldset>
      </Form>

      {/* Useful Links */}
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
      <hr style={{ width: "50%" }} />
    </>
  );
};

export default Login;
