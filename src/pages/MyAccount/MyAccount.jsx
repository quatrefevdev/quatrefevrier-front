import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyAccount.scss";
import "../../css/fonts.css";
import axios from "axios";
import React, { useCallback } from "react";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPen, faPlus);

//JSON Files
import cancerstepfile from "../../Json/cancerstep.json";

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

const MyAccount = ({ token, handleToken }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cancerstep, setCancerStep] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Mes datas : ", response.data);
        setData(response.data);
        console.log(isUpdated);
        if (response.data.account.username && isUpdated === false) {
          setUserName(response.data.account.username);
        }
        if (response.data.email && isUpdated === false) {
          setEmail(response.data.email);
        }
        if (response.data.account.phonenumber && isUpdated === false) {
          setPhoneNumber(response.data.account.phonenumber);
        }
        if (response.data.account.cancerKind && isUpdated === false) {
          setCancerKind(response.data.account.cancerKind);
        }
        setIsUpdated(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    redirectIfNoToken(token, navigate);
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    setError("");
    try {
      const fetchUpdatedData = async () => {
        // Je crée une nouvelle instance du constructeur FormData
        const formData = new FormData();
        // Rajouter 2 paires clef/valeur à mon formdata
        formData.append("avatar", avatar);
        // Création des autres clef/valeur au formData;
        formData.append("email", email);
        formData.append("username", username);
        formData.append("cancerstep", cancerstep);
        formData.append("phonenumber", phonenumber);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/updateuserinfo/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Erreur message : ", error.response.data.message);
          if (error.response.data.message === "Ce pseudo est déjà pris") {
            setError("Désolé, ce pseudo est déjà pris");
          }
          if (error.response.data.message === "Ce mail existe déjà") {
            setError("Désolé, ce mail existe déjà");
          }
        }
      };
      fetchUpdatedData();
    } catch (error) {
      console.log("Erreur message : ", error.response.data.message);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    handleToken(token);
    navigate("/login");
  };
  return isLoading ? (
    <h2>Chargement de la page...</h2>
  ) : (
    <div className="containermyaccount">
      <div className="titlemyaccount">
        <h2> Mon Compte</h2>
      </div>
      <p className="coordclass"> Mes coordonnées : </p>
      <div className="pseudoclass">
        <p className="pseudotitle"> Mon pseudo :</p>

        <input
          className="inputaccountpseudo"
          value={username}
          type="text"
          set={username}
          name="inputpseudo"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setUserName(event.target.value);
            console.log(username);
          }}
        />
      </div>
      <div className="emailclass">
        <p className="emailtitle"> Mon email : </p>
        <input
          className="inputaccountemail"
          value={email}
          type="text"
          name="inputaccountemail"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setEmail(event.target.value);
            console.log(email);
          }}
        />
      </div>
      <div className="phonenumberclass">
        <p className="phonenumbertitle"> Mon numéro de téléphone : </p>
        <input
          className="inputaccountphone"
          value={phonenumber}
          type="text"
          name="inputaccountphone"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setPhoneNumber(event.target.value);
            console.log(phonenumber);
          }}
        />
      </div>
      <div className="avatarclass">
        <p className="avatartitle"> Mon avatar :</p>
        {data.account.avatar ? (
          <div className="avatarimgdiv">
            <img
              className="avatarimg"
              src={data.account.avatar.secure_url}
              alt="avatar"
            ></img>
          </div>
        ) : (
          <div onClick={() => avatarChange}>
            <FontAwesomeIcon className="plusicon" icon="fa-solid fa-plus" />
            <p> Ajouter un avatar </p>
          </div>
        )}
      </div>
      <div className="cancerstepclass">
        <p className="cancersteptitle"> Etape du cancer : </p>
        <select
          className="cancerstepselect"
          onChange={(e) => setCancerStep(e.target.value)}
        >
          {cancerstepfile.results.map((cancer, idx) => {
            return (
              <option value={cancer.cancerstep}>
                <p className="cancersteptext">{cancer.cancerstep}</p>
              </option>
            );
          })}
        </select>
      </div>{" "}
      <div className="handleLogout">
        <button className="buttonLogout" onClick={() => handleLogout()}>
          Déconnexion
        </button>
        <button className="buttonSave" onClick={() => handleSubmit()}>
          Enregistrer
        </button>
        <p> {error}</p>
      </div>
      <Footer selected="compte"></Footer>
    </div>
  );
};

export default MyAccount;
