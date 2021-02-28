var ucs = require('./ucs.json');
var professores = require('./professores.json');
var alunos = require('./alunos.json');



var fs = require('fs');

var file =`@prefix : <http://www.di.uminho.pt/prc2021/uc#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@base <http://www.di.uminho.pt/prc2021/uc> .

<http://www.di.uminho.pt/prc2021/uc> rdf:type owl:Ontology .

#################################################################
#    Object Properties
#################################################################

###  http://www.di.uminho.pt/prc2021/uc#ensina
:ensina rdf:type owl:ObjectProperty ;
        owl:inverseOf :éEnsinadaPor ;
        rdfs:domain :Professor ;
        rdfs:range :UnidadeCurricular .


###  http://www.di.uminho.pt/prc2021/uc#frequenta
:frequenta rdf:type owl:ObjectProperty ;
           owl:inverseOf :éFrequentadaPor ;
           rdfs:domain :Aluno ;
           rdfs:range :UnidadeCurricular .


###  http://www.di.uminho.pt/prc2021/uc#éAlunoDe
:éAlunoDe rdf:type owl:ObjectProperty ;
          owl:inverseOf :éProfessorDe .


###  http://www.di.uminho.pt/prc2021/uc#éEnsinadaPor
:éEnsinadaPor rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/uc#éFrequentadaPor
:éFrequentadaPor rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/uc#éProfessorDe
:éProfessorDe rdf:type owl:ObjectProperty ;
              owl:propertyChainAxiom ( :ensina
                                       :éFrequentadaPor
                                     ) .


#################################################################
#    Data properties
#################################################################

###  http://www.di.uminho.pt/prc2021/uc#anoLetivo
:anoLetivo rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/uc#designação
:designação rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/uc#nome
:nome rdf:type owl:DatatypeProperty .


#################################################################
#    Classes
#################################################################

###  http://www.di.uminho.pt/prc2021/uc#Aluno
:Aluno rdf:type owl:Class ;
       rdfs:subClassOf [ rdf:type owl:Restriction ;
                         owl:onProperty :frequenta ;
                         owl:someValuesFrom :UnidadeCurricular
                       ] .


###  http://www.di.uminho.pt/prc2021/uc#Professor
:Professor rdf:type owl:Class ;
           rdfs:subClassOf [ rdf:type owl:Restriction ;
                             owl:onProperty :ensina ;
                             owl:someValuesFrom :UnidadeCurricular
                           ] .


###  http://www.di.uminho.pt/prc2021/uc#UnidadeCurricular
:UnidadeCurricular rdf:type owl:Class .


#################################################################
#    Individuals
#################################################################

`
file += writeUcs()
file += writeProfs()
file += writeAlunos()

fs.writeFile('ontologia.ttl', file, function (err) {
    if (err) throw err;
    console.log('Saved!');
});


function writeUcs() {
    var file = ''

    ucs.ucs.forEach(u => {
        file+= '### http://www.di.uminho.pt/prc2021/uc#' + u._id+'\n'
        file+= ':'+u._id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :UnidadeCurricular ;\n'
        file+= '    :anoLetivo "'+u.anoLetivo+'" ;\n'
        file+= '    :designação "'+u.designação+'" .\n\n'
    })

    return file
}

function writeProfs() {
    var file = ''

    professores.professores.forEach(p => {
        file+= '### http://www.di.uminho.pt/prc2021/uc#' + p._id+'\n'
        file+= ':'+p._id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Professor ;\n'
        c = 1
        p.ensina.forEach(e => {
            if(p.ensina.length==1) file+= '    :ensina :'+e+' ;\n'
            else if(c==1){
                 file+= '    :ensina :'+e+' ,\n'
                c++
            }
            else if (c == p.ensina.length) file+= '            :'+e+' ;\n'
            else {
                file+= '        :'+e+' ,\n'
                c++
            }
        })
        file+= '    :nome "'+p.nome+'" .\n\n'
    })

    return file
}

function writeAlunos() {
    var file = ''

    alunos.alunos.forEach(a => {
        file+= '### http://www.di.uminho.pt/prc2021/uc#' + a._id+'\n'
        file+= ':'+a._id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Aluno ;\n'
        c = 1
        a.frequenta.forEach(f => {
            if(a.frequenta.length==1) file+= '    :frequenta :'+f+' ;\n'
            else if(c==1){
                file+= '    :frequenta :'+f+' ,\n'
                c++
            }
            else if (c == a.frequenta.length) file+= '               :'+f+' ;\n'
            else {
                file+= '               :'+f+' ,\n'
                c++
            }
        })
        file+= '    :nome "'+a.nome+'" .\n\n'
    })

    return file
}