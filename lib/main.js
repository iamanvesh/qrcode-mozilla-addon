/*
*	@author : Anvesh Kumar Arrabochu
* 	@email  : anvesh.kumar08@gmail.com
*/

var tabs = require('sdk/tabs');
var clipboard = require('sdk/clipboard');
var Request = require('sdk/request').Request;
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var self = require('sdk/self');
var size = 250;

var panel = panels.Panel({
	contentURL : self.data.url("panel.html"),
	onHide : handleHide
}).resize(80, 35);

var icon_button = ToggleButton({
	id : "qurl-link",
	label : "QURL",
	icon : {
		"16" : "./qurl-16.png",
		"32" : "./qurl-32.png",
		"64" : "./qurl-64.png",
	},
	onClick: showPanel
});

function showPanel(state){
	if(state.checked) {
		panel.show({
			position : icon_button
		});
	}
}

function handleHide() {
	icon_button.state('window', {checked : false});
}

function getQrCode(content) {
	var token = "https://api.qrserver.com/v1/create-qr-code/?data="+
	 					content + "&size=" + size + "x" + size;
	tabs.open(token);
}

panel.port.on("getClipboard", function(){
	var content = clipboard.get();
	getQrCode(content);
});

panel.port.on("getUrl", function(){
	var content = tabs.activeTab.url;
	getQrCode(content);
});