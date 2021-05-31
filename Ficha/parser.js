


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
#    Annotation properties
#################################################################

###  http://www.di.uminho.pt/prc2021/fichaprc2021#descricao
:descricao rdf:type owl:AnnotationProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#relativoA
:relativoA rdf:type owl:AnnotationProperty .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#setor
:setor rdf:type owl:AnnotationProperty .


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


###  http://www.di.uminho.pt/prc2021/fichaprc2021#EntradaLivro
:EntradaLivro rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#EntradaMapa
:EntradaMapa rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Fracao
:Fracao rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Individuo
:Individuo rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Livro
:Livro rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Mapa
:Mapa rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2021/fichaprc2021#Proprietario
:Proprietario rdf:type owl:Class ;
              rdfs:subClassOf :Individuo .


#################################################################
#    Individuals
#################################################################

`

var fracs =`
Loja,A,50,6.06/
1_Dto,F,24,36.45/
1_Esq,G,34,51.63/
2_Dto,H,24,36.45/
3_Dto,I,24,36.45/
3_Esq,J,34,51.63/
4_Dto,L,24,36.45/
5_Dto,M,24,36.45/
5_Esq,N,34,51.63/
6_Dto,O,24,36.45/
7_Dto,P,24,36.45/
7_Esq,Q,34,51.63/
8_Dto,R,24,36.45
`

var mapa = `
1_Dto,1,1,1,1,,,,,,,,/
2_Dto,,,,,,,,,,,,/
3_Dto,1,1,1,1,1,1,1,1,1,1,1,1/
4_Dto,1,1,1,1,1,1,1,1,1,1,1,1/
5_Dto,1,1,1,1,1,1,,,,,,/
6_Dto,1,1,1,1,1,1,1,1,,,,/
7_Dto,1,1,1,1,,,,,,,,/
8_Dto,,,,,,,,,,,,/
1_Esq,1,1,1,,,,,,,,,/
3_Esq,1,1,1,,,,,,,,,/
5_Esq,1,1,1,1,,,,,,,/
7_Esq,1,1,1,1,,,,,,,,/
Loja,,,,,,,,,,,,`

var livro=`
2020/001,Despesa,2020-01-04,7.28,CGD,Manutenção da conta
2020/002,Receita,2020-01-06,64.00,7º_Esq,Janeiro
2020/003,Receita,2020-01-06,406.62,2º_Dto,Abril a Dezembro de 2019
2020/004,Despesa,2020-01-08,222.65,EDP,Luz
2020/005,Receita,2020-01-16,45.18,7º_Dto,Janeiro
2020/006,Despesa,2020-02-01,7.28,CGD,Manutenção da conta
2020/007,Receita,2020-02-04,64.00,5º_Esq,Fevereiro
2020/008,Receita,2020-02-06,64.00,7º_Esq,Fevereiro
2020/009,Despesa,2020-01-20,439.77,Kone,Manutenção dos elevadores: 1º trimestre
2020/010,Receita,2020-02-12,384.00,1º_Esq,"Janeiro, Fevereiro e Março"
2020/011,Receita,2020-02-20,45.18,7º_Dto,Fevereiro
2020/012,Despesa,2020-02-24,20.00,Serralheiro,Concerto do trinco da porta
2020/013,Despesa,2020-02-24,174.30,CMB,Inspeção dos elevadores/
2020/014,Receita,2020-02-24,194.30,1º_Dto,"Acertos: Janeiro, Fevereiro, Março, Abril e 13.58 de Maio"
2020/015,Receita,2020-03-11,271.08,5º_Dto,Janeiro a Junho
2020/016,Despesa,2020-03-11,1655.00,PluriRapel,Reparação das fachadas
2020/017,Receita,2020-02-26,64.00,5º_Esq,Março
2020/018,Receita,2020-02-29,542.16,3º_Dto,Janeiro a Dezembro
2020/019,Despesa,2020-03-04,236.59,EDP,Luz
2020/020,Receita,2020-03-06,64.00,7º_Esq,Março
2020/021,Despesa,2020-03-07,7.28,CGD,Manutenção da conta
2020/022,Receita,2020-03-15,45.18,7º_Dto,Março
2020/023,Receita,2020-03-30,64.00,5º_Esq,Abril
2020/024,Despesa,2020-04-04,7.28,CGD,Manutenção da conta
2020/025,Receita,2020-04-06,64.00,7º_Esq,Abril
2020/026,Receita,2020-04-07,225.90,6º_Dto,Abril a Agosto
2020/027,Receita,2020-04-14,45.18,7º_Dto,Abril
2020/028,Despesa,2020-04-15,207.98,Vizinhos,Luz Comum
2020/029,Despesa,2020-04-15,1080.00,Limpeza,Limpeza 2020
2020/030,Receita,2020-04-15,542.16,4º_Dto,Janeiro a Dezembro
2020/031,Despesa,2020-04-01,439.77,Kone,Manutenção dos elevadores: 2º trimestre
2020/032,Receita,2020-02-12,384.00,3º_Esq,"Janeiro, Fevereiro e Março"`

file += writeFrac()
file += writeEntradaLivro()
file += writeEntradaMapa()

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
        file+= '    :setor "'+arr2[1].trim()+'" ;\n'
        file+= '    :mensalidade "'+arr2[3].trim()+'" .\n\n'

    });
    return file
}
/*
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
}*/


function writeEntradaLivro() {
    var file = ''
    fs.readFileSync("livro.txt").toString().split("\n").forEach(function(line, index, arr) {
       
        var arr2 = line.split(",")
      
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#' + arr2[0].trim()+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#'+arr2[0].trim()+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :EntradaLivro ;\n'
        file+= '    :tipoEntrada "'+arr2[1].trim()+'" ;\n'
        file+= '    :data "'+arr2[2].trim()+'" ;\n'
        file+= '    :valor "'+arr2[3].trim()+'" ;\n'
        file+= '    :relativoA :'+arr2[4].trim()+';\n'
        file+= '    :descricao "'+arr2[5].trim()+'" .\n\n'
        
      
    });
 

    return file
}

function writeEntradaMapa() {
    var file = ''
    var meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]

    var arr = mapa.split("/");
    arr.forEach(e => {
        var b = false
        var arr2 = e.split(",")
        var index
        file+= '\n###  http://www.di.uminho.pt/prc2021/fichaprc2021#' + arr2[0].trim()+'\n'
        file+= '<http://www.di.uminho.pt/prc2021/fichaprc2021#'+arr2[0].trim()+'> rdf:type owl:NamedIndividual,\n'
        file+= '        :EntradaMapa ;\n'
        file+= '    :relativoA :'+arr2[0].trim()+';\n'
        for ( index = 1; index <=meses.length; index++) {
           
            if(arr2[index]==1){
              
                if(!b){
                    file+= '    :mes "'+meses[index-1]+'"'
                    b= true
                }else{
                    file+=",\n"
                    file+= '    "'+meses[index-1]+'"'
                }
                
            }
        }
        file+=".\n"
    });

    return file
}