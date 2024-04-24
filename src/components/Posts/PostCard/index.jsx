// Import des modules
import { Link } from "react-router-dom";

// CSS import
import "./post-card.scss";

const PostCard = ({post_url, post_body, post_author, comments_count}) => {

    // Calcul de l'age de l'utilisateur
    const currentDate = Date.now();
    const userBirthDate = new Date(post_author.dateofbirth).getTime();
    const userAge = new Date(currentDate - userBirthDate).getUTCFullYear() - 1970;

    return (
        <Link className="post-container" to={post_url}>
            {console.log(post_author)}        
            {post_author ? (
                <h2>
                    {post_author.username} - 
                    {post_author.dateofbirth ? userAge + " ans" : "35 ans"} - 
                    {post_author.cancerkind ? post_author.cancerkind[0].replace(`["`, "").replace(`"]`, "") : ""}</h2>
            ) : (
                <h2>Utilisateur du forum</h2>
            )}
            <p>{post_body}</p>
            <div className="card-footer">
                {comments_count > 1 ? <p>{comments_count} commentaires</p> : <p>{comments_count} commentaire</p> }
            </div>
        </Link>
    )
}

export default PostCard;