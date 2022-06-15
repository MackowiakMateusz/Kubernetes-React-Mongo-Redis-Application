const express = require('express');
const router = express.Router();

const VoiceActor = require('../models/VoiceActor');
const Anime = require('../models/Anime');

router.put('/connectVoiceActorToAnime', async (req, res) => {
  let animeToUpdate = await Anime.findById(req.body.animeId);
  let voiceActorToUpdate = await VoiceActor.findById(req.body.voiceActorId);
  try {
    if(Array.isArray(animeToUpdate.voiceActors)==true&&animeToUpdate.voiceActors!==undefined&&Array.isArray(voiceActorToUpdate.animes)==true&&voiceActorToUpdate.animes!==undefined)
    {
      if(animeToUpdate.voiceActors.includes(req.body.voiceActorId)==false&&voiceActorToUpdate.animes.includes(req.body.animeId)==false)
      {
        animeToUpdate.voiceActors=[...animeToUpdate.voiceActors,req.body.voiceActorId]
        voiceActorToUpdate.animes=[...voiceActorToUpdate.animes,req.body.animeId]
      }
      
      
    }
    else
    {
      animeToUpdate.voiceActors=[voiceActorToUpdate._id]
      voiceActorToUpdate.animes=[animeToUpdate._id]
    }
    await Anime.findByIdAndUpdate(req.body.animeId, animeToUpdate);
    await VoiceActor.findByIdAndUpdate(req.body.voiceActorId, voiceActorToUpdate);
    //res.send([animeToUpdate,voiceActorToUpdate]);
    res.send(voiceActorToUpdate);
  } catch (error) {
    res.status(500).send("blad:"+error);
  }
});
router.put('/disconnectVoiceActorFromAnime', async (req, res) => {
  let animeToUpdate = await Anime.findById(req.body.animeId);
  let voiceActorToUpdate = await VoiceActor.findById(req.body.voiceActorId);
  try {
    if(Array.isArray(animeToUpdate.voiceActors)==true&&animeToUpdate.voiceActors!==undefined&&Array.isArray(voiceActorToUpdate.animes)==true&&voiceActorToUpdate.animes!==undefined)
    {
      animeToUpdate.voiceActors=animeToUpdate.voiceActors.filter(voiceActorId=>{return voiceActorId!=req.body.voiceActorId})
      voiceActorToUpdate.animes=voiceActorToUpdate.animes.filter(animeId=>{return animeId!=req.body.animeId})
    }
    else
    {

    }
    await Anime.findByIdAndUpdate(req.body.animeId, animeToUpdate);
    await VoiceActor.findByIdAndUpdate(req.body.voiceActorId, voiceActorToUpdate);
    //res.send([animeToUpdate,voiceActorToUpdate]);
    res.send(voiceActorToUpdate);
  } catch (error) {
    res.status(500).send("blad:"+error);
  }
});

router.get('/', async (req, res) => {
  const voiceActors = await VoiceActor.find({});

  try {
    res.send(voiceActors);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const voiceActor = await VoiceActor.findById(req.params.id);

  try {
    res.send(voiceActor);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  const newVoiceActor = new VoiceActor(req.body);
  
  try {
    await newVoiceActor.save();
    res.send(newVoiceActor);
  } catch (error) {
    res.status(500).send("blad:"+error);
  }
});
router.put('/:idVoiceActor', async (req, res) => {
  try {
    const body=req.body;
    await VoiceActor.findByIdAndUpdate(req.params.idVoiceActor, req.body);
    //await VoiceActor.save();
    res.send(body);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let deletedVoiceActor = await VoiceActor.findById(req.params.id);
    await VoiceActor.findByIdAndDelete(req.params.id)
    if (!deletedVoiceActor) res.status(404).send("No item found");
    res.status(200).send(deletedVoiceActor);
  } catch (error) {
    res.status(500).send("error:"+error);
  }
});


module.exports = router;
