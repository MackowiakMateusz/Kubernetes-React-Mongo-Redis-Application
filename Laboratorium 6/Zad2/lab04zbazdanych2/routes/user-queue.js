const express = require('express');
const router = express.Router();
const client = require('../config/redisClient');

router.get('/', async (req, res) => {
  let keys = await client.keys('user-queue:*');
  keys=keys.sort();
  if(keys.length===0)
  {
    return res.send("Nie ma żadnej osoby w kolejce.")
  }
  const values = await client.mget(keys);
  return res.send(values)
  
  
});

router.get('/:range', async (req, res) => {
  let keys = await client.keys('user-queue:'+"*");
  keys=keys.sort().slice(0,req.params.range);
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma wartości pod podanym kluczem.")
  }
  let values = await client.mget(keys);
  return res.send(values)
  
});

router.post('/', async (req, res) => {
  let keys = await client.keys('user-queue:'+"*");
  //console.log(keys)
  if(keys[0]===undefined)
  {
    client.set("user-queue:"+0, req.body.value)
    return res.send("Dodano osobe do kolejki:"+req.body.value+" pod kluczem "+"user-queue:"+0);
  }
  keys=keys.sort().map(key=>{return parseInt(key.replace("user-queue:", ""))})
  console.log(keys)
  client.set("user-queue:"+(parseInt(keys[keys.length-1])+1).toString(), req.body.value)//zamiast +req.body.key dałem keys.length, no bo na koniec kolejki ma byc dodana
  if(req.body.time!==undefined)
  {
    client.expire("user-queue:"+(parseInt(keys[keys.length-1])+1).toString(), req.body.time);
  }
  
  console.log(req.body.value)
  return res.send("Dodano osobe do kolejki:"+req.body.value+" pod kluczem: "+(parseInt(keys[keys.length-1])+1).toString());
});

router.delete('/', async (req, res) => {
  const keys = await client.keys('user-queue:'+"*");
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma osoby na początku kolejki.")
  }
  
  const keyUsunietegoDzbana = await client.keys(keys.sort()[0]);
  const usunietyDzban = await client.get(keyUsunietegoDzbana);
  client.del(keys.sort()[0]);
  return res.send("Usunięto osobę na początku kolejki(a jego imie bylo: "+usunietyDzban+"), która byłą pod kluczem: "+keys[0]);
});

module.exports = router;
/*
const express = require('express');
const router = express.Router();
const client = require('../config/redisClient');

router.get('/', async (req, res) => {
  const keys = await client.keys('user-queue:*');
  if(keys.length===0)
  {
    return res.send("Nie ma żadnej osoby w kolejce.")
  }
  const values = await client.mget(keys);
  return res.send(values)
  
  
});

router.get('/:range', async (req, res) => {
  let keys = await client.keys('user-queue:'+"*");
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma wartości pod podanym kluczem.")
  }
  keys=keys.map(key=>{return parseInt(key[key.length-1])}).sort(function(a, b) {
    return a - b;
  }).map(key=>{return "user-queue:"+key.toString()})
  keys=keys.slice(0,req.params.range);
  let values = await client.mget(keys);
  return res.send(values)
  
});

router.post('/', async (req, res) => {
  const keys = await client.keys('user-queue:'+"*");
  client.set("user-queue:"+keys.length, req.body.value)//zamiast +req.body.key dałem keys.length, no bo na koniec kolejki ma byc dodana
  if(req.body.time!==undefined)
  {
    client.expire("user-queue:"+keys.length, req.body.time);
  }
  
  console.log(req.body.value)
  return res.send("Dodano osobe do kolejki:"+req.body.value+"pod klucz:"+keys.length);
});

router.delete('/', async (req, res) => {
  let keys = await client.keys('user-queue:'+"*");
  //console.log(keys)
  if(keys.length===0)
  {
    return res.send("Nie ma osoby na początku kolejki.")
  }
  //console.log(keys.map(key=>{return parseInt(key[key.length-1])}))
  //console.log(Math.min(...keys.map(key=>{return parseInt(key[key.length-1])})))
  //console.log(keys[0])
  let keys= keys.
  let values = await client.mget(keys);
  client.del("user-queue:"+Math.min(...keys.map(key=>{return parseInt(key[key.length-1])})).toString());
  return res.send("Usunięto osobę na początku kolejki("+values[Math.min(...keys.map(key=>{return parseInt(key[key.length-1])}))]+"), która byłą pod kluczem: "+"user-queue:"+Math.min(...keys.map(key=>{return parseInt(key[key.length-1])})).toString());
});

module.exports = router;
*/