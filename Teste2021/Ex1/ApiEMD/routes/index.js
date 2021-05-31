var express = require('express');
var router = express.Router();
var axios = require('axios')



var prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2021/EMD#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX xml: <http://www.w3.org/XML/1998/namespace> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
`
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/api/EMD', function(req, res, next) {
  var query
  if(req.query.res=="OK"){
     query = `SELECT *
    WHERE {   
     ?s rdf:type :EMD .
     ?s :dataEMD ?d  .
     ?s :resultado "true".
     ?s :paciente ?p.
     ?p :email ?e.
     ?p :federado ?f.
     ?p :genero ?g.
     ?p :idade ?i.
     ?p :morada ?mo.
     ?p :pratica ?m. 
     ?p :jogaNo ?c.
 
    } `
  }else{
    query = `SELECT (?s as ?id) (?p as ?nome) (?d as ?data)  (?r as ?resultado)
    WHERE {   
     ?s rdf:type :EMD .
     ?s :dataEMD ?d  .
     ?s :resultado ?r.
     ?s :paciente ?p.
    } `

  }
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(dados.data.results.bindings, null, 4));
      })
      .catch(erro => console.log(erro))
});


router.get('/api/EMD/:id', function(req, res, next) {
  var query = `SELECT *
   WHERE {   
    :${req.params.id} rdf:type :EMD .
    :${req.params.id} :dataEMD ?d  .
    :${req.params.id} :resultado ?r.
    :${req.params.id} :paciente ?p.
    ?p :email ?e.
    ?p :federado ?f.
    ?p :genero ?g.
    ?p :idade ?i.
    ?p :morada ?mo.
    ?p :pratica ?m. 
    ?p :jogaNo ?c.

   } `
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(dados.data.results.bindings, null, 4));
      })
      .catch(erro => console.log(erro))
});

router.get('/api/modalidades', function(req, res, next) {
  var query = `SELECT *
   WHERE {   
    ?m rdf:type :Modalidade .
   } `
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(dados.data.results.bindings, null, 4));
      })
      .catch(erro => console.log(erro))
});

router.get('/api/modalidades/:id', function(req, res, next) {
  var query = `SELECT *
   WHERE {   
    :Triatlo rdf:type :Modalidade .
   } `
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(dados.data.results.bindings, null, 4));
      })
      .catch(erro => console.log(erro))
});

router.get('/api/atletas', function(req, res, next) {
  var query
  if(req.query.gen=="F"){
     query = `SELECT *
    WHERE {   
     ?s rdf:type :Atleta .
     ?s :genero "F" .
 
    } order by ?s `
  }else if(req.query.clube){
    query = `SELECT *
    WHERE {   
      ?s rdf:type :Atleta .
      ?s :jogaNo :${req.query.clube} .
    } order by ?s`

  }
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(dados.data.results.bindings, null, 4));
      })
      .catch(erro => console.log(erro))
});
module.exports = router;
