import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Comics.css";
import { useNavigate } from "react-router-dom";

const Comics = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page_number, setPageNumber] = useState(1);
  const limit = 100;
  const skip = page_number * limit - limit;
  const url = `https://site--marvelback--7q2nrc54m6wr.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);

      setData(response.data.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [search, page_number]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="underheader">
        <div className="previousimg">
          <img
            src="../pictures/Previous_img.jpg"
            alt="Previousimg"
            onClick={() =>
              page_number > 1
                ? setPageNumber(page_number - 1)
                : setPageNumber(1)
            }
          ></img>
        </div>
        <img src="../pictures/LogoBatman.png" alt="LogoCharMarvel" />
        <h1>Marvel Comics</h1>
        <img src="../pictures/LogoBatman.png" alt="LogoCharMarvel" />
        <div className="nextimg">
          <img
            src="../pictures/Next_img.jpg"
            alt="Nextimg"
            onClick={() => setPageNumber(page_number + 1)}
          ></img>
        </div>
      </section>
      <div className="comicscontainer">
        <div>
          <section className="comicscards">
            {data.map((comic) => {
              return (
                <Link
                  className="comiclinkdiv"
                  key={comic._id}
                  to={`/Comic/${comic._id}`}
                >
                  <div className="comicdivcardd">
                    <div className="comicnamediv">
                      <p>{comic.title}</p>

                      <img
                        className="comicimg"
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                        alt="charimg"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
};
export default Comics;
