Ti.UI.setBackgroundColor('#000');

var tabGp = Ti.UI.createTabGroup();

var vWin = Ti.UI.createWindow({
	title:"Video",
	url:"vid.js",
	//top:0,
	//left:0,
	//height:480,
	//width:320,
	barColor:"#000"
	});

var vTab = Ti.UI.createTab({
	title:"Video",
	window:vWin
});

var phWin = Ti.UI.createWindow({
	title:"Photos",
	url:"photo.js",
	barColor:"#000"
});

var phTab = Ti.UI.createTab({
	title:"Photos",
	window:phWin
});

tabGp.addTab(vTab);
tabGp.addTab(phTab);

tabGp.open();
