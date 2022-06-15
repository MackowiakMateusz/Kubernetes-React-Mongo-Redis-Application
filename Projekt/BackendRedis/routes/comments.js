const express = require('express');
const router = express.Router({mergeParams: true});
const client = require('../config/redisClient');

router.get('/', async (req, res) => {
  const keys = await client.keys('comments:*');
  if(keys.length===0)
  {
    return res.send([])//"Nie ma żadnej wartości w comments:*."
  }
  let values = await client.mget(keys);
  values.forEach((element,index) => {
    values[index]=[keys[index].split(":")[1],element]
  });
  return res.send(values)
  
  
});

router.get('/:key', async (req, res) => {
  const keys = await client.keys('comments:'+req.params.key);
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma wartości pod podanym kluczem.")
  }
  const values = await client.mget(keys);
  return res.send(values[0])
  
});

router.post('/', async (req, res) => {
  client.set("comments:"+req.body.key, req.body.value)
  if(req.body.time!==undefined)
  {
    client.expire("user-queue:"+keys.length, req.body.time);
  }
  console.log(req.body.value)
  return res.send(req.body.value);
});

router.put('/:key', async (req, res) => {
  const keys = await client.keys('comments:'+req.params.key);
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma wartości pod podanym kluczem.")
  }
  client.set("comments:"+req.query.key, req.body.value)
  if(req.body.time!==undefined)
  {
    client.expire("user-queue:"+keys.length, req.body.time);
  }
  console.log(req.body.value)
  return res.send("Zedytowano wartość: "+req.body.value+" pod kluczem");
});

router.delete('/:key', async (req, res) => {
  const key = req.params.key;
  client.del("comments:"+key);
  return res.send("Usunięto klucz: "+key);
});


module.exports = router;
