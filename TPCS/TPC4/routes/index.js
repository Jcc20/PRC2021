var express = require('express');
var router = express.Router();
var axios = require('axios')

const el = "<http://www.daml.org/2003/01/periodictable/PeriodicTable#>"

var prefixes = `
    PREFIX pd: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
`
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/elementos', function(req, res, next) {
  var query = `SELECT * WHERE { ?s ?p pd:Element } order by asc(?s)`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)
      .then(dados => {
        var elems = []
        dados.data.results.bindings.forEach(arr =>{
          if(arr.s.value.split('#')[1]!=null) {
            elems.push(arr.s.value.split('#')[1])
          }
        })
        res.render('elementos', {lista: elems })
        console.log(elems)
      })
      .catch(erro => console.log(erro))
});

router.get('/elemento/:e', function(req, res, next) {
  var query = `SELECT * WHERE { pd:` + req.params.e + ` ?p ?o } order by asc(?s)`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return({
          p: bind.p.value.split('#')[1],
          o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
          })
        })

        var elems = []
        props.forEach(a => {
          if (a.o != null) elems.push(a)
        })
        res.render('elemento', {lista: elems })
        console.log(elems)
      })
      .catch(erro => console.log(erro))
});



router.get('/grupos', function(req, res, next) {
  var query = `SELECT * WHERE { ?s ?p pd:Group } order by asc(?s)`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)
    .then(dados => {
      var elems = []
      dados.data.results.bindings.forEach(arr =>{
        if(arr.s.value.split('#')[1]!=null) {
          elems.push(arr.s.value.split('#')[1])
        }
      })
      res.render('grupos', {lista: elems })
      console.log(elems)
    })
    .catch(erro => console.log(erro))
});

router.get('/grupo/:g', function(req, res, next) {
  var query = `SELECT * WHERE { pd:` + req.params.g + ` ?p ?o } order by asc(?p)`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return({
          p: bind.p.value.split('#')[1],
          o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
          })
        })

        var elems = []
        props.forEach(a => {
          if (a.o != null) elems.push(a)
        })
        res.render('grupo', {lista: elems })
        console.log(elems)
      })
      .catch(erro => console.log(erro))
});

router.get('/periodos', function(req, res, next) {
  var query = `SELECT * WHERE { ?s ?p pd:Period } order by asc(?s)`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)

    .then(dados => {
      var elems = []
      dados.data.results.bindings.forEach(arr =>{
        if(arr.s.value.split('#')[1]!=null) {
          elems.push(arr.s.value.split('#')[1])
        }
      })
      res.render('periodos', {lista: elems })
      console.log(elemS)
    })
    .catch(erro => console.log(erro))
});

router.get('/periodo/:p', function(req, res, next) {
  var query = `SELECT * WHERE { pd:` + req.params.p + ` ?p ?o } order by asc(?p)`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/prc2021-TPC4?query=" + encoded)
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return({
          p: bind.p.value.split('#')[1],
          o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
          })
        })

        var elems = []
        props.forEach(a => {
          if (a.o != null) elems.push(a)
        })
        res.render('periodo', {lista: elems })
        console.log(elems)
      })
      .catch(erro => console.log(erro))
});

module.exports = router;
