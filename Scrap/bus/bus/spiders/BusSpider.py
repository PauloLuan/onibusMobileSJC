# -*- coding: utf-8 -*-
from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http import Request
from bus.items import Onibus
import urllib
import urllib2
import string
import sys
from BeautifulSoup import BeautifulSoup
import re, htmlentitydefs


class BusSpider(BaseSpider):
    name = "bus"
    #allowed_domains = ["http://www.sjc.sp.gov.br/"]
    start_urls = ['http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=p&opcao=1&txt=']

    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        resultList = hxs.select('//tr') # pega cada um dos TRs que estão todos os horários de ônibus
        items = []

        for result in resultList:
            onibus = Onibus()
    		# pega cada uma das Tds separadamente pois cada uma tem um tratamento. Por exemplo uma pode ser texto puro e outra um link
            td = result.select("td")

            try:
                onibus["numero"] = td[0].select("text()").extract()[0] # esta chave no final é porque a função retorna um Array com o texto dentro na primeira posição
                onibus["nome"] = td[1].select("text()").extract()[0]
                onibus["sentido"] = td[2].select("text()").extract()[0]
                link = td[3].select("a/@href").extract()

                if(len(link) != 0): # se a lista for menor siginifica que o TD não é de ônibus...
                    linkConteudo = "http://www.sjc.sp.gov.br" + link[0]
                    onibus["link"] = linkConteudo

                    nextPage = urllib2.urlopen(linkConteudo)
                    response = nextPage.read()
                    nextPage.close() # fecha a conexão
                    soup = BeautifulSoup(response) # transforma a página em um objeto parseável
                    horarios = []
                    for node in soup.findAll('p'): # percorre por todas as Tags "P" que é onde encontra-se o conteúdo
                        texto = ''.join(node.findAll(text=True))
                        horarios.append(texto)

                    horarios.pop(0)
                    horarios.pop(0)
                    horarios.pop()
                    horarios.pop()

                    horariosBruto = []
                    horariosMap = {}
                    semanaMap = {}
                    sabadoMap = {}
                    domingoMap = {}

                    for index, item in enumerate(horarios):
                        try:
                            horario = horarios[index]
                            cursor = horario.find(")") # dígito que representa o fim da frase que não fazem parte dos horários.
                            cursor = cursor + 1 # pula um caracter para não incluir o ")"
                            horario = horario[cursor:] # remove todos os textos desnecessários pegando apenas a parte do texto a partir do ")"
                            #if(horario[0].isdigit()): # se for dígito ele separa todos os campos de horários.
                            horario = horario.replace(",", " ") # remove todas as vírgulas da string de horários
                            array = horario.split() # separa cada campo, colocando cada horário em uma posição do array
                            #horario = self.unescape(horario)
                            horariosBruto.append(array) # [0]=Madrugada, [1]=manhã, [2]=tarde, [3]=noite

                        except Exception, e:
                            pass



                    if len(horarios) >= 5:
                        # Exemplo tipo 1 (5) 1,2,3,4
                        semanaMap["madrugada"] = horariosBruto[1]
                        semanaMap["manha"] = horariosBruto[2]
                        semanaMap["tarde"] = horariosBruto[3]
                        semanaMap["noite"] = horariosBruto[4]

                    if len(horarios) >= 11:
                        # Exemplo tipo 2 (11) 1,2,3,4  2,3,4,5
                        sabadoMap["madrugada"] = horariosBruto[7]
                        sabadoMap["manha"] = horariosBruto[8]
                        sabadoMap["tarde"] = horariosBruto[9]
                        sabadoMap["noite"] = horariosBruto[10]

                    if len(horarios) >= 17:
                        # Exemplo tipo 3 (17) 1,2,3,4  2,3,4,5 13,14,15,16
                        domingoMap["madrugada"] = horariosBruto[13]
                        domingoMap["manha"] = horariosBruto[14]
                        domingoMap["tarde"] = horariosBruto[15]
                        domingoMap["noite"] = horariosBruto[16]

                    horariosMap["semana"] = semanaMap
                    horariosMap["sabado"] = sabadoMap
                    horariosMap["domingo"] = domingoMap
                    onibus["horarios"] = horariosMap

                    items.append(onibus) # só adiciona se for efetivamente um ônibus, pois se não for vai levantar excessão antes de entrar aqui.

            except Exception, e:
                pass # esta excessão é para evitar as outras TDs que não sejam as de ônibus

        return items
        #print(items)
        #filename = response.url.split("/")[-2]
        #open(filename, 'wb').write(response.body)


    ##
    # Removes HTML or XML character references and entities from a text string.
    #
    # @param text The HTML (or XML) source text.
    # @return The plain text, as a Unicode string, if necessary.
    def unescape(text):
        def fixup(m):
            text = m.group(0)
            if text[:2] == "&#":
                # character reference
                try:
                    if text[:3] == "&#x":
                        return unichr(int(text[3:-1], 16))
                    else:
                        return unichr(int(text[2:-1]))
                except ValueError:
                    pass
            else:
                # named entity
                try:
                    text = unichr(htmlentitydefs.name2codepoint[text[1:-1]])
                except KeyError:
                    pass
            return text # leave as is
        return re.sub("&#?\w+;", fixup, text)



