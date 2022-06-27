const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const animeSchema = new Schema({
    title: {type:String,require:true},
    description: {type:String,require:true},
    director:{type:String,require:true},
    studio:{type:String,require:true},
    rating:{type:Number,min: 0, max: 10, default: 0},
    releaseDate:{type:Date,require:true},
    image:{type:String},
    genre:{type:String},
    voiceActors: [
        {
          type: Schema.Types.ObjectId,
          ref: "VoiceActor"
        }
      ]
},{collection: 'animes'});

module.exports = model('Anime', animeSchema);