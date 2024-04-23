import Footer from "../../../components/Footer/Footer";
import Incoming from "../../../components/Incoming/Incoming";

import "./SecondaryEffects.scss";
const SecondaryEffects = () => {
  return (
    <>
      <section className="secondaryeffects-section">
        <Incoming />
      </section>
      <Footer selected="suivi" />
    </>
  );
};

export default SecondaryEffects;
