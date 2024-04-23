import Footer from "../../../components/Footer/Footer";
import Incoming from "../../../components/Incoming/Incoming";
import "./MyWeight.scss";
const MyWeight = () => {
  return (
    <>
      <section className="myweight-section">
        <Incoming />
      </section>
      <Footer selected="suivi" />
    </>
  );
};

export default MyWeight;
