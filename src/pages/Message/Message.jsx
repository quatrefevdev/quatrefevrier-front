import Footer from "../../components/Footer/Footer";
import Incoming from "../../components/Incoming/Incoming";
import "./Message.scss";
const Message = () => {
  return (
    <>
      <section className="message-section">
        <Incoming />
      </section>
      <Footer selected="message" />
    </>
  );
};

export default Message;
