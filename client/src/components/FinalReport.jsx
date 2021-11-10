import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
`;
const MAINTABLE = styled.table`
  width: 100%;
  height: 20px;
  border: 1px solid gainsboro;
`;
const TABLE = styled.table`
  border: 1px solid #cad4e0;
  margin: 0.5px;
  width: 100%;
  height: 30px;
  &:nth-child(odd) {
    background-color: #cad4e0;
  }
`;
const CAPTION = styled.caption`
  font-weight: bolder;
  display: inline;
`;

const TBODY = styled.tbody``;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: normal;
`;
const TD = styled.td`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FinalReport = () => {
  const entries = useSelector((state) => state.data.entries);
  const user = useSelector((state) => state.user.currentUser);
  let allMeals = 0,
    allSpent = 0,
    allReserved = 0;

  // set initialMeals per member to 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }

  // set initialReserved per member to 0
  let initialReserved = {};
  for (let i = 0; i < user.members.length; i++) {
    initialReserved[user.members[i]] = 0;
  }
  console.log(initialMeals["Rakib"]);

  for (const i in entries) {
    const by = entries[i].by;
    initialReserved[by] += entries[i].reserved;
    allMeals += entries[i].totalMeals;
    allSpent += entries[i].spent;
    allReserved += entries[i].reserved;
    for (let j = 0; j < user.members.length; j++) {
      initialMeals[user.members[j]] += entries[i].meals[user.members[j]];
    }
  }
  let mealRate = allSpent / allMeals;

  return (
    <Container>
      <MAINTABLE>
        <CAPTION>Final Calculation</CAPTION>
        <TBODY>
          <TR>
            <TH>Total Meals</TH>
            <TH>Total Spent</TH>
            <TH>Total Reserve</TH>
            <TH>Meal Rate</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{allMeals}</TD>
            <TD>{allSpent}</TD>
            <TD>{allReserved}</TD>
            <TD>{mealRate.toFixed(2)}</TD>
          </TR>
        </TBODY>
      </MAINTABLE>
      <br />
      {user.members.map(i=> (<TABLE>
        <CAPTION>{i}</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Reserved</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{initialMeals[i]}</TD>
            <TD>{initialReserved[i]}</TD>
            <TD>{(initialReserved[i] - initialMeals[i] * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>))}
    </Container>
  );
};

export default FinalReport;
