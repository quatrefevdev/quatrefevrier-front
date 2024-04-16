import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Signup.css";
import "../../components/Reactdatepicker/Reactdatepicker.css";
import axios from "axios";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";

//Component
import FormInput from "../../components/FormInput/FormInput";
//Datepicker
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
registerLocale("fr", fr);

const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [sexF, setSexF] = useState("");
  const [sexH, setSexH] = useState("");
  const [dateofbirth, setDateofBirth] = useState(new Date());
  const [cancerkind, setCancerKind] = useState();
  const [cancerstep, setCancerStep] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    setStep(step + 1);
    if (step === 13) {
      try {
        // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long
        if (password.length > 8) {
          const fetchData = async () => {
            const response = await axios.post(
              "http://localhost:3000/user/signup/user/signup",
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
    }
  };

  const onChange = (selectedValues) => {
    setCancerKind(selectedValues);
    console.log("cancer kind : ", selectedValues);
  };

  function displayInput() {
    let arr = [];
    switch (step) {
      case 1:
        arr.push(
          <FormInput
            name="inputsignup"
            placeholder="Email"
            state={email}
            setState={setEmail}
            type={email}
          />
        );
        break;
      case 2:
        arr.push(
          <FormInput
            name="inputsignup"
            placeholder="Choisi un pseudo"
            state={username}
            setState={setUserName}
            type={username}
          />
        );
        break;
      case 3:
        arr.push(
          <FormInput
            name="inputsignup"
            placeholder="Quel est ton nom?"
            state={lastname}
            setState={setLastName}
            type={lastname}
          />
        );
        break;
      case 4:
        arr.push(
          <FormInput
            name="inputsignup"
            placeholder="Quel est ton prénom?"
            state={firstname}
            setState={setFirstName}
            type={firstname}
          />
        );
        break;
      case 5:
        arr.push(
          <div className="checkboxsignupdiv">
            <div className="titlecheckboxsignup">Tu es ?</div>
            <label>
              <input
                className="checkboxsignupH"
                type="checkbox"
                checked={sexH}
                onChange={checked_H}
              />
              Un homme
            </label>
            <label>
              <input
                className="checkboxsignupF"
                type="checkbox"
                checked={sexF}
                onChange={checked_F}
              />
              Une femme
            </label>
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
        const options = [
          { label: "Traitement", value: 1 },
          { label: "Diagnostique", value: 2 },
        ];
        arr.push(
          <div className="textlistboxsignup">
            <ListBox
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
          </div>
        );
        break;
      case 8:
        break;
      case 9:
        break;
    }
    return arr;
  }

  function checked_H() {
    setSexF(false);
    setSexH(true);
  }
  function checked_F() {
    setSexH(false);
    setSexF(true);
  }

  return (
    <div className="containersignup">
      <form
        style={{ display: "flex", flexDirection: "column" }}
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        {displayInput()}

        <input className="buttonsubmitsignup" type="submit" value="Suivant" />

        <div className="divaccount">
          <Link to={`/Login`}>
            <p className="alreadyaccount">
              T'as déjà un compte? Connecte toi !
            </p>
          </Link>
        </div>
        {showError && <p style={{ color: "red" }}>{showError}</p>}
      </form>
    </div>
  );
};

export default Signup;
