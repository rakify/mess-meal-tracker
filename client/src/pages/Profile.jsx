import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, React } from "react";
import { updateUser } from "../redux/apiCalls";

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
  width: 10%;
  margin-bottom: 10px;
`;
const Label = styled.label``;
const Button = styled.button`
  width: 10%;
  background-color: #daeeda;
`;

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);
  const [count, setCount] = useState(user.members.length);
  const [inputs, setInputs] = useState(user.members);

  const Inputs = [...Array(count+1).keys()];

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user._id, inputs, dispatch);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Add a New Member</Legend>          
          {Inputs.map((i) => (
            <div key={i}>
              <Label>Member {i + 1}</Label>
              <Input
                type="text"
                value={inputs[i]?inputs[i]:""}
                onChange={(e)=>setInputs(inputs.push(e.target.value))}
                minLength="3"
                maxLength="30"
                required
              />
            </div>
          ))}
          <Button>Add</Button>
        </Fieldset>
      </Form>
    </>
  );
}