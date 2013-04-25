function ApplicationTabGroup(Window) {

	var thisObject = this;


	var Main = require('ui/common/1-Main'),
		ListBus = require('ui/common/2-ListBus');
		DetailsBusTime = require('ui/common/3-DetailBusTime'),
		Configurations = require('ui/common/4-Configurations');
		About = require('ui/common/5-About');

	thisObject.tabGroup = Ti.UI.createTabGroup();
	thisObject.listBusTab;

	this.initializeTabs = function() {
		thisObject.createMainTab();
		thisObject.createListBusTab();
		thisObject.createConfigurationsTab();
	}

	this.createMainTab = function() {
		var objectMain = new Main();
		var mainView = objectMain.getMainView()

		var mainWindow = Ti.UI.createWindow({
			title : "Ônibus SJC",
			exitOnClose : true,
			navBarHidden : false,
			backgroundColor : '#ffffff'
		});
		var mainTab = Ti.UI.createTab({
			title : 'Principal',
			icon : '/images/icon-home.png',
			window : mainWindow
		});
		mainWindow.add(mainView);
		mainWindow.containingTab = mainTab;
		thisObject.tabGroup.addTab(mainTab);
	}

	this.createListBusTab = function() {
		var objectListBus = new ListBus();
		var listBusView = objectListBus.getListBusView()

		var listBusWindow = Ti.UI.createWindow({
			title : "Escolher Ônibus",
			exitOnClose : true,
			navBarHidden : false,
			backgroundColor : '#ffffff'
		});

		listBusWindow.add(listBusView);

		thisObject.listBusTab = Ti.UI.createTab({
			title : 'Escolher Ônibus',
			icon : '/images/KS_nav_ui.png',
			window : listBusWindow
		});

		listBusWindow.containingTab = thisObject.listBusTab;

		listBusView.addEventListener('openScreenDetailsBusTime', function(e) {
			var bus = e.json[e.id]
			thisObject.openScreenDetailsBusTime(bus);
		});

		thisObject.tabGroup.addTab(thisObject.listBusTab);
	}

	this.createConfigurationsTab = function() {
		var objectConfigurations = new Configurations();
		var configurationsView = objectConfigurations.getConfigurationsView()

		var configurationWindow = Ti.UI.createWindow({
			title : "Configurações",
			exitOnClose : true,
			navBarHidden : false,
			backgroundColor : '#ffffff'
		});
		var configurationTab = Ti.UI.createTab({
			title : 'Configurações',
			icon : '/images/KS_nav_views.png',
			window : configurationWindow
		});

		configurationWindow.add(configurationsView);
		configurationWindow.containingTab = configurationTab;
		thisObject.tabGroup.addTab(configurationTab);
	}

	this.openScreenDetailsBusTime = function(id, json) {
		var objectDetailsBusTime = new DetailsBusTime();
		var detailsBusTimeView = objectDetailsBusTime.getViewDetailsBusTime(id, json);
		var detailsBusTimeScreen = Ti.UI.createWindow({
			title : 'Horários',
			backgroundColor : '#ffffff'
		});
		detailsBusTimeScreen.add(detailsBusTimeView);
		thisObject.listBusTab.open(detailsBusTimeScreen);
	}

	thisObject.initializeTabs();
	return thisObject.tabGroup;
};

module.exports = ApplicationTabGroup;
