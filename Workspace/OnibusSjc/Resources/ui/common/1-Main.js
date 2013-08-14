function Main() {
	var thisObject = this;
	this.Database = require('ui/common/db');
	
	this.view = Ti.UI.createScrollView({
		//height : 'auto',
		//widght : 'auto',
		layout : 'vertical'
	});

	Ti.App.addEventListener('refreshFavoritesView', function(e) {
		thisObject.showNextBusFavorites();
	});
	
	this.getMainView = function()
	{
		thisObject.showNextBusFavorites();
		return thisObject.view;
	}

	//TODO: verificar feriados do ano...
	this.showNextBusFavorites = function()
	{
		
		thisObject.view = Ti.UI.createScrollView({
			height : 'auto',
			widght : 'auto',
			layout : 'vertical'
		});
		
		var json = thisObject.Database.getBusJson();

		if (!json.favorites)
		{
			var lbl1 = Ti.App.createNormalLabel("Seja bem vindo ao ônibus SJC!");
			thisObject.view.add(lbl1);
		} 
		else
		{
			var lbl1 = Ti.App.createNormalLabel("Veja a seguir o horário de seus próximos ônibus!");
			thisObject.view.add(lbl1);
			
			var favorites = json.favorites;
			
			for (var i = 0; i < favorites.length; i++) 
			{
				var bus = thisObject.Database.getBusByHash(favorites[i]);
				
				if(bus)
				{
					var utils = require("ui/common/utils");
					var schedules = utils.getOnlyTimeFromBus(bus);
					var todaySchedule;
					var today = new Date();
			
					// 0 = Domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sábado
					var dayInWeek = today.getUTCDay();
					
					if (dayInWeek === 0) todaySchedule = schedules[2];
					else if (dayInWeek === 6) todaySchedule = schedules[1];
					else todaySchedule = schedules[0];

					if(todaySchedule)
					{
						var nextTimes = thisObject.getNextBusTime(todaySchedule);
						thisObject.addTimesFromFavoritesToMainView(bus, nextTimes);
					}
				}
				
			}
		}
	};

	this.addTimesFromFavoritesToMainView = function(bus, times)
	{
		var parentView = Ti.UI.createView({
			borderColor : 'black',
			borderWidth : 1,
			height : Ti.UI.SIZE,
			top : '10dp',
			right : '10dp',
			left : '10dp',
			bottom : '10dp'
		});
		
		var contentView = Ti.UI.createView({
			layout : 'vertical',
			height : Ti.UI.SIZE,
			top : '10dp',
			right : '10dp',
			left : '10dp',
			bottom : '20dp'
		});

		var lbl1 = Ti.App.createNormalLabel('Linha: ' + bus.numero + " (" + bus.nome + ")");
		var lbl2 = Ti.App.createNormalLabel('Sentido: ' + bus.sentido);
		var lbl3 = Ti.App.createNormalLabel('Próximas Partidas: ' + times);
		//var lbl4 = Ti.App.createNormalLabel('Dias de Semana: ' + strHorarios[0] + "\n");

		contentView.add(lbl1);
		contentView.add(lbl2);
		contentView.add(lbl3);
		
		parentView.add(contentView);
		
		thisObject.view.add(parentView);
	};

	
	/**
		Pega os próximos n horários desejados a partir do horário atual.

		todayTimes: todos os horários do dia de hoje.
		quantity: Quantidade de horários que se deseja a partir do horário atual, default = 5.
	*/
	this.getNextBusTime = function(todayTimes, quantity) {
		
		//var todayTimes = ["09:01", "09:10", "09:15", "09:35", "10:05", "10:35", "10:45", "10:50", "11:01", "11:04", "11:05", "11:09"];

		var time = new Date();
		var qtd = quantity || 5; // Quantidade de próximos horários que serão retornados.
		var count = 0; // contador utilizado para limitar apenas os próximos N horários.
		var nextTimes = [];

		// varre o array de horários e retorna as 5 próximas partidas a partir do horário atual
		for (var i = 0; i < todayTimes.length; i++) 
		{
			var tempTime = todayTimes[i];

			var arrayHour = tempTime.substring(0, 2);
			var arrayMinute = tempTime.substring(3, 5);

			var currentHours = time.getHours();
			var currentMinutes = time.getMinutes();

			//var currentHours = 10; 
			//var currentMinutes = 35;

			if (arrayHour >= currentHours && arrayMinute >= currentMinutes 
				|| arrayHour >= currentHours && count < qtd) 
			{
				count++;
				nextTimes.push(arrayHour + ":" + arrayMinute);
			}
		};

		//console.log(nextTimes);
		return nextTimes;

	}
	return thisObject;
}

module.exports = Main;
