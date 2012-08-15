function ApplicationWindow(title) {

	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	return self;
};

module.exports = ApplicationWindow;
