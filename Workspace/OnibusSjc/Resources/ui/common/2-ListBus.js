function ListBus() {
	var thisObject = this;

	//create object instance, a parasitic subclass of Observable
	this.view = Ti.UI.createView();

	this.getListBusView = function() {
		thisObject.openConnectionToDatabase();
		return thisObject.view;
	}

	this.openConnectionToDatabase = function() {
		var db = Ti.Database.open('onibus');
		var rows = db.execute('SELECT * FROM onibus');
		var jsonString = rows.fieldByName('json');
		var json = JSON.parse(jsonString);
		Ti.API.info('\nOnibus 1: ' + json[0].nome);
		thisObject.createListView(json);
	}

	this.createListView = function(json) {
		var search = Ti.UI.createSearchBar({
			hintText : 'Digite o nome de seu Ônibus'
		});

		dataArray = []

		for (var i = 0; i < json.length; i++) {
			dataArray.push({
				title : json[i].nome,
				id : i,
				hasChild : true
			});
		};

		var tableView = Ti.UI.createTableView({
			search : search,
			data : dataArray
		});

		tableView.addEventListener('click', function(e) {
			var id = e.rowData.id;
			thisObject.view.fireEvent('openScreenDetailsBusTime', {
				id : id,
				json:json
			});
		});

		thisObject.view.add(tableView);
	}

	return thisObject;
}

module.exports = ListBus;
