/* coded by Lovro Selic , C00lSch00l 2016, 2017

*/

var PRG = {
	VERSION: "2.00.03b",
	NAME: "GroupMaker",
	INIT: function() {
		console.clear();
		console.log(
			PRG.NAME + " " + PRG.VERSION + " by Lovro Selic, (c) C00lSch00l 2016, 2017"
		);
		$("#title").html(PRG.NAME);
		$("#version").html(
			PRG.NAME +
				" V " +
				PRG.VERSION +
				" <span style='font-size:14px'>&copy</span> C00lSch00l 2016, 2017"
		);
	}
};
var CONST = {
	SPACE: "\u0020",
	NBS: "&nbsp",
	NEWLINE: "\n",
	MAXNOGROUPS: 3,
	MING: 2,
	MAXG: 5,
	MAXP: 25
};
var COLOR = ["red", "blue", "green", "white", "black", "purple"];

var Inputs = {
	validate: function(id, min, max, def) {
		$("#" + id).focusout(function() {
			var temp = $(this).val();
			$(this).val(validateInput(temp, min, max, 4));
		});

		function validateInput(set, min, max, def) {
			if (isNaN(set)) return def;
			if (set < min) return min;
			if (set > max) return max;
			return set;
		}
	}
};

var Participant = function(name) {
	this.name = name;
	this.history = [];
};
var Participants = {
	printArrays: function(array, level) {
		var toPrint;
		for (var g = 0; g < array.length; g++) {
			for (var h = 0; h < array[g].length; h++) {
				var ID = "#LVL" + level + "GR";
				var gg = g + 1;
				ID += gg;
				toPrint = array[g][h];
				$(ID + " ul").append("<li>" + toPrint + "</li>");
			}
		}
	},
	extractSpread: function(level) {
		var array = Participants["level" + level + "group"];
		var copy = [];
		var selected;
		for (var w = 0; w < array[0].length; w++) {
			for (var q = 0; q < array.length; q++) {
				selected = array[q][w];
				if (selected !== undefined) {
					copy.push(selected);
				}
			}
		}
		return copy;
	},
	checkHistory: function(level, Q, W, name) {
		var history = Participants["level" + level + "group"][Q][W].history;
		var LN = history.length;
		var count = 0;
		for (var x = 0; x < LN; x++) {
			if (history[x] === name) count++;
		}
		return count;
	},
	groupHistory: function(level, Q, name) {
		var LN = Participants["level" + level + "group"][Q].length;
		var count = 0;
		for (var x = 0; x < LN; x++) {
			count += Participants.checkHistory(level, Q, x, name);
		}
		return count;
	},
	levelHistory: function(level, name) {
		var LN = Participants["level" + level + "group"].length;
		var report = [];
		for (var x = 0; x < LN; x++) {
			report.push(Participants.groupHistory(level, x, name));
		}
		return report;
	},
	groupSpace: function(level) {
		var LN = Participants["level" + level + "group"].length;
		var report = [];
		for (var x = 0; x < LN; x++) {
			report.push(Participants["level" + level + "group"][x].length);
		}
		return report;
	},
	clearArrays: function(array) {
		for (var g = 0; g < array.length; g++) {
			for (var h = 0; h < array[g].length; ) {
				array[g].splice(h, 1);
			}
		}
	},
	updateHistory: function(level) {
		var array = Participants["level" + level + "group"];
		for (var q = 0; q < array.length; q++) {
			for (var w = 0; w < array[q].length; w++) {
				for (var z = 0; z < array[q].length; z++) {
					if (z != w) array[q][w].history.push(array[q][z].name);
				}
			}
		}
	},
	firstSpace: function(level) {
		var space = Participants.groupSpace(level);
		var PPG = Math.ceil(Participants.num / Participants["GL" + level]);
		for (var t = 0; t < space.length; t++) {
			space[t] = PPG - space[t];
		}
		for (var q = 0; q < space.length; q++) {
			if (space[q] > 0) return q;
		}
		return false; //ERROR
	},
	sieve: function(level, candidate) {
		var history = Participants.levelHistory(level, candidate.name);
		var PPG = Math.ceil(Participants.num / Participants["GL" + level]);
		var space = Participants.groupSpace(level);
		var firstFree;
		var start = 0;
		var cont = true;
		var safety = 0;
		while (cont) {
			firstFree = history.indexOf(0, start);
			if (firstFree < 0) {
				firstFree = getMIN(history);
			}
			if (space[firstFree] >= PPG) {
				start = firstFree + 1;
				safety++;
				if (safety > 8) {
					firstFree = Participants.firstSpace(level);
					cont = false;
				}
			} else cont = false;
		}
		var chosen = firstFree;
		return chosen;
		
		function getMIN(arry) {
			var LN = arry.length;
			var index = 0;
			for (var z = 1; z < LN; z++) {
				if (arry[z] < arry[z - 1]) index = z;
			}
			return index;
		}
	},
	groupToArray: function(level) {
		var group = Participants["level" + level + "group"];
		var array = Participants["level" + level + "array"];
		Participants.clearArrays(array);
		for (var q = 0; q < group.length; q++) {
			array[q] = [];
			for (var w = 0; w < group[q].length; w++) {
				array[q][w] =
					"<span class='' style='color:" +
					group[q][w].name.split(" ")[0] +
					" '>" +
					group[q][w].name.toUpperCase() +
					"</span>";
			}
		}
	},
	level: function(level) {
		var lengths = Participants.groupSpace(level);
		var diffs = [];
		var LN = lengths.length;
		for (var q = 1; q < LN; q++) {
			diffs.push(lengths[q] - lengths[q - 1]);
		}
		var test = -1;
		var cache;
		for (var w = 0; w < diffs.length; w++) {
			if (diffs[w] < -1) {
				test = w + 1;	
				cache = diffs[w];
			} 
		}
		if (test < 0) return; 
		var moved = Participants["level" + level + "group"][test - 1].pop();
		Participants["level" + level + "group"][test].push(moved);
		if (cache < -2){
			var moved2 = Participants["level" + level + "group"][test - 2].splice(1,1)[0];
			Participants["level" + level + "group"][test].push(moved2);
		}
	}
};

