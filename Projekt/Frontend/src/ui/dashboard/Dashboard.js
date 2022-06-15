import { useEffect } from "react";
import { connect } from "react-redux";
import { getAnimeList } from "../../ducks/animes/operations";
import { getVoiceActorList } from "../../ducks/voiceActors/operations";
import { getVoiceActors } from "../../ducks/voiceActors/selectors";
import { getAnimes, } from "../../ducks/animes/selectors";
import { withRouter } from "react-router-dom";


const Dashboard = ({ animes, getAnimeList, getVoiceActorList,voiceActors } ,props) => {
    useEffect((animes,voiceActors) => {
        if(animes===[]||animes===undefined||animes.length===0)
        {
            getAnimeList();// if there was no animes in redux store
        }
        if(voiceActors===[]||voiceActors===undefined||voiceActors.length===0)
        {
            getVoiceActorList();// if there was no voice actors in redux store
        }
        
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getAnimeList,getVoiceActorList]);

    return (
        <div>
            <h3>Statistics</h3>
            <h3>Number of animes in database:</h3>
            <h3>{animes.length}</h3>
            <h3>Number of voice actors in database:</h3>
            <h3>{voiceActors.length}</h3>
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        animes: getAnimes(state),
        voiceActors:getVoiceActors(state)
    };
}
const mapDispatchToProps = {
    getAnimeList,
    getVoiceActorList
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));