// import "./addAppointment.scss";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
//Datepicker
import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";
import TimePicker from "../../../components/BasicTimePicker";
// import TimePicker from "../../../components/LocalizedTimePicker";

const AddAppointment = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [spec, setSpec] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [picture, setPicture] = useState("");
  const [alarm, setAlarm] = useState(false);

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
                const day = date.getDate();
                const month = date.getMonth() + 1; // Note: getMonth() returns zero-based month, so we add 1
                const year = date.getFullYear();

                // Format the date as "dd/mm/yyyy"
                const formattedDate = `${day
                  .toString()
                  .padStart(2, "0")}/${month
                  .toString()
                  .padStart(2, "0")}/${year}`;
                console.log(formattedDate); // Output: "dd/mm/yyyy"
                setDate(formattedDate);
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
        {/* {picture ? (
          <div className="picture-container">
            <img src={URL.createObjectURL(picture)} alt="picture" />
            <button
              onClick={() => {
                setPicture("");
              }}
            >
              Changer d'image
            </button>
          </div>
        ) : (   */}
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
              setPicture(e);
            }}
          />
          <FontAwesomeIcon icon="fa-solid fa-upload" color="#32365a" />
        </div>
        )<span>Ordonnance, compte-rendu, etc</span>
        <div className="checkbox-div">
          <div>
            <input type="checkbox" />
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
