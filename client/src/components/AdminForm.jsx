import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addEntry } from "../redux/apiCalls";
import { useState } from "react";

const Form = styled.form`
  flex: 1;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 20px;
  background-color: ghostwhite;
`;
const Top = styled.div`
display: flex;
`
const InputTitle = styled.div`
  border: 1px solid black;
  display: inline-block;
  margin-right: 2px;
  padding: 5px;
`;
const Input = styled.input`
  padding: 5px;
`;
const Select = styled.select`
width: 100px;
padding: 5px;
`;
const Button = styled.button`
  background-color: darkolivegreen;
  border: none;
  padding: 10px;
  margin-left: 10px;
`;


const AdminForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const d = new Date();
  let date = d.getDate();

  const [inputs, setInputs] = useState({
    user: user.username,
    spent: 0,
    reserved: 0,
    by: "",
    date: date,
  });

  //set initialMeals per member as 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }

  const [meals, setMeals] = useState({ ...initialMeals });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleMeals = (e) => {
    setMeals((prev) => {
      return { ...prev, [e.target.name]: e.target.valueAsNumber };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalMeals = 0;
    for (const i in meals) {
      totalMeals += meals[i];
    }
    addEntry({ ...inputs, meals, totalMeals }, dispatch);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Submit Todays Entry</Title>
      <Top>
      <InputTitle>
        Money Spent:
        <Input
          style={{ width: "40px", outline: "none", border: "none" }}
          type="number"
          name="spent"
          value={inputs.spent}
          onChange={handleChange}
        />
      </InputTitle>
      <InputTitle>
        Reserved Money:
        <Input
          style={{ width: "40px", outline: "none", border: "none" }}
          type="number"
          name="reserved"
          value={inputs.reserved}
          onChange={handleChange}
        />
      </InputTitle>
      <Select name="by" value={inputs.by} onChange={handleChange} required>
        <option value="" disabled>
          By
        </option>
        {user.members.map((i) => (
          <option value={i}>{i}</option>
        ))}
      </Select>
      </Top>
      {user.members.map((i) => (
        <>
          <Input type="text" name="name" value={i} readOnly></Input>
          <Input
            style={{ width: "20%" }}
            type="number"
            name={i}
            value={meals[i]}
            onChange={handleMeals}
            required
          ></Input>
          <br />
        </>
      ))}
      <Button>Submit</Button>
    </Form>
  );
};

export default AdminForm;
