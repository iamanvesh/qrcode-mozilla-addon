chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		sendResponse({
			message : "Message received!"
		});
	}
);