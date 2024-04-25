// Import des modules
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import des composants
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ButtonComponent from "../../components/Button/ButtonComponent";
import NewCommentModal from "../../components/Comments/NewCommentModal";
import Loader from "../../components/loader/Loader";

// Import des styles
import "./single-post.scss";

const PostSinglePage = () => {
  // Réupération de l'id passé en params
  const { postId } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);

  // Récupération de la data suivant l'id passé en params
  const fetchData = async () => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/${postId}`
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <Loader />
  ) : (
    <>    
    <Header
      pageToGoBack={`/group/${data.post_group._id}`}
    />
    <div className="single-post-page-wrapper">
        <div className="post-page-header">
          <h1>Publication de {data.post_author.account.username} dans le groupe {data.post_group.group_name}</h1>
        </div>
        <div className="content-wrapper">
          <p className="post-body">{data.post_body}</p>
          <div className="comments-container">
            <h2>Commentaires</h2>
            {data.post_comments.length > 0 ?           
              data.post_comments.map((comment) => {
                return (
                  <div className="comment">
                    <div className="author">
                      <img className="author-avatar" src={comment.comment_author.account.avatar?.secure_url} />
                      <span className="comment-author">{comment.comment_author.account.username}</span>
                    </div>
                    <p className="comment-body">{comment.comment_body}</p>
                  </div>
                )
              }) : (
                <p>Pas encore de commentaire sur ce post.</p>
              )
            }
          </div>
        </div>
        <div className="post-page-footer">
          <ButtonComponent
            value={0}
            txt="Poster un commentaire"
            pressFct={() => setShowCommentModal(true)}
          />
        </div>
    </div>
    {showCommentModal &&    
      <div className="modal-container">
        <NewCommentModal 
          postId={postId}
          setVisibleState={setShowCommentModal}
          updatePageData={fetchData}
        />
      </div>
    }
    <Footer selected="forum" />
    </>
  )
};

export default PostSinglePage;
