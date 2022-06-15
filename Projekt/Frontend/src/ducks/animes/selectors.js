export const getAnimes = (state) => state.animes;
export const getAnimeFromId = (state,ID) => {return state.animes.find(anime=>{if(anime._id===Number(ID)){return true}else if(anime._id===ID){return true}else{return false}})};
export const filtermyanimes = (animes,filterCheckbox,filterDropdown,filterText) =>{
    return animes
    .filter(anime=>{
        return (filterCheckbox===true?anime.rating===10:anime)
    })
    .filter(anime=>{
        switch (filterDropdown) {
            case 'romance':
                return anime.genre==="romance"
            case 'thriller':
                return anime.genre==="thriller"
            case 'action':
                return anime.genre==="action"
            default:
              return anime
          }
    })
    .filter(anime=>{
        return(filterText!==""?anime.title.replace(" ","").toLowerCase().includes(filterText.replace(" ","").toLowerCase()):anime)
    })
    }
    export const sortmyanimes = (animes,sortType) =>{
        switch (sortType) {
            case 'alphabeticallyByTitle':
                return animes.sort(function(a, b){
                    if(a.title.replace(" ","").toLowerCase() < b.title.replace(" ","").toLowerCase()) { return -1; }
                    if(a.title.replace(" ","").toLowerCase() > b.title.replace(" ","").toLowerCase()) { return 1; }
                    return 0;
                })
            case 'alphabeticallyByTitleReverse':
                return animes.sort(function(a, b){
                    if(a.title.replace(" ","").toLowerCase() < b.title.replace(" ","").toLowerCase()) { return 1; }
                    if(a.title.replace(" ","").toLowerCase() > b.title.replace(" ","").toLowerCase()) { return -1; }
                    return 0;
                })
            case 'newestReleaseDate':
                return animes.sort(function(a,b){
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                  });
            case 'oldestReleaseDate':
                return animes.sort(function(a,b){
                    return new Date(a.releaseDate) - new Date(b.releaseDate);
                  });
            case 'highestRatingNumber':
                return animes.sort(function(a,b){
                    return b.rating - a.rating
                });
            case 'lowestRatingNumber':
                return animes.sort(function(a,b){
                    return a.rating - b.rating
                });
            default:
              return animes
          }
    }
