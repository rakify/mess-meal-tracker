import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addEntry, getEntry } from "../redux/apiCalls";
import { useState, useEffect } from "react";
import EntryList from "../components/EntryList";
import FinalReport from "../components/FinalReport";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
`;
const Topbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 10px;
  background-color: black;
  color: white;
  ${mobile({padding:0})}
`;
const Navbar = styled.div`
  display: flex;
`;
const NavbarLeft = styled.span`
  flex: 9;
`;
const NavbarRight = styled.span`
  flex: 1;
`;

const Menu = styled.div`
display: flex;
${mobile({ flexDirection:"column" })}
`
const Form = styled.form`
flex:1;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 20px;
  background-color: ghostwhite;
`;
const Input = styled.input`
  padding: 10px;
`;
const Button = styled.button`
  background-color: darkolivegreen;
  border: none;
  padding: 10px;
  margin-left: 10px;
`;

const Select = styled.select`
width: 50%;
padding: 10px;
`

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    getEntry(dispatch);
  }, [dispatch]);

  const Month = [];
  Month[0] = "January";
  Month[1] = "February";
  Month[2] = "March";
  Month[3] = "April";
  Month[4] = "May";
  Month[5] = "June";
  Month[6] = "July";
  Month[7] = "August";
  Month[8] = "September";
  Month[9] = "October";
  Month[10] = "November";
  Month[11] = "December";
  const d = new Date();
  let month = Month[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  const [inputs, setInputs] = useState({
    user: user.username,
    cost: "",
    costBy: "",
    date: date,
  });
  const [meals, setMeals] = useState({
    Rakib: 0,
    Sakib: 0,
    Rakibul: 0,
    Hridoy: 0,
    Shawon: 0,
    Siam: 0,
    Limon: 0
  });
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
    <Container>
      <Topbar>Mess Meal Tracker</Topbar>
      <Navbar>
        <NavbarLeft>Today is {month + ", " + date + " " + year}</NavbarLeft>
        <NavbarRight>
          {user.username} <Link to="#">(Logout)</Link>
        </NavbarRight>
      </Navbar>
      <Menu>
      <Form onSubmit={handleSubmit}>
      <Title>Submit Today's Entry</Title>
        <Input
          placeholder="Cost"
          style={{ width: "15%", marginRight:"5px" }}
          type="number"
          name="cost"
          value={inputs.cost}
          onChange={handleChange} required
        ></Input>
        <Select name="costBy" value="" onChange={handleChange} required
        >
          <option value="" disabled>Spent By</option>
          <option value="Rakib">Rakib</option>
          <option value="Sakib">Sakib</option>
          <option value="Rakibul">Rakibul</option>
          <option value="Hridoy">Hridoy</option>
          <option value="Limon">Limon</option>
          <option value="Shawon">Shawon</option>
          <option value="Siam">Siam</option>
        </Select>
        <br />
        <Input type="text" name="name" value="Rakib" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Rakib"
          value={meals.Rakib}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Sakib" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Sakib"
          value={meals.Sakib}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Rakibul" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Rakibul"
          value={meals.Rakibul}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Hridoy" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Hridoy"
          value={meals.Hridoy}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Limon" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Limon"
          value={meals.Limon}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Siyam" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Siam"
          value={meals.Siam}
          onChange={handleMeals} required
        ></Input>
        <br />

        <Input type="text" name="name" value="Shawon" readOnly></Input>
        <Input
          style={{ width: "10%" }}
          type="number"
          name="Shawon"
          value={meals.Shawon}
          onChange={handleMeals} required
        ></Input>
        <br />
        <Button>Submit</Button>
      </Form>
      <FinalReport />
</Menu>

<br /><br />
      <EntryList month={month} />
    </Container>
  );
};

export default Home;
