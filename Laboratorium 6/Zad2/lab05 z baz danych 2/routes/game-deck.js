const express = require("express");
const router = express.Router({mergeParams: true});
const client = require("../config/redisClient");

router.get("/", async (req, res) => {
    const keys = await client.keys('user-preferences:*');
    if(keys.length===0)
    {
      return res.send("Nie ma żadnego klucza pod: game:*.")
    }
    const values = await client.mget(keys);
    return res.send(values)
});

router.get("/:deck-id", async (req, res) => {
    const keys = await client.keys('user-preferences:'+req.params.deck-id);
    //req.query.players
    //req.query.cards
    //tu ma nam zwrocic dokladnie to:
    //Metoda GET /:deck-id?players=number&cards=number - losowo zwraca podaną w parametrze liczbę kart dla podanej liczby graczy. 
    //Usuwa wylosowane karty z talii (wybieranie i usuwanie można wykonać jednym poleceniem)
    //nom

    return res.send()
});

router.post("/", async (req, res) => {
    //Metoda POST - tworzy nową talię, która będzie przechowywana pod kluczem: game:id. 
    //Oprócz id, z body pobieramy karty, które mają być w danej talii (np.: 1,2,3,4,5,walet,dama,król)
    return res.send();
});

router.post("/new-game", async (req, res) => {
    //Metoda POST /new-game - rozpoczyna nową grę, 
    //kopiując talię spod klucza game:id 
    //(identyfikator id jest przekazywany w ciele zapytania) 
    //do klucza game:id:deck:id-deck. 
    //Zwraca do użytkownika wartość deck-id
    return res.send(req.body);
});
/*
router.get('/', async (req, res) => {
    const keys = await client.keys('user-preferences:*');
    if(keys.length===0)
    {
      return res.send("Nie ma żadnej wartości w user-preferences:*.")
    }
    const values = await client.mget(keys);
    return res.send(values)
    
    
  });
  
  router.get('/:key', async (req, res) => {
    const keys = await client.keys('user-preferences:'+req.params.key);
    //console.log(keys)
    if(keys.length===0)
    {
      return res.send("Nie ma wartości pod podanym kluczem.")
    }
    const values = await client.mget(keys);
    return res.send(values[0])
    
  });
  
  router.post('/', async (req, res) => {
    client.set("user-preferences:"+req.body.key, req.body.value)
    if(req.body.time!==undefined)
    {
      client.expire("user-queue:"+keys.length, req.body.time);
    }
    console.log(req.body.value)
    return res.send(req.body.value);
  });
  
  router.put('/:key', async (req, res) => {
    const keys = await client.keys('user-preferences:'+req.params.key);
    //console.log(keys)
    if(keys.length===0)
    {
      return res.send("Nie ma wartości pod podanym kluczem.")
    }
    client.set("user-preferences:"+req.body.key, req.body.value)
    if(req.body.time!==undefined)
    {
      client.expire("user-queue:"+keys.length, req.body.time);
    }
    console.log(req.body.value)
    return res.send("Zedytowano wartość: "+req.body.value+" pod kluczem");
  });
  
  router.delete('/:key', async (req, res) => {
    const key = req.params.key;
    client.del("user-preferences:"+key);
    return res.send("Usunięto klucz: "+key);
  });
*/


module.exports = router;
