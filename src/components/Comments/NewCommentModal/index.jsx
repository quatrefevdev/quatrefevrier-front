// Import des modules
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Import css
import "./new-comment.scss";

// Import des composants
import ButtonComponent from "../../Button/ButtonComponent";

const NewCommentModal = ({postId, setVisibleState, updatePageData}) => {

    const [body, setBody] = useState("");
    const token = Cookies.get("token");

    const submitComment = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/post/${postId}/comment/create`, {
                comment_body: body,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBody("");
            setVisibleState(false);
            updatePageData();
        } catch (error) {
            console.log(error);
        }
    }

    // TODO : mettre à jour les commentaires on publish
    return (
        <div className="comment-modal-container">
            <form className="form-container">
                <h2 className="titleinput">Publier un nouveau commentaire</h2>
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
                            submitComment();
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default NewCommentModal;