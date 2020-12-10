
// Displaying current Date and time in day planner 
$(currentDay).text(moment().format('MMMM Do YYYY, h:mm:ss a'));
setInterval(function () {
    $(currentDay).text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000)

// $(document).ready() makes sure that nothing happens until the page
// is fully loaded. It's important because the div may not have loaded
// yet put code outside of this.

$(document).ready(function () {

    // an array of time from 9-5pm

    const times = ["9am", "10am", "11am", "12pm", "13pm", "14pm", "15pm", "16pm", "17pm"];
    
    const timeText = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

    for (let i = 0; i < times.length; i++) {
        // in each loop will create row with 3 col(col-1 for hour, col-10 for text area and col-1 for button)
        const row = $("<div>");
        row.addClass("row time-block");
        row.attr("data-time", times[i]);
        $(".container").append(row);

        // hour col-1
        const column1 = $("<div>");
        column1.addClass("col-1 hour");
        column1.text(timeText[i]);
        row.append(column1);

        //textArea col-10    
        const textArea = $("<textarea>");
        textArea.addClass("col-10 description");
        textArea.attr("id", times[i]);
        //local storage get
        var value = localStorage.getItem(times[i]);
        if (value != null) {
            textArea.val(value);
        }
        row.append(textArea);

        //button col-1
        const button = $("<button>");
        const icon = $("<i class='far fa-save fa-lg'></i>")
        button.addClass("col-1 saveBtn");
        button.append(icon);
        row.append(button);

    }
    // color code 
    function update () {
        var  currentTime = parseInt(moment().format('HH'));
        console.log(currentTime);
       
        $("textarea").each (function(){
            var thisHour = parseInt($(this).attr("id"));
            console.log(thisHour);
            if(thisHour > currentTime){
                $(this).addClass("future")
            }
            else if(thisHour === currentTime){
                $(this).addClass("present")
            }
            else {
                $(this).addClass("past")
            }
        })
    }
    update();

    //on click event 
    
    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var storeTime = $(this).parent().attr("data-time");
        var storeText = $(this).siblings(".description").val();
        localStorage.setItem(storeTime, storeText);       
    });


})




