import { connect } from "react-redux";
import VoiceActorForm from "./VoiceActorForm";
import { withRouter } from "react-router-dom";
import { getVoiceActorFromId } from "../../ducks/voiceActors/selectors";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const VoiceActorAdd = ({history,voiceActor}) => {
    useEffect(() => {
        console.log(voiceActor);
    }, [voiceActor]);
    return(
        <div>
            <VoiceActorForm
            isEditFormInsteadOfAddForm={true}
            editedVoiceActor={voiceActor}
            />
            <div className="LinkDiv">
                <Link to={`/voiceActors/details/${voiceActor._id}`} className="Link">Back To This VoiceActor Details</Link>
            </div>
        </div>
    )
    
}
const mapStateToProps = (state,props) => {
    return {
        voiceActor: getVoiceActorFromId(state,props.match.params.id)
    };
}
const mapDispatchToProps = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceActorAdd));