import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import RatingView from "./Component/RatingView";
import { Dialog } from "@material-ui/core";
import { loginApiUrl } from "./Constants/ApiConstants";
import { loginEmail, loginPassword } from "./Constants/DummyData";

function App() {
  const [logged, setLogged] = useState(false);

  const login = () => {
    axios
      .post(loginApiUrl, {
        user: { email: loginEmail, password: loginPassword },
      })
      .then((res) => {
        console.log(res.data);
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
    <Dialog open={true} maxWidth={"md"} fullWidth>
      <RatingView />
    </Dialog>
  );
}

export default App;
