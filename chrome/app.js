var title = "Generate QR code";
var menu = chrome.contextMenus.create({
	"title" : title,
	"contexts" : ["link", "selection"],
	"onclick" : function (info, tab) {
		if(info.selectionText != "undefined")
			getQrcode(info.selectionText);
		else
			getQrcode(info.linkUrl);
	}
});

function getQrcode(url) {
	var size = 250;
	var token = "https://api.qrserver.com/v1/create-qr-code/?data="+
	 					url + "&size=" + size + "x" + size;
	chrome.tabs.create({
		url : token
	});
}

chrome.browserAction.onClicked.addListener(function (info, tab) {
	chrome.tabs.query({currentWindow : true, active : true}, function (tabs) {
		var url = tabs[0].url;
		getQrcode(url);
	});
});