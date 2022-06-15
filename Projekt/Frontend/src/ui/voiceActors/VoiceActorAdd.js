import { connect } from "react-redux";
import VoiceActorForm from "./VoiceActorForm";
import { withRouter } from "react-router-dom";


const VoiceActorEdit = () => {
    return(
        <div>
            <VoiceActorForm isEditFormInsteadOfAddForm={false} />
        </div>
    )
    
}
const mapStateToProps = () => {
    return {
    };
}
const mapDispatchToProps = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceActorEdit));