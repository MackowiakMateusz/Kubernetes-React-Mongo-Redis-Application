const express = require('express');
const router = express.Router();

const VoiceActor = require('../models/VoiceActor');
const Anime = require('../models/Anime');

router.put('/connectAnimeToVoiceActor', async (req, res) => {
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
    res.send(animeToUpdate);
  } catch (error) {
    res.status(500).send("blad:"+error);
  }
});
router.put('/disconnectAnimeFromVoiceActor', async (req, res) => {
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
    res.send(animeToUpdate);
  } catch (error) {
    res.status(500).send("blad:"+error);
  }
});

router.get('/', async (req, res) => {
  const animes = await Anime.find({});

  try {
    res.send(animes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  const newAnime = new Anime(req.body);

  try {
    await newAnime.save();
    res.send(newAnime);
  } catch (error) {
    res.status(500).send(error);
  }
});
// tutaj biore voiceActory uzytkownika wyswietlam
router.get('/:id', async (req, res) => {
  let anime = await Anime.findById(req.params.id).populate("VoiceActor");
  //let voiceActors = anime.voiceActors.findById(req.params.id).populate("voiceActors");
  let voiceActors = []
  for (let i = 0; i < anime.voiceActors.length; i++) {
    voiceActors.push(await VoiceActor.findById(anime.voiceActors[i]))
  }
  anime.voiceActors=voiceActors;
  //anime.voiceActors=anime.voiceActors.map(voiceActor=>async (voiceActor)=>{let returnedvoiceActor= await VoiceActor.findById(voiceActor);return returnedvoiceActor})
  try {
    res.send(anime)
  } catch (error) {
    res.status(500).send(error);
  }
});
// tutaj biore voiceActory uzytkownika wyswietlam
router.put('/:id', async (req, res) => {
  try {
    const body=req.body;
    await Anime.findByIdAndUpdate(req.params.id, req.body);
    //await Anime.save();
    res.send(body);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let deletedAnime = await Anime.findById(req.params.id);
    await Anime.findByIdAndDelete(req.params.id)
    if (!deletedAnime) res.status(404).send("No item found");
    res.status(200).send(deletedAnime);
  } catch (error) {
    res.status(500).send("error:"+error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Anime.findByIdAndUpdate(req.params.id, req.body);
    await Anime.save();
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
