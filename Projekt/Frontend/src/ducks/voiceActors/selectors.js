export const getVoiceActors = (state) => state.voiceActors;
export const getVoiceActorFromId = (state,ID) => {return state.voiceActors.find(voiceActor=>{if(voiceActor._id===Number(ID)){return true}else if(voiceActor._id===ID){return true}else{return false}})};
export const filtermyvoiceactors = (voiceActors,filterCheckbox,filterDropdown,filterFirstNameText,filterLastNameText) =>{
    return voiceActors.filter(voiceCharacter=>{
        return (filterCheckbox===true?voiceCharacter.charactersVoiced>0:voiceCharacter)
    }).filter(voiceCharacter=>{
        switch (filterDropdown) {
            case 'male':
                return voiceCharacter.gender==="male"
            case 'female':
                return voiceCharacter.gender==="female"
            default:
                return voiceCharacter
        }
    }).filter(voiceCharacter=>{
        return (filterLastNameText!==""?voiceCharacter.lastName.replace(" ","").toLowerCase().includes(filterLastNameText.replace(" ","").toLowerCase()):voiceCharacter)
    }).filter(voiceCharacter=>{
        return(filterFirstNameText!==""?voiceCharacter.firstName.replace(" ","").toLowerCase().includes(filterFirstNameText.replace(" ","").toLowerCase()):voiceCharacter)
    })
    }
    export const sortmyvoiceactors = (voiceActors,sortType) =>{
        switch (sortType) {
            case 'alphabeticallyByLastName':
                return voiceActors.sort(function(a, b){
                    if(a.lastName.replace(" ","").toLowerCase() < b.lastName.replace(" ","").toLowerCase()) { return -1; }
                    if(a.lastName.replace(" ","").toLowerCase() > b.lastName.replace(" ","").toLowerCase()) { return 1; }
                    return 0;
                })
            case 'alphabeticallyByLastNameReverse':
                return voiceActors.sort(function(a, b){
                    if(a.lastName.replace(" ","").toLowerCase() < b.lastName.replace(" ","").toLowerCase()) { return 1; }
                    if(a.lastName.replace(" ","").toLowerCase() > b.lastName.replace(" ","").toLowerCase()) { return -1; }
                    return 0;
                })
            case 'alphabeticallyByFirstName':
                return voiceActors.sort(function(a, b){
                    if(a.firstName.replace(" ","").toLowerCase() < b.firstName.replace(" ","").toLowerCase()) { return -1; }
                    if(a.firstName.replace(" ","").toLowerCase() > b.firstName.replace(" ","").toLowerCase()) { return 1; }
                    return 0;
                })
            case 'alphabeticallyByFirstNameReverse':
                return voiceActors.sort(function(a, b){
                    if(a.firstName.replace(" ","").toLowerCase() < b.firstName.replace(" ","").toLowerCase()) { return 1; }
                    if(a.firstName.replace(" ","").toLowerCase() > b.firstName.replace(" ","").toLowerCase()) { return -1; }
                    return 0;
                })
            case 'newestBirthDate':
                return voiceActors.sort(function(a,b){
                    return new Date(b.birthDate) - new Date(a.birthDate);
                });
            case 'oldestBirthDate':
                return voiceActors.sort(function(a,b){
                    return new Date(a.birthDate) - new Date(b.birthDate);
                });
            case 'highestCharactersVoicedNumber':
                return voiceActors.sort(function(a,b){
                    return b.charactersVoiced - a.charactersVoiced
                });
            case 'lowestCharactersVoicedNumber':
                return voiceActors.sort(function(a,b){
                    return a.charactersVoiced - b.charactersVoiced
                });
            default:
                return voiceActors
        }
    }
