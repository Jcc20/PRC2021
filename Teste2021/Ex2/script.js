var axios = require('axios')

var prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2021/EMD#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX xml: <http://www.w3.org/XML/1998/namespace> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
`

  
  var query = `
CONSTRUCT 
{  
    ?p1 :primo ?p2.
    ?p2 :primo ?p1.
} 
WHERE 
{ 
    ?p1 :temProgenitor ?t1.
    ?p2 :temProgenitor ?t2.
    ?t2 :temProgenitor ?pr.
    ?t1 :temProgenitor ?pr.
    FILTER (?p1 != ?p2)
    FILTER (?t1 != ?t2)   
}
  `

  var query2 = `
INSERT 
{  
    ?p1 :primo ?p2.
    ?p2 :primo ?p1.
} 
WHERE 
{ 
    ?p1 :temProgenitor ?t1.
    ?p2 :temProgenitor ?t2.
    ?t2 :temProgenitor ?pr.
    ?t1 :temProgenitor ?pr.
    FILTER (?p1 != ?p2)
    FILTER (?t1 != ?t2)   
}
  `
 
var encoded = encodeURIComponent(prefixes+query)

axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
.then(dados => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(dados.data.results.bindings, null, 4));
})
.catch(erro => console.log(erro))

encoded = encodeURIComponent(prefixes+query2)
axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
.then(dados => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(dados.data.results.bindings, null, 4));
})
.catch(erro => console.log(erro))

