/////////////////////////////////////////////////////////////////////
/*
 
 to do:

 known bugs: 

    - still, sometimes; are exluded

 */

///////////////////////////////////

var SOLUTION = {
  variant: [],
  subject: [],
  verb: [],
  AOP: [],
  AOT: [],
  clearAll: function() {
    SOLUTION.variant.clear();
    SOLUTION.subject.clear();
    SOLUTION.verb.clear();
    SOLUTION.AOP.clear();
    SOLUTION.AOT.clear();
  }
};

var PRG = {
  VERSION: "1.00",
  NAME: "Grammory",
  INIT: function() {
    console.clear();
    console.log(
      PRG.NAME +
        " " +
        PRG.VERSION +
        " by Mija & Lovro Selic, (c) C00lSch00l 2018 on " +
        navigator.userAgent
    );
    $("#title").html(PRG.NAME + "<sup>&reg</sup>");
    $("#version").html(
      PRG.NAME +
        " V" +
        PRG.VERSION +
        " by Mija & Lovro Selič, <span style='font-size:14px'> &copy</span> C00lSch00l 2018"
    );
    $("input#toggleAbout").val("About " + PRG.NAME);
    $("#about fieldset legend").append(" " + PRG.NAME + " ");
  },
  setup: function() {
    $("#toggleSettings").click(function() {
      $("#settings").toggle(400);
    });
    $("#toggleHelp").click(function() {
      $("#help").toggle(400);
    });
    $("#toggleAbout").click(function() {
      $("#about").toggle(400);
    });
    $("#inputPlayer").focus(function() {
      $("#inputPlayer").val("");
      $("#inputPlayer").removeClass("wait");
      $("#inputPlayer").addClass("select");
      GAME.enter = true;
    });
    $("#addPlayer").click(function() {
      GAME.enter = false;
      if (
        $("#inputPlayer").val() !== "enter player name here" &&
        $("#inputPlayer").val() !== ""
      ) {
        PLAYERS.pool.push(
          new player(
            $("#inputPlayer")
              .val()
              .trimSpace(),
            0
          )
        );
        PLAYERS.display();
      }
      var LN = PLAYERS.pool.length;
      if (LN >= INI.MAX_PLAYERS) {
        $("#addPlayer").prop("disabled", true);
        return;
      }
    });
    $("#startGame").click(function() {
      if (PLAYERS.pool.length === 0) {
        alert("Enroll at least one player.");
      } else if (GAME.enter) {
        console.log("Entered name not enrolled");
        var test = confirm(
          "You have entered a name'" +
            $("#inputPlayer").val() +
            "', but not enrolled it in the game. Do you want to start without '" +
            $("#inputPlayer").val() +
            "'?"
        );
        if (test) GAME.start();
      } else GAME.start();
    });

    $("#nop").html(INI.MAX_PLAYERS);
    PLAYERS.display();

    GAME.select();

    $("#colorAdverb").click(function() {
      console.log("colorAdverb", $("#colorAdverb").prop("checked"));
    });
    $("#comments").click(function() {
      console.log("comments", $("#comments").prop("checked"));
    });

    $("#gameType").click(function() {
      console.log(
        "gameType",
        $("#gameType").val(),
        $("#gameType")
          .find(":selected")
          .text()
      );
    });
  },
  start: function() {
    console.log(PRG.NAME + " started.");
    GAME.enter = false;

    $(document).keypress(function(event) {
      if (event.which === 13) {
        event.preventDefault();
      }
    });
  }
};
///////////////////////////////////////////////////////

