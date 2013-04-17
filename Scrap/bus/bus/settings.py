# Scrapy settings for bus project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'bus'
BOT_VERSION = '1.0'

SPIDER_MODULES = ['bus.spiders']
NEWSPIDER_MODULE = 'bus.spiders'
USER_AGENT = '%s/%s' % (BOT_NAME, BOT_VERSION)

