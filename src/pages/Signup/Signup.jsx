import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import image_femme from "../../images/symbole_femme.png";
import image_homme from "../../images/symbole_homme.png";
//Component
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

import "../../components/Reactdatepicker/Reactdatepicker.css";
//Datepicker
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
//JSON Files
import cancerkindfile from "./cancerkind.json";

registerLocale("fr", fr);

const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [sex, setSex] = useState("");

  const [dateofbirth, setDateofBirth] = useState(new Date());
  const [cancerkindsel, setCancerKind] = useState([]);
  const [cancerstep, setCancerStep] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const newCancerKindArr = [...cancerkindsel];
  //regex to check the phone number format
  function validatePhoneNumber(phoneNumber) {
    var regex =
      /^\(?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
    if (regex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }
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
      case 1:
        const checkemail = validateEmail(email);
        if (!email || checkemail === false) {
          setError("Désolé, il nous faudrait ton email ");
        } else {
          setStep(step + 1);
        }
        break;
      case 2:
        if (!username) {
          setError("Il te faut un pseudo ! ");
        } else {
          setStep(step + 1);
        }
        break;
      case 3:
        if (!lastname) {
          setError("Allez ! T'as bien un petit nom ");
        } else {
          setStep(step + 1);
        }
        break;
      case 4:
        if (!firstname) {
          setError("Renseigne ton prénom s'il te plait");
        } else {
          setStep(step + 1);
        }
        break;
      case 5: // Sex Not mandatory
        setStep(step + 1);

        break;
      case 6: // dateofbirth Not mandatory
        setStep(step + 1);

        break;
      case 7: // cancerkind Not mandatory
        setStep(step + 1);

        break;
      case 8: // cancerstep Not mandatory
        setStep(step + 1);

        break;
      case 9:
        const checknumber = validatePhoneNumber(phonenumber);
        if (!phonenumber || checknumber === false) {
          setError("T'as bien un 06 !");
        } else {
          setStep(step + 1);
        }
        break;
      case 10:
        if (!password) {
          setError("Il te faut choisir un mot de passe !");
        } else if (password !== password2) {
          setError("Les deux mots de passe sont différents");
        } else {
          setStep(step + 1);
        }
        break;
    }
    if (step === 10) {
      try {
        // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long

        const fetchData = async () => {
          const response = await axios.post(
            "http://localhost:3000/user/signup/",
            {
              email: email,
              username: username,
              lastname: lastname,
              firstname: firstname,
              sex: sex,
              dateofbirth: dateofbirth,
              cancerkind: cancerkindsel,
              cancerstep: cancerstep,
              phonenumber: phonenumber,
              password: password,
            }
          );
          setData(response.data);
          console.log(response.data.token);
          handleToken(response.data.token);
          navigate("/");
        };

        fetchData();
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
    }
  };

  const onChange = (selectedValues) => {
    setCancerKind(selectedValues);
    console.log("cancer kind : ", selectedValues);
  };

  const PreviousClick = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    console.log("Valeur", step);
    if (step > 1) {
      setStep(step - 1);
      console.log("Valeur", step);
    }
  };

  function displayInput() {
    let arr = [];
    switch (step) {
      case 1:
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
      case 2:
        arr.push(
          <FormInput
            title="Votre pseudo : "
            name="inputsignup"
            placeholder=""
            state={username}
            setState={setUserName}
            type="text"
          />
        );
        break;
      case 3:
        arr.push(
          <FormInput
            name="inputsignup"
            title="Votre nom : "
            placeholder=""
            state={lastname}
            setState={setLastName}
            type="text"
          />
        );
        break;
      case 4:
        arr.push(
          <FormInput
            name="inputsignup"
            title="Votre prénom : "
            placeholder=""
            state={firstname}
            setState={setFirstName}
            type="text"
          />
        );
        break;
      case 5:
        arr.push(
          <div className="sexsignupdiv">
            <div className="titlesexsignup">Tu es ?</div>
            <div className="choicesexsignup">
              {sex !== "F" ? (
                <div className="rectanglefemmediv" onClick={() => setSex("F")}>
                  <img
                    className="imagefemmediv"
                    src={image_femme}
                    alt="image_femme"
                  />
                  <div className="txtrectanglefemme">Une femme</div>
                </div>
              ) : (
                <div className="rectanglefemmedivbold">
                  <img
                    className="imagefemmediv"
                    src={image_femme}
                    alt="image_femme"
                  />
                  <div className="txtrectanglefemme">Une femme</div>
                </div>
              )}

              {sex !== "M" ? (
                <div className="rectanglehommediv" onClick={() => setSex("M")}>
                  <img
                    className="imagehommediv"
                    src={image_homme}
                    alt="image_homme"
                  />
                  <div className="txtrectanglehomme">Un homme</div>
                </div>
              ) : (
                <div className="rectanglehommedivbold">
                  <img
                    className="imagehommediv"
                    src={image_homme}
                    alt="image_homme"
                  />
                  <div className="txtrectanglehomme">Un homme</div>
                </div>
              )}
            </div>
          </div>
        );
        break;
      case 6:
        arr.push(
          <div className="titledatepickersignup">
            Quelle est ta date de naissance?
            <DatePicker
              locale="fr"
              className="datepickersignup"
              selected={dateofbirth}
              onChange={(dateofbirth) => setDateofBirth(dateofbirth)}
              dateFormat="dd/MM/YYYY"
            />
          </div>
        );

        break;
      case 7:
        arr.push(
          <div>
            {/* <FormInput
              name="inputsignup"
              title="Type(s) de cancer"
              placeholder=""
              state={cancerkindsel}
              setState={setCancerKind}
              type="text"
            /> */}
            {/* Affichage du contenu de la listbox */}
            {cancerkindfile.results.map((cancer, idx) => {
              return (
                <div key={idx} className="cancerselecteddiv">
                  {cancerkindsel.includes(cancer.cancerkind) === false ? (
                    <p
                      className="cancernotselected"
                      onClick={() => {
                        newCancerKindArr.push(cancer.cancerkind);
                        setCancerKind(newCancerKindArr);
                        console.log(cancerkindsel);
                      }}
                    >
                      {cancer.cancerkind}
                    </p>
                  ) : (
                    <div key={idx}>
                      <p
                        className="cancerselected"
                        onClick={() => {
                          {
                            newCancerKindArr.splice(
                              cancerkindsel.indexOf(cancer.cancerkind),
                              1
                            );
                            setCancerKind(newCancerKindArr);
                          }
                          console.log(cancerkindsel);
                        }}
                      >
                        {cancer.cancerkind}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <p className="helptxtsignup">
              Promis, l'interrogatoire est presque fini
            </p>
          </div>
        );
        break;
      case 8:
        arr.push(
          <FormInput
            name="inputsignup"
            title="A quelle étape en es tu?"
            placeholder=""
            state={cancerstep}
            setState={setCancerStep}
            type="text"
          />
        );
        break;
      case 9:
        arr.push(
          <FormInput
            name="inputsignup"
            title="Quel est ton numéro de téléphone?"
            placeholder=""
            state={phonenumber}
            setState={setPhoneNumber}
            type="tel"
          />
        );
        break;
      case 10:
        arr.push(
          <div>
            <FormInput
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
              Le mot de passe doit faire plus de 8 caractères
            </p>
          </div>
        );
        break;
    }
    return arr;
  }

  return (
    <div className="containersignup">
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div className="progressbardiv">
          <div className="progressbar">
            <div
              className="progressbarfill"
              style={{ width: `${step * 10}%`, backgroundColor: "#4c548c" }}
            ></div>
          </div>
        </div>

        {displayInput()}
        <div className="buttondivsignup">
          <ButtonComponent
            className="buttonprevioussignup"
            pressFct={PreviousClick}
            txt="< Précédent"
          />
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
            <p className="alreadyaccount">
              T'as déjà un compte? Connecte toi !
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
