// Import des modules
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Import CSS
import "./new-post-modal.scss";

// Import des composants
import FormInput from "../../FormInput/FormInput";
import ButtonComponent from "../../Button/ButtonComponent";

const NewPostModal = ({groupId, setVisibleState, updatePageData}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const token = Cookies.get("token");

    console.log(groupId);
    console.log(token);

    const submitPost = async () => {
        try {           
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/group/${groupId}/post/create`, {
                    post_title: title,
                    post_body: body,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTitle("");
            setBody("");
            setVisibleState(false);
            updatePageData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="new-post-modal-wrapper">
            <form className="form-container">
                <FormInput
                    title="Titre du post"
                    name="post_title"
                    placeholder="Votre titre"
                    state={title}
                    setState={setTitle}
                />
                <h2 className="titleinput">Contenu de votre post</h2>
                <div className="divforminput">
                    <textarea 
                        className="forminput"
                        name="post_body"
                        id="post_body"
                        value={body}
                        onChange={(event) => {
                            setBody(event.target.value);
                        }}
                    ></textarea>
                </div>
                <div className="button-wrapper">
                    <ButtonComponent
                        txt="Publier le post"
                        pressFct={(e) => {
                            e.preventDefault(); 
                            submitPost();
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default NewPostModal;