/****************/
function makeGroups() {
	console.log("Making groups ....");
	$("#board").html("");
	Participants.GL1 = parseFloat($("#group1").val());
	Participants.GL2 = parseFloat($("#group2").val());
	Participants.GL3 = parseFloat($("#group3").val());
	$("#board").append("<br/><hr>");
	$("#board").append("<div id='LVL1' class='cb'></div>");
	$("#board").append("<br/><hr class='cb'>");
	$("#board").append("<div id='LVL2' class='cb'></div>");
	$("#board").append("<br/><hr class='cb'>");
	$("#board").append("<div id='LVL3' class='cb'></div>");
	$("#board").append("<br/><hr class='cb'>");

	for (var y = 1; y <= CONST.MAXNOGROUPS; y++) {
		Participants["level" + y + "array"] = [];
		Participants["level" + y + "group"] = [];
		var max = Participants["GL" + y];
		for (var x = 1; x <= max; x++) {
			Participants["level" + y + "array"][x - 1] = [];
			Participants["level" + y + "group"][x - 1] = [];
			var levelId = "LVL" + y;
			var tempId = levelId + "GR" + x;
			$("#" + levelId).append("<div id='" + tempId + "' class='group'></div>");
			$("#" + tempId).append("<h4>Level " + y + " Group " + x + "</h4>");
			$("#" + tempId).append(
				"<ul id='sortable_L" + y + "G" + x + "' class='sort" + y + "'></ul>"
			);
			var con = ".sort" + y;

			$("#sortable_L" + y + "G" + x).sortable({
				connectWith: con
			});
		}
	}

	//LEVEL1
	var num = parseInt($("#number").val(), 10);
	Participants.num = num;
	var PPG1 = Math.ceil(num / Participants.GL1);
	var tempCC;
	var G = 0;
	var CNT = 1;

	for (var xx = 0; xx < num; xx++) {
		tempCC = COLOR[G] + " " + CNT;
		var appendix =
			"<span class='' style='color:" +
			COLOR[G] +
			" '>" +
			tempCC.toUpperCase() +
			"</span>";
		Participants.level1array[G].push(appendix);
		Participants.level1group[G].push(new Participant(tempCC));
		G++;
		if (G > Participants.GL1 - 1) {
			G = 0;
			CNT++;
		}
	}

	Participants.printArrays(Participants.level1array, 1);
	Participants.updateHistory(1);

	for (var LVL = 2; LVL <= CONST.MAXNOGROUPS; LVL++) {
		var newArray = Participants.extractSpread(LVL - 1);
		Participants["level" + LVL + "group"][0].push(newArray.shift());

		while (newArray.length > 0) {
			var candidate = newArray.shift();
			Participants["level" + LVL + "group"][
				Participants.sieve(LVL, candidate)
			].push(candidate);
		}
		
		Participants.level(LVL);
		Participants.groupToArray(LVL);
		Participants.printArrays(Participants["level" + LVL + "array"], LVL);
		Participants.updateHistory(LVL);
	}

	console.log(PRG.NAME, " ENDED");
	return;
}
/********************/

$(document).ready(function() {
	PRG.INIT();
	Inputs.validate("group1", CONST.MING, CONST.MAXG, 5);
	Inputs.validate("group2", CONST.MING, CONST.MAXG, 4);
	Inputs.validate("group3", CONST.MING, CONST.MAXG, 4);
	Inputs.validate("number", 6, CONST.MAXP, 20);

	$("#number").focusout(function() {
		var howMany = parseInt($("#number").val(), 10);
		var iPPG = Math.round(Math.sqrt(howMany));
		var setPoint = Math.round(howMany / iPPG);
		//overrrides
		if (howMany === 7) setPoint = 3;
		if (howMany === 13) setPoint = 4;
	
		$("#group1").val(setPoint);
		$("#group2").val(setPoint);
		$("#group3").val(setPoint);

	});
	$("#group2").focusout(function(){
		if ($("#group3").val() > $("#group2").val()) $("#group3").val($("#group2").val());
	});
	$("#group3").focusout(function(){
		if ($("#group3").val() > $("#group2").val()) $("#group3").val($("#group2").val());
	});

	$("#makeGroup").click(makeGroups);
});

function RND(start, end) {
	return Math.floor(Math.random() * (++end - start) + start);
}
