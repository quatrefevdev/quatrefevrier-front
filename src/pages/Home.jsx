import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import marvelpres from "../pictures/Marvel_presentation.png";

import "./Home.css";
const Comics = ({ search }) => {
  return (
    <div className="marvel_pres">
      <img src={marvelpres} alt="Marvel_presentation_img" />
    </div>
  );
};
export default Comics;
