function ListBus() {
	var thisObject = this;

	this.view = Ti.UI.createView();

	this.getListBusView = function() {
		thisObject.openConnectionToDatabase();
		return thisObject.view;
	}

	this.openConnectionToDatabase = function() {
		var db = require('ui/common/db');
		var json = db.getBusJson();
		thisObject.createListView(json.items);
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
