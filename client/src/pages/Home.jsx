import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getEntry } from "../redux/apiCalls";
import { useEffect } from "react";
import { mobile } from "../responsive";
import Topbar from "../components/Topbar";
import EntryList from "../components/EntryList";
import FinalReport from "../components/FinalReport";
import AddMember from '../components/AddMember';
import { useParams } from "react-router";

const Container = styled.div`
`;
const Menu = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const  p = useParams();

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
  let monthId = p.month || d.getMonth();
  let year = p.year || d.getFullYear();

  console.log(monthId,year)

  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
  }, [user, dispatch, monthId, year]);


  return (
    <Container>
      <Topbar />
      {user.members.length===0 && <AddMember />}
      {user.members.length > 0 && (
        <>
          <Menu>
            <FinalReport />
          </Menu>
          <br />
          <br />
          <EntryList month={month} year={year} />
        </>
      )}
    </Container>
  );
};

export default Admin;