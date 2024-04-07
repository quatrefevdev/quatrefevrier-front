import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Bookmarks.css";
import axios from "axios";
import React from "react";

const Bookmarks = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const fetchData = async () => {
          const response = await axios.get(
            "https://site--marvelback--7q2nrc54m6wr.code.run/bookmarks",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Bookmarks rsp ", response.data);
          setData(response.data);
          setIsLoading(false);
        };

        fetchData();
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      navigate("/");
    }
  });

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <section className="Bookmark">
      <div className="container"></div>
    </section>
  );
};

export default Bookmarks;
