import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Signup.scss";
import "../../css/fonts.css";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import React from "react";
//Components
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faEye, faEyeSlash, faCheck);

registerLocale("fr", fr);

const Signup = ({ handleToken, setId, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showpassword1, setShowPassword1] = useState(false);
  const [showpassword2, setShowPassword2] = useState(false);
  const [step, setStep] = useState(1);
  const [emailindb, setEmailInDb] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [data, setData] = useState();
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;

  const checkToken = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.needToDoOnboarding === false) {
        navigate("/reception");
      } else navigate("/onboarding");
    } catch (error) {
      if (error.response.status === 401) {
        // Redirect to login page if unauthorized
        return;
      } else {
        console.error("Error checking authentication:", error);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    checkToken(token);
    setIsLoading(false);
  }, []);

  //regex to check the email format
  function validateEmail(email) {
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  const checkemailindb = async () => {
    // is there already this email in DB?
    try {
      setError("");
      setEmailInDb(false);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/checkemailindb`,
        {
          email: email,
        }
      );
      setData(response.data);

      if (response.data) {
        setEmailInDb(true);
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "There is already an account with this email"
      ) {
        setError("L'adresse email existe déjà ");
      } else if (error.response.data.message === "Missing parameter") {
        setError("Merci de renseigner une adresse email");
      }
    }
  };
  const fetchData = async () => {
    try {
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup/`,
        {
          email: email,
          password: password,
        }
      );
      setData(response.data);
      handleToken(response.data.token);
      setId(response.data.id);
      navigate("/onboarding");
    } catch (error) {
      if (
        error.response.data.message ===
        "There is already an account with this email"
      ) {
        setError("Il existe déjà un compte avec cet email");
      }
    }
  };
  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    setError("");
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    switch (step) {
      // Gestion de tous les cas de mauvaises saisies utilisateurs, contrôles, regex ...
      case 1 /* Email (Input+regex) */:
        const checkemail = validateEmail(email);
        checkemailindb();

        if (checkemail === false || errorMsg !== "") {
          if (!checkemail) {
            setError("Désolé, ce mail n'est pas valide ");
          }
        } else {
          setStep(step + 1);
        }
        break;
      case 2 /*Password */:
        if (!password) {
          setError("Il te faut choisir un mot de passe !");
        } else if (password !== password2) {
          setError("Les deux mots de passe sont différents");
        } else if (!password.match(lowerCase)) {
          setError(
            "Le mot de passe doit contenir au moins une lettre minuscule "
          );
        } else if (!password.match(upperCase)) {
          setError(
            "Le mot de passe doit contenir au moins une lettre majuscule "
          );
        } else if (!password.match(numbers)) {
          setError("Le mot de passe doit contenir au moins un chiffre");
        } else {
          fetchData();
        }
        break;
    }
  };

  const PreviousClick = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  return isLoading ? (
    <div>
      <Loader
        visible={true}
        height="80"
        width="80"
        color="#4c548c"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <div className="containersignup">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {step === 1 ? (
          <div className="firstpagesignupdiv">
            <div className="emailtitlesignup">
              <h2>Votre adresse mail :</h2>
            </div>
            <FormInput
              title=""
              name="inputsignup"
              placeholder=""
              state={email}
              setState={setEmail}
              autoCapitalize="none"
              type="email"
            />
          </div>
        ) : (
          <div>
            <div className="posrelinputsignupdiv1">
              <div className="emailtitlesignup">
                <h2>Votre mot de passe : </h2>
              </div>
              <FormInput
                title=""
                name="inputsignup"
                placeholder="Choisissez un mot de passe"
                state={password}
                setState={setPassword}
                type={showpassword1 === false ? "password" : "text"}
              />

              <div className="inputsignupdiv1">
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
            <div className="posrelinputsignupdiv2">
              <FormInput
                name="inputsignup"
                placeholder="Réécrivez votre mot de passe"
                state={password2}
                setState={setPassword2}
                type={showpassword2 === false ? "password" : "text"}
              />

              <div className="inputsignupdiv2">
                {showpassword2 === false ? (
                  <FontAwesomeIcon
                    icon="fa-regular fa-eye-slash"
                    size="xl"
                    onClick={() => setShowPassword2(!showpassword2)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="fa-regular fa-eye"
                    size="xl"
                    onClick={() => setShowPassword2(!showpassword2)}
                  />
                )}
              </div>
            </div>
            <div className="divparentcheck">
              <p className="helptxtsignup">
                Le mot de passe doit contenir au moins : <br></br> 1 majuscule -
                1 minuscule - 1 chiffre
              </p>

              <div className="divcheck1">
                {password && password.match(upperCase) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    size="xl"
                    color="#ef787c"
                  />
                )}
              </div>
              <div className="divcheck2">
                {password && password.match(lowerCase) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    size="xl"
                    color="#ef787c"
                  />
                )}
              </div>
              <div className="divcheck3">
                {password && password.match(numbers) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    size="xl"
                    color="#ef787c"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div className="buttondivsignup">
          {step !== 1 && (
            <ButtonComponent
              className="buttonprevioussignup"
              value={0}
              pressFct={PreviousClick}
              txt="< Précédent"
            />
          )}
          <ButtonComponent
            className="buttonnextsignup"
            value={0}
            pressFct={handleSubmit}
            txt="Suivant >"
          />
        </div>
        {errorMsg ? (
          <p className="errortxtsignup">{errorMsg}</p>
        ) : (
          <p className="errortxtsignuphidden">{errorMsg}</p>
        )}
        <div className="divaccount">
          <Link to={`/Login`}>
            <p className="alreadyaccount">
              Déjà un compte? <span>Connectez-vous </span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
