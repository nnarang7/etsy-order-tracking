addCustomButtons();

var receivedDetailsText = "Thank you for sending this over! I'll go ahead and add it to your order.";
var sendDetailsText = "Hi! Thank you for your recent order. I noticed that you did not have any personalization details. Please let me know if you'd like to have your order personalized. Thank you!";
var whereIsOrderText = "Hi! Your order has been made and is currently drying. It's set to go out first thing tomorrow morning!";

function insertText(text) {
	$(document).find('textarea').html(text);
}

function createReceivedDetailsButton() {
	var new_button = document.createElement('button');
	new_button.id = "received_details";
	new_button.type = "button";
	new_button.innerHTML = "Confirm Detail Receipt";
	new_button.className = "btn";
	new_button.height = "28px";
	new_button.style.color = 'white';
	new_button.style.backgroundColor = '#f4c842';
	new_button.addEventListener("click", function() {
		insertText(receivedDetailsText);
		return false;
	});
	return new_button;
}

function whereIsOrderButton() {
	var new_button = document.createElement('button');
	new_button.id = "where_is_order";
	new_button.type = "button";
	new_button.innerHTML = "Order Status";
	new_button.className = "btn";
	new_button.height = "28px";
	new_button.style.color = 'white';
	new_button.style.backgroundColor = '#6960EC';
	new_button.addEventListener("click", function() {
		insertText(whereIsOrderText);
		return false;
	});
	return new_button;
}

function createSendDetailsButton() {
	var new_button = document.createElement('button');
	new_button.id = "send_details";
	new_button.type = "button";
	new_button.innerHTML = "Send Details Request";
	new_button.className = "btn";
	new_button.height = "28px";
	new_button.style.color = 'white';
	new_button.style.backgroundColor = '#32CD32';
	new_button.addEventListener("click", function() {
		insertText(sendDetailsText);
		return false;
	});
	return new_button;	
}

function addCustomButtons() {
	console.log("Adding custom buttons to conversations...");
	var button_bar = $(document).find('.panel-body .p-xs-2');

	// Adding all buttons...
	$(document).find('.panel-body .p-xs-2').prepend(createSendDetailsButton());
	$(document).find('.panel-body .p-xs-2').prepend(createReceivedDetailsButton());
	$(document).find('.panel-body .p-xs-2').prepend(whereIsOrderButton());


}