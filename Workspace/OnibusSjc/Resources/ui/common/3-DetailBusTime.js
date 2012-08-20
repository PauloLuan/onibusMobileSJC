function DetailBusTime() {
	var thisObject = this;

	//create object instance, a parasitic subclass of Observable
	this.view = Ti.UI.createView();

	this.getDetailBusTimeView = function() {
		var label = Ti.UI.createLabel({
			color : '#000000',
			text : "Welcome to DetailBusTimeView",
			height : 'auto',
			width : 'auto'
		});

		thisObject.view.add(label);
		return thisObject.view;
	}

	return thisObject;
}

module.exports = DetailBusTime; 