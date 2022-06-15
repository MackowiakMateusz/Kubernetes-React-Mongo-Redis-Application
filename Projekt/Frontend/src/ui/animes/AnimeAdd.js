import { connect } from "react-redux";
import AnimeForm from "./AnimeForm";
import { withRouter } from "react-router-dom";


const AnimeEdit = () => {
    return(
        <div>
            <AnimeForm isEditFormInsteadOfAddForm={false} />
        </div>
    )
    
}
const mapStateToProps = () => {
    return {
    };
}
const mapDispatchToProps = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnimeEdit));