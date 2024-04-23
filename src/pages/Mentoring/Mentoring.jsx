import Footer from "../../components/Footer/Footer";
import Incoming from "../../components/Incoming/Incoming";
import "./Mentoring.scss";
import { useNavigate } from "react-router-dom";
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";
import { useEffect } from "react";
const Mentoring = ({ token }) => {
  const navigate = useNavigate();
  useEffect(() => {
    redirectIfNoToken(token, navigate);
  }, []);
  return (
    <>
      <section className="mentoring-section">
        <Incoming />
      </section>
      <Footer selected="parrain" />
    </>
  );
};

export default Mentoring;
