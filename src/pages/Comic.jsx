import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Comic.css";
import { useNavigate } from "react-router-dom";

const Comic = (search) => {
  const { comicId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url =
    "https://site--marvelback--7q2nrc54m6wr.code.run/comic/" + comicId;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);

      console.log(response.data.data);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="underheader">
        <img src="../public/LogoSpiderman.png" alt="LogoCharMarvel" />
        <h1>
          <p>{data.title}</p>
        </h1>
        <img src="../public/LogoSpiderman.png" alt="LogoCharMarvel" />
      </section>
      <div className="containercomicdiv">
        <section className="comicdivcard">
          {data.description ? (
            <div className="comicpresdiv">
              <h2>Description : </h2>
              <p>{data.description}</p>
            </div>
          ) : (
            <div className="comicpresdiv"></div>
          )}
          <div className="comicdetailimg">
            <div className="comicimgdiv" key={data._id}>
              {data.thumbnail.path.includes("image_not_available") ? (
                <p> caca</p>
              ) : (
                <img
                  src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
                  alt={data.title}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Comic;
