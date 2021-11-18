import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
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

export default function AddMember() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(2);
  const user = useSelector(state=>state.user.currentUser);

  let inputs = [];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user._id, inputs, dispatch);
  };

  let Inputs = [];
  for (let i = 0; i < count; i++) {
    Inputs.push(i);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Add Members</Legend>
          <Label>How Many Members?</Label>
          <Input
            type="number"
            value={count}
            min="2"
            onChange={(e) => setCount(e.target.value)}
            required
          />
          {Inputs.map((i) => (
            <div key={i}>
              <Label>Member {i + 1}</Label>
              <Input
                type="text"
                value={inputs[i]}
                onChange={(e)=>inputs[i]=e.target.value}
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
