import styled from "styled-components";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { useState } from "react";
import Todo from "./Todo";
var formdata = new FormData();

function App() {
  const [emailValid, setEmailValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const emailRegex = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{3}/;
  const [isActive, setIsActive] = useState({ active: 0, email: "" });

  const validity = (id, value) => {
    if (id === "email" && emailRegex.test(value) === false) {
      setEmailValid(true);
      return;
    }
    if (id === "password" && value.length < 4) {
      setPassValid(true);
      return;
    }
    if (id === "email") {
      console.log(value);
      setEmailValid(false);
      formdata.append("email", value);
    }
    if (id === "password") {
      console.log(value);
      setPassValid(false);
      formdata.append("password", value);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setIsActive({ active: res.user_is_active, email: res.user_email });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Background>
      {isActive.active ? (
        <div>
          <Logout onClick={() => setIsActive({ active: false })}>Logout</Logout>
          <Todo setIsActive={setIsActive} email={isActive.email} />
        </div>
      ) : (
        <Container>
          <center>Rapptr Labs</center>
          <form
            onSubmit={(e) => submit(e)}
            onChange={(e) => validity(e.target.id, e.target.value)}
          >
            <InputCont>
              <label for="email">Email:</label>
              <span>
                <BsFillPersonFill />
              </span>
              <input
                type="text"
                style={{ borderColor: emailValid ? "red" : "#ccc" }}
                id="email"
                name="email"
                autocomplete="off"
                placeholder="user@rapptrlabs.com"
                maxLength="50"
              />
              {emailValid && <h6> Not a valid email </h6>}
            </InputCont>
            <InputCont>
              <label for="password">Password:</label>
              <span>
                <BsFillLockFill />
              </span>
              <input
                type="password"
                style={{ borderColor: passValid ? "red" : "#ccc" }}
                id="password"
                name="password"
                placeholder="Must be at least 4 characters"
                maxLength="16"
              />
              {passValid && <h6> Not a valid password </h6>}
            </InputCont>
            <Submit
              disabled={emailValid || passValid}
              type="submit"
              value="Submit"
            >
              Login
            </Submit>
          </form>
        </Container>
      )}
    </Background>
  );
}

export default App;
const Background = styled.div`
  height: 100vh;
  overflow: auto;
  background: linear-gradient(
    150deg,
    rgba(138, 255, 98, 1) 11%,
    rgba(255, 67, 79, 1) 84%
  );
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  flex-direction: column;
  border-radius: 5px;
`;

const Logout = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ff4500;
`;

const InputCont = styled.div`
  position: relative;
  margin-top: 20px;
  input {
    width: 100%;
    padding: 12px;
    letter-spacing: 1px;
    padding-left: 30px;
    border: 2px solid;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
  h6 {
    margin: 0;
    color: red;
  }
  span {
    position: absolute;
    left: 0;
    top: 28px;
    padding: 5px;
  }
`;

const Submit = styled.button`
  width: 100%;
  background-color: #568258;
  color: white;
  padding: 14px 20px;
  letter-spacing: 1px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
