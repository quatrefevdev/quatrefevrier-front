import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ pageToGoBack }) => {
  return (
    <header
      style={{
        position: "fixed",
        top: "0px",
        backgroundColor: "white",
        width: "100vw",
        height: "40px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "15px",
        zIndex: 10,
      }}
    >
      <Link to={pageToGoBack}>
        <FontAwesomeIcon
          style={{
            alignSelf: "start",
            color: "#4C548C",
          }}
          icon="fa-solid fa-arrow-left"
        />
      </Link>
    </header>
  );
};

export default Header;
