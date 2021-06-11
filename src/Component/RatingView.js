import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { doctorInfoApiUrl, reviewApiUrl } from "../Constants/ApiConstants";
import { failedToastConfiguration, visitDate } from "../Constants/DummyData";
import { toast } from "react-toastify";

const RatingView = () => {
  const [rating, setRating] = useState(0);
  const [diId, setDiId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    googleReviewUrl: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const urlRating = window.location.href;
    setRating(parseInt(urlRating?.split("&")[0].split("=")[1]));
    const di = urlRating?.split("&")[1];
    setDiId(di?.split("=")[1]);
    const val = localStorage.getItem("logintoken");
    setToken(val);
    di &&
      axios
        .get(doctorInfoApiUrl(di?.split("=")[1]))
        .then((res) => {
          const data = res.data.data;
          setUserInfo({
            name: data.name,
            address: data.address,
            googleReviewUrl: data.google_review_url,
          });
        })
        .catch(() => {
          setUserInfo({
            name: "Dr. Rahul Patel",
            address: "Some address",
            googleReviewUrl: "https://g.page/r/CWsHb0-ZbiR9EAg/review",
          });
        });
  }, []);

  const submitResponse = () => {
    axios
      .post(
        reviewApiUrl,
        {
          review: {
            rating: rating,
            comment: feedback,
            visit_date: visitDate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setReviewSubmitted(true);
        toast("FeedBack saved");
        navigator.clipboard.writeText(feedback);
      })
      .catch((err) => {
        toast.error(
          "Review for today is already given",
          failedToastConfiguration
        );
      });
  };

  if (reviewSubmitted) {
    return (
      <Container style={{ textAlign: "center", padding: 50 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              Thank you for your review.
            </Typography>
          </Grid>
          {rating === 5 && !!diId && (
            <>
              <Grid item xs={12}>
                <Typography>
                  Would you also like to submit the review on google. Your
                  review comment has been copied to clipboard. You can simply
                  paste it there.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => window.open(userInfo.googleReviewUrl, "_self")}
                >
                  Yes, take me google review page
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    );
  }

  return (
    <Container style={{ padding: 50 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Typography variant={"button"}>SHARE FEEDBACK</Typography>
          <Typography
            style={{
              fontSize: 30,
              fontWeight: 300,
            }}
          >
            {userInfo.name}
          </Typography>
          <Typography>{userInfo.address}</Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: 0 }}>
          <Rating
            value={rating}
            precision={1}
            style={{
              fontSize: 100,
            }}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: 0 }}>
          <Typography variant={"h4"}>
            We appreciate your feedback. How can we improve?
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: 0 }}>
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
            rows={2}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={submitResponse}
          >
            Share feedback
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RatingView;
