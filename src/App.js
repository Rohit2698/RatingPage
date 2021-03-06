import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import RatingView from "./Component/RatingView";
import { Card, Container } from "@material-ui/core";
import { loginApiUrl } from "./Constants/ApiConstants";
import { loginEmail, loginPassword } from "./Constants/DummyData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [logged, setLogged] = useState(false);

  const login = () => {
    axios
      .post(loginApiUrl, {
        user: { email: loginEmail, password: loginPassword },
      })
      .then((res) => {
        localStorage.setItem("logintoken", res.data.token);
        setLogged(true);
      });
  };

  useEffect(() => {
    login();
  }, []);

  if (!logged) {
    return <span />;
  }

  return (
    <div className={"App"}>
      <ToastContainer />
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "75%" }} elevation={5}>
          <RatingView />
        </Card>
      </Container>
    </div>
  );
}

export default App;
