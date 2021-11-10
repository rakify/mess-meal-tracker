import { mobile } from "../responsive";
import { logout } from "../redux/apiCalls";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 10px;
  background-color: black;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  ${mobile({ padding: 0 })}
`;
const Nav = styled.div`
  margin-top: 60px;
  display: flex;
`;
const NavLeft = styled.span`
  flex: 9;
`;
const NavRight = styled.span`
  flex: 1;
`;
const Logout = styled.span`
  margin-left: 10px;
  color: red;
  cursor: pointer;
`;

const Topbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

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

  return (
    <>
      <Top>Mess Meal Tracker</Top>
      <Nav>
        {user && <NavLeft>Today is {month + " " + date + ", " + year}</NavLeft>}
        {user && (
          <NavRight>
            {user.username}
            <Logout onClick={() => logout(dispatch)}>(Logout)</Logout>
          </NavRight>
        )}
      </Nav>
    </>
  );
};

export default Topbar;
