import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addEntry, updateKey } from "../redux/apiCalls";
import { useState } from "react";

const Form = styled.form`
  flex: 1;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 20px;
  background-color: ghostwhite;
`;
const Top = styled.div`
  display: flex;
`;
const InputTitle = styled.div`
  margin-right: 3px;
  display: inline-block;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;
const Input = styled.input`
  width: 200px;
  height: 25px;
  padding: 9px;
  margin: 3px 3px 3px 3px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;
const Select = styled.select`
  width: 60px;
  height: 25px;
  margin: 3px 3px 3px 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
`;
const Button = styled.button`
  background-color: #04aa6d;
  width: 100px;
  border: none;
  color: white;
  padding: 5px;
  cursor: pointer;
`;
const ButtonOnLoad = styled.button`
  background-color: #04aa6d;
  width: 100px;
  border: none;
  color: white;
  padding: 5px;
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
  background-color: #5cb85c;
  color: white;
`;
const ModalBody = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: red;
  border-radius: 50%;
`;
const ModalFooter = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;
const ModalContent = styled.div`
  position: relative;
  background-color: black;
  color: white;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  top: 40%;
  width: 50%;
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

const Error = styled.div`
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
  cursor: pointer;
`;

const ForgotClick = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
`;

const AdminForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const data = useSelector((state) => state.data);

  const d = new Date();
  let date = d.getDate();

  const [inputs, setInputs] = useState({
    user: user.username,
    spent: 0,
    reserved: 0,
    by: "",
    date: date,
    admin_key: "",
  });
  const [prompt, setPrompt] = useState(false);
  const [keyResponse, setKeyResponse] = useState("");
  const [error, setError] = useState({}); // after submitting show result
  const [confirm, setConfirm] = useState("Confirm"); // after confirming key show loading animation
  const [loading, setLoading] = useState(false); // after submitting show loading animation
  //set initialMeals per member as 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }

  const [meals, setMeals] = useState({ ...initialMeals });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleMeals = (e) => {
    setMeals((prev) => {
      return { ...prev, [e.target.name]: e.target.valueAsNumber };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let totalMeals = 0;
    for (const i in meals) {
      totalMeals += meals[i];
    }
    addEntry({ ...inputs, meals, totalMeals }, dispatch).then((res) =>{
      setError(res.request);
      setLoading(false);
    }
    );
  };

  const requestKey = () => {
    setConfirm(`Please Wait..`);
    updateKey(user._id).then((res) => setKeyResponse(res.request.responseText));
  };

  return (
    <>
    <br />
      {/* Reset Key Modal */}
      {prompt && (
        <Modal>
          <ModalContent>
            {keyResponse === "" && (
              <>
                <ModalHeader>
                  <Close onClick={() => setPrompt(false)}>&times;</Close>
                  Are you sure you want to reset the admin key?
                </ModalHeader>
                <ModalBody onClick={requestKey}>{confirm}</ModalBody>
              </>
            )}
            {keyResponse !== "" && (
              <>
                <ModalHeader>
                  <Close onClick={() => setPrompt(false)}>&times;</Close>
                </ModalHeader>
                <ModalFooter>{keyResponse.slice(1, -1)}</ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Admin Form */}
      <Form onSubmit={handleSubmit}>
        {/* If Error Fetched By Server */}
        {error.status === 200 && (
          <Error
            style={{
              color: "#4F8A10",
              backgroundColor: "#DFF2BF",
              backgroundImage: `url("https://i.imgur.com/Q9BGTuy.png")`,
            }}
          >
            Entry Added Successfully.
          </Error>
        )}
        {error.status === 401 && (
          <Error
            style={{
              color: "#D8000C",
              backgroundColor: "#FFBABA",
              backgroundImage: `url(${"https://i.imgur.com/GnyDvKN.png"})`,
            }}
          >
            {error.responseText.slice(1, -1)}
          </Error>
        )}
        {/* Start Form Inputs */}
        <Title>Submit Todays Entry</Title>
        <br />
        <Top>
          <InputTitle>
            Money Spent:
            <Input
              style={{ width: "60px", margin: "3px" }}
              type="number"
              name="spent"
              value={inputs.spent}
              onChange={handleChange}
            />
          </InputTitle>
          <InputTitle>
            Reserved Money:
            <Input
              style={{ width: "60px", margin: "3px" }}
              type="number"
              name="reserved"
              value={inputs.reserved}
              onChange={handleChange}
            />
          </InputTitle>

          <InputTitle>
            By:
            <Select
              name="by"
              value={inputs.by}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              {user.members.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </Select>
          </InputTitle>
        </Top>
        <InputTitle>
          Key:
          <Input
            style={{ width: "100px", margin: "3px" }}
            type="number"
            placeholder="0000"
            name="admin_key"
            value={inputs.admin_key}
            onChange={handleChange}
            required
          />
        </InputTitle>
        Can't Remember (
        <ForgotClick onClick={() => setPrompt(true)}>?</ForgotClick>)
      
        <div style={{ textDecoration: "underline"}}>Meals</div>
        {user.members.map((i) => (
          <>
            <InputTitle>
              {" "}
              {i}:
              <Input
                style={{ width: "60px" }}
                type="number"
                name={i}
                value={meals[i]}
                onChange={handleMeals}
                required
              ></Input>
            </InputTitle>
            <br />
          </>
        ))}

<br />
        {/* If Button is Loading */}
        {loading && (
          <ButtonOnLoad disabled>
            <i className="fa fa-spinner fa-spin"></i> Submitting
          </ButtonOnLoad>
        )}
        {/* Normal Button */}
        {!loading && <Button>Submit</Button>}
      </Form>
    </>
  );
};

export default AdminForm;
