var express = require('express');
var router = express.Router();
var axios = require('axios')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  var query = `SELECT * WHERE { ?s rdf:type owl:Class }`
  var encoded = encodeURIComponent(query)

  axios.get("http://localhost:7200/repositories/" + req.params.id + "?query=" + encoded)
      .then(dados => {
          res.render('repo', { lista: dados.data.results.bindings })
          console.log(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});
module.exports = router;
