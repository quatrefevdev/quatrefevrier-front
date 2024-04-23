import Footer from "../../../components/Footer/Footer";
import Incoming from "../../../components/Incoming/Incoming";
import "./MyNotes.scss";
const MyNotes = () => {
  return (
    <>
      <section className="mynotes-section">
        <Incoming />
      </section>
      <Footer selected="suivi" />
    </>
  );
};

export default MyNotes;
