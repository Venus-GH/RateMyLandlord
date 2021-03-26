import { useState, useEffect } from "react";
import * as api from "./api";

export const useBusinessSearch = (term, location) => {
  //   const [businesses, setBusinesses] = useState([]);
  const [totalResults, setTotalResults] = useState();
  const [searchParams, setSearchParams] = useState({ term, location });

  useEffect(() => {
    // setBusiness es([]);
    const fetchData = async () => {
      try {
        const rawData = await api.get("/businesses/search", searchParams);
        const response = await rawData.json();
        // setBusinesses(response.businesses);
        setTotalResults(response.total);
      } catch (error) {
        console.log("Error fetching data from Yelp API", error);
      }
    };
    fetchData();
  }, [searchParams]);
  return [totalResults, searchParams, setSearchParams];
};
