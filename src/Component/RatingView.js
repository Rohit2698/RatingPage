import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import rateone from "../Images/rateone.png";
import ratetwo from "../Images/ratethree.png";
import ratethree from "../Images/ratefive.png";
import axios from "axios";

const RatingView = () => {
  const [rating, setRating] = useState("1");
  const [feedback, setFeedback] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlRating = window.location.href;
    setRating(urlRating?.split("=")[1]);
    const val = localStorage.getItem("logintoken");
    setToken(val);
  }, []);

  const smileyView = useMemo(() => {
    if (rating === "1") {
      return (
        <img src={rateone} style={{ height: 100, width: 100 }} alt={"img"} />
      );
    }
    if (rating === "2") {
      return (
        <img src={rateone} style={{ height: 100, width: 100 }} alt={"img"} />
      );
    }
    if (rating === "3") {
      return (
        <img src={ratetwo} style={{ height: 100, width: 100 }} alt={"img"} />
      );
    }
    if (rating === "4") {
      return (
        <img src={ratetwo} style={{ height: 100, width: 100 }} alt={"img"} />
      );
    }
    if (rating === "5") {
      return (
        <img src={ratethree} style={{ height: 100, width: 100 }} alt={"img"} />
      );
    }
  }, [rating]);

  const submitResponse = () => {
    axios.post(
      "https://five-star-reviews.herokuapp.com/api/v1/reviews/",
      {
        review: {
          rating: rating,
          comment: feedback,
          visit_date: "2021-06-08",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  if (!rating) {
    return <h1>rating is missing from url</h1>;
  }

  return (
    <Container style={{ textAlign: "center" }}>
      <Grid container alignItems={"center"} spacing={6}>
        <Grid item xs={12}>
          {smileyView}
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"h4"}>
            We approciate your feedback. How can we improve?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"body1"}>
            It is important to as at Vetri Cucina that every guest is entirely
            satisfied. Please tell us what would have made your experience a
            more pleasant one. Your feedback will not be displayed publicly.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(text) => setFeedback(text.target.value)}
            value={feedback}
            variant={"outlined"}
            fullWidth
            multiline
            rows={6}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={submitResponse}
          >
            Share message
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RatingView;
