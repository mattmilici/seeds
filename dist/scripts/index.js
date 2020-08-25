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

//google charts start
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["work", 11],
        ["family", 2],
        ["sleep", 2],
        ["diet", 5],
        ["not sure", 2],
    ]);

    var options = {
        title: "",
        pieHole: 0.4,
        pieSliceText: "none",
        backgroundColor: "transparent",
    };

    var chart = new google.visualization.PieChart(
        document.getElementById("donutchart")
    );
    chart.draw(data, options);
}

//google charts end