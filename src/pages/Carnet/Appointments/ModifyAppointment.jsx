import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Incoming from "../../../components/Incoming/Incoming";
// import "./ModifyAppointment.scss";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

import formatDate from "../../../assets/utils";
// Date and Time pickers
import DatePicker from "react-datepicker";
import TimePicker from "../../../components/BasicTimePicker";
import Loader from "../../../components/loader/Loader";

const ModifyAppointment = ({ token }) => {
  const navigate = useNavigate();
  const { appointment_id } = useParams();
  const [rdv, setRdv] = useState("");
  const newDate = new Date();
  const [date, setDate] = useState(newDate);
  const [isNewPicture, setIsNewPicture] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [spec, setSpec] = useState("");
  const [newTime, setNewTime] = useState(false);
  const [address, setAddress] = useState("");
  const [institution, setInstitution] = useState("");
  const [notes, setNotes] = useState("");
  const [picture, setPicture] = useState("");
  const fecthAppointment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointment/${appointment_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRdv(response.data);
      setDate(response.data[0].date);
      setTime(response.data[0].time);
      setDoctorName(response.data[0].doctorName);
      setSpec(response.data[0].speciality);
      setAddress(response.data[0].address);
      setInstitution(response.data[0].institution);
      setNotes(response.data[0].notes);
      setPicture(response.data[0].file?.secure_url);
      //   setPicture("");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const editAppointment = async () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("time", time);
    formData.append("doctorName", doctorName);
    formData.append("speciality", spec);
    formData.append("address", address);
    formData.append("institution", institution);
    formData.append("notes", notes);
    formData.append("picture", picture);
    console.log(date);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/appointment/${appointment_id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Rendez-vous modifié!");
      navigate("/myAppointments");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fecthAppointment();
  }, []);
  console.log(rdv[0]);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header pageToGoBack={"/myAppointments"} />
      <main className="container-rdv">
        <div className="title">
          <h3>Modifier votre rendez-vous</h3>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            editAppointment();
          }}
        >
          <div className="input-div">
            <label htmlFor="date">
              <h4>Date</h4>
            </label>
            <DatePicker
              locale="fr"
              dateFormat="dd/MM/YYYY"
              className="datepickeronboarding"
              calendarAriaLabel="Toggle calendar"
              minDate={new Date()}
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              selected={date}
              onChange={(date) => {
                setDate(new Date(date));
              }}
              value={formatDate(date)}
              yearAriaLabel="Year"
              withPortal
            />
          </div>
          <div className="input-div">
            <label htmlFor="heure">
              <h4>Heure</h4>
            </label>
            {newTime ? (
              <TimePicker time={time} setTime={setTime} />
            ) : (
              <div
                style={{ marginBottom: "10px" }}
                onClick={() => {
                  setNewTime(true);
                }}
                id="info-div"
              >
                {rdv[0].time}
              </div>
            )}
          </div>
          <div className="input-div">
            <label htmlFor="doctor">
              <h4>Nom du médecin</h4>
            </label>
            <input
              id="info-div"
              type="text"
              name="doctor"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="spec">
              <h4>Spécialité</h4>
            </label>
            <input
              id="info-div"
              type="text"
              name="spec"
              value={spec}
              onChange={(event) => setSpec(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="adress">
              <h4>Adresse</h4>
            </label>
            <input
              id="info-div"
              type="text"
              name="adress"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="institut">
              <h4>Institution</h4>
            </label>
            <input
              id="info-div"
              type="text"
              name="institut"
              value={institution}
              onChange={(event) => setInstitution(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="notes">
              <h4>Notes</h4>
            </label>
            <textarea
              rows={5}
              cols={50}
              type="text"
              name="notes"
              value={notes}
              placeholder="Code bâtiment, questions, apparition d'effets secondaire, etc."
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
          {picture ? (
            <div className="picture-container">
              <img
                src={isNewPicture ? URL.createObjectURL(picture) : picture}
                alt="picture"
                style={{ width: "100%" }}
              />
              <button
                type="button"
                onClick={() => {
                  setPicture("");
                }}
              >
                Changer de document
              </button>
            </div>
          ) : (
            <div id="upload">
              <label htmlFor="picture" style={{ marginRight: "10px" }}>
                Téléchargez un document
              </label>
              <input
                id="picture"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setIsNewPicture(true);
                  setPicture(e.target.files[0]);
                }}
              />
              <FontAwesomeIcon icon="fa-solid fa-upload" color="#32365a" />
            </div>
          )}
          <span>Ordonnance, compte-rendu, etc</span>
          {/* <div className="checkbox-div">
            <div>
              <input type="checkbox" onChange={() => setAlarm(!alarm)} />
              <p>Recevoir une alerte 24h avant</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Partager avec mon aidant.e</p>
            </div>
          </div> */}
          <button
            type="submit"
            className="buttonclass"
            style={{
              alignSelf: "center",
              marginTop: "20px",
              marginBottom: "80px",
              height: "auto",
            }}
          >
            Enregistrer les modifications
          </button>
        </form>
        {/* <Incoming /> */}
      </main>
      <Footer selected="suivi" />
    </>
  );
};

export default ModifyAppointment;
