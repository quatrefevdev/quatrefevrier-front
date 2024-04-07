import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState("");
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    try {
      // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long, je fais un truc
      if (password.length > 8) {
        const fetchData = async () => {
          const response = await axios.post(
            "https://site--marvelback--7q2nrc54m6wr.code.run/user/signup",
            {
              email: email,
              username: username,
              password: password,
              newsletter: newsletter,
            }
          );
          setData(response.data);
          console.log(response.data.token);
          handleToken(response.data.token);
          navigate("/");
        };

        fetchData();
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "This mail already exists, ask user to connect"
      ) {
        setErrorMessage(
          "This Email already exists, please Login to your account"
        );
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  function handleChange(e) {
    setNewsletter(e.target.checked);
  }

  return (
    <div className="container-Signup">
      <section className="suunderheader">
        <img src="../src/utils/images/LogoThor.png" alt="LogoCharMarvel" />
        <h1>Sign up</h1>
        <img src="../src/utils/images/LogoThor.png" alt="LogoCharMarvel" />
      </section>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        <input
          className="username"
          value={username}
          type="text"
          placeholder="User name"
          name="username"
          onChange={(event) => {
            // Je stocke dans mon state le contenu de mon input
            setUsername(event.target.value);
          }}
        />
        <input
          className="email"
          // Mon input est de type email
          value={email}
          type="email"
          placeholder="Mail"
          name="email"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={handleEmailChange}
        />

        <input
          className="password"
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {avatar && <img src={URL.createObjectURL(avatar)} alt="produit" />}
        <label>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles.path)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <div className="textavatar">
                    <p>Choose an avatar</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          <FontAwesomeIcon icon={faUserPlus} className="plusicon" />
        </label>
        <div className="divcheckbox">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              value="value"
              onChange={handleChange}
            />
          </div>

          <h3> Subscribe to the newsletter</h3>
        </div>
        <div className="divsubmit">
          <input className="submitbutton" type="submit" value="Sign up" />
        </div>
        <div className="divaccount">
          <Link to={`/Login`}>
            <p className="alreadyaccount">Already have an account? Login !</p>
          </Link>
        </div>
        {showError && <p style={{ color: "red" }}>{showError}</p>}
      </form>
    </div>
  );
};

export default Signup;
