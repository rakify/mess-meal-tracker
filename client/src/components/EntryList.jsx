import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteEntry } from "./../redux/apiCalls";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
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
    background-color: #d7e5f1;
  }
  background-color: #e5ecf0;
`;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  text-align: left;
  border-bottom: 1px solid black;
  padding: 10px;
  background-color: #8aa18a;
  border-right: 1px solid white;
`;
const TD = styled.td`
  flex: 1;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
  cursor: pointer;
`;

const Modal = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalHeader = styled.div`
  padding: 2px 16px;
  background-color: #344234;
  color: white;
`;
const ModalBody = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #883434;
  font-weight: bold;
  font-size: 20px;
`;
const ModalFooter = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;
const ModalContent = styled.div`
  position: relative;
  background-color: gray;
  color: white;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  top: 40%;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 1s;
`;

const Close = styled.span`
  color: red;
  float: right;
  font-size: 22px;
  font-weight: bold;
  border-radius: 100%;
  background-color: white;
  cursor: pointer;
`;

const Input = styled.input`
  background-color: #ddd;
  border: none;
  outline: none;
  color: black;
  text-align: center;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
`;

export default function EntryList(props) {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.data.entries);
  const user = useSelector((state) => state.user.currentUser);
  const [keyResponse, setKeyResponse] = useState("");
  const [confirm, setConfirm] = useState("Confirm");
  const [id, setId] = useState(""); // if id is not empty modal will open
  const [key, setKey] = useState("");

  const deleteHandler = () => {
    setConfirm("Deleting..");
    deleteEntry(id, key, dispatch).then((res) => {
      setKeyResponse(res);
    });
  };

  return (
    <>
      <Container>
        {/* Delete Entry Model */}
        {id && (
          <Modal>
            <ModalContent>
              {keyResponse === "" && (
                <>
                  <ModalHeader>
                    <Close onClick={() => setId(false)}>&times;</Close>
                    Enter your key below and click confirm to delete the
                    requested entry:
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="number"
                      placeholder="0000"
                      name="admin_key"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                    <span onClick={deleteHandler}>{confirm}</span>
                  </ModalBody>
                </>
              )}
              {keyResponse !== "" && (
                <>
                  <ModalHeader>
                    <Close
                      onClick={() => {
                        setId(false);
                        setKeyResponse("");
                        setConfirm("Confirm");
                      }}
                    >
                      &times;
                    </Close>
                  </ModalHeader>
                  <ModalFooter>{keyResponse}</ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}

        <TABLE>
          <CAPTION>{props.month} Report</CAPTION>
          {entries.length === 0 ? (
           <>
           <h3>As empty as a politician's promises. ツ</h3>
           <h4>Lets start updating data by clicking on your username.</h4>
           </>
          ) : (
            <>
              <TBODY>
                <TR>
                  <TH>Date</TH>
                  <TH>Spent</TH>
                  <TH>Reserved</TH>
                  <TH>By</TH>
                  {user.members.map((i) => (
                    <TH key={i}>{i}</TH>
                  ))}
                  <TH>Daily Total</TH>
                  {props.admin && <TH>Actions</TH>}
                </TR>
              </TBODY>
              {entries.length > 0 &&
                entries.map((item, j) => (
                  <TBODY key={item._id}>
                    <TR>
                      <TD>{item.date}</TD>
                      <TD>{item.spent.toFixed(2)}</TD>
                      <TD>{item.reserved.toFixed(2)}</TD>
                      <TD>{item.by}</TD>
                      {user.members.map((i) => (
                        <TD key={i}>
                          {item.meals[`${i}`] ? item.meals[`${i}`] : 0}
                        </TD>
                      ))}
                      <TD>{item?.totalMeals}</TD>
                      {props.admin &&
                        (props.date === item.date ||
                        props.date - 1 === item.date ? (
                          <TD onClick={() => setId(item._id)}> 🗑️</TD>
                        ) : (
                          <TD></TD>
                        ))}
                    </TR>
                  </TBODY>
                ))}
            </>
          )}
        </TABLE>
      </Container>
      {!props.admin && (
        <Link
          to={{ pathname: `/${props.prevYear}/${props.prevMonthId}` }}
          style={{ textDecoration: "none" }}
        >
          ❮ {props.prevMonth}, {props.prevYear} Report
        </Link>
      )}
    </>
  );
}
