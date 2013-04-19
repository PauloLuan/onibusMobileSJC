onibusMobileSJC
===============

AppMobile para Android e IOs que exibe os horários de todos os ônibus da cidade de São José dos Campos.

# Objetivo

O objetivo deste projeto é o de criar um aplicativo móvel que exiba as informações sobre os horários de todos os ônibus da cidade de São José dos Campos, não necessitando que o usuário tenha acesso a internet (App completamente Offline pois nem todos os usuários possuem internet a todo o momento).

# Coleta de Dados.

Em relação à coleta dos dados foi criado um [WebCrawler](http://pt.wikipedia.org/wiki/Web_crawler) para realizar o processo de raspagem dos dados do site da prefeitura, para que fosse possível acessar os dados de maneira automática, e consequentemente deixá-los de maneira manipulável (JSON), todo o código do Scrap está na pasta "Scrap", futuramente farei um tutorial de explicação de seu funcionamento. Utilizei a biblioteca [Scrapy](scrapy.org) para isto.

# Plataformas e Arquitetura do Sistema

O projeto foi desenvolvido na plataforma [Titanium da Appcelerator](http://www.appcelerator.com/platform/titanium-platform/) pois permite que a app seja "publicada" nas plataformas Android e IOS com a mesma base de código.

# Colaboração

Este projeto NÃO foi desenvolvido em parceira com a prefeitura, nem com nenhuma empresa, mas toda a ajuda financeira e colaborativa é sempre bem vinda, pois para desenvolver eu tive diversos custos, tais como Licenças, computadores e aparelhos para testes, além do tempo empregado.

Como quase todo programador, tenho um talento imenso com Design (só que não), logo, quem queira ajudar com edição das imagens e layout da app eu agradeceria bastante!

Este projeto é open-source e a licença será definida futuramente, caso queira colaborar entre em contato no E-mail paulonfsu2@hotmail.com

