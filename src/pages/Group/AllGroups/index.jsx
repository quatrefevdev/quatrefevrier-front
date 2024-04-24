// Import des modules
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import CSS
import "./all-groups.scss";

// Import des composants
import Header from "../../../components/Header/Header";

const AllGroupsPage = () => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `${import.meta.env.VITE_API_URL}/groups`
                )
                setData(data[1].groups);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);    
    
    const allValidGroups = data;

    return isLoading ? (
        <div className="all-groups-page-wrapper">
            <h1>Chargement en cours...</h1>
        </div>
    ) : (
        <>        
            <Header
                pageToGoBack={`/forum`}
            />
            <div className="all-groups-page-wrapper">
                <h1>Rechercher un forum</h1>
                {allValidGroups ?
                    allValidGroups.map((group) => {
                        return (
                            <Link to={`/group/${group._id}`} className="group-container">
                                <h2>{group.group_name}</h2>
                                <div className="group-info">
                                    {/* Affichage du nombre de membres du forum */}
                                    {group.group_members.length > 1 ? (
                                            <span className="members-count">{`${group.group_members.length} membres`}</span>
                                        ) : group.group_members.length === 1 ? (
                                            <span className="members-count">{`${group.group_members.length} membre`}</span>
                                        ) : (
                                            <span className="members-count">{`Pas encore de membre`}</span>
                                    )}
                                    {/* Affichage du nombre de posts du forum */}
                                    {group.group_posts.length > 1 ? (
                                        <span className="posts-count">{`${group.group_posts.length} posts`}</span>
                                    ) : group.group_posts.length === 1 ? (
                                        <span className="posts-count">{`${group.group_posts.length} post`}</span>
                                    ) : (
                                        <span className="posts-count">{`Pas encore de post`}</span>
                                    )}
                                </div>
                            </Link>
                        )
                    }) :
                    <p>Pas encore de forums...</p>
                }
            </div>
        </>
    )
}

export default AllGroupsPage;