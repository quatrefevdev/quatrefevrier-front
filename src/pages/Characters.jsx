import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
library.add(faHeart);
import "./Characters.css";

const Characters = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page_number, setPageNumber] = useState(1);
  const [heroe_number, setHeroeNumber] = useState(1);
  const [add_element, setElement] = useState();

  useEffect(() => {
    const limit = 100;
    const skip = page_number * limit - limit;
    setHeroeNumber(skip + 1);
    const fetchData = async () => {
      try {
        if (!add_element) {
          const response = await axios.get(
            `http://localhost:3000/characters?name=${search}&skip=${skip}&limit=${limit}`
          );
          setData(response.data.data.results);
          setIsLoading(false);
        } else {
          console.log(add_element);
          const addEl = await axios.post("http://localhost:3000/bookmarks", {
            elementId: add_element,
            title: "test",
            name: "",
            path: "",
            extension: "",
            owner: token,
          });
          console.log("EL3", addEl);
          setElement("");
        }
      } catch (error) {
        if (!add_element) {
          console.log(error.response.data);
        } else {
          console.log(error.addEl);
        }
      }
    };
    fetchData();
  }, [search, page_number, add_element]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="underheader">
        <div className="previousimg">
          <img
            src="../src/utils/images/Previous_img.jpg"
            alt="Previousimg"
            onClick={() =>
              page_number > 1
                ? setPageNumber(page_number - 1)
                : setPageNumber(1)
            }
          ></img>
        </div>
        <img
          src="../src/utils/images/LogoCharMarvel.png"
          alt="LogoCharMarvel"
        />
        <h1>Marvel Characters</h1>
        <img
          src="../src/utils/images/LogoCharMarvel.png"
          alt="LogoCharMarvel"
        />
        <div className="nextimg">
          <img
            src="../src/utils/images/Next_img.jpg"
            alt="Nextimg"
            onClick={() => setPageNumber(page_number + 1)}
          ></img>
        </div>
      </section>
      <div className="container">
        <section className="characterscards">
          {data.map((character, index) => {
            return (
              <div className="heroenumber" key={character._id}>
                <p> Heroe number : {heroe_number + index}</p>
                <FontAwesomeIcon
                  icon="fa-regular fa-heart"
                  className="hearticon"
                  onClick={() => setElement(character._id)}
                />
                <Link
                  className="cardlink"
                  key={character._id}
                  to={`/Character/${character._id}`}
                >
                  <div className="charcard">
                    <div className="charname">
                      <p className="name">{character.name}</p>

                      <img
                        className="charimg"
                        src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`}
                        alt="charimg"
                      />
                    </div>

                    <div className="chardesc">
                      {character.description && (
                        <div>
                          <h2>Description : </h2>
                          <p>{character.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Characters;
