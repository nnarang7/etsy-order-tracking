addOrderDiv();

function addOrderDiv() {
	console.log("Creating divs...");
	var order_div = document.createElement('div');
	order_div.innerText = "Mark your order as complete:   ";
	order_div.className = "user-notes completed-order";
	order_div.style.color = 'white';
	order_div.style.backgroundColor = '#f4c842';

	var completed_checkbox = document.createElement('input');
	completed_checkbox.type = 'checkbox';
	completed_checkbox.value = false; //TODO: need to check this with chrome storage
	completed_checkbox.className = 'checkbox';

	order_div.appendChild(completed_checkbox);	

	console.log("Adding divs...");
	id_count = 0;
	// $( "div[class = 'user-notes']" ).after(order_div);

	var all_checkboxes = document.getElementsByClassName("completed-order");

	var orderComplete = function(e) {
		var jquery_checkbox = $(this);
		var checkbox_element = jquery_checkbox.find('input');
		var checkbox_val = checkbox_element.is(':checked');
		checkbox_order_id = jquery_checkbox.closest('.order').attr('data-receipt-id');
		completedAction(this.id, checkbox_order_id, checkbox_val);		
	};

	all_ids = [];

	for (var i = 0; i < all_checkboxes.length; i++) {

		jquery_current_checkbox = $(all_checkboxes[i]);
		current_order_id = jquery_current_checkbox.closest('.order').attr('data-receipt-id');		
		all_checkboxes[i].id = 'completed-order-' + current_order_id;
		all_ids.push(current_order_id);

		all_checkboxes[i].addEventListener('change', orderComplete, false);	
		
	}	

	chrome.storage.sync.get(all_ids, function(values) {
		for (var i = 0; i < all_ids.length; i++) {
			update_div(all_ids[i], values[all_ids[i]]);
		}
	});	
}

function update_div(id, val) {
	to_update = $(document.getElementById('completed-order-' + id));
	console.log(to_update);
	checkbox_element = to_update.find('input');
	console.log(checkbox_element);

	if (val) {
		new_html = to_update.html().replace("Complete!", "Order complete! Nice work!	");
		new_html.replace("false", "true");
		new_html = new_html.replace(">", " checked>");
		console.log(new_html);

		$(document.getElementById('completed-order-' + id)).html(new_html);
		$(document.getElementById('completed-order-' + id)).css("color", 'white');
		$(document.getElementById('completed-order-' + id)).css("backgroundColor", 'green');
	} else {
		new_html = to_update.html().replace("Complete!", 'Mark your order as completed!   ');
		new_html = new_html.replace("true", "false")
		new_html = new_html.replace('checked="">', ">")
		console.log(new_html);
		$(document.getElementById('completed-order-' + id)).html(new_html);

		$(document.getElementById('completed-order-' + id)).css("color", 'white');
		$(document.getElementById('completed-order-' + id)).css("backgroundColor", '#f4c842');	
	}
}

function completedAction(checkbox_div_id, order_id, val) {
	console.log(checkbox_div_id);
	checkbox_div = document.getElementById(checkbox_div_id);
	jquery_checkbox_div = $(checkbox_div);
	console.log(jquery_checkbox_div)

	if (val) {
		console.log("Congrats - you completed order id " + order_id + "!");
		document.getElementById(checkbox_div_id).style.color = 'white';
		document.getElementById(checkbox_div_id).style.backgroundColor = 'green';

		new_html = jquery_checkbox_div.html().replace("Mark your order as completed!", "Order complete! Nice work!	");
		console.log(new_html);
		new_html.replace("false", "true");
		new_html = new_html.replace(">", " checked>");
		console.log(new_html);
		$(document.getElementById(checkbox_div_id)).html(new_html);
		console.log($(checkbox_div).html());
	} else {
		console.log("Oops - looks like you didn't complete order " + order_id + ".");
		checkbox_div.style.color = 'white';
		checkbox_div.style.backgroundColor = '#f4c842';

		new_html = jquery_checkbox_div.html().replace("Order complete! Nice work!", "Mark your order as completed!");
		new_html = new_html.replace("true", "false");
		new_html = new_html.replace('checked="">', ">");
		console.log(new_html);
		$(document.getElementById(checkbox_div_id)).html(new_html);
	}

	var to_add = {}
	to_add[order_id] = val;

	chrome.storage.sync.set(to_add, function() {
		chrome.storage.sync.get(order_id, function(value) {
			console.log("Order status updated: ", order_id, value[order_id]);
		});		
	});
}