import Footer from "../../components/Footer/Footer";
import Incoming from "../../components/Incoming/Incoming";
import "./Mentoring.scss";
const Mentoring = () => {
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
