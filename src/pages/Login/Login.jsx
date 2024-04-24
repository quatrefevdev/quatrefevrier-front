import { useEffect, useState } from "react";
import * as React from "react";
import "./Login.scss";
import "../../css/fonts.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//Components
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faEye, faEyeSlash);

const Login = ({ handleToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const [showpassword1, setShowPassword1] = useState(false);
  const [saveemail, setSaveEmail] = useState(); //checkbox

  const handleEmail = (email, param) => {
    if (email && param == 1) {
      Cookies.set("token-email", email, { expires: 15 });
    } else if (param == 2) {
      Cookies.remove("token-email", email, { expires: 15 });
    }
  };

  // Lecture de la valeur de token-email (mail sauvegardé) une seule fois
  // au chargement de la page
  useEffect(() => {
    const email_value = Cookies.get("token-email");
    setEmail(email_value);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (!email || !password) {
      setError("Merci de renseigner l'adresse email et le mot de passe");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/login`,
            {
              email: email,
              password: password,
            }
          );
          console.log("log", response.data);
          setData(response.data);
          handleToken(response.data.token);
          setId(response.data.id);
          setError("");
          if (saveemail === true) {
            handleEmail(email, 1);
          } else {
            handleEmail(email, 2);
          }
          console.log("Login ID : ", response.data.id);
          if (response.data.needToDoOnboarding === false) {
            navigate("/reception");
          } else navigate("/onboarding");
        } catch (error) {
          setError("Mauvais mot de passe ou adresse email");
        }
      };
      fetchData();
    }
  };

  return (
    <div className="containerlogin">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="titlelogin">
          <h1 className="h1login">Connexion</h1>
          <FormInput
            title=""
            name="inputsignup"
            placeholder="Adresse email"
            state={email}
            setState={setEmail}
            type="text"
          />
          <div className="posrelinputlogindiv1">
            <FormInput
              title=""
              name="inputsignup"
              placeholder="Mot de passe"
              state={password}
              setState={setPassword}
              type={showpassword1 ? "text" : "password"}
            />

            <div className="inputlogindiv1">
              {showpassword1 === false ? (
                <FontAwesomeIcon
                  icon="fa-regular fa-eye-slash"
                  size="xl"
                  onClick={() => setShowPassword1(!showpassword1)}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-regular fa-eye"
                  size="xl"
                  onClick={() => setShowPassword1(!showpassword1)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="checkboxlogindiv">
          <label>
            <input
              className="checkboxloginstyle"
              type="checkbox"
              value={saveemail}
              onChange={() => setSaveEmail(true)}
            />
            <p className="checkboxlogintextdiv">
              Se souvenir de mon identifiant
            </p>
          </label>
        </div>

        {error && <p className="errorreportlogin"> {error}</p>}

        <Link to={"/forgetpassword"}>
          <div className="forgetpasswordlogin">
            <p>Mot de passe oublié?</p>
          </div>
        </Link>

        <div className="buttondivlogin">
          <ButtonComponent
            pressFct={handleSubmit}
            txt="Se connecter >"
            value={0}
          />
        </div>

        <Link to={"/Signup"}>
          <div className="noaccountlogin">
            <p>Toujours pas de compte ? Inscris-toi !</p>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
