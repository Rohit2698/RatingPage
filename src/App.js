import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import RatingView from "./Component/RatingView";

function App() {
  const [logged, setLogged] = useState(false);

  const login = () => {
    axios
      .post("https://five-star-reviews.herokuapp.com/api/login", {
        user: { email: "jay@aol.com", password: "wha123t" },
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

  return <RatingView />;
}

export default App;
