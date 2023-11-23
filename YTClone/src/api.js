import axios from "axios";
import { firebaseConfig } from "./firebase";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: firebaseConfig.apiKey,
  },
});

export default request;
