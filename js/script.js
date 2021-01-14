$(document).ready(function() {
    //setting current date to const m
    const m = moment();
    // setting html of p#currentDay to const m
	$("#currentDay").html(m.format("LL"));

    // setting local storage information to variable
	var planner = JSON.parse(localStorage.getItem("planner")) || initializePlanner();
	
    // for-in loop to create <tr> for each time slot
	for (var time in planner) {
        //setting new <tr> to variable for later use
		var tr = $("<tr>")
        
        // adding class and text content to time <td>
		var tdTime = $("<td>")
			.addClass("hour") 
            .text(time);
        // adding class to event <td>
		var tdEvent = $("<td>")
			.addClass("textArea");