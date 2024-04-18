import { useState, useEffect } from "react";
import "./Forum.scss";

const Group = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <>
      <section className="group-section">
        <div className="container-group"></div>
      </section>
    </>
  );
};

export default Group;
