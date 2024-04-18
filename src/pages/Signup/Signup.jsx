import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Signup.scss";
import axios from "axios";
import React from "react";
//Component
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";

registerLocale("fr", fr);

const Signup = ({ handleToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState();

  //regex to check the email format
  function validateEmail(email) {
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    setError("");
    switch (step) {
      // Gestion de tout les cas de mauvaises saisies utilisateurs, contrôles, regex ...
      case 1 /* Email (Input+regex) */:
        const checkemail = validateEmail(email);
        if (!email || checkemail === false) {
          setError("Désolé, il nous faudrait ton email ");
        } else {
          setStep(step + 1);
        }
        break;
      case 2 /*Password */:
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;

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
          setStep(step + 1);
        }
        break;
    }
    if (step >= 2) {
      try {
        const fetchData = async () => {
          console.log(email, password);
          const response = await axios.post(
            "http://localhost:3000/user/signup/",
            {
              email: email,
              password: password,
            }
          );
          setData(response.data);
          console.log(response.data.token);
          handleToken(response.data.token);
          setId(response.data._id);
          navigate("/OnBoarding");
        };

        fetchData();
      } catch (error) {
        console.log("Erreur message : ", error.response.data.message);
        if (
          error.response.data.message ===
          "There is already an account with this email"
        ) {
          setError(
            "Cet Email existe déjà, merci de vous connecter à votre compte"
          );
        }
      }
    }
  };

  const PreviousClick = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  function displayInput() {
    let arr = [];
    switch (step) {
      case 1 /* Email (Input) */:
        arr.push(
          <FormInput
            title="Votre email : "
            name="inputsignup"
            placeholder=""
            state={email}
            setState={setEmail}
            type="email"
          />
        );
        break;
      case 2 /*Password (Input) */:
        arr.push(
          <div>
            <FormInput
              title="Votre mot de passe : "
              name="inputsignup"
              placeholder="Choisi un mot de passe"
              state={password}
              setState={setPassword}
              type="password"
            />
            <FormInput
              name="inputsignup"
              placeholder="Retape ton mot de passe"
              state={password2}
              setState={setPassword2}
              type="password"
            />
            <p className="helptxtsignup">
              Le mot de passe doit contenir au moins : <br></br> 1 majuscule - 1
              minuscule - 1 chiffre
            </p>
          </div>
        );
        break;
      case 3 /*Account already existe */:
        arr.push(
          <div>
            <FormInput
              title="Votre mot de passe : "
              name="inputsignup"
              placeholder="Choisi un mot de passe"
              state={password}
              setState={setPassword}
              type="password"
            />
            <FormInput
              name="inputsignup"
              placeholder="Retape ton mot de passe"
              state={password2}
              setState={setPassword2}
              type="password"
            />
            <p className="helptxtsignup">
              Le mot de passe doit contenir au moins : <br></br> 1 majuscule - 1
              minuscule - 1 chiffre
            </p>
            {error ? (
              <p className="errortxtsignup">{error}</p>
            ) : (
              <p className="errortxtsignuphidden">{error}</p>
            )}
          </div>
        );
        break;
    }
    return arr;
  }

  return (
    <div className="containersignup">
      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
      >
        {displayInput()}

        <div className="buttondivsignup">
          {step !== 1 && (
            <ButtonComponent
              className="buttonprevioussignup"
              pressFct={PreviousClick}
              txt="< Précédent"
            />
          )}
          <ButtonComponent
            className="buttonnextsignup"
            pressFct={handleSubmit}
            txt="Suivant >"
          />
        </div>
        {error ? (
          <p className="errortxtsignup">{error}</p>
        ) : (
          <p className="errortxtsignuphidden">{error}</p>
        )}
        <div className="divaccount">
          <Link to={`/Login`}>
            <p className="alreadyaccount">Déjà un compte? Connectez-vous !</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
