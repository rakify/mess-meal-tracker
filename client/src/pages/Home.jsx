import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getEntry, getUser } from "../redux/apiCalls";
import { useEffect } from "react";
import { mobile } from "../responsive";
import Topbar from "../components/Topbar";
import EntryList from "../components/EntryList";
import FinalReport from "../components/FinalReport";
import UpdateUser from '../components/UpdateUser';
import { useParams } from "react-router";

const Container = styled.div`
`;
const Menu = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const  p = useParams();

  const d = new Date();
  let monthId = p.monthId?p.monthId:d.getMonth();
  let year = p.year?p.year:d.getFullYear();


  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
  }, [user, dispatch, monthId, year]);

  useEffect(()=>{
    getUser(user.username, dispatch);
  }, [user.username, dispatch])

  return (
    <Container>
      <Topbar />
      {user.members.length===0 && <UpdateUser />}
      {user.members.length > 0 && (
        <>
          <Menu>
            <FinalReport />
          </Menu>
          <br />
          <br />
          <EntryList monthId={monthId} year={year} />
        </>
      )}
    </Container>
  );
};

export default Home;