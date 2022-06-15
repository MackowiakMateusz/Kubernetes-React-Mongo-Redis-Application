import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { getAnimeFromId } from "../../ducks/animes/selectors";
import { editVoiceActor, getVoiceActorList } from "../../ducks/voiceActors/operations";
import { deleteAnime, editAnime } from "../../ducks/animes/operations";
import { getVoiceActors } from "../../ducks/voiceActors/selectors";
import { withRouter } from "react-router";
const AnimeDetails = ({ history,anime,voiceActors,getVoiceActorList,deleteAnime,editAnime,editVoiceActor } ,props) => {
    useEffect((voiceActors) => {
        if(voiceActors===[]||voiceActors===undefined||voiceActors.length===0)
        {
            getVoiceActorList();// if there was no voice actors in redux store
        }
            
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getVoiceActorList]);
    const [showVoiceActors,updateShowVoiceActors]=useState(true);
    const [deleteErrorMessage,updateDeleteErrorMessage]=useState("");
    const handleDelete = (animeId) => {
        if(anime.voiceActors.length===0)
        {
            updateDeleteErrorMessage("")
            deleteAnime(animeId);
            history.push('/animes')
        }
        else
        {
            updateDeleteErrorMessage("Please disconnect all voice actors before deleting this anime.")
        }
    }
    const handleDisconnect = (animeId,voiceActorId,anime,voiceActor) => {
        let newAnime=anime;
        let newVoiceActor=voiceActor;
        newAnime.voiceActors=newAnime.voiceActors.filter(animeid=>animeid!==voiceActorId);
        newVoiceActor.animes=newVoiceActor.animes.filter(voiceactorid=>voiceactorid!==animeId);
        //console.log("Connection deleted.")
        //console.log("New Voice Actor \"animes\" array:");
        //console.log(newVoiceActor.animes)
        //console.log("New Anime \"voiceActors\" array:");
        //console.log(newAnime.voiceActors)
        editAnime(animeId,newAnime);
        editVoiceActor(voiceActorId,newVoiceActor);
        history.push('/animes/details/'+anime._id)
    }
    const handleConnect = (animeId,voiceActorId,anime,voiceActor) => {
        let newAnime=anime;
        let newVoiceActor=voiceActor;
        newAnime.voiceActors=newAnime.voiceActors.filter(animeid=>animeid!==voiceActorId);
        newAnime.voiceActors.push(voiceActorId);
        newVoiceActor.animes=newVoiceActor.animes.filter(voiceactorid=>voiceactorid!==animeId);
        newVoiceActor.animes.push(animeId);
        //console.log("Connection created.")
        //console.log("New Voice Actor \"animes\" array:");
        //console.log(newVoiceActor.animes)
        //console.log("New Anime \"voiceActors\" array:");
        //console.log(newAnime.voiceActors)
        editAnime(animeId,newAnime);
        editVoiceActor(voiceActorId,newVoiceActor);
        history.push('/animes/details/'+anime._id)
    }
    return (
        <div>
            <div key={anime._id} className="animeDiv">
                <div>
                    <button className="MenuButton" onClick={()=>{handleDelete(anime._id)}}>Delete This Anime</button>
                </div>
                {deleteErrorMessage!==""&&<div>{deleteErrorMessage}</div>}
                {anime.title!==undefined&&<div>Title: {anime.title}</div>}
                {anime.description!==undefined&&<div>Description: {anime.description}</div>}
                {anime.releaseDate!==undefined&&<div>Release Date: {anime.releaseDate.substring(0, 10)}</div>}
                {anime.director!==undefined&&<div>Director: {anime.director}</div>}
                {anime.studio!==undefined&&<div>Studio: {anime.studio}</div>}
                {anime.rating!==undefined&&<div>Rating: {anime.rating}/10</div>}
                {anime.image!==undefined&&<div>
                    <div>Image:</div> 
                    <div><img src={anime.image} alt={anime.image}></img></div>
                    </div>}
                    <div>Voice Actors: </div>
                    {anime.voiceActors!==undefined&&voiceActors!==undefined&&voiceActors
                    .filter(voiceActor=>{return anime.voiceActors.includes(voiceActor._id)})
                    .map(voiceActor=>{return(
                    <div key={voiceActor._id} className="voiceActorDiv">
                    {voiceActor.firstName!==undefined&&<div>First Name: {voiceActor.firstName}</div>}
                    {voiceActor.lastName!==undefined&&<div>Last Name: {voiceActor.lastName}</div>}
                    {voiceActor.birthDate!==undefined&&<div>Birth Date: {voiceActor.birthDate.substring(0, 10)}</div>}
                    {voiceActor.gender!==undefined&&<div>Gender: {voiceActor.gender}</div>}
                    {voiceActor.charactersVoiced!==undefined&&<div>Number of characters voiced: {voiceActor.charactersVoiced.length}</div>}
                    {voiceActor.image!==undefined&&<div>
                    <div>Image:</div> 
                    <div><img src={voiceActor.image} alt={voiceActor.image}></img></div>
                    </div>}
                    <div>
                        <button className="MenuButton" onClick={()=>{handleDisconnect(anime._id,voiceActor._id,anime,voiceActor)}}>Disconnect Voice Actor From This Anime</button>
                    </div>
                    </div>
                    )})}
                <div className="LinkDiv">
                    <Link to={`/animes/edit/${anime._id}`} className="Link">Edit This Anime</Link>
                </div>
            </div>
            <div>
                <button className="MenuButton" onClick={()=>{showVoiceActors===true
                    ?
                    updateShowVoiceActors(false)
                    :
                    updateShowVoiceActors(true)}}>Show Or Hide Voice Actors You May Want To Add To This Anime</button>
            </div>
            {showVoiceActors===true&&voiceActors.filter(voiceActor=>{return anime.voiceActors.includes(voiceActor._id)===false}).map(voiceActor=>{return(
                <div key={voiceActor._id} className="voiceActorDiv">
                {voiceActor.firstName!==undefined&&<div>First Name: {voiceActor.firstName}</div>}
                {voiceActor.lastName!==undefined&&<div>Last Name: {voiceActor.lastName}</div>}
                {voiceActor.birthDate!==undefined&&<div>Birth Date: {voiceActor.birthDate.substring(0, 10)}</div>}
                {voiceActor.gender!==undefined&&<div>Gender: {voiceActor.gender}</div>}
                {voiceActor.charactersVoiced!==undefined&&<div>Number of characters voiced: {voiceActor.charactersVoiced.length}</div>}
                {voiceActor.image!==undefined&&<div>
                <div>Image:</div> 
                <div><img src={voiceActor.image} alt={voiceActor.image}></img></div>
                </div>}
                <div>
                    <button className="MenuButton" onClick={()=>{handleConnect(anime._id,voiceActor._id,anime,voiceActor)}}>Connect Voice Actor To This Anime</button>
                </div>
                </div>
            )})}
        </div>
    )
}
const mapStateToProps = (state,props) => {
    return {
        anime: getAnimeFromId(state,props.match.params.id),
        voiceActors: getVoiceActors(state)
    };
}
const mapDispatchToProps = {
    getVoiceActorList,
    deleteAnime,
    editAnime,
    editVoiceActor
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnimeDetails));