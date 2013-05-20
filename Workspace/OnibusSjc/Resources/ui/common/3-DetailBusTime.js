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

	this.createScreenBusTime = function(bus) {
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

		var tipos = ["semana", "sabado", "domingo"]
		var periodos = ["madrugada", "manha", "tarde", "noite"];
		var periodos_normalizados = ["\nMadrugada: ", "\nManhã: ", "\nTarde: ", "\nNoite: "];
		var strHorarios = ["", "", ""];

		for (var i = 0; i < tipos.length; i++) {
			strHorarios[i] = "";
			var tipo_do_dia = bus.horarios[tipos[i]]// array de horários: "semana", "sabado", "domingo"

			for (var j = 0; j < periodos.length; j++) {
				strHorarios[i] = strHorarios[i] + periodos_normalizados[j];
				// Pega os nomes normalizados para a apresentação para o usuário final "Manhã", "Madrugada"
				array_horarios = tipo_do_dia[periodos[j]];

				if (array_horarios) {
					for (var k = 0; k < array_horarios.length; k++) {// laço que percorre todos os elementos da lista de horários de cada um dos períodos do dia
						horario_temp = array_horarios[k]
						strHorarios[i] = strHorarios[i] + horario_temp

						if (Ti.App.isNumber(horario_temp[0]) && k != tipo_do_dia.length) {// Se o primeiro carácter for número, deve-se colocar a vírgula para separar os horários, senão, deve-se colocar um espaço para as palavras não grudarem
							strHorarios[i] = strHorarios[i] + ", "
						} else {
							strHorarios[i] = strHorarios[i] + " "
						}
					}
				}
			}
		}

		var lbl1 = Ti.App.createNormalLabel('Linha: ' + bus.numero + " (" + bus.nome + ")");
		var lbl2 = Ti.App.createNormalLabel('Sentido: ' + bus.sentido);
		var lbl3 = Ti.App.createNormalLabel('Horários');
		var lbl4 = Ti.App.createNormalLabel('Dias de Semana: ' + strHorarios[0] + "\n");
		var lbl5 = Ti.App.createNormalLabel('Sábados: ' + strHorarios[1] + "\n");
		var lbl6 = Ti.App.createNormalLabel('Domingos e Feriados: ' + strHorarios[2] + "\n");

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
		thisObject.view.add(lbl6);

		//thisObject.view.add(contentView)
	}

	return thisObject;
}

module.exports = DetailBusTime; 