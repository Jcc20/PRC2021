var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/rest/repositories')
            .then(dados => {
              res.render('index', { lista: dados.data })
              console.log(dados.data)
            })
            .catch(err => console.log(err))
});

router.get('/:id', function(req, res, next) {
  var query = `SELECT * WHERE { ?s rdf:type owl:Class }`
  var encoded = encodeURIComponent(query)

  axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
      .then(dados => {
          res.render('repo', { id: req.params.id , lista: dados.data.results.bindings })
          console.log(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});

router.get('/:id/classe/:cla', function(req, res, next) {
  var x
  var query = `SELECT * WHERE { ?s rdf:type owl:Class }`
  var encoded = encodeURIComponent(query)

  axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
      .then(dados => {
        dados.data.results.bindings.forEach(arr => {
          if(arr.s.value.split('#')[1]==req.params.cla) {
            x = arr.s.value
            query = `SELECT * WHERE { ?s rdf:type <${x}> }`
            encoded = encodeURIComponent(query)

            axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
            .then(dados => {
              res.render('classe', { id:req.params.id, classe: req.params.cla, lista: dados.data.results.bindings })
              console.log(dados.data.results.bindings)
            })
            .catch(erro => console.log(erro))
            }
        })

      })
      .catch(erro => console.log(erro))


});



router.get('/:id/classe/:cla/individuo/:ind', function(req, res, next) {

  var query = `SELECT * WHERE { ?s rdf:type owl:Class }`
  var encoded = encodeURIComponent(query)

  axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
      .then(dados => {
        dados.data.results.bindings.forEach(arr => {
          if(arr.s.value.split('#')[1]==req.params.cla) {
          
            query = `SELECT * WHERE { ?s rdf:type <${arr.s.value}> }`
            encoded = encodeURIComponent(query)

            axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
            .then(dados => {
              dados.data.results.bindings.forEach(arr => {
                if(arr.s.value.split('#')[1]==req.params.ind) {
                  query = `SELECT * WHERE { <${arr.s.value}> ?p ?o }`
                  encoded = encodeURIComponent(query)
                  axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
                  .then(dados => {
                    res.render('individuo', { lista: dados.data.results.bindings })
                    console.log(dados.data.results.bindings)
                  })
                  .catch(erro => console.log(erro))
                }
              })    
            })
            .catch(erro => console.log("erro"))
            }
        })

      })
      .catch(erro => console.log("erro1"))

});
module.exports = router;
