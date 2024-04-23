import Footer from "../../components/Footer/Footer";
import Incoming from "../../components/Incoming/Incoming";
import "./Message.scss";
import { useNavigate } from "react-router-dom";
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";
import { useEffect } from "react";
const Message = ({ token }) => {
  const navigate = useNavigate();
  useEffect(() => {
    redirectIfNoToken(token, navigate);
  }, []);
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
