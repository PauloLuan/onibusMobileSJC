function DetailBusTime() {
	var thisObject = this;

	this.view = Ti.UI.createScrollView({
		height : 'auto',
		widght : 'auto',
		layout : 'vertical'
	});

	this.getViewDetailsBusTime = function(bus) 
	{
		thisObject.createScreenBusTime(bus);
		return thisObject.view;
	}

	this.createScreenBusTime = function(bus) 
	{
		/*var contentView = Ti.UI.createView({
		 backgroundColor : 'white',
		 borderWidth : 1,
		 layout : 'vertical',
		 height : 'auto',
		 top : '10dp',
		 right : '10dp',
		 left : '10dp',
		 bottom : '10dp'
		 });*/

		var utils = require("ui/common/utils");
		
		var strHorarios = utils.getNormalizedTimeFromBus(bus);

		var lbl1 = Ti.App.createNormalLabel('Linha: ' + bus.numero + " (" + bus.nome + ")");
		var lbl2 = Ti.App.createNormalLabel('Sentido: ' + bus.sentido);
		var lbl3 = Ti.App.createNormalLabel('Horários');
		var lbl4 = Ti.App.createNormalLabel('Dias de Semana: ' + strHorarios[0] + "\n");
		var lbl5 = Ti.App.createNormalLabel('Sábados: ' + strHorarios[1] + "\n");
		var lbl6 = Ti.App.createNormalLabel('Domingos e Feriados: ' + strHorarios[2] + "\n");

		var favoriteButton = Ti.UI.createButton({
			title : 'Adicionar aos favoritos',
			top : '15',
		});
		favoriteButton.addEventListener("click", function(event) {
			var db = require('ui/common/db');
			db.addFavorite(bus);
		});

		/*contentView.add(lbl1);
		 contentView.add(lbl2);
		 contentView.add(lbl3);
		 contentView.add(lbl4);
		 contentView.add(lbl5);*/

		thisObject.view.add(favoriteButton);
		thisObject.view.add(lbl1);
		thisObject.view.add(lbl2);
		thisObject.view.add(lbl3);
		thisObject.view.add(lbl4);
		thisObject.view.add(lbl5);
		thisObject.view.add(lbl6);

		//thisObject.view.add(contentView)
	}

	return thisObject;
}

module.exports = DetailBusTime;
