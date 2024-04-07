import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";
const Comics = ({ search }) => {
  return (
    <div className="marvel_pres">
      <img
        src="../../Pictures/Marvel_presentation.png"
        alt="Marvel_presentation_img"
      />
    </div>
  );
};
export default Comics;
