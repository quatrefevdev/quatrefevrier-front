import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OnBoarding.scss";
import "../../css/fonts.css";
import axios from "axios";
import React, { useCallback } from "react";

registerLocale("fr", fr);
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

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
});

const MyAccount = ({ token }) => {
  return (
    <>
      {!token ? (
        <div>
          <Navigate to="/login" />
        </div>
      ) : (
        <div className="containermyaccount">
          <h2> Mon Compte</h2>
          <p>Mon avatar</p>
        </div>
      )}
    </>
  );
};

export default MyAccount;
