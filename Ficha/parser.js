


var fs = require('fs');

var file =`@prefix : <http://www.di.uminho.pt/prc2021/fichaprc2021#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@base <http://www.di.uminho.pt/prc2021/fichaprc2021#> .

<http://www.di.uminho.pt/prc2021/fichaprc2021#> rdf:type owl:Ontology .

#################################################################
#    Object Properties
#################################################################

###  http://www.di.uminho.pt/prc2021/fichaprc2021#arrenda
:arrenda rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#arrendatario
:arrendatario rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#entradas
:entradas rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#fracao
:fracao rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#lista
:lista rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#propietario
:propietario rdf:type owl:ObjectProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#proprietarioDe
:proprietarioDe rdf:type owl:ObjectProperty .


#################################################################
#    Data properties
#################################################################

###  http://www.di.uminho.pt/prc2021/fichaprc2021#data
:data rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#email
:email rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#estado
:estado rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#fornecedor
:fornecedor rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#mensalidade
:mensalidade rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#mes
:mes rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#nome
:nome rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#pagou
:pagou rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#permilagem
:permilagem rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#telefone
:telefone rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#tipoEntrada
:tipoEntrada rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#tipoImovel
:tipoImovel rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#valor
:valor rdf:type owl:DatatypeProperty .


#################################################################
#    Classes
#################################################################

###  http://www.di.uminho.pt/prc2021/fichaprc2021#Arrendatario
:Arrendatario rdf:type owl:Class ;
              rdfs:subClassOf :Individuo .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Entrada
:Entrada rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Fracao
:Fracao rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Individuo
:Individuo rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Livro
:Livro rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Mapa
:Mapa rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#PagamentosMes
:PagamentosMes rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Proprietario
:Proprietario rdf:type owl:Class ;
              rdfs:subClassOf :Individuo .

#################################################################
#    Individuals
#################################################################


`

var fracs =`
Loja,A,50,6.06/
1º_Dto,F,24,36.45/
1º_Esq,G,34,51.63/
2º_Dto,H,24,36.45/
3º_Dto,I,24,36.45/
3º_Esq,J,34,51.63/
4º_Dto,L,24,36.45/
5º_Dto,M,24,36.45/
5º_Esq,N,34,51.63/
6º_Dto,O,24,36.45/
7º_Dto,P,24,36.45/
7º_Esq,Q,34,51.63/
8º_Dto,R,24,36.45
`

var mapa = `
1º_Dto,1,1,1,1,,,,,,,,/
2º_Dto,,,,,,,,,,,,/
3º_Dto,1,1,1,1,1,1,1,1,1,1,1,1/
4º_Dto,1,1,1,1,1,1,1,1,1,1,1,1/
5º_Dto,1,1,1,1,1,1,,,,,,/
6º_Dto,1,1,1,1,1,1,1,1,,,,/
7º_Dto,1,1,1,1,,,,,,,,/
8º_Dto,,,,,,,,,,,,/
1º_Esq,1,1,1,,,,,,,,,/
3º_Esq,1,1,1,,,,,,,,,/
5º_Esq,1,1,1,1,,,,,,,/
7º_Esq,1,1,1,1,,,,,,,,/
Loja,,,,,,,,,,,,`

file += writeFrac()
file += writeProps()
file += writeArrend()
file += writePagamentoMes()

fs.writeFile('fichaAferi.ttl', file,  'utf8', function (err) {
    if (err) throw err;
    console.log('Success!');
});


function writeFrac() {
    var file = ''
    var arr = fracs.split("/");

    arr.forEach(e => {
        var arr2 = e.split(",")
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#' + arr2[0].trim()+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#'+arr2[0].trim()+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :Fracao ;\n'
        file+= '    :permilagem "'+arr2[2].trim()+'" ;\n'
        file+= '    :proprietario :idA'+ ';\n'
        file+= '    :estado "alugado"'+ ';\n'
        file+= '    :tipoImovel "Loja"'+ ';\n'
        file+= '    :mensalidade "'+arr2[3].trim()+'" .\n\n'

    });
    return file
}

function writeProps() {
    var file = ''
    x=0
    names = [ "Abdulmalik", "Rui", "Luis", "Costa", "Ricardo"]

    names.forEach(e => {
        
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#idP' + x+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#idP'+x+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :Proprietario ,\n'
        file+= '        :Individuo ;\n'
        file+= '    :nome "'+e+'" ;\n'
        file+= '    :email "'+e+'@gmail.com" ;\n'
        file+= '    :telefone "931123123" .\n'
        x+=1
    });

    return file
}

function writeArrend() {
    var file = ''
    names = [ "Filipa", "Valter", "Hugo"]
    x=0
    names.forEach(e => {
        
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#idA' + x+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#idA'+x+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :Arrendatario ,\n'
        file+= '        :Individuo ;\n'
        file+= '    :nome "'+e+'" ;\n'
        file+= '    :email "'+e+'@gmail.com" ;\n'
        file+= '    :telefone "922123123" .\n'
        x+=1
    });

    return file
}


function writePagamentoMes() {
    var file = ''
    var meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]

    var arr = mapa.split("/");
    arr.forEach(e => {
        var arr2 = e.split(",")
        var index
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#P' + arr2[0].trim()+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#P'+arr2[0].trim()+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :PagamentosMes ;\n'
        file+= '    :fracao :'+arr2[0].trim()+' ;\n'
        for ( index = 1; index <meses.length; index++) {
            if(arr2[index]==1){
                file+= '    :'+meses[index-1]+' "Pagou" ;\n'
            }else{
                file+= '    :'+meses[index-1]+' "Nao pagou" ;\n'
            }
        }
        if(arr2[index]==1){
            file+= '    :'+meses[index-1]+' "Pagou" ;\n'
        }else{
            file+= '    :'+meses[index-1]+' "Nao pagou" .\n'
        }
    });

    return file
}