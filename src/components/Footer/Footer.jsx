import "./Footer.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ selected }) => {
  const [forum, setForum] = useState("");
  const [parrain, setParrain] = useState("");
  const [message, setMessage] = useState("");
  const [suivi, setSuivi] = useState("");
  const [compte, setCompte] = useState("");

  useEffect(() => {
    // Reset all states
    setForum("");
    setParrain("");
    setMessage("");
    setSuivi("");
    setCompte("");

    // Set the state based on the selected page
    switch (selected) {
      case "forum":
        setForum("select");
        break;
      case "parrain":
        setParrain("select");
        break;
      case "message":
        setMessage("select");
        break;
      case "suivi":
        setSuivi("select");
        break;
      case "compte":
        setCompte("select");
        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <footer className="footer">
      <div className="div-footer">
        <Link to="/forum">
          <div className={forum + " div-footer-menu"}>
            <FontAwesomeIcon icon="mug-hot" size="lg" />
            <p>Forum</p>
          </div>
        </Link>
        <Link to="/parrain">
          <div className={parrain + " div-footer-menu"}>
            <FontAwesomeIcon icon="user-gear" size="lg" />
            <p>Parrain</p>
          </div>
        </Link>
        <Link to="/message">
          <div className={message + " div-footer-menu"}>
            <FontAwesomeIcon icon="comment" size="lg" />
            <p>Message</p>
          </div>
        </Link>
        <Link to="/CarnetHome">
          <div className={suivi + " div-footer-menu"}>
            <FontAwesomeIcon icon="book-open" size="lg" />
            <p>Suivi</p>
          </div>
        </Link>

        <div className={compte + " div-footer-menu"}>
          <FontAwesomeIcon icon="gear" size="lg" />
          <p>Compte</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
