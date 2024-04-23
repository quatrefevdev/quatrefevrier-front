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

const CreateGroup = () => {
    const [title, setTitle] = useState("");
    const [newGroupId, setNewGroupId] = useState();
    const token = Cookies.get("token");

    const submitGroup = async () => {
        console.log(title);
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
        }
    }
    
    return (
        <div className="create-group-page-wrapper">
            <h1>Créer un nouveau groupe</h1>
            <form className="create-group-container">
                <FormInput
                    title="Choisissez le nom de votre groupe"
                    placeholder="Nom du groupe"
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
            </form>
            {/* Redirection vers la page du groupe lorsque l'id est définit */}
            {newGroupId &&
                <Navigate to={`/group/${newGroupId}`} />
            }
        </div>
    )
}

export default CreateGroup;