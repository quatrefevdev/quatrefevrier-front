import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Import CSS
import "./Group.scss";

// Import des composants
import ButtonComponent from "../../components/Button/ButtonComponent";
import PostCard from "../../components/Posts/PostCard";
import NewPostModal from "../../components/Posts/NewPostModal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Group = () => {
  // Réupération de l'id passé en params
  const { groupId } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);


  // Récupération des données du groupe quand le composant render
  // Vérifier si l'ulisateur est membre du groupe
  let groupMembers = [];
  const [userIsMember, setUserIsMember] = useState(false);
  const checkGroupMember = (members_array) => {
    for (let i = 0; i < members_array.length; i++) {
      // Passage du state à true si le token de l'utilisateur est déjà dans la liste des membres du groupe
      if (token === members_array[i].token) {
        setUserIsMember(true);
      }
    }
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/group/${groupId}`
      );
      setData(data);
      groupMembers = data.group_members;
      checkGroupMember(groupMembers);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const token = Cookies.get("token");
  const joinGroup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/group/${groupId}/join`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return isLoading ? (
    <div className="container">
      <p>Chargement en cours...</p>
    </div>
  ) : (
    <>
      <Header
        pageToGoBack={`/forum`}
      />
      <div className={!showPostModal ? "group-page-wrapper" : "no-scroll group-page-wrapper"}>
        <div className="group-header">
          <h1 className="group-title">{data.group_name}</h1>
          {!userIsMember ?           
            <ButtonComponent 
              value={0} 
              txt="Rejoindre le groupe"
              pressFct={() => {
                joinGroup();
                window.location.reload();
              }}
            /> :
            <p>Vous êtes membre de ce groupe</p>
          }
        </div>
        <div className="group-search"></div>
        <div className="group-posts">
          {data.group_posts.map((post) => {
            console.log(post);
            return (
              <PostCard
                key={post._id}
                post_author={post.post_author?.account}
                post_body={post.post_body}
                comments_count={post.post_comments.length}
                post_url={`/post/${post._id}`}
              />
            );
          })}
        </div>
        <div className="group-page-footer">
          {userIsMember ?        
            <ButtonComponent
              value={1}
              txt="Rédiger un post"
              pressFct={() => setShowPostModal(true)}
            /> :
            <p>Vous devez être membre du groupe pour poster.</p>
          }
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
      <Footer selected="forum" />
    </>
  );
};

export default Group;
