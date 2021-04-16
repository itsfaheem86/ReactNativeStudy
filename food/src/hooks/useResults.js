import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    searchAPI();
  }, []);

  const searchAPI = async (term) => {
    try {
      const res = await yelp.get("/search", {
        params: {
          limit: 50,
          term,
          location: "san jose",
        },
      });
      setResults(res.data.businesses);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  return [searchAPI, results, errorMessage];
};
