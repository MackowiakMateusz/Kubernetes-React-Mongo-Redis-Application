export const getComments = (state) => state.comments;
export const getCommentFromId = (state,ID) => {return state.comments.find(comment=>{if(comment._id===Number(ID)){return true}else if(comment._id===ID){return true}else{return false}})};
export const filtermycomments = (comments,filterCheckbox,filterDropdown,filterText) =>{
    return comments
    .filter(comment=>{
        return (filterCheckbox===true?comment.rating===10:comment)
    })
    .filter(comment=>{
        switch (filterDropdown) {
            case 'romance':
                return comment.genre==="romance"
            case 'thriller':
                return comment.genre==="thriller"
            case 'action':
                return comment.genre==="action"
            default:
              return comment
          }
    })
    .filter(comment=>{
        return(filterText!==""?comment.title.replace(" ","").toLowerCase().includes(filterText.replace(" ","").toLowerCase()):comment)
    })
    }
    export const sortmycomments = (comments,sortType) =>{
        switch (sortType) {
            case 'alphabeticallyByTitle':
                return comments.sort(function(a, b){
                    if(a.title.replace(" ","").toLowerCase() < b.title.replace(" ","").toLowerCase()) { return -1; }
                    if(a.title.replace(" ","").toLowerCase() > b.title.replace(" ","").toLowerCase()) { return 1; }
                    return 0;
                })
            case 'alphabeticallyByTitleReverse':
                return comments.sort(function(a, b){
                    if(a.title.replace(" ","").toLowerCase() < b.title.replace(" ","").toLowerCase()) { return 1; }
                    if(a.title.replace(" ","").toLowerCase() > b.title.replace(" ","").toLowerCase()) { return -1; }
                    return 0;
                })
            case 'newestReleaseDate':
                return comments.sort(function(a,b){
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                  });
            case 'oldestReleaseDate':
                return comments.sort(function(a,b){
                    return new Date(a.releaseDate) - new Date(b.releaseDate);
                  });
            case 'highestRatingNumber':
                return comments.sort(function(a,b){
                    return b.rating - a.rating
                });
            case 'lowestRatingNumber':
                return comments.sort(function(a,b){
                    return a.rating - b.rating
                });
            default:
              return comments
          }
    }
