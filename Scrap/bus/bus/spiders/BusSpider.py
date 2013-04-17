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

                    # Remove os lixos (HardCoded)
                    horarios.pop(0)
                    horarios.pop(0)
                    horarios.pop()
                    horarios.pop()

                    horariossemana = []
                    horariosfimsemana = []

                    for index, item in enumerate(horarios):
                        try:
                            horario = horarios[index]
                            cursor = horario.find(")")
                            cursor = cursor + 1
                            horario = horario[cursor:]
                            if(horario[0].isdigit()): # se for dígito ele separa os campos.
                                array = horario.split() # separa cada campo, colocando cada horário em uma posição do array
                                if(index < 5):
                                    horariossemana = horariossemana + array
                                else:
                                    horariosfimsemana = horariosfimsemana + array

                                horariosMap = {}
                                horariosMap["semana"] = horariossemana
                                horariosMap["fimdesemana"] = horariosfimsemana
                                onibus["horarios"] = horariosMap

                        except Exception, e:
                            pass
                    items.append(onibus) # só adiciona se for efetivamente um ônibus, pois se não for vai levantar excessão antes de entrar aqui.

            except Exception, e:
                pass # esta excessão é para evitar as outras TDs que não sejam as de ônibus

        return items
        #print(items)
        #filename = response.url.split("/")[-2]
        #open(filename, 'wb').write(response.body)




