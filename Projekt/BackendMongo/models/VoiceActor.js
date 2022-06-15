const { Schema, model } = require('mongoose');

const voiceActorSchema = new Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    image:{type:String},
    birthDate:{type:Date},
    gender:{type:String},
    rating:{type:Number,min: 0, max: 10, default: 0},
    charactersVoiced:{type:Number},
    animes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Anime"
        }
      ]
    
},{collection: 'voiceActorApi'});

module.exports = model('VoiceActor', voiceActorSchema);