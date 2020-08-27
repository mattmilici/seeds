$(document).ready(function() {
    function dailyData(day, date, status, reason) {
        this.day = day;
        this.date = date;
        this.status = status;
        this.reason = reason;
    }

    var currentDayTic = new dailyData();

    const currentDate = moment().format("MM/DD/YYYY");
    $("#currentDate").text(currentDate);
    $("#thumbsDown").on("click", goodDay);
    $("#thumbsUp").on("click", goodDay);
    $(".reasonWhy").on("click", reasonWhy);

    //-----------------------------------goodDay start-----------------------------------
    //this is what determines the message and options the user sees after determining if it was a good or bad day
    function goodDay() {
        const userAnswer = $(this).attr("id");
        $("#thumbsUp").hide();
        $("#thumbsDown").hide();
        $("#reasons").addClass("show");
        $("#reasons").removeClass("hidden");

        if (userAnswer === "thumbsUp") {
            $("#hey-there").text("nice!");
            $("#message").text("Why did you have a good day?");
        } else {
            $("#hey-there").text("ahh bummer!");
            $("#message").text("Why did you have a bad day?");
        }
        currentDayTic.status = userAnswer;
        currentDayTic.date = currentDate;
        console.log(currentDayTic);
    }

    //-----------------------------------goodDay end-----------------------------------
    //----------------------------------- Reason Why start-----------------------------------
    function reasonWhy() {
        const userReason = $(this).attr("id");
        console.log(userReason);
        currentDayTic.reason = userReason;
        console.log(currentDayTic);
    }

    //-----------------------------------Reason Why end-----------------------------------
});