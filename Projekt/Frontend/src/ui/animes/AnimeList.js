import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { getAnimeList } from "../../ducks/animes/operations";
import { getAnimes,filtermyanimes,sortmyanimes } from "../../ducks/animes/selectors";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";


const AnimeList = ({ animes, getAnimeList, } ,props) => {
    useEffect((animes) => {
        if(animes===[]||animes===undefined||animes.length===0)
        {
            getAnimeList();// if there was no animes in redux store
        }
        
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getAnimeList]);

    
    const [filterCheckbox, updateFilterCheckbox] = useState(false);
    const [filterDropdown , updateFilterDropdown] = useState("any");
    const [filterText , updateFilterText] = useState("");
    

    const [sortType, updateSortType] = useState("alphabeticallyByTitle");
    
    return (
        <div>
            
            
            <div className="animeAddFormDiv">
                <div>Filtering</div>
                <div>Has10Rating - Checkbox<input onChange={() => updateFilterCheckbox(!filterCheckbox)} checked={filterCheckbox} type="checkbox" />{filterCheckbox===true?<div>True</div>:<div>False</div>}</div>
                <div>Genre - Dropdown
                    <select 
                    value={filterDropdown} 
                    onChange={(filterDropdown) => updateFilterDropdown(filterDropdown.target.value)} 
                    >
                        <option value="any">any</option>
                        <option value="romance">romance</option>
                        <option value="thriller">thriller</option>
                        <option value="action">action</option>
                    </select>
                    {filterDropdown!==undefined&&<div>{filterDropdown}</div>}
                </div>
                <div>Title - Text
                    <input type="text" value={filterText} onChange={(filterText)=>updateFilterText(filterText.target.value)} />
                    {<div>{filterText}</div>}
                </div>
            </div>
            <div className="animeAddFormDiv">
            <div>Sorting</div>
                <div>Option
                    <select 
                    value={sortType} 
                    onChange={(sortType) => updateSortType(sortType.target.value)} 
                    >
                        <option value="alphabeticallyByTitle">alphabeticallyByTitle</option>
                        <option value="alphabeticallyByTitleReverse">alphabeticallyByTitleReverse</option>
                        <option value="newestReleaseDate">newestReleaseDate</option>
                        <option value="oldestReleaseDate">oldestReleaseDate</option>
                        <option value="highestRatingNumber">highestRatingNumber</option>
                        <option value="lowestRatingNumber">lowestRatingNumber</option>
                    </select>
                    {sortType!==undefined&&<div>{sortType}</div>}
                </div>
            </div>

            <h3>Animes list</h3>
            {
                animes!==undefined&&sortmyanimes(filtermyanimes(animes,filterCheckbox,filterDropdown,filterText),sortType).map(anime => {
                    return (
                    <div key={uuid()} className="animeDiv">
                        {anime.title!==undefined&&<div>Title: {anime.title}</div>}
                        {anime.releaseDate!==undefined&&<div>Release Date: {anime.releaseDate.substring(0, 10)}</div>}
                        {anime.rating!==undefined&&<div>Rating: {anime.rating}/10</div>}
                        {anime.genre!==undefined&&<div>Genre: {anime.genre}</div>}
                        {anime.author!==undefined&&<div>Author: {anime.author}</div>}
                        {anime.image!==undefined&&<div>
                        <div>Image:</div> 
                        <div><img src={anime.image} alt={anime.image}></img></div>
                        </div>}
                        <div className="LinkDiv">
                            <Link to={`/animes/details/${anime._id}`} className="Link">View Anime Details</Link>
                        </div>
                        
                    </div>)
                    })
            }
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        animes: getAnimes(state)
    };
}
const mapDispatchToProps = {
    getAnimeList
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnimeList));