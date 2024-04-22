import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OnBoarding.scss";
import "../../css/fonts.css";
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
import cancerkindfile from "../../Json/cancerkind.json";
import cancerstepfile from "../../Json/cancerstep.json";

registerLocale("fr", fr);

const OnBoarding = ({ token }) => {
  const [username, setUserName] = useState("");
  const [lastname, setLastName] = useState("");
  const [val, setVal] = useState(0);
  const [firstname, setFirstName] = useState("");
  const [sex, setSex] = useState("");
  const [dateofbirth, setDateofBirth] = useState(new Date());
  const [cancerkindsel, setCancerKind] = useState([]);
  const [cancerstepsel, setCancerStep] = useState("");
  const [phonenumber, setPhoneNumber] = useState();
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState({});
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [usertype, setUserType] = useState("");
  const newCancerKindArr = [...cancerkindsel];

  const navigate = useNavigate();

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
  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    setVal(0);
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    setError("");
    switch (step) {
      // Gestion de tout les cas de mauvaises saisies utilisateurs, contrôles, regex ...
      case 1 /* User type (Buttons) */:
        if (!usertype) {
          setError("Désolé, peux tu choisir une catégorie");
        } else {
          setStep(step + 1);
          setVal(0);
          setError("");
        }
        break;
      case 2 /* UserName (Input) */:
        if (!username) {
          setError("Il te faut un pseudo ! ");
        } else {
          setStep(step + 1);
          setVal(0);
          setError("");
        }
        break;
      case 3 /* Name (Input) */:
        if (!lastname) {
          setError("Allez ! T'as bien un petit nom ");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }
        break;
      case 4 /* Firstname (Input) */:
        if (!firstname) {
          setError("Renseigne ton prénom s'il te plait");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }
        break;
      case 5 /* Sex choice (Image+Onclick) */:
        if (!sex) {
          setError("Clic sur un des deux genres s'il te plait");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }

        break;
      case 6 /* Date of birth (datepicker) */:
        if (!dateofbirth) {
          setError("Sélectionne ta date de naissance s'il te plait");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }
        break;
      case 7 /* Cancer Kind (multiple listbox)*/:
        if (cancerkindsel.length === 0) {
          setError("Sélectionne ton type de cancer s'il te plait");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }
        break;
      case 8 /* Cancer step (listbox)*/:
        if (cancerstepsel.length === 0) {
          setError("Sélectionne la phase de ton cancer s'il te plait");
        } else {
          setStep(step + 1);
          setError("");
          setVal(0);
        }
        break;
      case 9 /* Phone number (Input+regex) */:
        const checknumber = validatePhoneNumber(phonenumber);
        if (!phonenumber || checknumber === false) {
          setError("T'as bien un 06 !");
        } else {
          setStep(step + 1);
          setVal(0);
          setError("");
        }
        break;
      case 10 /*Avatar */:
        setStep(step + 1);
        break;
    }
    if (step >= 10) {
      try {
        const fetchData = async () => {
          // Je crée une nouvelle instance du constructeur FormData
          const formData = new FormData();
          // Rajouter 2 paires clef/valeur à mon formdata
          formData.append("avatar", avatar);
          console.log("Avatar", avatar);
          const response = await axios.put(
            "http://localhost:3000/user/updateuser/",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
            {
              username: username,
              lastname: lastname,
              firstname: firstname,
              sex: sex,
              dateofbirth: dateofbirth,
              cancerkind: cancerkindsel,
              cancerstep: cancerstepsel,
              phonenumber: phonenumber,
              accountype: usertype,
            }
          );
        };

        navigate("/reception");
        fetchData();
      } catch (error) {
        console.log("Erreur message : ", error.response.data.message);
        if (
          error.response.data.message ===
          "This mail already exists, ask user to connect"
        ) {
          setError(
            "Cet Email existe déjà, merci de vous connecter à votre compte"
          );
        }
      }
    }
  };

  const PreviousClick = (event) => {
    setVal(0);
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };
  const UserTypePatient = (event) => {
    event.preventDefault();
    setUserType("Patient");
  };
  const UserTypeAidant = (event) => {
    event.preventDefault();
    setUserType("Aidant");
  };

  function displayInput() {
    let arr = [];
    switch (step) {
      case 1 /* User type (Buttons) */:
        arr.push(
          <div>
            <h2 className="titleUserTypeOnBoard"> Vous êtes ? </h2>
            <div className="buttonpatientaidantdiv">
              <ButtonComponent
                pressFct={UserTypePatient}
                value={usertype === "Patient" ? 1 : 0}
                txt="Patient"
              />
              <ButtonComponent
                pressFct={UserTypeAidant}
                value={usertype === "Aidant" ? 1 : 0}
                txt="Aidant"
              />
            </div>
          </div>
        );
        break;
      case 2 /* UserName (Input) */:
        arr.push(
          <div className="usernamediv">
            <FormInput
              title="Votre pseudo : "
              name="inputonboarding"
              placeholder=""
              state={username}
              setState={setUserName}
              type="text"
            />
          </div>
        );
        break;
      case 3 /* Name (Input) */:
        arr.push(
          <div className="namediv">
            <FormInput
              name="inputonboarding"
              title="Votre nom : "
              placeholder=""
              state={lastname}
              setState={setLastName}
              type="text"
            />
          </div>
        );
        break;
      case 4 /* Firstname (Input) */:
        arr.push(
          <div className="firstnamediv">
            <FormInput
              name="inputonboarding"
              title="Votre prénom : "
              placeholder=""
              state={firstname}
              setState={setFirstName}
              type="text"
            />
          </div>
        );
        break;
      case 5 /* Sex choice (Image+Onclick) */:
        arr.push(
          <div className="sexonboardingdiv">
            <div className="titlesexonboarding">Vous êtes ?</div>
            <div className="choicesexonboarding">
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

              {sex !== "H" ? (
                <div className="rectanglehommediv" onClick={() => setSex("H")}>
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
      case 6 /* Date of birth (datepicker) */:
        arr.push(
          <div className="titledatepickeronboarding">
            Quelle est votre date de naissance?
            <DatePicker
              locale="fr"
              dateFormat="P"
              className="datepickeronboarding"
              calendarAriaLabel="Toggle calendar"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              selected={dateofbirth}
              onChange={(dateofbirth) => setDateofBirth(dateofbirth)}
              value={dateofbirth}
              yearAriaLabel="Year"
            />
          </div>
        );

        break;
      case 7 /* Cancer Kind (multiple listbox)*/:
        arr.push(
          <div>
            <div className="titlecancerkindonboarding">Type(s) de cancer :</div>
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
          </div>
        );
        break;
      case 8 /* Cancer step (listbox)*/:
        arr.push(
          <div>
            <div className="titlecancersteponboarding">Vous êtes :</div>
            {/* Affichage du contenu de la listbox */}
            {cancerstepfile.results.map((cancer, idx) => {
              return (
                <div key={idx} className="cancerstepselecteddiv">
                  {cancerstepsel.indexOf(cancer.cancerstep) === -1 ? (
                    <div>
                      <p
                        className="cancerstepnotselected"
                        onClick={() => {
                          setCancerStep(cancer.cancerstep);
                        }}
                      >
                        {cancer.cancerstep}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className="cancerstepselected"
                        onClick={() => {
                          setCancerStep("");
                        }}
                      >
                        {cancer.cancerstep}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

        break;
      case 9 /* Phone number (Input+regex) */:
        arr.push(
          <div className="phonediv">
            <FormInput
              name="inputonboarding"
              title="Quel est votre numéro de téléphone?"
              placeholder=""
              state={phonenumber}
              setState={setPhoneNumber}
              type="tel"
            />
          </div>
        );
        break;
      case 10 /*Avatar URL.createObjectURL((**/:
        arr.push(
          <div className="avatarbuttononboardingdiv">
            <input
              type="file"
              id="file"
              className="avatarpicker"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
            <label className="labelavatar" htmlFor="file">
              Sélectionne un avatar
            </label>
          </div>
        );
        break;
    }
    return arr;
  }

  return (
    <>
      {!token ? (
        <div>
          <Navigate to="/accueil" />
        </div>
      ) : (
        <div className="containeronboarding">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
            <div className="progressbardiv">
              <div className="progressbar">
                <div
                  className="progressbarfill"
                  style={{ width: `${step * 10}%`, backgroundColor: "#4c548c" }}
                ></div>
              </div>
            </div>
            {displayInput()}

            <div className="buttondivonboarding">
              {step !== 1 && (
                <ButtonComponent
                  id="Previous"
                  value={val}
                  pressFct={PreviousClick}
                  txt="< Précédent"
                />
              )}
              <ButtonComponent
                id="Next"
                value={val}
                pressFct={handleSubmit}
                txt="Suivant >"
              />
            </div>
            {error ? (
              <p className="errortxtonboarding">{error}</p>
            ) : (
              <p className="errortxtonboardinghidden">{error}</p>
            )}
            <div className="divaccount">
              <Link to={`/Login`}>
                <p className="alreadyaccountonboarding">
                  Déjà un compte? Connectez-vous !
                </p>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default OnBoarding;
