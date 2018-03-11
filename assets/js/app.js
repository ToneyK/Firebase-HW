var config = {
	apiKey: "AIzaSyAHrDVKsDDjuqpCiCR88XS1GCNkA_wII8s",
	authDomain: "fir-hw-becd3.firebaseapp.com",
	databaseURL: "https://fir-hw-becd3.firebaseio.com",
	projectId: "fir-hw-becd3",
	storageBucket: "",
	messagingSenderId: "906133612796"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(child) {

    var name = child.val().name;
    var destination = child.val().destination;
    var firstTrain = child.val().firstTrain;
    var frequency = child.val().frequency;
    var min = child.val().min;
    var next = child.val().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});
database.ref().on("value", function(snapshot) {
});
$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    if (trainName == "") {
        alert('Please add the name of the train.');
        return false;
    }
    if (destination == "") {
        alert('Please add the destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Please add the first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Please add a frequency');
        return false;
    }

    // THE MATH
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    return false;
});