var INI = {
  MAX_PLAYERS: 6
};
class player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
var PLAYERS = {
  pool: [],
  board: [],
  sort: function() {
    var newPool = [];
    var oldPool = [].concat(PLAYERS.pool);
    var i, score, maxI;
    var PL = oldPool.length;
    while (PL > 0) {
      score = 0;
      maxI = 0;
      for (i = 0; i < PL; i++) {
        if (oldPool[i].score > score) {
          score = oldPool[i].score;
          maxI = i;
        }
      }
      newPool.push(oldPool.splice(maxI, 1)[0]);
      PL = oldPool.length;
    }
    PLAYERS.board = [].concat(newPool);
  },
  display: function() {
    PLAYERS.sort();
    var LN = PLAYERS.board.length;
    var html =
      "<p><strong>Players (" + LN + "/" + INI.MAX_PLAYERS + "):</strong></p>";
    for (var x = 0; x < LN; x++) {
      html +=
        "<p>" +
        (x + 1) +
        ". " +
        PLAYERS.board[x].name +
        ": " +
        PLAYERS.board[x].score +
        "</p>";
    }
    $("#players_inner").html(html);
  }
};
var GAME = {
  scoring: [5, 3, 1],
  grid: function() {
    var w = $("#game").width();
    var h = $("#game").height();
    $("#overCanvas").width(w);
    $("#overCanvas").height(h);
    $("#outer").height(h);
    var CTX = $("#overCanvas")[0].getContext("2d");
    CTX.canvas.width = w;
    CTX.canvas.height = h;
    CTX.font = "12px Times";
    CTX.fillStyle = "#111";
    CTX.color = "#111";
    var alpha = ["A", "B", "C", "D", "E", "F"];
    var init = 22 + 72;
    var offset = 159;
    var X, Y;
    for (var x = 0; x < alpha.length; x++) {
      CTX.fillText(alpha[x], init + x * offset, 12);
    }
    init += 8;
    for (var y = 1; y <= 4; y++) {
      CTX.fillText(y.toString(), 12, init + (y - 1) * offset);
    }
  },
  over: function() {
    console.log("GAME OVER");
    $("#what").html(
      "<strong>THE GAME IS OVER. Press 'F5' or reload page to restart.</strong>"
    );
    GAME.ended = true;
  },
  start: function() {
    GAME.turn = 1;
    GAME.ended = false;
    GAME.comb = GAME.type[$("#gameType").val()].comb;
    GAME.tileStack = [];
    GAME.stack = [];
    PLAYERS.index = -1;
    PLAYERS.pool.shuffle();
    $("#playerInput").hide();
    $("#settings").hide();
    $("#startGame").prop("disabled", true);
    $("#toggleSettings").prop("disabled", true);

    $("#game").on("click", ".tile", function() {
      var clicked = $(this);
      GAME.onClick(clicked);
    });
    $("#comm").on("click", "#next", function() {
      GAME.nextPlayer();
    });
    //submitSolution
    $("#comm").on("click", "#submitSolution", function() {
      $("#attempt").html(GAME.attempt);
      var inSolORG = $("#solution").val();
      var inSol = inSolORG.toLowerCase().trimSpace();
      console.log(GAME.attempt, "input: ", inSol);
      if (SOLUTION.variant.indexOf(inSol) > -1) {
        console.log("CORRECT answer");
        GAME.hideTiles();
        $("#do").html(
          "You have found a <span style='color: blue'>CORRECT</span> solution. You get " +
            GAME.scoring[GAME.attempt - 1] +
            " points for solution and 1 point for matching tiles."
        );
        GAME.NPB();
        $("#game").off("click", ".tile");
        $("#submitSolution").remove();
        $("#replace").html(" " + inSolORG + " ");
        PLAYERS.pool[PLAYERS.index].score += GAME.scoring[GAME.attempt - 1] + 1;
        PLAYERS.display();
      } else {
        console.log("WRONG answer");

        $("#do").html(
          "<span style='color:red'>WRONG!</span> Try again, you have " +
            (3 - GAME.attempt) +
            " more tries."
        );
        //add message about period
        var isPeriod = inSol.indexOf(".");
        console.log("isPeriod", isPeriod);
        if (isPeriod < 0) {
          var almost = inSol + ".";
          if (SOLUTION.variant.indexOf(almost) > -1) {
            $("#do").html(
              "<span style='color:red'>WRONG!</span> It might be correct if you add the period. You have " +
                (3 - GAME.attempt) +
                " more tries."
            );
          } else {
            $("#do").html(
              "<span style='color:red'>WRONG!</span> Mind the punctuation. You have " +
                (3 - GAME.attempt) +
                " more tries."
            );
          }
        }
        //
        GAME.attempt++;
        if (GAME.attempt > 3) {
          $("#do").html(
            "Still wrong. You get 1 point for finding matching tiles"
          );
          GAME.NPB();
          $("#game").off("click", ".tile");
          $("#submitSolution").remove();
          $("#attemptContainer").remove();
          $("#replace").remove();
          PLAYERS.pool[PLAYERS.index].score += 1;
          PLAYERS.display();
        }
        $("#attempt").html(GAME.attempt);
      }
      ////////////
    });
    var tile;
    var NTiles = GAME.type[$("#gameType").val()].tiles;
    GAME.remaining = NTiles;
    console.log("tiles: ", NTiles);
    var sets = NTiles / GAME.type[$("#gameType").val()].comb;
    console.log("sets: ", sets);

    ///formation
    var formedSubjects = SUBJECT.form(sets);
    //console.log("formed subjects: ", formedSubjects);
    var formedVerbs = VERB.form(sets);
    //console.log("formed verbs: ", formedVerbs);
    var formedAdverbsPlace = ADVERB.place.form(sets);
    //console.log("formed formedAdverbsPlace: ", formedAdverbsPlace);
    var formedAdverbsTime = ADVERB.time.form(sets);
    //console.log("formed formedAdverbsTime: ", formedAdverbsTime);
    //formation END
    GAME.Set = []
      .concat(formedSubjects)
      .concat(formedVerbs)
      .concat(formedAdverbsTime);
    if (parseInt($("#gameType").val(), 10) === 2)
      GAME.Set = GAME.Set.concat(formedAdverbsPlace);
    GAME.Set.shuffle();
    console.log("Set", GAME.Set);

    for (var x = 0; x < NTiles; x++) {
      tile = "<div class='tile back' id = 'TILE_" + x + "'></div>";
      $("#game").append(tile);
    }

    GAME.grid();

    GAME.nextPlayer();
    GAME.displayComm();
    GAME.updateComm();
    $("#comm")[0].scrollIntoView();
    $("#do").html("Select next tile.");
  },
  NPB: function() {
    if (GAME.ended) return;
    var NPI = PLAYERS.index + 1;
    if (NPI >= PLAYERS.pool.length) NPI = 0;
    $("#comm").append(
      "<input type='button' id='next' value='Next player: " +
        PLAYERS.pool[NPI].name +
        "'>"
    );
  },
  nextPlayer: function() {
    PLAYERS.index++;
    if (PLAYERS.index >= PLAYERS.pool.length) {
      PLAYERS.index = 0;
      GAME.turn++;
    }

    $("#game").on("click", ".tile", function() {
      var clicked = $(this);
      GAME.onClick(clicked);
    });

    GAME.stack.clear();
    GAME.updateComm();
    $("#what").html("");
    GAME.returnTiles();
    $("#next").remove();
    $("#attemptContainer").remove();
  },
  returnTiles: function() {
    var LN = GAME.tileStack.length;
    if (LN === 0) return;
    for (var q = 0; q < LN; q++) {
      $(GAME.tileStack[q]).removeClass("face");
      $(GAME.tileStack[q]).addClass("back");
      $(GAME.tileStack[q]).html("");
    }
    GAME.tileStack.clear();
  },
  hideTiles: function() {
    var LN = GAME.tileStack.length;
    if (LN === 0) return;
    for (var q = 0; q < LN; q++) {
      $(GAME.tileStack[q]).html("");
      $(GAME.tileStack[q]).removeClass("face");
      $(GAME.tileStack[q]).addClass("guessed");
      $(GAME.tileStack[q]).animate({ opacity: 0.1 }, 1000);
      GAME.remaining--;
    }
    GAME.tileStack.clear();
    if (GAME.remaining === 0) {
      GAME.over();
    }
  },
  displayComm: function() {
    $("#comm").append(
      "<p>Turn: <span id ='turn'></span></p><p>Player: <strong><span id = 'player_name'></span></strong></p>"
    );
    $("#comm").append("<p id='what'></p>");
    $("#comm").append("<p id='do'></p>");

    if ($("#comments").prop("checked")) {
      $("#what").show();
    } else $("#what").hide();
  },
  updateComm: function() {
    $("#player_name").html(PLAYERS.pool[PLAYERS.index].name.toUpperCase());
    $("#turn").html(GAME.turn);
    $("#do").html("Select next tile.");
  },
  type: {
    1: {
      title: "Who  - do what - when",
      tiles: 24,
      comb: 3
    },
    2: {
      title: "Who  - do what - where - when",
      tiles: 24,
      comb: 4
    }
  },
  select: function() {
    for (var q in GAME.type) {
      var html =
        "<option value = '" + q + "'>" + GAME.type[q].title + "</option>";
      $("#gameType").append(html);
    }
  },
  evalSolution: function() {
    SOLUTION.clearAll();
    var verbChunk;
    var AOT = GAME.findPOS("adverb of time");
    var AOP = GAME.findPOS("adverb of place");
    var SUBI = GAME.findPOS("subject");
    var VERBI = GAME.findPOS("verb");
    var LN, i, temp;
    var time = GAME.stack[AOT].time;
    if (GAME.stack[AOT].subType) time += " " + GAME.stack[AOT].subType;
    SOLUTION.time = time;
    SOLUTION.position = GAME.stack[AOT].position;
    SOLUTION.subject.push(GAME.stack[SUBI].value);
    SOLUTION.AOT.push(GAME.stack[AOT].value);
    if (AOP > -1) {
      temp = "";
      if (GAME.stack[AOP].moves && GAME.stack[VERBI].moves) {
        for (var q = 0; q < GAME.stack[AOP].movePrep.length; q++) {
          for (var w = 0; w < GAME.stack[AOP].articles.length; w++) {
            temp =
              GAME.stack[AOP].movePrep[q] +
              " " +
              GAME.stack[AOP].articles[w] +
              " " +
              GAME.stack[AOP].value;
            temp = temp.trimSpace();
            SOLUTION.AOP.push(temp);
          }
        }
      } else {
        var join = [];
        for (var a = 0; a < GAME.stack[VERBI].prep.length; a++) {
          if (GAME.stack[AOP].prep.indexOf(GAME.stack[VERBI].prep[a]) > -1) {
            join.push(GAME.stack[VERBI].prep[a]);
          }
        }
        for (var qq = 0; qq < join.length; qq++) {
          for (var ww = 0; ww < GAME.stack[AOP].articles.length; ww++) {
            temp =
              join[qq] +
              " " +
              GAME.stack[AOP].articles[ww] +
              " " +
              GAME.stack[AOP].value;
            temp = temp.trimSpace();
            SOLUTION.AOP.push(temp);
          }
        }
      }
    }
    switch (time) {
      case "past simple":
        console.log("solving past simple");
        if (GAME.stack[VERBI].fixedObject) {
          if (GAME.stack[VERBI].articles) {
            LN = GAME.stack[VERBI].articles.length;
            for (i = 0; i < LN; i++) {
              SOLUTION.verb.push(
                GAME.stack[VERBI].past +
                  " " +
                  GAME.stack[VERBI].articles[i] +
                  " " +
                  GAME.stack[VERBI].fixedObject
              );
            }
          } else {
            SOLUTION.verb.push(
              GAME.stack[VERBI].past + " " + GAME.stack[VERBI].fixedObject
            );
          }
        } else {
          SOLUTION.verb.push(GAME.stack[VERBI].past);
        }
        break;
      case "past continuous":
        console.log("solving past continuous");
        if (GAME.stack[VERBI].fixedObject) {
          if (GAME.stack[VERBI].articles) {
            LN = GAME.stack[VERBI].articles.length;
            for (i = 0; i < LN; i++) {
              SOLUTION.verb.push(
                GAME.stack[SUBI].was +
                  " " +
                  GAME.stack[VERBI].cont +
                  " " +
                  GAME.stack[VERBI].articles[i] +
                  " " +
                  GAME.stack[VERBI].fixedObject
              );
            }
          } else {
            SOLUTION.verb.push(
              GAME.stack[SUBI].was +
                " " +
                GAME.stack[VERBI].cont +
                " " +
                GAME.stack[VERBI].fixedObject
            );
          }
        } else {
          SOLUTION.verb.push(
            GAME.stack[SUBI].was + " " + GAME.stack[VERBI].cont
          );
        }
        break;
      case "present simple":
        console.log("solving present simple");
        if (GAME.stack[SUBI].person === "s") {
          temp = GAME.stack[VERBI].third;
        } else temp = GAME.stack[VERBI].present;
        if (GAME.stack[VERBI].fixedObject) {
          if (GAME.stack[VERBI].articles) {
            LN = GAME.stack[VERBI].articles.length;
            for (i = 0; i < LN; i++) {
              SOLUTION.verb.push(
                temp +
                  " " +
                  GAME.stack[VERBI].articles[i] +
                  " " +
                  GAME.stack[VERBI].fixedObject
              );
            }
          } else {
            SOLUTION.verb.push(temp + " " + GAME.stack[VERBI].fixedObject);
          }
        } else {
          SOLUTION.verb.push(temp);
        }
        break;
      case "present continuous":
        console.log("solving present continuous");
        if (GAME.stack[VERBI].fixedObject) {
          if (GAME.stack[VERBI].articles) {
            LN = GAME.stack[VERBI].articles.length;
            for (i = 0; i < LN; i++) {
              SOLUTION.verb.push(
                GAME.stack[SUBI].be +
                  " " +
                  GAME.stack[VERBI].cont +
                  " " +
                  GAME.stack[VERBI].articles[i] +
                  " " +
                  GAME.stack[VERBI].fixedObject
              );
            }
          } else {
            SOLUTION.verb.push(
              GAME.stack[SUBI].be +
                " " +
                GAME.stack[VERBI].cont +
                " " +
                GAME.stack[VERBI].fixedObject
            );
          }
        } else {
          SOLUTION.verb.push(
            GAME.stack[SUBI].be + " " + GAME.stack[VERBI].cont
          );
        }
        break;
      case "future":
        console.log("solving future");
        temp = [];
        if (GAME.stack[VERBI].fixedObject) {
          if (GAME.stack[VERBI].articles) {
            LN = GAME.stack[VERBI].articles.length;
            for (i = 0; i < LN; i++) {
              temp.push(
                GAME.stack[VERBI].present +
                  " " +
                  GAME.stack[VERBI].articles[i] +
                  " " +
                  GAME.stack[VERBI].fixedObject
              );
            }
          } else {
            temp.push(
              GAME.stack[VERBI].present + " " + GAME.stack[VERBI].fixedObject
            );
          }
        } else {
          temp.push(GAME.stack[VERBI].present);
        }
        var TL = temp.length;
        for (i = 0; i < TL; i++) {
          SOLUTION.verb.push("will " + temp[i]);
          SOLUTION.verb.push(GAME.stack[SUBI].be + " going to " + temp[i]);
        }
        break;
      default:
        console.log("TIME ERROR");
        break;
    }
    var tempSol, ix, iy;
    switch (SOLUTION.position) {
      case "both":
        console.log("combining for position", SOLUTION.position);
        break;
      case "before":
        console.log("combining for position", SOLUTION.position);
        for (ix = 0; ix < SOLUTION.verb.length; ix++) {
          if (SOLUTION.AOP.length) {
            for (iy = 0; iy < SOLUTION.AOP.length; iy++) {
              tempSol =
                SOLUTION.subject[0] +
                " " +
                SOLUTION.AOT[0] +
                " " +
                SOLUTION.verb[ix] +
                " " +
                SOLUTION.AOP[iy];
              tempSol = tempSol.trimSpace();
              tempSol += "."; //add period
              SOLUTION.variant.push(tempSol.toLowerCase());
            }
          } else {
            tempSol =
              SOLUTION.subject[0] +
              " " +
              SOLUTION.AOT[0] +
              " " +
              SOLUTION.verb[ix];
            tempSol = tempSol.trimSpace();
            tempSol += "."; //add period
            SOLUTION.variant.push(tempSol.toLowerCase());
          }
        }
        break;
      case "after":
      case null:
        console.log("combining for position", SOLUTION.position);
        for (ix = 0; ix < SOLUTION.verb.length; ix++) {
          if (SOLUTION.AOP.length) {
            for (iy = 0; iy < SOLUTION.AOP.length; iy++) {
              tempSol =
                SOLUTION.subject[0] +
                " " +
                SOLUTION.verb[ix] +
                " " +
                SOLUTION.AOP[iy] +
                " " +
                SOLUTION.AOT[0];
              tempSol = tempSol.trimSpace();
              tempSol += "."; //add period
              SOLUTION.variant.push(tempSol.toLowerCase());
            }
          } else {
            tempSol =
              SOLUTION.subject[0] +
              " " +
              SOLUTION.verb[ix] +
              " " +
              SOLUTION.AOT[0];
            tempSol = tempSol.trimSpace();
            tempSol += "."; //add period
            SOLUTION.variant.push(tempSol.toLowerCase());
          }
        }
        break;
      default:
        console.log("combining for position", SOLUTION.position);
        console.log("POSITION ERROR");
        break;
    }
    console.log("SOLUTION variants", SOLUTION.variant);
  },
  findPOS: function(pos) {
    var LN = GAME.stack.length;
    for (var q = 0; q < LN; q++) {
      if (GAME.stack[q].type === pos) return q;
    }
    return -1;
  },
  onClick: function(clicked) {
    if (!$(clicked).hasClass("back")) return;
    var id = $(clicked)[0].id;
    var index = GAME.clickedIndex(id);
    $(clicked).removeClass("back");
    $(clicked).addClass("face");
    var html;
    if ($("#colorAdverb").prop("checked")) {
      var type = GAME.Set[index].type;
      var color;
      console.log("type", type);
      switch (type) {
        case "subject":
          color = "blue";
          break;
        case "verb":
          color = "red";
          break;
        case "adverb of time":
          color = "green";
          break;
        case "adverb of place":
          color = "black";
          break;
        default:
          console.log("colouring parts of speech ERROR");
      }
      html = "<p style='color: " + color + "' >";
    } else html = "<p>";

    html += GAME.Set[index].value;
    if (GAME.Set[index].fixedObject)
      html += "<br/>(" + GAME.Set[index].fixedObject + ")";
    html += "</p>";

    $(clicked).html(html);
    GAME.tileStack.push(clicked);
    GAME.stack.push(GAME.Set[index]);
    $("#what").append(
      "Tile " + GAME.stack.length + ": " + GAME.Set[index].type + "; "
    );
    var check = GAME.typeCheck();
    if (GAME.stack.length === GAME.comb && !check) {
      console.log("Can try solution");
      GAME.attempt = 1;
      $("#do").html(
        "You found required parts of speech. Enter a solution below."
      );
      $("#game").off("click", ".tile");
      $("#comm").append("<span id='attemptContainer'></span>");
      $("#attemptContainer").append("<span id='attempt'></span>. ");
      $("#attempt").html(GAME.attempt);
      $("#attemptContainer").append(
        "<span id='replace'><input type='text' id='solution' value=''></span>"
      );
      $("#comm").append(
        "<input type='button' id='submitSolution' value='Submit solution'>"
      );
      GAME.evalSolution();
    } else if (GAME.stack.length <= GAME.comb && check) {
      console.log("Same type, end turn");
      var txt;
      if ($("#comments").prop("checked")) {
        txt = GAME.Set[index].type;
      } else txt = "of this kind";

      $("#do").html(
        "You have already found one <strong><em>" +
          txt +
          "</em></strong>. Click 'Next player' for next players turn."
      );
      GAME.NPB();
      $("#game").off("click", ".tile");
    } else if (GAME.stack.length < GAME.comb && !check) {
      console.log("Keep clicking");
    } else console.log("Clicking sequence ERROR");
  },
  clickedIndex: function(id) {
    var ix = id.indexOf("_");
    var index = parseInt(id.substr(++ix), 10);
    return index;
  },
  typeCheck: function() {
    var n = GAME.stack.length - 1;
    if (n === 0) return false;
    for (var t = n - 1; t >= 0; t--) {
      if (GAME.stack[t].type === GAME.stack[n].type) return true;
    }
    return false;
  }
};

///////////////////////////////////////////////////////
$(document).ready(function() {
  PRG.INIT();
  PRG.setup();
  PRG.start();
});
