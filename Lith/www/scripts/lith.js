var currentLith = {

    title: "None",
    total: 0,
    complete: 0

};

var globalIndex;

//var liths = [];

function saveLiths() {

    localStorage.setItem("liths", JSON.stringify(liths));

}

function loadLiths() {

    liths = JSON.parse(localStorage.getItem("liths"));

    if (liths != null) {

        populateLithsList();

    } else {

        //alert("Error: no liths found");
        liths = [];

    }

}

function deleteLith() {

    liths.splice(globalIndex, 1);
    saveLiths();

}

function lithsComplete() {

    currentLith.complete = 0;

    $("#lith-form").children().each(function () {
        if ($(this).hasClass("ui-flipswitch-active")) { currentLith.complete += 1; }
    });

    //alert(currentLith.complete);
    saveLiths();

}

function createLith() {

    //alert("Creating Lith...");

    taskNameStr = $("#text-title").val().toString();
    if (taskNameStr.length == 0) {
        alert("Must create a title name...");
        $("#create-button").attr("href", "#"); // pls no bully
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
    //$("#create-button").click();

    var newLith = {

        title: taskNameStr,
        total: amnt,
        complete: 0

    };

    liths.push(newLith);

    populateLithsList();
    populateLithsView();

    saveLiths();

}

function populateLithsView() {

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

    //alert(idx);
    //console.log(liths)
    currentLith = liths[idx];
    populateLithsView();

}

function populateLithsList() {

    $("#liths-list").html(""); // reset list

    loadSettings();

    for (var i = 0; i < liths.length; i++) {

        if (ratioEnabled) {
            amntStr = liths[i].complete.toString() + "/" + liths[i].total.toString();
        } else {
            decimal = liths[i].complete / liths[i].total;
            percent = Math.round(decimal * 100);
            amntStr = percent.toString() + "%";
        }

        //listStr = "<li data-icon=\"delete\">";
        listStr = "<li>";
        listStr += "<a href=\"#task-page\">";
        listStr += liths[i].title;
        listStr += "<span class=\"ui-li-count\">";
        listStr += amntStr;
        listStr += "</span></a></li>";
        
        //console.log(listStr);

        $("#liths-list").append(listStr);
        $("#liths-list").listview("refresh");

    }

    $("#liths-list").children("li").on('click', function () {

        var idx = $(this).index();
        globalIndex = idx;
        updateCurrentLith(idx);

    })

}