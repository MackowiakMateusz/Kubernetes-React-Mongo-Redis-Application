import { connect } from "react-redux";
import AnimeForm from "./AnimeForm";
import { withRouter } from "react-router-dom";
import { getAnimeFromId } from "../../ducks/animes/selectors";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const AnimeAdd = ({history,anime}) => {
    useEffect(() => {
        console.log(anime);
    }, [anime]);
    return(
        <div>
            <AnimeForm
            isEditFormInsteadOfAddForm={true}
            editedAnime={anime}
            />
            <div className="LinkDiv">
                <Link to={`/animes/details/${anime._id}`} className="Link">Back To This Anime Details</Link>
            </div>
        </div>
    )
    
}
const mapStateToProps = (state,props) => {
    return {
        anime: getAnimeFromId(state,props.match.params.id)
    };
}
const mapDispatchToProps = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnimeAdd));