import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getEntry } from "../redux/apiCalls";
import { useEffect } from "react";
import { mobile } from "../responsive";
import Topbar from "../components/Topbar";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import FinalReport from "../components/FinalReport";
import AddMember from "../components/AddMember";
// import MemberForm from "../components/MemberForm";

const Container = styled.div``;
const Menu = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Admin = () => {
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
  let date = d.getDate();
  let month = Month[d.getMonth()];
  let monthId = d.getMonth();
  let year = d.getFullYear();

  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
  }, [user, dispatch, monthId, year]);

  return (
    <Container>
      <Topbar />
      {user.members.length === 0 && <AddMember />}
      {user.members.length > 0 && (
        <>
          <Menu>
            {user && <EntryForm />}
            {/* {user && <MemberForm />} */}
          </Menu>
          <br />
          <br />
          <FinalReport />
          <EntryList month={month} date={date} />
        </>
      )}
    </Container>
  );
};

export default Admin;
