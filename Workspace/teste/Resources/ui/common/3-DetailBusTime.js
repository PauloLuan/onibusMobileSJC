function DetailBusTime() {
	var thisObject = this;

	this.view = Ti.UI.createScrollView({
		height : 'auto',
		widght : 'auto',
		layout : 'vertical'
	});

	this.getViewDetailsBusTime = function(id, json) {
		thisObject.createScreenBusTime(id, json);
		return thisObject.view;
	}

	this.createScreenBusTime = function(id, json){
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

		var lbl1 = Ti.App.createNormalLabel('Linha: ' + json[id].numero + " (" + json[id].nome + ")"  );
		var lbl2 = Ti.App.createNormalLabel('Sentido: ' + json[id].sentido);
		var lbl3 = Ti.App.createNormalLabel('Horários');
		var lbl4 = Ti.App.createNormalLabel('Dias de Semana: ' + json[id].horarios.semana);
		var lbl5 = Ti.App.createNormalLabel('Sábados, Domingos e Feriados: ' + json[id].horarios.fimdesemana + "\n\n\n");

		/*contentView.add(lbl1);
		contentView.add(lbl2);
		contentView.add(lbl3);
		contentView.add(lbl4);
		contentView.add(lbl5);*/
		
		thisObject.view.add(lbl1);
		thisObject.view.add(lbl2);
		thisObject.view.add(lbl3);
		thisObject.view.add(lbl4);
		thisObject.view.add(lbl5);

		//thisObject.view.add(contentView)
	}

	return thisObject;
}

module.exports = DetailBusTime;