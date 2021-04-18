var express = require('express');
var router = express.Router();

var axios = require('axios')

const el = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A84775-TPC5?query="

var prefixes = `
PREFIX : <http://www.di.uminho.pt/prc2021/tpc5#> 
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

router.get('/pubs', function(req, res, next) {
  var query = `SELECT * where { ?p rdf:type :Publication }`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get(el + encoded)  
  .then(dados => res.send(dados.data))
  .catch(err => {res.status(500).jsonp(err);})

});

router.get('/pubs/:id', function(req, res, next) {
  var query = `select * where {:${req.params.id} ?p ?o}`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get(el + encoded)  
  .then(dados => res.send(dados.data))
  .catch(err => { res.status(500).jsonp(err);})
  
});

router.get('/pubs', function(req, res, next) {
  
  if (req.query.type != null) {
    var query = `select * where { ?p rdf:type :${req.query.type}}`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(el + encoded)  
    .then(dados => res.send(dados.data))
    .catch(err => {
      res.status(500).jsonp(err);
    })
  }
  else {
    var query = `select * where {?p rdf:type  ?Publication.}`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(el + encoded)  
    .then(dados => res.send(dados.data))
    .catch(err => {
      res.status(500).jsonp(err);
    })
  }
});


router.get('/authors', function(req, res, next) {
  var query = `SELECT * where { ?a rdf:type :Author }`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(el + encoded)
  .then(dados =>res.send(dados.data))
  .catch(err => { res.status(500).jsonp(err);})

})


router.get('/authors/:id', function(req, res){
  var query = `SELECT * where {:${req.params.id} ?p ?o}`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(el + encoded)
  .then(dados => res.send(dados.data))
  .catch(err => { res.status(500).jsonp(err);})

})

module.exports = router;
