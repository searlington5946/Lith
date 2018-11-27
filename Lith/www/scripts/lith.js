var currentTask;
var globalIndex;

function resetSystem() {

    // nuke everything

    if (confirm("Are you sure you want to delete everything?")) {

        liths = [];
        currentTask = null;
        globalIndex = null;
        populateTaskList();
        populateTaskView();
        saveTasks();

    }

}

function setCurrentTask(idx) {

    currentTask = liths[idx];
    populateTaskView();

}

function saveTasks() {

    localStorage.setItem("liths", JSON.stringify(liths));

}

function loadTasks() {

    liths = JSON.parse(localStorage.getItem("liths"));

    if (liths != null) {

        populateTaskList();

    } else {

        // storage is empty
        liths = [];

    }

}

function deleteTask() {

    if (confirm("Are you sure you want to delete this task?")) {

        liths.splice(globalIndex, 1);
        saveTasks();

    }

}

function recordCompletedLiths() {

    currentTask.complete = 0;

    $("#lith-form").children().each(function () {
        if ($(this).hasClass("ui-flipswitch-active")) { currentTask.complete += 1; }
    });

    saveTasks();

}

function createTask() {

    taskNameStr = $("#text-title").val().toString();
    if (taskNameStr.length == 0) {
        alert("Must create a title name...");
        // disable create button
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

    // allow create button to take us back to the main page
    $("#create-button").attr("href", "#main-page");

    var newLith = {

        title: taskNameStr,
        total: amnt,
        complete: 0

    };

    liths.push(newLith);

    populateTaskList();
    populateTaskView();
    saveTasks();

}

function populateTaskView() {

    if (liths.length == 0 || currentTask == null) {
        return 0;
    }

    $("#task-title").html(currentTask.title);

    lithListStr = "";
    $("#lith-form").html("");

    for (var i = 1; i <= currentTask.total; i++) {

        lithListStr = "<input data-role=\"flipswitch\" name=\"flip-checkbox-" + i + "\" id=\"flip-checkbox-" + i + "\" type=\"checkbox\">";
        $("#lith-form").append(lithListStr);

    }

    $("#lith-form").trigger('create'); 

    // turn on the correct number of liths
    var counter = 0;
    $("#lith-form").children().each(function () {
        if (counter == currentTask.complete) {
            return false;
        }
        $(this).addClass("ui-flipswitch-active");
        counter += 1;
    });

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
        $("#liths-list").listview("refresh"); // we have to call refresh to get the jQuery Mobile classes

    }

    // store the recently clicked task in a global variable
    $("#liths-list").children("li").on('click', function () {

        var idx = $(this).index();
        globalIndex = idx;
        setCurrentTask(idx);

    })

}