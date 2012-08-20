function About() {
	var thisObject = this;

	//create object instance, a parasitic subclass of Observable
	this.view = Ti.UI.createView();

	this.getAboutView = function() {
		var label = Ti.UI.createLabel({
			color : '#000000',
			text : "Welcome to AboutView",
			height : 'auto',
			width : 'auto'
		});

		thisObject.view.add(label);
		return thisObject.view;
	}

	return thisObject;
}

module.exports = About; 