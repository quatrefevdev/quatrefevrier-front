import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyAccount.scss";
import "../../css/fonts.css";
import axios from "axios";
import React, { useCallback } from "react";
import Footer from "../../components/Footer/Footer";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPen);

//JSON Files
import cancerstepfile from "../../Json/cancerstep.json";

//Component
import ButtonComponent from "../../components/Button/ButtonComponent";
const MyAccount = ({ id, token }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  const pseudoChange = (event) => {
    event.preventDefault();
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
        <p className="pseudotext">{data.account.username}</p>
        <FontAwesomeIcon
          className="pseudoiconclass"
          icon="fa-solid fa-pen"
          size="2xs"
        />
      </div>
      <div className="emailclass">
        <p className="emailtitle"> Mon email : </p>
        <p className="emailtext">{data.email}</p>
        <FontAwesomeIcon
          className="pseudoiconclass"
          icon="fa-solid fa-pen"
          size="2xs"
        />
      </div>
      <div className="phonenumberclass">
        <p className="phonenumbertitle"> Mon numéro de téléphone : </p>
        <p className="phonenumbertext">{data.account.phonenumber}</p>
        <FontAwesomeIcon
          className="pseudoiconclass"
          icon="fa-solid fa-pen"
          size="2xs"
        />
      </div>

      <div className="avatarclass">
        <p className="avatartitle"> Mon avatar :</p>
        {data.account.avatar && (
          <img
            className="avatarimg"
            src={data.account.avatar.secure_url}
            alt="avatar"
          ></img>
        )}
      </div>
      <div className="cancerstepclass">
        <p className="cancersteptitle"> Etape du cancer : </p>
        <select>
          {cancerstepfile.results.map((cancer, idx) => {
            return (
              <option value={cancer.cancerstep}>{cancer.cancerstep}</option>
            );
          })}
        </select>
      </div>

      <Footer selected="compte"></Footer>
    </div>
  );
};

export default MyAccount;
