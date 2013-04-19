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
	return thisObject;
}

module.exports = Main;