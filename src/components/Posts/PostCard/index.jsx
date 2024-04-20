import "./post-card.scss";

const PostCard = ({post_body, post_author, comments_count}) => {
    return (
        <div className="post-container">
            <h2>{post_author}</h2>
            <p>{post_body}</p>
            <div className="card-footer">
                {comments_count > 1 ? <p>{comments_count} commentaires</p> : <p>{comments_count} commentaire</p> }
            </div>
        </div>
    )
}

export default PostCard;