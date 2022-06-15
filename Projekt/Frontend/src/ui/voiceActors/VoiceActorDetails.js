import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getVoiceActorFromId } from "../../ducks/voiceActors/selectors";
import { deleteVoiceActor,editVoiceActor } from "../../ducks/voiceActors/operations";
import { getAnimeList } from "../../ducks/animes/operations";
import { withRouter } from "react-router";
import { useEffect,useState } from "react";
import { editAnime } from "../../ducks/animes/operations";
import { getAnimes } from "../../ducks/animes/selectors";
const VoiceActorDetails = ({ history,voiceActor,animes,getAnimeList,deleteVoiceActor,editAnime,editVoiceActor } ,props) => {
    useEffect((animes) => {
        if(animes===[]||animes===undefined||animes.length===0)
        {
            getAnimeList();// if there was no animes in redux store
        }
        
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getAnimeList]);
    const [deleteErrorMessage,updateDeleteErrorMessage]=useState("");
    const handleDelete = (voiceActorId) => {
        if(voiceActor.animes.length===0)
        {
            updateDeleteErrorMessage("")
            deleteVoiceActor(voiceActorId);
            history.push('/voiceActors')
        }
        else
        {
            updateDeleteErrorMessage("Please disconnect all animes before deleting this voice actor.")
        }
        
        
    }
    const [showAnimes,updateShowAnimes]=useState(true);
    const handleDisconnect = (animeId,voiceActorId,anime,voiceActor) => {
        let newAnime=anime;
        let newVoiceActor=voiceActor;
        newAnime.voiceActors=newAnime.voiceActors.filter(animeid=>animeid!==voiceActorId);
        newVoiceActor.animes=newVoiceActor.animes.filter(voiceactorid=>voiceactorid!==animeId);
        console.log("Connection deleted.")
        console.log("New Voice Actor \"animes\" array:");
        console.log(newVoiceActor.animes)
        console.log("New Anime \"voiceActors\" array:");
        console.log(newAnime.voiceActors)
        editAnime(animeId,newAnime);
        editVoiceActor(voiceActorId,newVoiceActor);
        history.push('/voiceActors/details/'+voiceActor._id)
    }
    const handleConnect = (animeId,voiceActorId,anime,voiceActor) => {
        let newAnime=anime;
        let newVoiceActor=voiceActor;
        newAnime.voiceActors=newAnime.voiceActors.filter(animeid=>animeid!==voiceActorId);
        newAnime.voiceActors.push(voiceActorId);
        newVoiceActor.animes=newVoiceActor.animes.filter(voiceactorid=>voiceactorid!==animeId);
        newVoiceActor.animes.push(animeId);
        console.log("Connection created.")
        console.log("New Voice Actor \"animes\" array:");
        console.log(newVoiceActor.animes)
        console.log("New Anime \"voiceActors\" array:");
        console.log(newAnime.voiceActors)
        editAnime(animeId,newAnime);
        editVoiceActor(voiceActorId,newVoiceActor);
        history.push('/voiceActors/details/'+voiceActor._id)
    }
    return (
        <div>
            <div className="voiceActorDiv">
                <div>
                    <button className="MenuButton" onClick={()=>{handleDelete(voiceActor._id)}}>Delete This Voice Actor</button>
                </div>
                {deleteErrorMessage!==""&&<div>{deleteErrorMessage}</div>}
                <h3>VoiceActor</h3>
                <div>First Name: {voiceActor.firstName}</div>
                <div>Last Name: {voiceActor.lastName}</div>
                {voiceActor.birthDate!==undefined&&<div>Birth Date: {voiceActor.birthDate.substring(0, 10)}</div>}
                {voiceActor.image!==undefined&&<div>
                            <div>Image:</div> 
                            <div><img src={voiceActor.image} alt={voiceActor.image}></img></div>
                            </div>}
                <div>Characters Voiced: </div>
                {voiceActor.charactersVoiced!==undefined&&voiceActor.charactersVoiced}
                <div>Animes: </div>
                {voiceActor.animes!==undefined&&animes!==undefined&&animes
                        .filter(anime=>{return voiceActor.animes.includes(anime._id)})
                        .map(anime=>{return(
                        <div key={anime._id} className="animeDiv">
                        {anime.title!==undefined&&<div>Title: {anime.title}</div>}
                        {anime.releaseDate!==undefined&&<div>Release Date: {anime.releaseDate.substring(0, 10)}</div>}
                        {anime.rating!==undefined&&<div>Rating: {anime.rating}/10</div>}
                        {anime.genre!==undefined&&<div>Genre: {anime.genre}</div>}
                        {anime.author!==undefined&&<div>Author: {anime.author}</div>}
                        {anime.image!==undefined&&<div>
                        <div>Image:</div> 
                        <div><img src={anime.image} alt={anime.image}></img></div>
                        </div>}
                        <div>
                            <button className="MenuButton" onClick={()=>{handleDisconnect(anime._id,voiceActor._id,anime,voiceActor)}}>Disconnect Anime From This Voice Actor</button>
                        </div>
                        </div>
                        )})}
                <div className="LinkDiv">
                    <Link to={`/voiceActors/edit/${voiceActor._id}`} className="Link">Edit This Voice Actor</Link>
                </div>
            </div>
            <div>
                    <button className="MenuButton" onClick={()=>{showAnimes===true
                        ?
                        updateShowAnimes(false)
                        :
                        updateShowAnimes(true)}}>Show Or Hide Animes You May Want To Add To This Voice Actor</button>
                </div>
                {showAnimes===true&&animes.filter(anime=>{return voiceActor.animes.includes(anime._id)===false}).map(anime=>{return(
                    <div key={anime._id} className="animeDiv">
                    {anime.title!==undefined&&<div>Title: {anime.title}</div>}
                    {anime.releaseDate!==undefined&&<div>Release Date: {anime.releaseDate.substring(0, 10)}</div>}
                    {anime.rating!==undefined&&<div>Rating: {anime.rating}/10</div>}
                    {anime.genre!==undefined&&<div>Genre: {anime.genre}</div>}
                    {anime.author!==undefined&&<div>Author: {anime.author}</div>}
                    {anime.image!==undefined&&<div>
                    <div>Image:</div> 
                    <div><img src={anime.image} alt={anime.image}></img></div>
                    </div>}
                    <div>
                        <button className="MenuButton" onClick={()=>{handleConnect(anime._id,voiceActor._id,anime,voiceActor)}}>Connect Anime To This Voice Actor</button>
                    </div>
                    </div>
                )})}
        </div>
    )
}
const mapStateToProps = (state,props) => {
    return {
        voiceActor: getVoiceActorFromId(state,props.match.params.id),
        animes: getAnimes(state),
    };
}
const mapDispatchToProps = {
    getAnimeList,
    deleteVoiceActor,
    editAnime,
    editVoiceActor
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceActorDetails));