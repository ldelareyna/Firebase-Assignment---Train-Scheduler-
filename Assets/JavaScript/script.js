$(document).ready(function () {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyALbyJVLc9ccsdFbQYiZptD2L7oWAxWny0",
		authDomain: "train-scheduler-f813e.firebaseapp.com",
		databaseURL: "https://train-scheduler-f813e.firebaseio.com",
		projectId: "train-scheduler-f813e",
		storageBucket: "",
		messagingSenderId: "661838353546"
	};
	firebase.initializeApp(config);

	var database = firebase.database();


	//ADD TRAINS
	$("#add-train-btn").on("click", function (event) {
		event.preventDefault();

		//GET USER INPUT
		var trainName = $("#train-name-input").val().trim();
		var trainDest = $("#dest-input").val().trim();
		var firstTrain = $("#firstTrain-input").val().trim();
		var trainFreq = $("#freq-input").val().trim();

		//TEMP LOCAL OBJECT: TRAIN DATA
		var newTrain = {
			name: trainName,
			destination: trainDest,
			start: firstTrain,
			frequency: trainFreq
		};

		//UPLAOD TRAIN DATA TO DATABASE
		database.ref().push(newTrain);


		//CLEAR TEXT BOX
		$("#train-name-input").val("");
		$("#dest-input").val("");
		$("#firstTrain-input").val("");
		$("#freq-input").val("");
	});

	//FIREBASE: ADD TRAIN TO DATABASE AND A ROW IN HTML WHEN USER ADDS ENTERY 
	database.ref().on("child_added", function (childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());

		//STORE EVERYTHING IN A VARIABLE 
		var trainName = childSnapshot.val().name;
		var trainDest = childSnapshot.val().destination;
		var firstTrain = childSnapshot.val().start;
		var trainFreq = childSnapshot.val().frequency;


		//DECLARE VARIABLE
		var trainFreq;


		var firstTime = 0;

		var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		//CURRENT TIME
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		//DIFFERENCE IN TIME
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		//TIME REMAINDER
		var tRemainder = diffTime % trainFreq;
		console.log(tRemainder);

		//MIN'S TILL TRAIN
		var tMinutesTillTrain = trainFreq - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		//NEXT TRAIN
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


		//ADD TRAIN DATA TO THE TABLE
		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
			"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});