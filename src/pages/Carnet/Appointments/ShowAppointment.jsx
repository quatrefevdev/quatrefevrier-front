import axios from "axios";
import "./myAppointments.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
const ShowAppointment = ({ user_id }) => {
  const navigate = useNavigate();
  const { appointment_id } = useParams();
  const [rdv, setRdv] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Note: getMonth() returns zero-based month, so we add 1
    const year = dateObject.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    return formattedDate;
  };
  const fecthAppointment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/appointment/" + appointment_id
      );
      setRdv(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fecthAppointment();
  }, []);
  const deleteRequest = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/appointment/" + appointment_id
      );
      alert("Rendez-vous effacé!");
      navigate("/myAppointments/" + user_id);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <>
      <Header pageToGoBack={"/myAppointments/" + user_id} />
      <main className="container-rdv">
        {/* <Link to={"/myAppointments/" + user_id}>
          <FontAwesomeIcon
            style={{ alignSelf: "start", color: "#4C548C" }}
            icon="fa-solid fa-arrow-left"
          />
        </Link> */}
        <div className="title">
          <h3>Mon rendez-vous</h3>
          <FontAwesomeIcon
            icon="fa-solid fa-trash"
            color="#4C548C"
            onClick={() => {
              deleteRequest();
            }}
          />
        </div>
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
          <div className="picture-container">
            <img id="showImg" src={rdv[0].file.secure_url} alt="picture" />
          </div>
        ) : null}
      </main>
      <Footer selected="suivi"></Footer>
    </>
  );
};
export default ShowAppointment;
