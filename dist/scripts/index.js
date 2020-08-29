$(document).ready(function() {
    var userArray = [];
    let dayCounter = 0;
    //constructor for user inputs based off how their day was
    function dailyData(day, date, status, reason) {
        this.day = day;
        this.date = date;
        this.status = status;
        this.reason = reason;
    }

    //sets the current date on screen
    const currentDate = moment().format("MM/DD/YYYY");

    //functions that navigate thru the html and hide/show divs
    $("#currentDate").text(currentDate);
    $("#thumbsDown").on("click", goodDay);
    $("#thumbsUp").on("click", goodDay);
    $(".reasonWhy").on("click", reasonWhy);

    //-----------------------------------goodDay start-----------------------------------
    //this is what determines the message and options the user sees after determining if it was a good or bad day
    function goodDay() {
        $("#thumbsUp").hide();
        $("#thumbsDown").hide();
        $("#reasons").addClass("show");
        $("#reasons").removeClass("hidden");

        const userAnswer = $(this).attr("id");
        dayCounter++;
        var currentDayTic = new dailyData();

        if (userAnswer === "thumbsUp") {
            $("#hey-there").text("nice!");
            $("#message").text("Why did you have a good day?");
        } else {
            $("#hey-there").text("ahh bummer!");
            $("#message").text("Why did you have a bad day?");
        }
        currentDayTic.status = userAnswer;
        currentDayTic.day = dayCounter;
        currentDayTic.date = currentDate;
        console.log(currentDayTic);

        userArray.push(currentDayTic);
    }

    //-----------------------------------goodDay end-----------------------------------
    //----------------------------------- Reason Why start-----------------------------------
    function reasonWhy() {
        let currentDayTic = userArray[dayCounter - 1];
        console.log(currentDayTic);

        const userReason = $(this).attr("id");
        console.log(userReason);
        currentDayTic.reason = userReason;
        console.log(currentDayTic);
        $("#stats").addClass("show");
        $("#stats").removeClass("hidden");
        $("#reasons").removeClass("show");
        $("#reasons").addClass("hidden");
        $("#headers").addClass("hidden");
    }

    //-----------------------------------Reason Why end-----------------------------------

    //----------------------------------- Restart start-----------------------------------
    //----------------------------------- Restart end-----------------------------------
});