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
		
		var strHorarios = Ti.App.getNormalizedTimeFromBus(bus);

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

	Ti.App.getNormalizedTimeFromBus = function(bus) 
	{
		var tipos = ["semana", "sabado", "domingo"]
		var periodos = ["madrugada", "manha", "tarde", "noite"];
		var periodos_normalizados = ["\nMadrugada: ", "\nManhã: ", "\nTarde: ", "\nNoite: "];
		var strHorarios = [[], [], []];

		for (var i = 0; i < tipos.length; i++) 
		{
			strHorarios[i] = "";
			var tipo_do_dia = bus.horarios[tipos[i]]// array de horários: "semana", "sabado", "domingo"

			for (var j = 0; j < periodos.length; j++) 
			{
				strHorarios[i] = strHorarios[i] + periodos_normalizados[j];
				// Pega os nomes normalizados para a apresentação para o usuário final "Manhã", "Madrugada"
				array_horarios = tipo_do_dia[periodos[j]];

				if (array_horarios) 
				{

					// laço que percorre todos os elementos da lista de horários de cada um dos períodos do dia
					for (var k = 0; k < array_horarios.length; k++) 
					{
						var horario_temp = array_horarios[k];

						// Se o primeiro carácter for número, deve-se colocar a vírgula para separar os horários, senão, deve-se colocar um espaço para as palavras não grudarem
						if (Ti.App.isNumber(horario_temp[0])) 
						{
							strHorarios[i] = strHorarios[i] + horario_temp
							
							if(k != tipo_do_dia.length)
							{
								strHorarios[i] = strHorarios[i] + ", "	
							}
						} 
						else 
						{
							//strHorarios[i] = strHorarios[i] + " "
						}
					}
				}
			}
		}
		
		return strHorarios;
	}
	
	/*

		Função que pega todos os horários de determinado ônibus

		param: bus: ônibus do qual serão extraídos todos os dados
		return: 
			strHorarios: Array que contém a seguinte estrutura:
			     0            1            2
			[[ semana ], [ sábados ], [ domingos ]];
	*/
	Ti.App.getOnlyTimeFromBus = function(bus) 
	{
		var tipos = ["semana", "sabado", "domingo"]
		var strHorarios = [[/*semana*/], [/*sábado*/], [/*domingo*/]];

		for (var i = 0; i < tipos.length; i++) 
		{
			// array de horários: "semana", "sabado", "domingo"
			var tipo_do_dia = bus.horarios[tipos[i]]

			for (var j = 0; j < periodos.length; j++) 
			{
				// Pega os nomes normalizados para a apresentação para o usuário final "Manhã", "Madrugada"
				array_horarios = tipo_do_dia[periodos[j]];

				if (array_horarios) 
				{
					// laço que percorre todos os elementos da lista de horários de cada um dos períodos do dia
					for (var k = 0; k < array_horarios.length; k++) 
					{
						var horario_temp = array_horarios[k]

						// Se o primeiro carácter for número, deve-se colocar a vírgula para separar os horários, 
						//senão, deve-se colocar um espaço para as palavras não grudarem
						if (Ti.App.isNumber(horario_temp[0])) 
						{
							if(strHorarios[i]){
								strHorarios[i].push(horario_temp);
							}
						}
					}
				}
			}
		}
		
		return strHorarios;
	}

	return thisObject;
}

module.exports = DetailBusTime;
