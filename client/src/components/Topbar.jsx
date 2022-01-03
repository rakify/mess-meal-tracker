import { mobile } from "../responsive";
import { logout } from "../redux/apiCalls";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding-bottom: 10px;
  background-color: #71cad0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-family: 'CoreCircus', sans-serif;
	text-transform: uppercase;
	line-height: 1;
	margin: 0;
	color: #61c0c8;
	text-shadow: 1px 0px 0px #67c2c5,
		0px 1px 0px #67c2c5,
		2px 1px 0px #67c2c5,
		1px 2px 0px #67c2c5,
		3px 2px 0px #67c2c5,
		2px 3px 0px #67c2c5,
		4px 3px 0px #67c2c5,
		3px 4px 0px #67c2c5,
		5px 4px 0px #67c2c5,
		4px 5px 0px #67c2c5,
		6px 5px 0px #67c2c5,
		5px 6px 0px #67c2c5,
		7px 6px 0px #67c2c5,
		6px 7px 0px #67c2c5;

  ${mobile({ padding: 0 })}

	&:before,&:after {
		content: attr(data-heading);
		position: absolute;
		overflow: hidden;
		left: 0;
		top: 0;
	}
	&:before {
		color: white;
		width: 100%;
		z-index: 5;
		font-family: 'CoreCircus2DIn';
		font-weight: normal;
	}
	&:after {
		z-index: -1;
		text-shadow: 
			-1px -1px 0 white,
			1px -1px 0 white, 
			-1px 1px 0 white, 
			1px 1px 0 white, 
			-3px 3px 2px #6c9d9e, 
			-5px 5px 2px #6c9d9e,
			-7px 7px 2px #6c9d9e,
			-8px 8px 2px #6c9d9e,
			-9px 9px 2px #6c9d9e,
			-11px 11px 2px #6c9d9e;
	}
`;
const Nav = styled.div`
  margin-top: 50px;
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
      <Top><Link to="/" style={{textDecoration:"none", color:"white"}}>
        Mess Meal Tracker
      </Link></Top>
       <Nav>
        {user && <NavLeft>Today is {month + " " + date + ", " + year}</NavLeft>}
        {user && (
          <NavRight>
          <Link to="/admin" style={{textDecoration:"none", color: "black", cursor: "pointer"}}>{user.username}</Link>
            <Logout onClick={() => logout(dispatch)}>(Logout)</Logout>
          </NavRight>
        )}
      </Nav>
      <br />
    </>
  );
};

export default Topbar;