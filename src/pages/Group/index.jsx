import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import CSS
import "./Group.scss";

// Import des composants
import ButtonComponent from "../../components/Button/ButtonComponent";
import PostCard from "../../components/Posts/PostCard";
import NewPostModal from "../../components/Posts/NewPostModal";

const Group = () => {
  // Réupération de l'id passé en params
  const { groupId } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);

  // Récupération des données du groupe quand le composant render
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/group/${groupId}`
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <div className="container">
      <p>Chargement en cours...</p>
    </div>
  ) : (
    <>
      <div className="group-page-wrapper">
        <div className="group-header">
          <h1 className="group-title">{data.group_name}</h1>
          <ButtonComponent value={0} txt="Rejoindre le groupe" />
        </div>
        <div className="group-search"></div>
        <div className="group-posts">
          {data.group_posts.map((post) => {
            return (
              <PostCard
                key={post._id}
                // post_author={post.post_author.email}
                post_body={post.post_body}
                comments_count={post.post_comments.length}
              />
            );
          })}
        </div>
        <div className="group-page-footer">
          <ButtonComponent
            value={1}
            txt="Rédiger un post"
            pressFct={() => setShowPostModal(true)}
          />
        </div>
      </div>
      {showPostModal && (
        <div className="modal-container">
          <NewPostModal
            groupId={groupId}
            updatePageData={fetchData}
            setVisibleState={setShowPostModal}
          />
        </div>
      )}
    </>
  );
};

export default Group;
