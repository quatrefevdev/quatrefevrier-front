// Import des modules
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Import CSS
import "./create-group.scss";

// Import des composants
import ButtonComponent from "../../../components/Button/ButtonComponent";
import FormInput from "../../../components/FormInput/FormInput";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

const CreateGroup = () => {
    const [title, setTitle] = useState("");
    const [newGroupId, setNewGroupId] = useState();
    const [error, setError] = useState(false);
    const token = Cookies.get("token");

    const submitGroup = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/group/create`, {
                group_name: title,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNewGroupId(response.data.newGroup._id);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
    
    return (
        <>
        <Header pageToGoBack={"/forum"} />
        <div className="create-group-page-wrapper">
            <h1>Créer un nouveau forum</h1>
            <form className="create-group-container">
                <FormInput
                    title="Choisissez le nom de votre forum"
                    placeholder="Nom du forum"
                    state={title}
                    setState={setTitle}
                    name="group_title"
                />
                <ButtonComponent
                    value={0}
                    txt="Créer le groupe"
                    pressFct={(e) => {
                        e.preventDefault();
                        submitGroup();
                    }}
                />
                {error &&                
                    <div className="error-container">
                        <p>Veuillez rensigner un nom pour le forum</p>
                    </div>
                }
            </form>
            {/* Redirection vers la page du groupe lorsque l'id est définit */}
            {newGroupId &&
                <Navigate to={`/group/${newGroupId}`} />
            }
        </div>
        <Footer selected="forum"/>
        </>
    )
}

export default CreateGroup;