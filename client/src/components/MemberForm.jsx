import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/apiCalls";

const Form = styled.form`
  flex: 1;
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
`;
const Input = styled.input`
  outline: none;
  margin-bottom: 10px;
`;
const Label = styled.label``;
const Button = styled.button`
  background-color: #daeeda;
`;

export default function MemberForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [members, setMembers] = useState(user.members);

  const handleChange = (e) => {
    setMembers(e.target.value);
  };

  const handleSubmit = () => {
    const memberArray = members.split(',');
    updateUser(user._id, memberArray, dispatch);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Update Members</Legend>
          <Label>Members: </Label>
          <Input type="text" name="member" value={members} onChange={(e)=>handleChange(e)} />
          <Button>Update</Button>
        </Fieldset>
      </Form>
    </>
  );
}
