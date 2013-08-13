var db = {		
	openConnectionToDatabase : function() {
		var db = Ti.Database.open('onibus');
		//Ti.API.info('\nOnibus 1: ' + json[0].nome);
		return db;
	},

	getBusJson : function() {
		var db = this.openConnectionToDatabase();
		// pega o último registro
		var rows = db.execute('SELECT * FROM onibus WHERE ID = (SELECT MAX(id) FROM onibus)');
		var json;

		while (rows.isValidRow()) 
		{// get Last row
			var id = rows.fieldByName('id');
			var jsonString = rows.fieldByName('json');
			json = JSON.parse(jsonString);
			json.id = id;
			rows.next();
		}

		rows.close();
		db.close();

		return json;
	},
	
	addFavorite : function(bus) {
		var json = this.getBusJson();

		if (!json.favorites) {
			json.favorites = []
		}

		var favorites = json.favorites;
		var isInTheFavorites = false;

		for (var i = 0; i < favorites.length; i++) 
		{
			if (favorites[i] === bus.hash) 
			{
				isInTheFavorites = true;
			}
		};

		if (!isInTheFavorites) 
		{
			json.favorites.push(bus.hash);
		}

		return this.updateJsonToDB(json);
	},
	
	getBusByHash : function(hash) {
		var json = this.getBusJson();
		var items = json.items;
		var bus;

		for (var i = 0; i < items.length; i++) {
			if (items[i].hash === hash) {
				bus = items[i];
				break;
			}
		};

		return bus;
	},
	
	removeFavorite : function(bus) {
		var json = this.getBusJson();
		json.favorites.remove(bus);
		this.updateJsonToDB(json);
	},
	
	updateJsonToDB : function(json) {
		var db = this.openConnectionToDatabase();
		var isUpdated = false;

		try {
			var stringJson = JSON.stringify(json);
			db.execute("UPDATE onibus SET json = ? WHERE id = ?", stringJson, json.id);
			if(db.rowsAffected > 0)
			{  
				isUpdated = true;
			}
			db.close();
			Ti.API.info("Salvo! " + json.favorites);
			Ti.App.fireEvent("refreshFavoritesView");
		}
		catch(error)
		{
			Ti.API.info("Erro DB: " + error);
		}

		return isUpdated;	
	}
	
}

module.exports = db;