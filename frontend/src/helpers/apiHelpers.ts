import axios from "axios";

const baseURL = "http://localhost:8000";

export const getData = async (endpoint: string) => {
  console.log(`${baseURL}/${endpoint}`);
  const response = await axios.get(`${baseURL}/${endpoint}`).catch((err) => {
    console.log(err.response);
  });

  return response?.data;
};

export const postData = async (endpoint: string, body: JSON) => {
  const response = await axios
    .post(`${baseURL}/${endpoint}`, body)
    .catch((err) => {
      console.log(err.response);
    });

  return response?.data;
};
