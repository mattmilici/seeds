$(document).ready(function() {
    var userArray = [];
    let dayCounter = 0;

    //constructor for user inputs based off how their day was
    const statsobject = {
        totalGoodDays: "",
        percentOfGoodDays: "",
        mostCommonBadDayReason: "",
        mostCommonGoodDayReaso: "",
    };

    //constructor for user inputs based off how their day was
    function dailyData(day, date, status, reason) {
        this.day = day;
        this.date = date;
        this.status = status;
        this.reason = reason;
    }

    //sets the current date on screen
    const currentDate = moment().format("MM/DD/YYYY");
    $("#questionSection").show();
    $("#reasons").hide();
    $("#stats").hide();

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
        $("#reasons").show();

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
        userArray.push(currentDayTic);
    }

    //-----------------------------------goodDay end-----------------------------------
    //----------------------------------- Reason Why start-----------------------------------
    function reasonWhy() {
        let currentDayTic = userArray[dayCounter - 1];
        const userReason = $(this).attr("id");
        currentDayTic.reason = userReason;
        $("#stats").show();
        $("#reasons").hide();
        $("#questionSection").hide();

        let goodDayCounter = 0;
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].status === "thumbsUp") {
                console.log(userArray[i].status);
                goodDayCounter++;
            }
            statsobject.totalGoodDays = goodDayCounter;
            $("#goodDayCounter").text(statsobject.totalGoodDays);
            PercentageOfGoodDays();
            statusArray();
        }
        // console.log(userArray);
    }
    //-----------------------------------Reason Why end-----------------------------------
    //-----------------------------------Percent of good days start-----------------------------------
    function PercentageOfGoodDays() {
        let numerator = parseInt($("#goodDayCounter").text());
        let percentCalc = Math.floor((numerator / userArray.length) * 100);
        statsobject.percentOfGoodDays = percentCalc;
        $("#goodDayPercent").text(statsobject.percentOfGoodDays);
    }
    //-----------------------------------Percent of good days end-----------------------------------
    //-----------------------------------Most Common Cause of a good day start-----------------------------------
    function statusArray() {
        var goodDayArray = userArray.filter(function(array) {
            return array.status === "thumbsUp";
        });
        var badDayArray = userArray.filter(function(array) {
            return array.status === "thumbsDown";
        });
        console.log(goodDayArray);

        const mostCommonGoodDayReason = function() {
            for (let i = 0; i < goodDayArray.length; i++) {
                let goodDayReasons = [];
                goodDayReasons.push(goodDayArray[i].reason);
            }
        };
    }
    //-----------------------------------Most Common Cause of a good day end-----------------------------------
    //----------------------------------- Restart start-----------------------------------
    $("#replay").on("click", restart);

    function restart() {
        $("#stats").hide();
        $("#thumbsUp").show();
        $("#thumbsDown").show();
        $("#questionSection").show();
    }
    //----------------------------------- Restart end-----------------------------------
});