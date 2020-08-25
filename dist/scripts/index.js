$(document).ready(function() {
    $("#currentDate").text(moment().format("MM/DD/YYYY"));
    $("#thumbsDown").on("click", goodDay);
    $("#thumbsUp").on("click", goodDay);
});

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
}