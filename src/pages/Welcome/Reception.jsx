import { useState, useEffect } from "react";
import axios from "axios";
//Css style
import "../../App.scss";
import React from "react";
const Reception = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [appointmentsdata, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);

        const appointments = await axios.get(
          `http://localhost:3000/appointments/` + data._id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(appointments.data);
        console.log("Appointments : ", appointmentsdata);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2> Bonjour {data.firstname}</h2>
      <p> Vos prochains rendez-vous</p>
      {appointmentsdata.length === 0 ? (
        <div> Pas de rendez vous à venir </div>
      ) : (
        <div>
          {appointmentsdata.map((appointment, idx) => {
            return (
              <div>
                <p>{appointment.date}</p>
                <p>{appointment.time}</p>
                {appointment.doctorName && <p>appointment.doctorName</p>}
                {appointment.speciality && <p>appointment.speciality</p>}
                {appointment.institution && <p>appointment.institution</p>}
                {appointment.address && <p>appointment.address</p>}
              </div>
            );
          })}
        </div>
      )}
      <p> Les dernières actus de vos forums favoris</p>
    </div>
  );
};
export default Reception;
