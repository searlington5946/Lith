var currentLith;
var globalIndex;

function saveLiths() {

    localStorage.setItem("liths", JSON.stringify(liths));

}

function loadLiths() {

    liths = JSON.parse(localStorage.getItem("liths"));

    if (liths != null) {

        populateTaskList();

    } else {

        // storage is empty
        liths = [];

    }

}

function deleteLith() {

    liths.splice(globalIndex, 1);
    saveLiths();

}

function recordCompletedLiths() {

    currentLith.complete = 0;

    $("#lith-form").children().each(function () {
        if ($(this).hasClass("ui-flipswitch-active")) { currentLith.complete += 1; }
    });

    saveLiths();

}

function createTask() {

    taskNameStr = $("#text-title").val().toString();
    if (taskNameStr.length == 0) {
        alert("Must create a title name...");
        $("#create-button").attr("href", "#");
        return -1;
    }

    amnt = $("#number-amount").val();
    amntStr = amnt.toString();
    if (amnt <= 0) {
        alert("Must create a positive amount of liths...");
        $("#create-button").attr("href", "#");
        return -1;
    }

    $("#create-button").attr("href", "#main-page");

    var newLith = {

        title: taskNameStr,
        total: amnt,
        complete: 0

    };

    liths.push(newLith);

    populateTaskList();
    populateTaskView();

    saveLiths();

}

function populateTaskView() {

    if (liths.length == 0 || currentLith == null) {
        return 0;
    }

    $("#task-title").html(currentLith.title);

    lithListStr = "";
    $("#lith-form").html("");

    for (var i = 1; i <= currentLith.total; i++) {

        lithListStr = "<input data-role=\"flipswitch\" name=\"flip-checkbox-" + i + "\" id=\"flip-checkbox-" + i + "\" type=\"checkbox\">";
        $("#lith-form").append(lithListStr);

    }

    $("#lith-form").trigger('create'); 

    var counter = 0;
    $("#lith-form").children().each(function () {
        if (counter == currentLith.complete) {
            return false;
        }
        $(this).addClass("ui-flipswitch-active");
        counter += 1;
    });

}

function updateCurrentLith(idx) {

    currentLith = liths[idx];
    populateTaskView();

}

function populateTaskList() {

    $("#liths-list").html(""); // reset list

    if (liths.length == 0) {
        $("#liths-list").html("<center>You don't have any tasks. Create some!</center>");
    }

    loadSettings();

    for (var i = 0; i < liths.length; i++) {

        if (ratioEnabled) {
            amntStr = liths[i].complete.toString() + "/" + liths[i].total.toString();
        } else {
            decimal = liths[i].complete / liths[i].total;
            percent = Math.round(decimal * 100);
            amntStr = percent.toString() + "%";
        }

        listStr = "<li>";
        listStr += "<a href=\"#task-page\">";
        listStr += liths[i].title;
        listStr += "<span class=\"ui-li-count\">";
        listStr += amntStr;
        listStr += "</span></a></li>";

        $("#liths-list").append(listStr);
        $("#liths-list").listview("refresh");

    }

    $("#liths-list").children("li").on('click', function () {

        var idx = $(this).index();
        globalIndex = idx;
        updateCurrentLith(idx);

    })

}