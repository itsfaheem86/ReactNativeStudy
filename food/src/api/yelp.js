import axios from "axios";
import { TOEKN } from "./config";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization: `Bearer ${TOEKN}`,
  },
});
