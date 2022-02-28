import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/apiCalls";
import { updateKey } from "./../redux/apiCalls";

const Form = styled.form`
  flex: 1;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 20px;
  background-color: ghostwhite;
`;
const Input = styled.input`
  outline: none;
  margin-bottom: 10px;
  padding: 2px;
  text-transform: capitalize;
`;
const Label = styled.label`
  color: #132513;
  font-weight: bolder;
`;
const Button = styled.button`
  background-color: #132513;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

const Error = styled.div`
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
  cursor: pointer;
`;
const Info = styled.div`
  color: #059;
  background-color: #bef;
  display: inline-block;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  text-transform: capitalize;
`;

export default function UpdateUser({ admin }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    email: user.email,
    key: "",
    member: ""
  });
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("Set Key");
  const [keyResult, setKeyResult] = useState();
  const [next, setNext] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let members = user.members;
    if(inputs.member.length>0) members = [...members, inputs.member];
    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      members: members,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) => {
      setError(res.request);
    });
  };

  const requestKey = (e) => {
    e.preventDefault();
    setConfirm(`Please Wait..`);
    updateKey(user._id).then((res) => setKeyResult(res.request));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>Update Information</Title>
        <br />
        {/* If Error Fetched By Server */}
        {error && error.status === 200 && (
          <Error
            style={{
              color: "#270",
              backgroundColor: "#DFF2BF",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "3px 3px 3px 3px",
            }}
          >
            🌟 User Updated Successfully.
          </Error>
        )}
        {error && error.status !== 200 && (
          <Error
            style={{
              color: "#D8000C",
              backgroundColor: "#FFBABA",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "3px 3px 3px 3px",
            }}
          >
            ☹ {error.responseText.slice(1, -1)}
          </Error>
        )}
        {/* When theres no member available also no key to update them */}
        {!next && user.members.length === 0 && (
          <>
            Welcome and hope you are the manager since you're registering.
            <br />
            ⍟ First step is to set a key which will be required to update
            anything here and will only be available to the manager who holds
            the email associate with this account.
            <br />
            ⍟ If you already have the key please proceed to next.
            <br />
            {keyResult ? (
              <Info>{keyResult.responseText.slice(1, -1)}</Info>
            ) : (
              <Button onClick={(e) => requestKey(e)}>{confirm}</Button>
            )}
            {/* Manager already got the key so wants to proceed next */}
            <br />
            <Button
              style={{ position: "fixed", right: "0" }}
              onClick={() => setNext(true)}
            >
              Next ➽
            </Button>
          </>
        )}

        {/* When theres members available or has a key and manager wants to add member */}
        {(user.members.length > 0 || next) && (
          <>
            {next ? <Label>Add Yourself: </Label> : <Label>Members: </Label>}
            {user.members.map((i) => i + ", ")}
            <Input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="member"
              maxLength="20"
              placeholder={next ? "Name" : "Add Another.."}
              value={inputs?.member}
              onChange={(e) => handleChange(e)}
            />
            {!next && (
              <>
                <br />
                <Label>Manager Email Address: </Label>
                <Input
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  name="email"
                  maxLength="100"
                  value={inputs?.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </>
            )}
            <br />
            <Label>Your Access Key: </Label>
            <Input
              style={{
                outline: "none",
                fontSize: "12px",
                width: "50px",
              }}
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="key"
              value={inputs?.key}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <Button
              disabled={
                inputs.member.length === 0 && inputs.email === user.email
              }
            >
              Update
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
