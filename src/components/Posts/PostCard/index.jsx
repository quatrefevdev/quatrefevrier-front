// Import des modules
import { Link } from "react-router-dom";

// CSS import
import "./post-card.scss";

const PostCard = ({post_url, post_body, post_author, comments_count}) => {
    console.log(post_author);
    return (
        <Link className="post-container" to={post_url}>        
            {post_author ? (
                <h2>
                    {post_author.username} - 
                    {post_author.dateofbirth ? post_author.dateofbirth : "35 ans"} - 
                    {post_author.cancerkind ? post_author.cancerkind[0] : ""}</h2>
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