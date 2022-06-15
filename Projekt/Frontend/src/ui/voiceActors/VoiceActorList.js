import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { getVoiceActorList } from "../../ducks/voiceActors/operations";
import { getVoiceActors,filtermyvoiceactors,sortmyvoiceactors } from "../../ducks/voiceActors/selectors";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const VoiceActorList = ({ voiceActors, getVoiceActorList } ,props) => {
    useEffect((voiceActors) => {
        if(voiceActors===[]||voiceActors===undefined||voiceActors.length===0)
        {
            getVoiceActorList();// if there was no voice Actors in redux store
        }
        
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getVoiceActorList]);
    const [filterCheckbox, updateFilterCheckbox] = useState(false);
    const [filterDropdown , updateFilterDropdown] = useState("any");
    const [filterFirstNameText , updateFilterFirstNameText] = useState("");
    const [filterLastNameText , updateFilterLastNameText] = useState("");
    
    const [sortType, updateSortType] = useState("alphabeticallyByFirstName");
    return (
        <div>
            <div className="voiceActorAddFormDiv">
                <div>Filtering</div>
                <div>HasMoreThan0CharactersVoiced - Checkbox<input onChange={() => updateFilterCheckbox(!filterCheckbox)} checked={filterCheckbox} type="checkbox" />
                {filterCheckbox===true?<div>True</div>:<div>False</div>}</div>
                <div>Gender - Dropdown
                    <select 
                    value={filterDropdown} 
                    onChange={(filterDropdown) => updateFilterDropdown(filterDropdown.target.value)} 
                    >
                        <option value="any">any</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    {filterDropdown!==undefined&&<div>{filterDropdown}</div>}
                </div>
                <div>First Name - Text
                    <input type="text" value={filterFirstNameText} onChange={(filterFirstNameText)=>updateFilterFirstNameText(filterFirstNameText.target.value)} />
                    {<div>{filterFirstNameText}</div>}
                </div>
                <div>Last Name - Text
                    <input type="text" value={filterLastNameText} onChange={(filterLastNameText)=>updateFilterLastNameText(filterLastNameText.target.value)} />
                    {<div>{filterLastNameText}</div>}
                </div>
            </div>
            <div className="voiceActorAddFormDiv">
            <div>Sorting</div>
                <div>Option
                    <select 
                    value={sortType} 
                    onChange={(sortType) => updateSortType(sortType.target.value)} 
                    >
                        <option value="alphabeticallyByFirstName">alphabeticallyByFirstName</option>
                        <option value="alphabeticallyByFirstNameReverse">alphabeticallyByFirstNameReverse</option>
                        <option value="alphabeticallyByLastName">alphabeticallyByLastName</option>
                        <option value="alphabeticallyByLastNameReverse">alphabeticallyByLastNameReverse</option>
                        <option value="newestBirthDate">newestBirthDate</option>
                        <option value="oldestBirthDate">oldestBirthDate</option>
                        <option value="highestCharactersVoicedNumber">highestCharactersVoicedNumber</option>
                        <option value="lowestCharactersVoicedNumber">lowestCharactersVoicedNumber</option>
                    </select>
                    {sortType!==undefined&&<div>{sortType}</div>}
                </div>
            </div>
            <h3>VoiceActors list</h3>
            {
                voiceActors!==undefined&&sortmyvoiceactors(filtermyvoiceactors(voiceActors,filterCheckbox,filterDropdown,filterFirstNameText,filterLastNameText),sortType)
                .map(voiceActor => {
                    return (
                    <div key={uuid()} className="voiceActorDiv">
                        {voiceActor.firstName!==undefined&&<div>First Name: {voiceActor.firstName}</div>}
                        {voiceActor.lastName!==undefined&&<div>Last Name: {voiceActor.lastName}</div>}
                        {voiceActor.birthDate!==undefined&&<div>Birth Date: {voiceActor.birthDate.substring(0, 10)}</div>}
                        {voiceActor.gender!==undefined&&<div>Gender: {voiceActor.gender}</div>}
                        {voiceActor.charactersVoiced!==undefined&&<div>Number of characters voiced: {voiceActor.charactersVoiced}</div>}
                        {voiceActor.image!==undefined&&<div>
                        <div>Image:</div> 
                        <div><img src={voiceActor.image} alt={voiceActor.image} ></img></div>
                        </div>}
                        <div className="LinkDiv">
                            <Link to={`/voiceActors/details/${voiceActor._id}`} className="Link">View VoiceActor Details</Link>
                        </div>
                        
                    </div>)
                    })
            }
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        voiceActors: getVoiceActors(state)
    };
}
const mapDispatchToProps = {
    getVoiceActorList
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceActorList);