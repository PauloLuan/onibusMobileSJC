function Main() {
	var thisObject = this;

	//create object instance, a parasitic subclass of Observable
	this.view = Ti.UI.createView();

	this.getMainView = function() {
		var label = Ti.UI.createLabel({
			color : '#000000',
			text : "Seja Bem vindo ao Ônibus SJC!",
			height : 'auto',
			width : 'auto'
		});
		
		thisObject.view.add(label);
		return thisObject.view;
	}
	
	this.showNextBusFavorites = function(){
		var allTimes = ["09:01", "09:10", "09:15", "09:35", "10:05", "10:35", "10:45", "10:50", "11:01", "11:04", "11:05", "11:09"];
		var time = "10:35";
		var count = 0;
		var nextTimes = [];
		
		for (var i=0; i < allTimes.length; i++) {
			var tempTime = allTimes[i];
			
			var arrayHour = tempTime.substring(0, 2);
			var arrayMinute = tempTime.substring(3, 5);
			
			//var currentHour = time.getHours();
			//var currentMinutes = time.getMinutes()
			
			var currentHour = 10;
			var currentMinute = 35;
			
			if(arrayHour >= currentHour && arrayMinute >= currentMinute || arrayHour >= currentHour && count < 5)
			{
				count ++;
				nextTimes.push(arrayHour + ":" + arrayMinute);
			}
		};
		//console.log(nextTimes);
	}
	
	return thisObject;
}

module.exports = Main;