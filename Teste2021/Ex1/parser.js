var emds = require('./emd.json');

var fs = require('fs');

var file=`
@prefix : <http://www.di.uminho.pt/prc2021/EMD#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@base <http://www.di.uminho.pt/prc2021/EMD#> .

<http://www.di.uminho.pt/prc2021/EMD#> rdf:type owl:Ontology .

#################################################################
#    Object Properties
#################################################################

###  http://www.di.uminho.pt/prc2021/EMD#jogaNo
:jogaNo rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/EMD#paciente
:paciente rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/EMD#pratica
:pratica rdf:type owl:ObjectProperty .


#################################################################
#    Data properties
#################################################################

###  http://www.di.uminho.pt/prc2021/EMD#dataEMD
:dataEMD rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#email
:email rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#federado
:federado rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#genero
:genero rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#idade
:idade rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#morada
:morada rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#nome
:nome rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/EMD#resultado
:resultado rdf:type owl:DatatypeProperty .


#################################################################
#    Classes
#################################################################

###  http://www.di.uminho.pt/prc2021/EMD#Atleta
:Atleta rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/EMD#Clube
:Clube rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/EMD#EMD
:EMD rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/EMD#Modalidade
:Modalidade rdf:type owl:Class .

#################################################################
#    Individuals
#################################################################

`

file += writeClube()
file += writeModal()
file += writeAtleta()
file += writeEMD()

fs.writeFile('EMD.ttl', file,  'utf8', function (err) {
    if (err) throw err;
    console.log('Success!');
});


function writeClube() {
    var file = ''

    emds.emds.forEach(u => {
        file+= '\n### http://www.di.uminho.pt/prc2021/EMD#' + u.clube.split(' ').join('_')+'\n'
        file+= ':'+u.clube.split(' ').join('_')+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Clube .\n'

    })

    return file
}

function writeModal() {
    var file = ''

    emds.emds.forEach(u => {
        file+= '\n### http://www.di.uminho.pt/prc2021/EMD#' + u.modalidade+'\n'
        file+= ':'+u.modalidade+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Modalidade .\n'

    })

    return file
}


function writeAtleta() {
    var file = ''

    emds.emds.forEach(u => {
        file+= '\n### http://www.di.uminho.pt/prc2021/EMD#' + u.nome.primeiro+"_"+u.nome.último+'\n'
        file+= ':'+u.nome.primeiro+"_"+u.nome.último+' rdf:type owl:NamedIndividual,\n'
        file+= '        :Atleta ;\n'
        file+= '    :idade "'+u.idade+'" ;\n'
        file+= '    :genero "'+u.género+'" ;\n'
        file+= '    :morada "'+u.morada+'" ;\n'
        file+= '    :email "'+u.email+'" ;\n'
        file+= '    :federado "'+u.federado+'" ;\n'
        file+= '    :pratica :'+u.modalidade+';\n'
        file+= '    :jogaNo :'+u.clube.split(' ').join('_')+'.\n'

    })

    return file
}

function writeEMD() {
    var file = ''

    emds.emds.forEach(u => {
        file+= '\n### http://www.di.uminho.pt/prc2021/EMD#' + u._id+'\n'
        file+= ':'+u._id+' rdf:type owl:NamedIndividual,\n'
        file+= '        :EMD ;\n'
        file+= '    :dataEMD "'+u.dataEMD+'" ;\n'
        file+= '    :resultado "'+u.resultado+'" ;\n'
        file+= '    :paciente :'+u.nome.primeiro+"_"+u.nome.último+' .\n'

    })

    return file
}