import axios from "axios";
import "./myAppointments.scss";
import "./addAppointment.scss";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import formatDate from "../../../assets/utils";
const ShowAppointment = ({ del, setDel, setVisibility }) => {
  const navigate = useNavigate();
  const { appointment_id } = useParams();
  const [rdv, setRdv] = useState("");
  const newDate = new Date();
  const [date, setDate] = useState(newDate);
  const [isBig, setIsBig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fecthAppointment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointment/${appointment_id}`
      );
      setRdv(response.data);
      setDate(response.data[0].date);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const deleteRequest = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/appointment/${appointment_id}`
      );
      alert("Rendez-vous effacé!");
      navigate("/myAppointments");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fecthAppointment();
    if (del) {
      deleteRequest();
      setDel(false);
    }
  }, [del]);

  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <>
      <Header pageToGoBack={"/myAppointments"} />
      <main className="container-rdv">
        <div className="title">
          <h3>Mon rendez-vous</h3>
          <button>Modifier</button>
          <FontAwesomeIcon
            icon="fa-solid fa-trash"
            color="#4C548C"
            onClick={() => {
              setVisibility(true);
            }}
          />
        </div>
        {/* <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        > */}
        <div className="inline-inputs">
          <div className="input-div">
            <h4>Date</h4>

            <div id="info-div">{formatDate(rdv[0].date)}</div>
          </div>
          <div className="input-div">
            <h4>Heure</h4>
            <div id="info-div">{rdv[0].time}</div>
          </div>
        </div>
        <div className="inline-inputs">
          <div className="input-div">
            <h4>Nom du médecin</h4>
            <div id="info-div">{rdv[0].doctorName}</div>
          </div>
          <div className="input-div">
            <h4>Spécialité</h4>
            <div id="info-div">{rdv[0].speciality}</div>
          </div>
        </div>
        <div>
          <h4>Adresse</h4>
          <div id="info-div">{rdv[0].address}</div>
        </div>
        <div>
          <h4>Institution</h4>
          <div id="info-div">{rdv[0].institution}</div>
        </div>
        <div>
          <h4>Notes</h4>
          <div id="info-div">{rdv[0].notes}</div>
        </div>
        {rdv[0].file ? (
          <>
            {/* <div className="picture-container"> */}
            <img
              id="showImg"
              src={rdv[0].file.secure_url}
              alt="picture"
              style={{ width: isBig ? "100%" : "100px" }}
            />
            {/* </div> */}
            <button
              style={{ marginBottom: isBig ? "80px" : "0px;" }}
              onClick={() => {
                setIsBig(!isBig);
              }}
            >
              {isBig ? "Réduire l'image" : "Agrandir l'image"}
            </button>
          </>
        ) : null}
        {/* </form> */}
      </main>
      <Footer selected="suivi"></Footer>
    </>
  );
};
export default ShowAppointment;
