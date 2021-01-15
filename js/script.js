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
       
        // setting variable for current time
		var thisTime;
        
        // conditional statements for past/present/future
		if (moment(time, "h a").isSame(moment(), "hour")) {
			thisTime = "present";
		} else if (moment(time, "h a").isAfter(moment())) {
			thisTime = "future";
		} else if (moment(time, "h a").isBefore(moment())) {
			thisTime = "past";
		}

		var eventText = $("<textarea>")
            .addClass("description")

            //adding classes for color based on conditional statement above
            .addClass(thisTime)
            
            // setting attribute 
			.attr("data-time", time)
            .val(planner[time]);

            //appending eventText <textarea> to tdEvent <td>
		tdEvent.append(eventText);
	
        // creating <td> for save button and adding class
		var tdSubmit = $("<td>").addClass("saveBtn"); 

        // creating icons and class to determine what icon is used
		var icon = $("<i>").addClass("far fa-save fa-2x");

        // appending icon to tdSubmit <td>
		tdSubmit.append(icon);
		
        // appending time, event, and submit buttons to table rows
		tr.append(tdTime, tdEvent, tdSubmit);

        // appending table rows to myPlanner div
		$("#myPlanner").append(tr);
		
    }
    
    // setting up planner to append times between 8a & 5p from moment()
    function initializePlanner() {
		var tempPlanner = {};

		for (var i = 8; i < 18; i++) {
			
			tempPlanner[moment(i, "H").format("h a")] = "";
		}
		
		return tempPlanner;
    }
    
    // event listener for save button
    $(".saveBtn").on("click", function() {
        // changes color of save icon after clicked
		$(this).css("color", "#f5d362");
		var time = $(this)
			.parent()
			.find(".description")
            .attr("data-time");
            console.log(this)
		var text = $(this)
			.parent()
			.find(".description")
			.val();
		

		planner[time] = text;

		localStorage.setItem("planner", JSON.stringify(planner));
	});
});