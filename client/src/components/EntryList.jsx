import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  overflow-x:auto;
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
`
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

  return (
    <Container>
      <TABLE>
        <CAPTION>{props.month} Report</CAPTION>
        <TBODY>
          <TR>
            <TH>Date</TH>
            <TH>Cost</TH>
            <TH>Spent By</TH>
            <TH>
              Rakib
            </TH>
            <TH>
              Sakib
            </TH>
            <TH>
              Rakibul
            </TH>
            <TH>
              Hridoy
            </TH>
            <TH>
              Limon
            </TH>
            <TH>
              Siam
            </TH>
            <TH>
              Shawon
            </TH>
            <TH>Daily Total</TH>
          </TR>
        </TBODY>
        {entries.length>0 && entries.map((item) => (
          <TBODY key={item?._id}>
            <TR>
              <TD>{item?.date}</TD>
              <TD>{item?.cost}</TD>
              <TD>{item?.costBy}</TD>
              <TD>
               {item?.meals?.Rakib}
               </TD>
               <TD>
               {item?.meals?.Sakib}
               </TD>
               <TD>
               {item?.meals?.Rakibul}
               </TD>
               <TD>
               {item?.meals?.Hridoy}
               </TD>
               <TD>
               {item?.meals?.Limon}
               </TD>
               <TD>
               {item?.meals?.Siam}
               </TD>
               <TD>
               {item?.meals?.Shawon}
               </TD>
              <TD>{item?.totalMeals}</TD>
            </TR>
          </TBODY>
        ))}
        </TABLE>
    </Container>
  );
}
