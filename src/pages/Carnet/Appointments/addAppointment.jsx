import "./addAppointment.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

// Date and Time pickers
import DatePicker from "react-datepicker";
import TimePicker from "../../../components/BasicTimePicker";

const AddAppointment = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [spec, setSpec] = useState("");
  const [address, setAddress] = useState("");
  const [institution, setInstitution] = useState("");
  const [notes, setNotes] = useState("");
  const [picture, setPicture] = useState("");
  const [alarm, setAlarm] = useState(false);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("time", time);
    formData.append("doctorName", doctorName);
    formData.append("speciality", spec);
    formData.append("address", address);
    formData.append("institution", institution);
    formData.append("notes", notes);
    formData.append("alarm", alarm);
    formData.append("author", id);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/" + id,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Nouveau rendez-vous enregistré!");
      navigate("/myAppointments/" + id);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <main className="container-rdv">
      <Link to={"/myAppointments/" + id}>
        <FontAwesomeIcon
          style={{ alignSelf: "start", color: "#4C548C" }}
          icon="fa-solid fa-arrow-left"
        />
      </Link>
      <div className="title">
        <h3>Ajoutez votre prochain rendez-vous</h3>
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="inline-inputs">
          <div className="input-div">
            <label htmlFor="date">
              <h4>Date*</h4>
            </label>
            <DatePicker
              locale="fr"
              dateFormat="dd/MM/YYYY"
              className="datepickeronboarding"
              calendarAriaLabel="Toggle calendar"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              selected={date}
              onChange={(date) => {
                setDate(new Date(date));
              }}
              value={date}
              yearAriaLabel="Year"
              withPortal
            />
          </div>
          <div className="input-div">
            <label htmlFor="heure">
              <h4>Heure*</h4>
            </label>
            <TimePicker time={time} setTime={setTime} />
          </div>
        </div>
        <div className="inline-inputs">
          <div className="input-div">
            <label htmlFor="doctor">
              <h4>Nom du médecin</h4>
            </label>
            <input
              type="text"
              name="doctor"
              onChange={(event) => setDoctorName(event.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="spec">
              <h4>Spécialité</h4>
            </label>
            <input
              type="text"
              name="spec"
              onChange={(event) => setSpec(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="adress">
            <h4>Adresse</h4>
          </label>
          <input
            type="text"
            name="adress"
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="institut">
            <h4>Institution</h4>
          </label>
          <input
            type="text"
            name="institut"
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
            placeholder="Code bâtiment, questions, apparition d'effets secondaire, etc."
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
        {picture ? (
          <div className="picture-container">
            <img src={URL.createObjectURL(picture)} alt="picture" />
            <button
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
                setPicture(e.target.files[0]);
              }}
            />
            <FontAwesomeIcon icon="fa-solid fa-upload" color="#32365a" />
          </div>
        )}
        <span>Ordonnance, compte-rendu, etc</span>
        <div className="checkbox-div">
          <div>
            <input type="checkbox" onChange={() => setAlarm(!alarm)} />
            <p>Recevoir une alerte 24h avant</p>
          </div>
          <div>
            <input type="checkbox" />
            <p>Partager avec mon aidant.e</p>
          </div>
        </div>
        <button
          type="submit"
          className="buttonclass"
          style={{ alignSelf: "center", marginTop: "20px" }}
        >
          Enregistrer
        </button>
      </form>
    </main>
  );
};
export default AddAppointment;
