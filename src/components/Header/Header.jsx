import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Header.css";

const Onsearch = (searchValue) => {};

// Je récupère en props le state token et la fonction handleToken
const Header = ({
  completion,
  search,
  setcompletion,
  setSearch,
  token,
  handleToken,
}) => {
  // const token = Cookies.get("vinted-token");
  // console.log(token);
  const sampleLocation = useLocation();
  // console.log("completion", completion);
  let strsearch = "";
  console.log("COmp", completion);
  if (sampleLocation.pathname === "/Characters") {
    strsearch = "Search a specific character";
  } else if (sampleLocation.pathname === "/Comics") {
    strsearch = "Search a specific comic";
  } else {
    strsearch = "";
  }
  return (
    <header>
      <div className="container-header">
        <Link to={`/`}>
          <div className="marvel_logo">
            <img src="../pictures/marvel_logo.jpg" alt="Marvel_logo_img" />
          </div>
        </Link>
        <div className="head_div">
          <h1>Welcome to Marvel universe </h1>
        </div>
        {strsearch ? (
          <div>
            <div>
              <input
                className="searchbar"
                placeholder={strsearch}
                type="text"
                name="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>
              {/* <button onClick={() => onSearch(value)}> Search</button> */}
            </div>
            {/* <div className="completion">{completion}</div> */}
          </div>
        ) : (
          <input
            className="searchbarhidden"
            placeholder={strsearch}
            type="text"
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        )}

        <div className="button_div">
          <Link to={"/Characters"}>
            <button className="char_button">Characters </button>
          </Link>
          <Link to={"/Comics"}>
            <button className="comics_button">Comics</button>
          </Link>
          {token ? (
            <Link to={"/Bookmarks"}>
              <button className="bookmarks_button">Bookmarks</button>
            </Link>
          ) : (
            <Link to={"/Bookmarks"}>
              <button className="bookmarks_hidden">Bookmarks</button>
            </Link>
          )}
          {token ? (
            <Link to={"/"}>
              <button
                className="logout_button"
                onClick={() => handleToken(null)}
              >
                Logout
              </button>
            </Link>
          ) : (
            <div>
              <Link to={"/Login"}>
                <button className="login_button">Login</button>
              </Link>
              <Link to={"/Signup"}>
                <button className="signup_button">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
