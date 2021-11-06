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
  margin: .5px;
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
  let allMeals = 0,
    allCosts = 0,
    rakibMeals = 0,
    rakibSpent = 0,
    sakibMeals = 0,
    sakibSpent = 0,
    rakibulMeals = 0,
    rakibulSpent = 0,
    hridoyMeals = 0,
    hridoySpent = 0,
    limonMeals = 0,
    limonSpent = 0,
    siamMeals = 0,
    siamSpent = 0,
    shawonMeals = 0,
    shawonSpent = 0;
  for (const i in entries) {
    rakibMeals += entries[i].meals.Rakib;
    sakibMeals += entries[i].meals.Sakib;
    rakibulMeals += entries[i].meals.Rakibul;
    hridoyMeals += entries[i].meals.Hridoy;
    limonMeals += entries[i].meals.Limon;
    siamMeals += entries[i].meals.Siam;
    shawonMeals += entries[i].meals.Shawon;
    entries[i].costBy === "Rakib"
      ? (rakibSpent += entries[i].cost)
      : entries[i].costBy === "Sakib"
      ? (sakibSpent += entries[i].cost)
      : entries[i].costBy === "Rakibul"
      ? (rakibulSpent += entries[i].cost)
      : entries[i].costBy === "Hridoy"
      ? (hridoySpent += entries[i].cost)
      : entries[i].costBy === "Limon"
      ? (limonSpent += entries[i].cost)
      : entries[i].costBy === "Siam"
      ? (siamSpent += entries[i].cost)
      : entries[i].costBy === "Shawon"
      ? (shawonSpent += entries[i].cost)
      : (shawonSpent += 0);
    allMeals += entries[i].totalMeals;
    allCosts += entries[i].cost;
  }
  let mealRate = allCosts / allMeals;

  return (
    <Container>
      <MAINTABLE>
        <CAPTION>Final Calculation</CAPTION>
        <TBODY>
          <TR>
            <TH>Total Meals</TH>
            <TH>Total Costs</TH>
            <TH>Meal Rate</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{allMeals}</TD>
            <TD>{allCosts}</TD>
            <TD>{mealRate}</TD>
          </TR>
        </TBODY>
      </MAINTABLE>
      <br />
      <TABLE>
        <CAPTION>Rakib</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{rakibMeals}</TD>
            <TD>{rakibSpent}</TD>
            <TD>{(rakibSpent - rakibMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Sakib</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{sakibMeals}</TD>
            <TD>{sakibSpent}</TD>
            <TD>{(sakibSpent - sakibMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Rakibul</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{rakibulMeals}</TD>
            <TD>{rakibulSpent}</TD>
            <TD>{(rakibulSpent - rakibulMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Hridoy</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{hridoyMeals}</TD>
            <TD>{hridoySpent}</TD>
            <TD>{(hridoySpent - hridoyMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Limon</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{limonMeals}</TD>
            <TD>{limonSpent}</TD>
            <TD>{(limonSpent - limonMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Siam</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{siamMeals}</TD>
            <TD>{siamSpent}</TD>
            <TD>{(siamSpent - siamMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <TABLE>
        <CAPTION>Shawon</CAPTION>
        <TBODY>
          <TR>
            <TH>Meals</TH>
            <TH>Spent</TH>
            <TH>Due</TH>
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{shawonMeals}</TD>
            <TD>{shawonSpent}</TD>
            <TD>{(shawonSpent - shawonMeals * mealRate).toFixed(2)}</TD>
          </TR>
        </TBODY>
      </TABLE>
    </Container>
  );
};

export default FinalReport;