"""
# linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=441"
# linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=495"
# linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=8"

import urllib
import urllib2
import string
import sys
from BeautifulSoup import BeautifulSoup

linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=495"
linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=441"
linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=8"





linkConteudo = "http://www.sjc.sp.gov.br/secretarias/transportes/horario-e-itinerario.aspx?acao=d&id_linha=21"
nextPage = urllib2.urlopen(linkConteudo)
response = nextPage.read()
nextPage.close() # fecha a conexão
soup = BeautifulSoup(response) # transforma a página em um objeto parseável
horarios = []
for node in soup.findAll('p'): # percorre por todas as Tags "P" que é onde encontra-se o conteúdo
    texto = ''.join(node.findAll(text=True))
    horarios.append(texto)

horarios.pop(0)
horarios.pop(0)
horarios.pop()
horarios.pop()
horariosBruto = []

for index, item in enumerate(horarios):
    try:
        horario = horarios[index]
        cursor = horario.find(")") # dígito que representa o fim da frase que não fazem parte dos horários.
        cursor = cursor + 1 # pula um caracter para não incluir o ")"
        horario = horario[cursor:] # remove todos os textos desnecessários pegando apenas a parte do texto a partir do ")"
        #if(horario[0].isdigit()): # se for dígito ele separa todos os campos de horários.
        horario = horario.replace(",", " ") # remove todas as vírgulas da string de horários
        array = horario.split() # separa cada campo, colocando cada horário em uma posição do array
        horariosBruto.append(array) # [0]=Madrugada, [1]=manhã, [2]=tarde, [3]=noite

    except Exception, e:
        pass


horariosMap = {}
semanaMap = {}
sabadoMap = {}
domingoMap = {}

if len(horarios) >= 5:
    # Exemplo tipo 1 (5) 1,2,3,4
    semanaMap["madrugada"] = horariosBruto[1]
    semanaMap["manha"] = horariosBruto[2]
    semanaMap["tarde"] = horariosBruto[3]
    semanaMap["noite"] = horariosBruto[4]

if len(horarios) >= 11:
    # Exemplo tipo 2 (11) 1,2,3,4  2,3,4,5
    sabadoMap["madrugada"] = horariosBruto[7]
    sabadoMap["manha"] = horariosBruto[8]
    sabadoMap["tarde"] = horariosBruto[9]
    sabadoMap["noite"] = horariosBruto[10]

if len(horarios) >= 17:
    # Exemplo tipo 3 (17) 1,2,3,4  2,3,4,5 13,14,15,16
    domingoMap["madrugada"] = horariosBruto[13]
    domingoMap["manha"] = horariosBruto[14]
    domingoMap["tarde"] = horariosBruto[15]
    domingoMap["noite"] = horariosBruto[16]

horariosMap["semana"] = semanaMap
horariosMap["sabado"] = sabadoMap
horariosMap["domingo"] = domingoMap
print(horariosMap)

"""





