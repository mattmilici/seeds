$(document).ready(function() {
    var userArray = [];
    let dayCounter = 0;

    //constructor for user inputs based off how their day was
    const statsobject = {
        totalGoodDays: "",
        percentOfGoodDays: "",
        currentStreak: "",
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
        currentDayTic.reason = "";
        userArray.unshift(currentDayTic);
    }

    //-----------------------------------goodDay end-----------------------------------
    //----------------------------------- Reason Why start-----------------------------------
    function reasonWhy() {
        const userReason = $(this).attr("id");
        userArray[0].reason = userReason;
        $("#stats").show();
        $("#reasons").hide();
        $("#questionSection").hide();

        let goodDayCounter = 0;
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].status === "thumbsUp") {
                goodDayCounter++;
            }
            statsobject.totalGoodDays = goodDayCounter;
            $("#goodDayCounter").text(statsobject.totalGoodDays);
            PercentageOfGoodDays();
            statusArrayGood();
            statusArrayBad();
            currentStreakLength();
        }
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
    function statusArrayGood() {
        var goodDayArray = userArray.filter(function(array) {
            return array.status === "thumbsUp";
        });

        let mf = 0;
        let m = 0;
        let item;
        for (let i = 0; i < goodDayArray.length; i++) {
            for (let j = i; j < goodDayArray.length; j++) {
                if (goodDayArray[i].reason == goodDayArray[j].reason) m++;
                if (mf < m) {
                    mf = m;
                    item = goodDayArray[i].reason;
                }
            }
            m = 0;
        }
        if (mf !== 0) {
            $("#mostCommonGoodDay").text(
                `Most common reason for having a good day is ${item} (${mf} times)`
            );
        }
    }
    //-----------------------------------Most Common Cause of a good day end-----------------------------------
    //-----------------------------------Most Common Cause of a good day start-----------------------------------
    function statusArrayBad() {
        var badDayArray = userArray.filter(function(array) {
            return array.status === "thumbsDown";
        });
        let mf = 0;
        let m = 0;
        let item;
        for (let i = 0; i < badDayArray.length; i++) {
            for (let j = i; j < badDayArray.length; j++) {
                if (badDayArray[i].reason == badDayArray[j].reason) m++;
                if (mf < m) {
                    mf = m;
                    item = badDayArray[i].reason;
                }
            }
            m = 0;
        }
        if (mf !== 0) {
            $("#mostCommonBadDay").text(
                `Most common reason for having a bad day is ${item} (${mf} times) `
            );
        }
    }
    //-----------------------------------Most Common Cause of a good day end-----------------------------------

    //-----------------------------------Current Streak start----------------------------------
    function currentStreakLength() {
        let currentStreak = 0;
        let result = true;
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].status === "thumbsUp") {
                currentStreak++;
            } else {
                result = false;
                break;
            }
        }
        $("#streakCounter").text(currentStreak);
    }
    //-----------------------------------Current Streak end-----------------------------------
    $("#replay").on("click", restart);

    function restart() {
        $("#stats").hide();
        $("#thumbsUp").show();
        $("#thumbsDown").show();
        $("#questionSection").show();
    }
    //----------------------------------- Restart end-----------------------------------
});