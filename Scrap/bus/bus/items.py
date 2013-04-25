# -*- coding: utf-8 -*-
# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/topics/items.html

from scrapy.item import Item, Field

class Onibus(Item):
	numero = Field()
	nome = Field()
	sentido = Field()
	sentido_completo = Field()
	horarios = Field()
	link = Field()


