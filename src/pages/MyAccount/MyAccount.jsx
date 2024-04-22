import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyAccount.scss";
import "../../css/fonts.css";
import axios from "axios";
import React, { useCallback } from "react";
import Footer from "../../components/Footer/Footer";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPen, faPlus);

//JSON Files
import cancerstepfile from "../../Json/cancerstep.json";

//Component
import FormInput from "../../components/FormInput/FormInput";

const MyAccount = ({ id, token }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cancerKind, setCancerKind] = useState();
  const [username, setUserName] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Mes datas : ", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event, type) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    setError("");
    try {
      const fetchData = async () => {
        // Je crée une nouvelle instance du constructeur FormData
        const formData = new FormData();
        switch (type) {
          case "email":
            formData.append("email", email);
            const response1 = await axios.post(
              `http://localhost:3000/user/updateuser?email=` + { email },
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            break;
          case "pseudo":
            formData.append("username", username);
            const response2 = await axios.post(
              `http://localhost:3000/user/updateuser?username=` + { username },
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            break;
          case "phonenumber":
            formData.append("phonenumber", phonenumber);
            const response3 = await axios.post(
              `http://localhost:3000/user/updateuser?phonenumber=` +
                { phonenumber },
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            break;
          case "avatar":
            formData.append("avatar", avatar);
            const response4 = await axios.post(
              `http://localhost:3000/user/updateuser?avatar=` + { avatar },
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            break;
          case "cancerstep":
            formData.append("cancerstep", cancerstep);
            const response5 = await axios.post(
              `http://localhost:3000/user/updateuser?cancerstep=` + { avatar },
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            break;
        }
      };
      fetchData();
    } catch (error) {
      console.log("Erreur message : ", error.response.data.message);
    }
  };
  const pseudoChange = (event) => {
    event.preventDefault();
    keyb;
    handleSubmit(event, "pseudo");
  };
  const emailChange = (event) => {
    event.preventDefault();
    handleSubmit(event, "email");
  };
  const phonenumberChange = (event) => {
    event.preventDefault();
    handleSubmit(event, "phonenumber");
  };
  const avatarChange = (event) => {
    event.preventDefault();
    handleSubmit(event, "avatar");
  };
  const cancerStepChange = (event) => {
    event.preventDefault();
    handleSubmit(event, "cancerstep");
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
          className="inputpseudo"
          value={data.account.username}
          type="text"
          placeholder={data.account.username}
          name="inputpseudo"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>
      <div className="emailclass">
        <p className="emailtitle"> Mon email : </p>
        <p className="emailtext">{data.email}</p>
        <div onClick={() => emailChange}>
          <FontAwesomeIcon
            className="emailiconclass"
            icon="fa-solid fa-pen"
            size="2xs"
          />
        </div>
      </div>
      <div className="phonenumberclass">
        <p className="phonenumbertitle"> Mon numéro de téléphone : </p>
        <p className="phonenumbertext">{data.account.phonenumber}</p>
        <div onClick={() => phonenumberChange}>
          <FontAwesomeIcon
            className="phonenumbericonclass"
            icon="fa-solid fa-pen"
            size="2xs"
          />
        </div>
      </div>
      <div className="avatarclass">
        <p className="avatartitle"> Mon avatar :</p>
        {data.account.avatar && (
          <div className="avatarimgdiv">
            <img
              className="avatarimg"
              src={data.account.avatar.secure_url}
              alt="avatar"
            ></img>
            <div onClick={() => avatarChange}>
              <FontAwesomeIcon className="plusicon" icon="fa-solid fa-plus" />
            </div>
          </div>
        )}
      </div>
      <div className="cancerstepclass">
        <p className="cancersteptitle"> Etape du cancer : </p>
        <select
          className="cancerstepselect"
          onChange={(e) => setCancerKind(e.target.value)}
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
      </div>
      <Footer selected="compte"></Footer>
    </div>
  );
};

export default MyAccount;
