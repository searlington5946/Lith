var currentTask;
var globalIndex;
var tasks = [];

function resetSystem() {

    // nuke everything

    if (confirm("Are you sure you want to delete everything?")) {

        tasks = [];
        currentTask = null;
        globalIndex = null;
        percentageEnabled = false;
        ratioEnabled = true;
        populateTaskList();
        populateTaskView();
        saveTasks();
        saveSettings();

        $("#ratio-radio").prop('checked', ratioEnabled).checkboxradio('refresh');
        $("#percentage-radio").prop('checked', percentageEnabled).checkboxradio('refresh');

    }

}

function setCurrentTask(idx) {

    currentTask = tasks[idx];
    populateTaskView();

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks != null) {

        populateTaskList();

    } else {

        // storage is empty
        tasks = [];

    }

}

function deleteTask() {

    if (confirm("Are you sure you want to delete this task?")) {

        tasks.splice(globalIndex, 1);
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

    var newTask = {

        title: taskNameStr,
        total: amnt,
        complete: 0

    };

    tasks.push(newTask);

    populateTaskList();
    populateTaskView();
    saveTasks();

}

function populateTaskView() {

    if (tasks.length == 0 || currentTask == null) {
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

    $("#tasks-list").html(""); // reset list

    if (tasks.length == 0) {
        $("#tasks-list").html("<center>You don't have any tasks. Create some!</center>");
    }

    loadSettings();

    for (var i = 0; i < tasks.length; i++) {

        if (ratioEnabled) {
            amntStr = tasks[i].complete.toString() + "/" + tasks[i].total.toString();
        } else {
            decimal = tasks[i].complete / tasks[i].total;
            percent = Math.round(decimal * 100);
            amntStr = percent.toString() + "%";
        }

        listStr = "<li>";
        listStr += "<a href=\"#task-page\">";
        listStr += tasks[i].title;
        listStr += "<span class=\"ui-li-count\">";
        listStr += amntStr;
        listStr += "</span></a></li>";

        $("#tasks-list").append(listStr);
        $("#tasks-list").listview("refresh"); // we have to call refresh to get the jQuery Mobile classes

    }

    // store the recently clicked task in a global variable
    $("#tasks-list").children("li").on('click', function () {

        var idx = $(this).index();
        globalIndex = idx;
        setCurrentTask(idx);

    })

}