<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="oxygenxml.com/ns/doc/xsl"
    exclude-result-prefixes="xd"
   
    version="2.0">
    
    <xd:doc scope="stylesheet">    
        <xd:desc>     
            <xd:p><xd:b>Created on:</xd:b> Mar 6, 2021</xd:p> 
            <xd:p><xd:b>Author:</xd:b> João Cunha</xd:p>
            <xd:p>Conversão em xsl de arquivo de musica digital de XML para TTL</xd:p>
        </xd:desc>   
    </xd:doc>
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="obra">    
### http://www.di.uminho.pt/prc2021/arquivoM#<xsl:value-of select="@id"/>
:<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
:Obra ;
:titulo "<xsl:value-of select="titulo"/>" ;
<xsl:if test="subtitulo">
    :subtitulo "<xsl:value-of select="subtitulo"/>" ; 
</xsl:if>
<xsl:if test="arranjo">
:arranjo "<xsl:value-of select="arranjo"/>" ; 
</xsl:if>
<xsl:if test="editado">
:editado "<xsl:value-of select="editado"/>" ; 
</xsl:if>
    <xsl:if test="inf-relacionada">
:video "<xsl:value-of select="inf-relacionada/video/@href"/>" ;
    </xsl:if> 
:tipo "<xsl:value-of select="tipo"/>" .        
# -------------------------------------------       
        
        <xsl:if test="compositor">
### http://www.di.uminho.pt/prc2021/arquivoM#<xsl:value-of select="replace(replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_')"/>
:<xsl:value-of select="replace(replace(replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/> rdf:type owl:NamedIndividual ,
:Compositor ;
:nome "<xsl:value-of select="replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', '')"/>" ;
:compos :<xsl:value-of select="@id"/> .
# --------------------------------------------------
        </xsl:if>
        
        <xsl:for-each select="instrumentos/instrumento">
### http://www.di.uminho.pt/prc2021/arquivoM#<xsl:value-of select="replace(designacao,' ','_')"/>
:<xsl:value-of select="replace(designacao,' ','_')"/> rdf:type owl:NamedIndividual,
:Instrumento ;
:utilizadoPor :<xsl:value-of select="../../@id"/> ;
:designaçao "<xsl:value-of select="designacao"/>" .
# --------------------------------------------------
            
            <xsl:for-each select="partitura">
### http://www.di.uminho.pt/prc2021/arquivoM#<xsl:value-of select="@path"/>
:<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
:Partitura ;
:relacionadoCom :<xsl:value-of select="replace(../designacao,' ','_')"/> ;
:path "<xsl:value-of select="@path"/>" ;
<xsl:if test="@afinacao">:afinacao "<xsl:value-of select="@afinacao"/>" ; </xsl:if>          
<xsl:if test="@clave">:clave "<xsl:value-of select="@clave"/>" ; </xsl:if>
<xsl:if test="@voz">:voz "<xsl:value-of select="@voz"/>" ; </xsl:if> 
:type "<xsl:value-of select="@type"/>" .
# --------------------------------------------------
            </xsl:for-each>
            
        </xsl:for-each>
        
    </xsl:template>
    
</xsl:stylesheet>