var data = require('./dataset.json');

var fs = require('fs'); 

var file =`
@prefix : <http://www.di.uminho.pt/prc2021/tpc7#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@base <http://www.di.uminho.pt/prc2021/tpc7> .

<http://www.di.uminho.pt/prc2021/tpc7> rdf:type owl:Ontology .

#################################################################
#    Object Properties
#################################################################

###  http://www.di.uminho.pt/prc2021/tpc7#destino
:destino rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/tpc7#origem
:origem rdf:type owl:ObjectProperty .


#################################################################
#    Data properties
#################################################################

###  http://www.di.uminho.pt/prc2021/tpc7#descricao
:descricao rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/tpc7#distancia
:distancia rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/tpc7#distrito
:distrito rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/tpc7#nome
:nome rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/tpc7#populacao
:populacao rdf:type owl:DatatypeProperty .


#################################################################
#    Classes
#################################################################

###  http://www.di.uminho.pt/prc2021/tpc7#Cidade
:Cidade rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/tpc7#Ligacao
:Ligacao rdf:type owl:Class .

#################################################################
#    Individuals
#################################################################

`


file += writeCidades()
file += writeLigacoes()


fs.writeFile('ontoFinal.ttl', file,  'utf8', function (err) {
    if (err) throw err;
    console.log('Success!');
});

function writeCidades() {
    var file = ''

    data.cidades.forEach(u => {
        file+= '### http://www.di.uminho.pt/prc2021/tpc7#' + u.id+'\n'
        file+= ':'+u.id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Cidade ;\n'
        file+= '    :nome "'+u.nome+'" ;\n'
        file+= '    :distrito "'+u.distrito+'" ;\n'
        file+= '    :populacao '+u.população+' ;\n'
        file+= '    :descricao "'+u.descrição+'" .\n\n'
    })

    return file
}

function writeLigacoes() {
    var file = ''

    data.ligações.forEach(u => {
        file+= '### http://www.di.uminho.pt/prc2021/tpc7#' + u.id+'\n'
        file+= ':'+u.id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Ligacao ;\n'
        file+= '    :origem :'+u.origem+' ;\n'
        file+= '    :destino :'+u.destino+' ;\n'
        file+= '    :distancia '+u.distância+' .\n\n'
    })

    return file
}
