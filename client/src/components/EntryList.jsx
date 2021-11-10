import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  height: 500px;
`;
const TABLE = styled.table`
  border: 1px solid green;
  width: 100%;
`;
const CAPTION = styled.caption`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
`;

const TBODY = styled.tbody`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  text-align: left;
  border-bottom: 1px solid black;
  padding: 10px;
`;
const TD = styled.td`
  flex: 1;
  text-align: left;
  padding: 10px;
`;

export default function EntryList(props) {
  const entries = useSelector((state) => state.data.entries);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <TABLE>
        <CAPTION>{props.month} Report</CAPTION>
        <TBODY>
          <TR>
            <TH>Date</TH>
            <TH>Spent</TH>
            <TH>Reserved</TH>
            <TH>By</TH>
            {user.members.map((i) => (
              <TH>{i}</TH>
            ))}
            <TH>Daily Total</TH>
          </TR>
        </TBODY>
        {entries.length > 0 &&
          entries.map((item) => (
            <TBODY key={item?._id}>
              <TR>
                <TD>{item?.date}</TD>
                <TD>{item?.spent}</TD>
                <TD>{item?.reserved}</TD>
                <TD>{item?.by}</TD>
                {user.members.map(i=>
                <TD>{item.meals[`${i}`]}</TD>)}
                <TD>{item?.totalMeals}</TD>
              </TR>
            </TBODY>
          ))}
      </TABLE>
    </Container>
  );
}
