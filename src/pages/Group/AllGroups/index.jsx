// Import des modules
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import CSS
import "./all-groups.scss";

// Import des composants
import Header from "../../../components/Header/Header";
import FormInput from "../../../components/FormInput/FormInput";

const AllGroupsPage = () => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `${import.meta.env.VITE_API_URL}/groups?search=${search}`
                )
                setData(data[1].groups);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [search]);    
    
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
                <div className="page-header">
                    <h1>Rechercher un forum</h1>
                    <form className="search-container">
                        <FormInput
                            placeholder="Saisissez votre recherche ici"
                            state={search}
                            setState={setSearch}
                        />
                    </form>
                </div>
                {allValidGroups ?
                    allValidGroups.map((group) => {
                        return (
                            <Link key={group._id} to={`/group/${group._id}`} className="group-container">
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