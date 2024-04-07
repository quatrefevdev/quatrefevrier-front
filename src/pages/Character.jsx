import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Character.css";
import { useNavigate } from "react-router-dom";
import suplogo from "../pictures/LogoSuperman.png";
import notfoundpic from "../pictures/Pic_not_found.jpg";

const character = (token) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [newcomic, setComic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const url = "https://site--marvelback--7q2nrc54m6wr.code.run/character/" + id;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);

      console.log(response.data.data);
      setData(response.data.data);
      setIsLoading(false);

      const comicInfo = await axios.get(
        `https://site--marvelback--7q2nrc54m6wr.code.run/comics/${id}`
      );

      console.log("Comic Info", comicInfo.data.data.comics);
      setComic(comicInfo.data.data.comics);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="underheader">
        <img src={suplogo} alt="LogoCharMarvel" />
        <h1>
          <span>{data.name}</span>
        </h1>
        <img src={suplogo} alt="LogoCharMarvel" />
      </section>
      <div className="container">
        <section className="charactercard">
          {data.description !== "" && (
            <div>
              <h2>Description : </h2>
              <p>{data.description}</p>
            </div>
          )}
          <div className="imglist">
            {newcomic.map((comic) => {
              return (
                <Link
                  className="cardlink"
                  key={comic._id}
                  to={`/Comic/${comic._id}`}
                >
                  <div className="comicimg" key={comic._id}>
                    {comic.thumbnail.path.includes("image_not_available") ? (
                      <img
                        className="notfoundimg"
                        src={notfoundpic}
                        alt="Pic not found"
                      />
                    ) : (
                      <img
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};
export default character;
