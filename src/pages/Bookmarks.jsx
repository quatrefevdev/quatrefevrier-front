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
          const response = await axios.get("http://localhost:3000/bookmarks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
    <section className="favs">
      <div className="container">
        <h1>
          <span>=✪=</span>
          <span>My favourites Comic Books and Characters</span>
          <span>=✪=</span>
        </h1>
        <div className="results">
          {data.length > 0 ? (
            data.map((obj) => {
              return (
                <div className="group" key={obj._id}>
                  <div className="fav">
                    <Link
                      to={
                        obj.title
                          ? `/comic/${obj._id}`
                          : `/character/${obj._id}`
                      }
                      state={{ _id: obj.itemId }}
                      className="link"
                    >
                      <img
                        src={`${obj.path}/portrait_uncanny.${obj.extension}`}
                        alt={obj.title || obj.name}
                      />
                      <div className="text">
                        <div className="left"></div>
                        {obj.title ? (
                          obj.title.indexOf("(") > 0 ? (
                            <div className="title">
                              {obj.title.slice(0, obj.title.indexOf("("))}
                            </div>
                          ) : (
                            <div className="title">{obj.title}</div>
                          )
                        ) : obj.name.indexOf("(") > 0 ? (
                          <div className="title">
                            {obj.name.slice(0, obj.name.indexOf("("))}
                          </div>
                        ) : (
                          <div className="title">{obj.name}</div>
                        )}
                        <div className="right"></div>
                      </div>
                    </Link>
                  </div>
                  <div className="remove" onClick={() => handleRemove(obj._id)}>
                    <p>Remove from fav's</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="emptyness">
              <img src={oops} alt="oops sign" className="oops" />
              <p className="empty">Your Fav list is empty</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bookmarks;
