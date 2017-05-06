chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	addOrderDiv();

      chrome.runtime.sendMessage({"message": "add_divs"});
    }
  }
);

function addOrderDiv() {
	console.log("Creating divs...");
	var order_div = document.createElement('div');
	order_div.innerText = "Mark your orders as completed!";	
	order_div.className = "user-notes completed-order";

	var completed_checkbox = document.createElement('input');
	completed_checkbox.type = 'checkbox';
	completed_checkbox.value = false; //TODO: need to check this with chrome storage
	
	order_div.appendChild(completed_checkbox);	

	console.log("Adding divs...");
	id_count = 0;
	$( "div[class = 'user-notes']" ).after(order_div);

	var all_checkboxes = document.getElementsByClassName("completed-order");

	var orderComplete = function(e) {
		var jquery_checkbox = $(this);
		var checkbox_element = jquery_checkbox.find('input');
		var checkbox_val = checkbox_element.is(':checked');
		checkbox_order_id = jquery_checkbox.closest('.order').attr('data-receipt-id');
		completedAction(checkbox_order_id, checkbox_val);		
	};

	for (var i = 0; i < all_checkboxes.length; i++) {
		all_checkboxes[i].addEventListener('change', orderComplete, false);
	}
}

function completedAction(order_id, val) {
	if (val) {
		console.log("Congrats - you completed order id " + order_id + "!");
	} else {
		console.log("Oops - looks like you didn't complete order " + order_id + "!");
	}

	var to_add = {}
	to_add[order_id] = val;

	chrome.storage.sync.set(to_add, function() {
		chrome.storage.sync.get(order_id, function(value) {
			console.log("Order status updated: ", order_id, value[order_id]);
		});		
	});
}