const five_star_backend_url = "https://five-star-reviews.herokuapp.com/api";

export const loginApiUrl = `${five_star_backend_url}/login`;

export const doctorInfoApiUrl = (id) =>
  `${five_star_backend_url}/v1/doctors/${id}`;

export const reviewApiUrl = `${five_star_backend_url}/v1/reviews/`;
