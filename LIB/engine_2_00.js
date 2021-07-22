//////////////////engine.js/////////////////////////
//                                                //
//       ENGINE version 2.00  by LS               //
//       cleaned, not backwards compatible        //
//                                                //
//                                                //
////////////////////////////////////////////////////

var ENGINE = {
  VERSION: "2.00",
  CSS: 'color: #0FA',
  INI: {
    ANIMATION_INTERVAL: 17,
    SPRITESHEET_HEIGHT: 48,
    SPRITESHEET_DEFAULT_WIDTH: 48,
    sprite_maxW: 300,
    sprite_maxH: 100,
    GRIDPIX: 48,
    FADE_FRAMES: 30,
    COLLISION_SAFE: 48,
    PATH_ROUNDS: 100
  },
  readyCall: null,
  SOURCE: "/Games/AA/",
  WASM_SOURCE: "/WASM/",
  AUDIO_SOURCE: "/Mp3/",
  FONT_SOURCE: "/Fonts/",
  //SOURCE: "https://www.c00lsch00l.eu/Games/AA/",
  //WASM_SOURCE: "https://www.c00lsch00l.eu/WASM/",
  //AUDIO_SOURCE: "https://www.c00lsch00l.eu/Mp3/",
  //FONT_SOURCE: "https://www.c00lsch00l.eu/Fonts/",
  checkIntersection: false, //use linear intersection collision method after pixelperfect collision; set to false to exclude
  checkProximity: true, //check proximity before pixel perfect evaluation of collision to background
  LOAD_W: 125,
  LOAD_H: 22,
  gameWindowId: "#game",
  gameWIDTH: 960,
  gameHEIGHT: 768,
  sideWIDTH: 960,
  sideHEIGHT: 768,
  titleHEIGHT: 120,
  titleWIDTH: 960,
  bottomHEIGHT: 40,
  bottomWIDTH: 960,
  mapWIDTH: 512,
  statusWIDTH: 312,
  currentTOP: 0,
  currentLEFT: 0,
  directions: [LEFT, UP, RIGHT, DOWN],
  corners: [
    new Vector(-1, -1),
    new Vector(1, -1),
    new Vector(-1, 1),
    new Vector(1, 1)
  ],
  layersToClear: new Set(),
  disableKey: function(key) {
    $(document).keypress(function(event) {
      if (event.which === ENGINE.KEY.map[key]) {
        event.preventDefault();
      }
    });
    $(document).keydown(function(event) {
      if (event.which === ENGINE.KEY.map[key]) {
        event.preventDefault();
      }
    });
    $(document).keyup(function(event) {
      if (event.which === ENGINE.KEY.map[key]) {
        event.preventDefault();
      }
    });
  },
  disableArrows: function() {
    ENGINE.disableKey("up");
    ENGINE.disableKey("down");
  },
  init: function() {
    console.log(`%cInitializing ENGINE V${String(ENGINE.VERSION)}`, ENGINE.CSS);

    $("#temp").append(
      "<canvas id ='temp_canvas' width='" +
        ENGINE.INI.sprite_maxW +
        "' height='" +
        ENGINE.INI.sprite_maxH +
        "'></canvas>"
    );
    $("#temp2").append(
      "<canvas id ='temp_canvas2' width='" +
        ENGINE.INI.sprite_maxW +
        "' height='" +
        ENGINE.INI.sprite_maxH +
        "'></canvas>"
    );
    LAYER.temp = $("#temp_canvas")[0].getContext("2d");
    LAYER.temp2 = $("#temp_canvas2")[0].getContext("2d");
  },
  fill: function(ctx, pattern) {
    let CTX = ctx;
    let pat = CTX.createPattern(pattern, "repeat");
    CTX.fillStyle = pat;
    CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
  },
  clearLayer: function(layer) {
    let CTX = LAYER[layer];
    CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
  },
  clearLayerStack: function() {
    let CLR = ENGINE.layersToClear.length;
    if (CLR === 0) return;
    ENGINE.layersToClear.forEach(ENGINE.clearLayer);
    ENGINE.layersToClear.clear();
  },
  fillLayer: function(layer, colour) {
    let CTX = LAYER[layer];
    CTX.fillStyle = colour;
    CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
  },
  resizeBOX: function(id, width, height) {
    width = width || ENGINE.gameWIDTH;
    height = height || ENGINE.gameHEIGHT;
    let box = $("#" + id).children();
    for (let a = 0; a < box.length; a++) {
      box[a].width = width;
      box[a].height = height;
    }
  },
  addBOX: function(id, width, height, alias, type) {
    //types null, side, fside
    if (id === null) return;
    if (width === null) return;
    if (height === null) return;
    let layers = alias.length;
    $(ENGINE.gameWindowId).append(
      "<div id ='" + id + "' style='position: relative'></div>"
    );
    if (type === "side" || type === "fside") {
      $("#" + id).addClass("gw"); //adds gw class: side by side windows
    } else {
      $("#" + id).addClass("gh"); //adds gh class: windows below
    }
    var prop;
    var canvasElement;
    for (let x = 0; x < layers; x++) {
      canvasElement =
        "<canvas class='layer' id='" +
        id +
        "_canvas_" +
        x +
        "' width='" +
        width +
        "' height='" +
        height +
        "' style='z-index:" +
        x +
        "; top:" +
        ENGINE.currentTOP +
        "px; left:" +
        ENGINE.currentLEFT +
        "px'></canvas>";
      $("#" + id).append(canvasElement);
      prop = alias.shift();
      LAYER[prop] = $("#" + id + "_canvas_" + x)[0].getContext("2d");
    }
    if (type === "side") {
      ENGINE.currentLEFT += width;
    } else if (type === "fside") {
      ENGINE.currentTOP += height;
      ENGINE.currentLEFT = 0;
    } else {
      ENGINE.currentTOP += height;
      ENGINE.currentLEFT = 0;
    }
  },
  copyLayer: function(copyFrom, copyTo, orX, orY, orW, orH) {
    let CTX = LAYER[copyTo];
    CTX.drawImage(LAYER[copyFrom].canvas, orX, orY, orW, orH, 0, 0, orW, orH);
  },
  flattenLayers: function(src, dest) {
    let W = LAYER[dest].canvas.width;
    let H = LAYER[dest].canvas.height;
    ENGINE.copyLayer(src, dest, 0, 0, W, H, 0, 0, W, H);
  },
  spriteDraw: function(layer, X, Y, image) {
    let CX = Math.floor(X - image.width / 2);
    let CY = Math.floor(Y - image.height / 2);
    let CTX = LAYER[layer];
    CTX.drawImage(image, CX, CY);
  },
  draw: function(layer, X, Y, image) {
    let CTX = LAYER[layer];
    CTX.drawImage(image, X, Y);
  },
  drawPart: function(layer, X, Y, image, line) {
    let CTX = LAYER[layer];
    CTX.drawImage(
      image,
      0,
      line,
      image.width,
      image.height - line,
      X,
      Y,
      image.width,
      image.height - line
    );
  },
  drawPool: function(layer, pool, sprite) {
    let CTX = LAYER[layer];
    let PL = pool.length;
    if (PL === 0) return;
    for (let i = 0; i < PL; i++) {
      ENGINE.spriteDraw(layer, pool[i].x, pool[i].y, sprite);
    }
  },
  trimCanvas: function(data) {
    var top = 0,
      bottom = data.height,
      left = 0,
      right = data.width;
    var width = data.width;
    while (top < bottom && rowBlank(data, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(data, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(data, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(data, width, right - 1, top, bottom))
      --right;

    return { left: left, top: top, right: right, bottom: bottom };

    function rowBlank(data, width, y) {
      for (let x = 0; x < width; ++x) {
        if (data.data[y * width * 4 + x * 4 + 3] !== 0) return false;
      }
      return true;
    }

    function columnBlank(data, width, x, top, bottom) {
      for (let y = top; y < bottom; ++y) {
        if (data.data[y * width * 4 + x * 4 + 3] !== 0) return false;
      }
      return true;
    }
  },
  rotateImage: function(image, degree, newName) {
    let CTX = LAYER.temp;
    let CW = image.width;
    let CH = image.height;
    let max = Math.max(CW, CH);
    let min = Math.max(CW, CH);
    CTX.canvas.width = max * 2;
    CTX.canvas.height = max * 2;
    CTX.save();
    CTX.translate(max, max);
    CTX.rotate(degree * Math.PI / 180);
    CTX.drawImage(image, -min / 2, -min / 2);
    CTX.restore();
    let imgDATA = CTX.getImageData(0, 0, CTX.canvas.width, CTX.canvas.height);
    let TRIM = ENGINE.trimCanvas(imgDATA);
    let trimmed = CTX.getImageData(
      TRIM.left,
      TRIM.top,
      TRIM.right - TRIM.left,
      TRIM.bottom - TRIM.top
    );
    CTX.canvas.width = TRIM.right - TRIM.left;
    CTX.canvas.height = TRIM.bottom - TRIM.top;
    CTX.putImageData(trimmed, 0, 0);
    SPRITE[newName] = new Image();
    SPRITE[newName].onload = ENGINE.creationSpriteCount;
    SPRITE[newName].crossOrigin = "Anonymous";
    SPRITE[newName].src = CTX.canvas.toDataURL("image/png");
    SPRITE[newName].width = CTX.canvas.width;
    SPRITE[newName].height = CTX.canvas.height;
  },
  setCollisionsafe: function() {
    for (let sprite in SPRITE) {
      if (SPRITE[sprite].width > ENGINE.INI.COLLISION_SAFE)
        ENGINE.INI.COLLISION_SAFE = SPRITE[sprite].width;
      if (SPRITE[sprite].height > ENGINE.INI.COLLISION_SAFE)
        ENGINE.INI.COLLISION_SAFE = SPRITE[sprite].height;
    }
    ENGINE.INI.COLLISION_SAFE++;
    console.log(`%cENGINE.INI.COLLISION_SAFE set to: ${ENGINE.INI.COLLISION_SAFE}`, ENGINE.CSS);
  },
  ready: function() {
    ENGINE.setCollisionsafe();
    console.log("%cENGINE ready!", ENGINE.CSS);
    $("#buttons").prepend("<input type='button' id='startGame' value='START'>");
    $("#load").addClass("hidden");
    $("#startGame").on("click", PRG.start);
    ENGINE.readyCall.call();
  },
  intersectionCollision: function(actor1, actor2) {
    if (actor1.class !== "bullet" && actor2.class !== "bullet") return;
    if (actor1.prevX === null || actor2.prevX === null) return;

    let AL = arguments.length;
    let line1 = {};
    let line2 = {};
    for (let q = 0; q < AL; q++) {
      switch (arguments[q].class) {
        case "bullet":
          // for 5px*5px bullet
          line1.x1 = arguments[q].prevX;
          line1.y1 = arguments[q].prevY + 3;
          line1.x2 = arguments[q].x;
          line1.y2 = arguments[q].y - 3;
          break;
        default:
          //linear representation of object, angle not considered
          line2.x1 = parseInt(
            (arguments[q].prevX + arguments[q].x) / 2 + arguments[q].width / 2,
            10
          );
          line2.y1 = parseInt((arguments[q].prevY + arguments[q].y) / 2, 10);
          line2.x2 = parseInt(
            (arguments[q].prevX + arguments[q].x) / 2 - arguments[q].width / 2,
            10
          );
          line2.y2 = line2.y1;
          break;
      }
    }
    return ENGINE.lineIntersects(
      line1.x1,
      line1.y1,
      line1.x2,
      line1.y2,
      line2.x1,
      line2.y1,
      line2.x2,
      line2.y2
    );
  },
  lineIntersects: function(a, b, c, d, p, q, r, s) {
    //https://stackoverflow.com/a/24392281/4154250
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return 0 < lambda && lambda < 1 && (0 < gamma && gamma < 1);
    }
  },
  pixPerfectCollision: function(actor1, actor2) {
    var w1 = parseInt(actor1.width / 2, 10);
    var w2 = parseInt(actor2.width / 2, 10);
    var h1 = parseInt(actor1.height / 2, 10);
    var h2 = parseInt(actor2.height / 2, 10);
    var act1 = new Vector(actor1.x, actor1.y);
    var act2 = new Vector(actor2.x, actor2.y);
    var SQ1 = new Square(act1.x - w1, act1.y - h1, w1 * 2, h1 * 2);
    var SQ2 = new Square(act2.x - w2, act2.y - h2, w2 * 2, h2 * 2);
    var x = parseInt(Math.max(SQ1.x, SQ2.x), 10) - 1;
    var y = parseInt(Math.max(SQ1.y, SQ2.y), 10) - 1;
    var w = parseInt(Math.min(SQ1.x + SQ1.w - x, SQ2.x + SQ2.w - x), 10) + 1;
    var h = parseInt(Math.min(SQ1.y + SQ1.h - y, SQ2.y + SQ2.h - y), 10) + 1;
    if (w === 0 || h === 0) return false;
    var area = new Square(x, y, w, h);
    var area1 = new Square(area.x - SQ1.x, area.y - SQ1.y, area.w, area.h);
    var area2 = new Square(area.x - SQ2.x, area.y - SQ2.y, area.w, area.h);
    var CTX1 = LAYER.temp;
    var CTX2 = LAYER.temp2;
    CTX1.canvas.width = ENGINE.INI.sprite_maxW;
    CTX1.canvas.height = ENGINE.INI.sprite_maxH;
    CTX2.canvas.width = ENGINE.INI.sprite_maxW;
    CTX2.canvas.height = ENGINE.INI.sprite_maxH;
    ENGINE.draw("temp", 0, 0, SPRITE[actor1.name]);
    ENGINE.draw("temp2", 0, 0, SPRITE[actor2.name]);
    var data1 = CTX1.getImageData(area1.x, area1.y, area1.w, area1.h);
    var data2 = CTX2.getImageData(area2.x, area2.y, area2.w, area2.h);
    var DL = data1.data.length;
    var index;
    for (index = 3; index < DL; index += 4) {
      if (data1.data[index] > 0 && data2.data[index] > 0) {
        return true;
      }
    }
    //intersectionCollision check
    if (ENGINE.checkIntersection) {
      return ENGINE.intersectionCollision(actor1, actor2);
    } else return false;
  },
  collision: function(actor1, actor2) {
    var X = Math.abs(actor1.x - actor2.x);
    var Y = Math.abs(actor1.y - actor2.y);
    if (Y >= ENGINE.INI.COLLISION_SAFE) return false;
    if (X >= ENGINE.INI.COLLISION_SAFE) return false;
    var w1 = parseInt(actor1.width / 2, 10);
    var w2 = parseInt(actor2.width / 2, 10);
    var h1 = parseInt(actor1.height / 2, 10);
    var h2 = parseInt(actor2.height / 2, 10);

    if (X >= w1 + w2 || Y >= h1 + h2) return false;
    return ENGINE.pixPerfectCollision(actor1, actor2);
  },
  collisionToBackground: function(actor, layer) {
    var CTX = layer;
    var maxSq = Math.max(actor.width, actor.height);
    var R = Math.ceil(0.5 * Math.sqrt(2 * Math.pow(maxSq, 2)));
    var X = actor.x;
    var Y = actor.y;
    var proximity = false;
    if (ENGINE.checkProximity) {
      var imgDATA = CTX.getImageData(X - R, Y - R, 2 * R, 2 * R);
      var check = 1;
      var left, right, down, top;
      while (check < R) {
        left = imgDATA.data[toIndex(X - check, Y)];
        right = imgDATA.data[toIndex(X + check, Y)];
        down = imgDATA.data[toIndex(X, Y + check)];
        top = imgDATA.data[toIndex(X, Y - check)];
        if (left || right || down || top) {
          proximity = true;
          break;
        }
        check++;
      }
    } else proximity = true;
    if (!proximity) {
      return false;
    } else {
      var CX = Math.floor(X - actor.width / 2);
      var CY = Math.floor(Y - actor.height / 2);
      var CTX1 = LAYER.temp;
      CTX1.canvas.width = actor.width;
      CTX1.canvas.height = actor.height;
      ENGINE.draw("temp", 0, 0, SPRITE[actor.name]);
      var data1 = CTX1.getImageData(0, 0, actor.width, actor.height); //actor data
      var data2 = CTX.getImageData(CX, CY, actor.width, actor.height); //layer data
      var DL = data1.data.length;
      var index;
      for (index = 3; index < DL; index += 4) {
        if (data1.data[index] > 0 && data2.data[index] > 0) {
          return true;
        }
      }
      return false;
    }

    function toIndex(x, y) {
      var index = (y - Y) * 4 * (2 * R) + (x - (X - R)) * 4 + 3;
      return index;
    }
  },
  drawLoadingGraph: function(counter) {
    var count = ENGINE.LOAD[counter];
    var HMI = ENGINE.LOAD["HM" + counter];
    var text = counter;
    var percent = Math.floor(count / HMI * 100);
    var CTX = LAYER.PRELOAD[counter];
    CTX.clearRect(0, 0, ENGINE.LOAD_W, ENGINE.LOAD_H);
    CTX.beginPath();
    CTX.lineWidth = "1";
    CTX.strokeStyle = "black";
    CTX.rect(0, 0, ENGINE.LOAD_W, ENGINE.LOAD_H);
    CTX.closePath();
    CTX.stroke();
    CTX.fillStyle = "#999";
    CTX.fillRect(
      1,
      1,
      Math.floor((ENGINE.LOAD_W - 2) * (percent / 100)),
      ENGINE.LOAD_H - 2
    );
    CTX.fillStyle = "black";
    CTX.font = "10px Verdana";
    CTX.fillText(
      text + ": " + percent + "%",
      ENGINE.LOAD_W * 0.1,
      ENGINE.LOAD_H * 0.62
    );
    return;
  },
  spriteDump: function(layer, spriteList) {
    console.log("%c********* SPRITE DUMP *********", ENGINE.CSS);
    console.log(SPRITE);
    var x = 0;
    var y = 0;
    var dy = 0;

    if (spriteList === undefined) {
      var keys = Object.keys(SPRITE);
      spriteList = keys.map(x => SPRITE[x]);
    }

    spriteList.forEach(function(q) {
      ENGINE.draw(layer, x, y, q);
      x += q.width;
      if (q.height > dy) dy = q.height;
      if (x > LAYER[layer].canvas.width - 64) {
        y += dy;
        x = 0;
      }
    });
  },
  alert: function(room) {
    var CL = ENGINE.getCanvasNumber("ROOM");
    var cname = "#ROOM_canvas_" + --CL;
    var text = MAP["room" + room].alert;
    ENGINE.alertMode = true;
    GAME.clearAllKeys();
    ENGINE.disableArrows();
    var CTX = LAYER.alert;
    CTX.save();
    var words = text.split(" ");
    var lines = [];
    var line = "";
    var lineTest = "";
    var currentY = 0;
    var currentX = 0;
    CTX.font = ENGINE.alertINI.fontSize + "px Consolas";
    for (var i = 0, len = words.length; i < len; i++) {
      lineTest = line + words[i] + " ";
      if (CTX.measureText(lineTest).width > ENGINE.alertINI.width - 10) {
        currentY =
          lines.length * ENGINE.alertINI.fontSize + ENGINE.alertINI.fontSize;
        lines.push({
          text: line,
          height: currentY
        });
        line = words[i] + " ";
      } else {
        line = lineTest;
      }
    }
    if (line.length > 0) {
      currentY =
        lines.length * ENGINE.alertINI.fontSize + ENGINE.alertINI.fontSize;
      lines.push({
        text: line.trim(),
        height: currentY
      });
    }
    ENGINE.alertINI.height = currentY + ENGINE.alertINI.buttonHeight;
    CTX.fillStyle = "#CCC";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 2;
    CTX.fillRect(
      ENGINE.alertINI.left,
      ENGINE.alertINI.top,
      ENGINE.alertINI.width,
      ENGINE.alertINI.height
    );
    CTX.lineWidth = 1;
    CTX.strokeStyle = "#000";
    CTX.beginPath();
    CTX.rect(
      ENGINE.alertINI.left + 1,
      ENGINE.alertINI.top + 1,
      ENGINE.alertINI.width - 2,
      ENGINE.alertINI.height - 2
    );
    CTX.closePath();
    CTX.stroke();
    CTX.fillStyle = "#111";
    CTX.shadowColor = "#000";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    var leng = lines.length;
    for (i = 0; i < leng; i++) {
      CTX.fillText(
        lines[i].text,
        currentX + ENGINE.alertINI.left + ENGINE.alertINI.fontSize,
        ENGINE.alertINI.top + lines[i].height + ENGINE.alertINI.fontSize
      );
    }
    CTX.lineWidth = 2;
    CTX.strokeStyle = "#000";
    ENGINE.alertButton.okX =
      ENGINE.alertINI.left +
      ENGINE.alertINI.width / 2 -
      ENGINE.alertButton.width / 2;
    ENGINE.alertButton.okY =
      ENGINE.alertINI.top + currentY + ENGINE.alertINI.fontSize * 2;
    CTX.beginPath();
    CTX.rect(
      ENGINE.alertButton.okX,
      ENGINE.alertButton.okY,
      ENGINE.alertButton.width,
      ENGINE.alertButton.heigth
    );
    CTX.closePath();
    CTX.stroke();
    CTX.fillText(
      "OK",
      ENGINE.alertButton.okX + 16,
      ENGINE.alertButton.okY + 21
    );
    CTX.lineWidth = 1;
    CTX.restore();

    $(cname).mousemove(function(event) {
      ENGINE.mouseOverOK(event, cname);
    });

    $(cname).click(function(event) {
      ENGINE.mouseClickOK(event, cname);
    });

    $(document).off("keyup", GAME.clearKey);
    $(document).off("keydown", GAME.checkKey);
    return;
  },
  alertINI: {
    fontSize: 14,
    width: 350,
    heigth: 180,
    left: 80,
    top: 154,
    buttonHeight: 72
  },
  alertButton: {
    width: 48,
    heigth: 32
  },
  window: function(
    width = ENGINE.gameWIDTH / 2,
    height = ENGINE.gameHEIGHT / 2,
    CTX = LAYER.text,
    x = Math.floor((ENGINE.gameWIDTH - width) / 2),
    y = Math.floor((ENGINE.gameHEIGHT - height) / 2)
  ) {
    CTX.save();
    CTX.fillStyle = "#000";
    CTX.shadowColor = "#000";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    CTX.globalAlpha = 0.8;
    CTX.roundRect(
      x,
      y,
      width,
      height,
      {
        upperLeft: 15,
        upperRight: 15,
        lowerLeft: 15,
        lowerRight: 15
      },
      true,
      true
    );
    CTX.restore();
    return new Point(x, y);
  },

  mouseOverOK: function(event, cname) {
    var canvasOffset = $(cname).offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var mouseX = parseInt(event.pageX - offsetX - ENGINE.alertButton.okX, 10);
    var mouseY = parseInt(event.pageY - offsetY - ENGINE.alertButton.okY, 10);
    if (
      mouseX >= 0 &&
      mouseX < ENGINE.alertButton.width &&
      mouseY >= 0 &&
      mouseY < ENGINE.alertButton.heigth
    ) {
      $(cname).css("cursor", "pointer");
    } else {
      $(cname).css("cursor", "auto");
    }
  },
  mouseOver: function(event, cname) {
    $(cname).css("cursor", "pointer");
  },
  mouseClick: function(event, cname, func) {
    var canvasOffset = $(cname).offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var mouseX = parseInt(event.pageX - offsetX, 10);
    var mouseY = parseInt(event.pageY - offsetY, 10);
    ENGINE.mouseX = mouseX;
    ENGINE.mouseY = mouseY;
    func.call();
    return;
  },
  mouseClickOK: function(event, cname) {
    var canvasOffset = $(cname).offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var mouseX = parseInt(event.pageX - offsetX - ENGINE.alertButton.okX, 10);
    var mouseY = parseInt(event.pageY - offsetY - ENGINE.alertButton.okY, 10);
    if (
      mouseX >= 0 &&
      mouseX < ENGINE.alertButton.width &&
      mouseY >= 0 &&
      mouseY < ENGINE.alertButton.heigth
    ) {
      $(cname).css("cursor", "auto");
      $(cname).off();
      ENGINE.alertMode = false;
      ENGINE.clearLayer("alert");
      $(document).keydown(GAME.checkKey);
      $(document).keyup(GAME.clearKey);
      GAME.continue();
    }
  },
  getCanvasNumber: function(id) {
    var cnv = $("#" + id + " .layer");
    return cnv.length;
  },
  getCanvasName: function(id) {
    var CL = ENGINE.getCanvasNumber("ROOM");
    var cname = "#ROOM_canvas_" + --CL;
    return cname;
  },
  cutGrid: function(layer, point) {
    var CTX = layer;
    CTX.clearRect(point.x, point.y, ENGINE.INI.GRIDPIX, ENGINE.INI.GRIDPIX);
    return;
  },
  spreadAroundCenter: function(toDo, x, delta) {
    var xS = [];
    var odd = toDo % 2;
    var n = 2;
    if (odd) {
      xS.push(x);
      toDo--;
      while (toDo > 0) {
        xS.push(x + (n - 1) * delta);
        xS.push(x - (n - 1) * delta);
        toDo -= 2;
        n++;
      }
    } else {
      while (toDo > 0) {
        xS.push(x + (n - 1) * delta / 2);
        xS.push(x - (n - 1) * delta / 2);
        toDo -= 2;
        n += 2;
      }
    }
    xS.sort((a, b) => a - b);
    return xS;
  },
  imgToTexture: function(obj) {
    TEXTURE[obj.name] = obj.img;
  },
  imgToSprite: function(obj) {
    SPRITE[obj.name] = obj.img;
    SPRITE[obj.name].width = obj.img.width;
    SPRITE[obj.name].height = obj.img.height;
  },
  imgToSeqSprite: function(obj) {
    SEQ_SPRITE[obj.name] = obj.img;
    SEQ_SPRITE[obj.name].width = obj.img.width;
    SEQ_SPRITE[obj.name].height = obj.img.height;
  },
  sheetToSprite: function(obj) {
    var spriteSheet = obj.img;
    var CTX = LAYER.temp;
    var NTX = LAYER.temp2;
    CTX.canvas.width = spriteSheet.width;
    CTX.canvas.height = spriteSheet.height;
    ENGINE.draw("temp", 0, 0, spriteSheet);
    var x;
    var data, imgDATA;
    var newName;
    for (var q = 0; q < obj.count; q++) {
      x = q * ENGINE.INI.SPRITESHEET_DEFAULT_WIDTH;
      data = CTX.getImageData(
        x,
        0,
        ENGINE.INI.SPRITESHEET_DEFAULT_WIDTH,
        ENGINE.INI.SPRITESHEET_HEIGHT
      );

      NTX.canvas.width = ENGINE.INI.SPRITESHEET_DEFAULT_WIDTH;
      NTX.canvas.height = ENGINE.INI.SPRITESHEET_HEIGHT;
      NTX.putImageData(data, 0, 0); //untrimmed sprite painted on temp2

      imgDATA = NTX.getImageData(
        0,
        0,
        ENGINE.INI.SPRITESHEET_DEFAULT_WIDTH,
        ENGINE.INI.SPRITESHEET_HEIGHT
      );
      var TRIM = ENGINE.trimCanvas(imgDATA);
      var trimmed = NTX.getImageData(
        TRIM.left,
        TRIM.top,
        TRIM.right - TRIM.left,
        TRIM.bottom - TRIM.top
      );
      NTX.canvas.width = TRIM.right - TRIM.left;
      NTX.canvas.height = TRIM.bottom - TRIM.top;
      NTX.putImageData(trimmed, 0, 0); //trimmed sprite painted on temp2

      newName = obj.name + "_" + q;
      SPRITE[newName] = new Image();
      SPRITE[newName].crossOrigin = "Anonymous";
      SPRITE[newName].src = NTX.canvas.toDataURL("image/png");
      SPRITE[newName].width = NTX.canvas.width;
      SPRITE[newName].height = NTX.canvas.height;
      ASSET[obj.parent][obj.tag].push(SPRITE[newName]);
    }
  },
  audioToAudio: function(obj) {
    AUDIO[obj.name] = obj.audio;
  },
  linkToWasm: function(obj) {
    var bin = obj.exports;
    for (var fn in bin) {
      if (typeof bin[fn] === "function") {
        WASM[fn] = bin[fn];
      }
    }
  },
  KEY: {
    on: function() {
      $(document).keydown(ENGINE.GAME.checkKey);
      $(document).keyup(ENGINE.GAME.clearKey);
    },
    off: function() {
      $(document).off("keyup", ENGINE.GAME.clearKey);
      $(document).off("keydown", ENGINE.GAME.checkKey);
    },
    map: {
      ctrl: 17,
      alt: 18,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      space: 32,
      enter: 13,
      F9: 120,
      A: 65,
      D: 68
    },
    waitFor: function(func, key = "enter") {
      if (ENGINE.GAME.stopAnimation) return;
      let map = ENGINE.GAME.keymap;
      if (map[ENGINE.KEY.map[key]]) {
        ENGINE.GAME.ANIMATION.stop();
        func.call();
        ENGINE.GAME.keymap[ENGINE.KEY.map[key]] = false;
        return;
      }
    }
  },
  GAME: {
    running: false,
    keymap: {
      17: false, //CTRL
      37: false, //LEFT
      38: false, //UP
      39: false, //RIGHT
      40: false, //Down
      32: false, //SPACE
      13: false, //ENTER
      120: false, //F9
      65: false, //A
      68: false //D
    },
    clearAllKeys: function() {
      for (var key in ENGINE.GAME.keymap) {
        ENGINE.GAME.keymap[key] = false;
      }
    },
    clearKey: function(e) {
      e = e || window.event;
      if (e.keyCode in ENGINE.GAME.keymap) {
        ENGINE.GAME.keymap[e.keyCode] = false;
      }
    },
    checkKey: function(e) {
      e = e || window.event;
      if (e.keyCode in ENGINE.GAME.keymap) {
        ENGINE.GAME.keymap[e.keyCode] = true;
        e.preventDefault();
      }
    },
    run: function(func, nextFunct) {
      ENGINE.GAME.running = true;
      if (!ENGINE.GAME.frame.start) ENGINE.GAME.frame.start = performance.now();
      ENGINE.GAME.frame.delta = performance.now() - ENGINE.GAME.frame.start;
      if (ENGINE.GAME.frame.delta >= ENGINE.INI.ANIMATION_INTERVAL) {
        if (ENGINE.GAME.stopAnimation) {
          if (nextFunct) nextFunct.call();
          console.log(`%cAnimation stopped BEFORE execution ${func.name}`, 'color: #f00');
          ENGINE.GAME.running = false;
          return;
        }
        func.call();
        ENGINE.GAME.frame.start = null;
      }
      if (!ENGINE.GAME.stopAnimation) {
        requestAnimationFrame(ENGINE.GAME.run.bind(null, func, nextFunct));
      } else {
        if (nextFunct) nextFunct.call();
        console.log(`%cAnimation stopped AFTER execution ${func.name}`, 'color: #f00');
        ENGINE.GAME.running = false;
        return;
      }
    },
    start: function() {
      $("#DOWN")[0].scrollIntoView();
      ENGINE.GAME.stopAnimation = false;
      ENGINE.GAME.started = Date.now();
      ENGINE.GAME.frame = {};
      ENGINE.GAME.frame.start = null;
    },
    ANIMATION: {
      start: function(wrapper) {
        console.log(`%cENGINE.GAME.ANIMATION.start --> ${wrapper.name}`, 'color: #0F0');
        ENGINE.GAME.stopAnimation = false;
        ENGINE.GAME.run(wrapper, ENGINE.GAME.ANIMATION.queue);
      },
      stop: function() {
        ENGINE.GAME.stopAnimation = true;
      },
      queue: function() {
        ENGINE.GAME.ANIMATION.stop();
        setTimeout(() => {
          console.log(`%cGame running? ${ENGINE.GAME.running}`, ENGINE.CSS);
          if (ENGINE.GAME.ANIMATION.STACK.length > 0) {
            let next = ENGINE.GAME.ANIMATION.STACK.shift();
            console.log(`%c..... animation queue: ${next.name}`, ENGINE.CSS);
            ENGINE.GAME.ANIMATION.start(next);
          } else {
            console.log("%cAnimation STACK EMPTY! Game stopped running.", ENGINE.CSS);
          }
        }, ENGINE.INI.ANIMATION_INTERVAL);
        
      },
      waitThen: function(func, n = 1){
        setTimeout(func, ENGINE.INI.ANIMATION_INTERVAL * n);
      },
      STACK: []
    }
  },
  VIEWPORT: {
    max: {
      x: 0,
      y: 0
    },
    setMax: function(max) {
      ENGINE.VIEWPORT.max.x = max.x;
      ENGINE.VIEWPORT.max.y = max.y;
    },
    changed: false,
    reset: function() {
      ENGINE.VIEWPORT.vx = 0;
      ENGINE.VIEWPORT.vy = 0;
    },
    vx: 0,
    vy: 0,
    change: function(from, to) {
      ENGINE.copyLayer(
        from,
        to,
        ENGINE.VIEWPORT.vx,
        ENGINE.VIEWPORT.vy,
        ENGINE.gameWIDTH,
        ENGINE.gameHEIGHT
      );
    },
    check: function(actor, max = ENGINE.VIEWPORT.max) {
      var vx = actor.x - ENGINE.gameWIDTH / 2;
      var vy = actor.y - ENGINE.gameHEIGHT / 2;
      if (vx < 0) vx = 0;
      if (vy < 0) vy = 0;
      if (vx > max.x - ENGINE.gameWIDTH) vx = max.x - ENGINE.gameWIDTH;
      if (vy > max.y - ENGINE.gameHEIGHT) vy = max.y - ENGINE.gameHEIGHT;
      if (vx != ENGINE.VIEWPORT.vx || vy != ENGINE.VIEWPORT.vy) {
        ENGINE.VIEWPORT.vx = vx;
        ENGINE.VIEWPORT.vy = vy;
        ENGINE.VIEWPORT.changed = true;
      }
    },
    alignTo: function(actor) {
      actor.vx = actor.x - ENGINE.VIEWPORT.vx;
      actor.vy = actor.y - ENGINE.VIEWPORT.vy;
    }
  },
  TEXT: {
    font: "Arcade",
    fs: "40",
    text: function(
      text,
      x,
      y,
      layer = "text",
      fs = ENGINE.TEXT.fs,
      font = ENGINE.TEXT.font
    ) {
      var CTX = LAYER[layer];
      CTX.fillStyle = "#FFF";
      CTX.font = fs + "px " + font;
      CTX.shadowColor = "#333333";
      CTX.shadowOffsetX = 3;
      CTX.shadowOffsetY = 3;
      CTX.shadowBlur = 3;
      CTX.textAlign = "center";
      CTX.fillText(text, x, y);
    },
    centeredText: function(
      text,
      y,
      layer = "text",
      fs = ENGINE.TEXT.fs,
      font = ENGINE.TEXT.font
    ) {
      var x = ENGINE.gameWIDTH / 2;
      ENGINE.TEXT.text(text, x, y, layer, fs, font);
    }
  },
  LOAD: {
    Textures: 0,
    Sprites: 0,
    Sequences: 0,
    Sheets: 0,
    Rotated: 0,
    WASM: 0,
    Sounds: 0,
    Fonts: 0,
    HMFonts: null,
    HMSequences: null,
    HMTextures: null,
    HMSprites: null,
    HMSheets: null,
    HMRotated: null,
    HMWASM: null,
    HMSounds: null,
    preload: function() {
      console.log("%cPreloading ...", ENGINE.CSS);
      var AllLoaded = Promise.all([
        loadTextures(),
        loadSprites(),
        loadSequences(),
        loadSheets(),
        loadRotated(),
        loadingSounds(),
        loadWASM(),
        loadAllFonts()
      ]).then(function() {
        console.log("%cAll assets loaded and ready!", ENGINE.CSS);
        console.log("%c****************************", ENGINE.CSS);
        ENGINE.ready();
      });

      return;

      function appendCanvas(name) {
        let id = "preload_" + name;
        $("#load").append(
          "<canvas id ='" +
            id +
            "' width='" +
            ENGINE.LOAD_W +
            "' height='" +
            ENGINE.LOAD_H +
            "'></canvas>"
        );
        LAYER.PRELOAD[name] = $("#" + id)[0].getContext("2d");
      }
      function loadTextures(arrPath = LoadTextures) {
        console.log(`%c ...loading ${arrPath.length} textures`, ENGINE.CSS);
        ENGINE.LOAD.HMTextures = arrPath.length;
        if (ENGINE.LOAD.HMTextures) appendCanvas("Textures");

        const temp = Promise.all(
          arrPath.map(img => loadImage(img, "Textures"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            ENGINE.imgToTexture(el);
          });
        });
        return temp;
      }
      function loadSprites(arrPath = LoadSprites) {
        console.log(`%c ...loading ${arrPath.length} sprites`, ENGINE.CSS);
        ENGINE.LOAD.HMSprites = arrPath.length;
        if (ENGINE.LOAD.HMSprites) appendCanvas("Sprites");

        const temp = Promise.all(
          arrPath.map(img => loadImage(img, "Sprites"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            ENGINE.imgToSprite(el);
          });
        });
        return temp;
      }
      function loadSequences(arrPath = LoadSequences) {
        console.log(`%c ...loading ${arrPath.length} sequences`, ENGINE.CSS);
        var toLoad = [];
        //
        arrPath.forEach(function(el) {
          for (let i = 1; i <= el.count; i++) {
            toLoad.push({
              srcName:
                el.srcName +
                "_" +
                i.toString().padStart(2, "0") +
                "." +
                el.type,
              name: el.name + i
            });
          }
        });

        ENGINE.LOAD.HMSequences = toLoad.length;
        if (ENGINE.LOAD.HMSequences) appendCanvas("Sequences");

        const temp = Promise.all(
          toLoad.map(img => loadImage(img, "Sequences"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            ENGINE.imgToSeqSprite(el);
          });
        });
        return temp;
      }
      function loadSheets(arrPath = LoadSheets) {
        console.log(`%c ...loading ${arrPath.length} sheets`, ENGINE.CSS);
        var toLoad = [];
        var tag = ["left", "right", "front", "back"];
        arrPath.forEach(function(el) {
          for (let q = 0; q < 4; q++) {
            ASSET[el.name] = new LiveSPRITE([], [], [], []); 
            toLoad.push({
              srcName: el.srcName + "_" + tag[q] + "." + el.type,
              name: el.name + "_" + tag[q],
              count: el.count,
              tag: tag[q],
              parent: el.name
            });
          }
        });

        ENGINE.LOAD.HMSheets = toLoad.length;
        if (ENGINE.LOAD.HMSheets) appendCanvas("Sheets");
        const temp = Promise.all(
          toLoad.map(img => loadImage(img, "Sheets"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            ENGINE.sheetToSprite(el);
          });
        });
        return temp;
      }
      function loadRotated(arrPath = LoadRotated) {
        console.log(`%c ...loading ${arrPath.length} rotated sprites`, ENGINE.CSS);
        ENGINE.LOAD.HMRotated = arrPath.length;
        if (ENGINE.LOAD.HMRotated) appendCanvas("Rotated");

        const temp = Promise.all(
          arrPath.map(img => loadImage(img, "Rotated"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            for (
              let q = el.rotate.first;
              q <= el.rotate.last;
              q += el.rotate.step
            ) {
              ENGINE.rotateImage(el.img, q, el.name + "_" + q);
            }
          });
        });
        return temp;
      }
      function loadWASM(arrPath = LoadExtWasm) {
        var LoadIntWasm = []; //internal hard coded ENGINE requirements
        var toLoad = [...arrPath, ...LoadIntWasm];
        console.log(`%c ...loading ${toLoad.length} WASM files`, ENGINE.CSS);
        ENGINE.LOAD.HMWASM = toLoad.length;
        if (ENGINE.LOAD.HMWASM) appendCanvas("WASM");
        const temp = Promise.all(
          toLoad.map(wasm => loadWebAssembly(wasm, "WASM"))
        ).then(instance => {
          instance.forEach(function(el) {
            ENGINE.linkToWasm(el);
          });
        });

        return temp;
      }
      function loadingSounds(arrPath = LoadAudio) {
        console.log(`%c ...loading ${arrPath.length} sounds`, ENGINE.CSS);
        ENGINE.LOAD.HMSounds = arrPath.length;
        if (ENGINE.LOAD.HMSounds) appendCanvas("Sounds");

        const temp = Promise.all(
          arrPath.map(audio => loadAudio(audio, "Sounds"))
        ).then(function(obj) {
          obj.forEach(function(el) {
            ENGINE.audioToAudio(el);
          });
        });
      }
      function loadAllFonts(arrPath = LoadFonts) {
        console.log(`%c ...loading ${arrPath.length} fonts`, ENGINE.CSS);
        ENGINE.LOAD.HMFonts = arrPath.length;
        if (ENGINE.LOAD.HMFonts) appendCanvas("Fonts");
        const temp = Promise.all(arrPath.map(font => loadFont(font))).then(
          function(obj) {
            obj.map(x => document.fonts.add(x));
            ENGINE.LOAD.Fonts = ENGINE.LOAD.HMFonts;
            ENGINE.drawLoadingGraph("Fonts");
          }
        );
      }

      function loadImage(srcData, counter, dir = ENGINE.SOURCE) {
        var srcName, name, count, tag, parent, rotate;
        switch (typeof srcData) {
          case "string":
            srcName = srcData;
            name = srcName.substr(0, srcName.indexOf("."));
            break;
          case "object":
            srcName = srcData.srcName;
            name = srcData.name;
            count = srcData.count || null;
            tag = srcData.tag || null;
            parent = srcData.parent || null;
            rotate = srcData.rotate || null;
            break;
          default:
            console.error(`ENGINE: loadImage srcData ERROR: ${typeof srcData}`);
        }

        var src = dir + srcName;
        return new Promise((resolve, reject) => {
          const img = new Image();
          var obj = {
            img: img,
            name: name,
            count: count,
            tag: tag,
            parent: parent,
            rotate: rotate
          };
          img.onload = function() {
            ENGINE.LOAD[counter]++;
            ENGINE.drawLoadingGraph(counter);
            resolve(obj);
          };
          img.onerror = err => resolve(err);
          img.crossOrigin = "Anonymous";
          img.src = src;
        });
      }
      function loadAudio(srcData, counter, dir = ENGINE.AUDIO_SOURCE) {
        var srcName, name;
        switch (typeof srcData) {
          case "string":
            srcName = srcData;
            name = srcName.substr(0, srcName.indexOf("."));
            break;
          case "object":
            srcName = srcData.srcName;
            name = srcData.name;

            break;
          default:
            console.error(`ENGINE: loadAudio srcData ERROR: ${typeof srcData}`);
        }

        var src = dir + srcName;
        return new Promise((resolve, reject) => {
          const audio = new Audio();
          var obj = {
            audio: audio,
            name: name
          };
          audio.oncanplaythrough = function() {
            ENGINE.LOAD[counter]++;
            ENGINE.drawLoadingGraph(counter);
            resolve(obj);
          };
          audio.onerror = err => resolve(err);
          audio.src = src;
          audio.load();
        });
      }
      function loadWebAssembly(fileName, counter) {
        fileName = ENGINE.WASM_SOURCE + fileName;
        return fetch(fileName)
          .then(response => response.arrayBuffer())
          .then(bits => WebAssembly.compile(bits))
          .then(module => {
            ENGINE.LOAD[counter]++;
            ENGINE.drawLoadingGraph(counter);
            return new WebAssembly.Instance(module);
          });
      }
      function loadFont(srcData, dir = ENGINE.FONT_SOURCE) {
        const fontSource = dir + srcData.srcName;
        const url = `url(${fontSource})`;
        const temp = new FontFace(srcData.name, url);
        return temp.load();
      }
    }
  }
};
var TEXTURE = {};
var LAYER = {
  PRELOAD: {}
};
var SPRITE = {};
var SEQ_SPRITE = {};
var AUDIO = {};
var ASSET = {};
var WASM = {};

var PATTERN = {
  create: function(which) {
    var image = TEXTURE[which];
    var CTX = LAYER.temp;
    PATTERN[which] = CTX.createPattern(image, "repeat");
  }
};

var AnimationSPRITE = function(x, y, type, howmany) {
  this.x = x;
  this.y = y;
  this.pool = [];
  for (var i = 1; i <= howmany; i++) {
    this.pool.push(type + i);
  }
};
class TextSprite {
  constructor(text, point, frame) {
    this.text = text;
    this.point = point;
    this.frame = frame || ENGINE.INI.FADE_FRAMES; //magic number
  }
}
var TEXTPOOL = {
  pool: [],
  draw: function(layer) {
    var TPL = TEXTPOOL.pool.length;
    if (TPL === 0) return;
    ENGINE.layersToClear.add(layer);
    var CTX = LAYER[layer];
    CTX.font = "10px Consolas";
    CTX.fillStyle = "#FFF";
    CTX.textAlign = "center";
    var vx, vy;
    for (let q = TPL - 1; q >= 0; q--) {
      vx =
        TEXTPOOL.pool[q].point.x - ENGINE.VIEWPORT.vx + ENGINE.INI.GRIDPIX / 2;
      vy =
        TEXTPOOL.pool[q].point.y - ENGINE.VIEWPORT.vy + ENGINE.INI.GRIDPIX / 2;
      CTX.save();
      CTX.globalAlpha =
        (1000 -
          (ENGINE.INI.FADE_FRAMES - TEXTPOOL.pool[q].frame) *
            (1000 / ENGINE.INI.FADE_FRAMES)) /
        1000;
      CTX.fillText(TEXTPOOL.pool[q].text, vx, vy);
      CTX.restore();
      TEXTPOOL.pool[q].frame--;
      if (TEXTPOOL.pool[q].frame <= 0) {
        TEXTPOOL.pool.splice(q, 1);
      }
    }
  }
};
class PartSprite {
  constructor(point, sprite, line, speed) {
    this.point = point;
    this.sprite = sprite;
    this.line = line;
    this.speed = speed;
  }
}
var SpritePOOL = {
  pool: [],
  draw: function(layer) {
    var SPL = SpritePOOL.pool.length;
    if (SPL === 0) return;
    ENGINE.layersToClear.add(layer);
    var vx, vy, line;
    for (var q = SPL - 1; q >= 0; q--) {
      vx = SpritePOOL.pool[q].point.x - ENGINE.VIEWPORT.vx;
      vy = SpritePOOL.pool[q].point.y - ENGINE.VIEWPORT.vy;
      line = SpritePOOL.pool[q].sprite.height - SpritePOOL.pool[q].line;
      ENGINE.drawPart(layer, vx, vy, SpritePOOL.pool[q].sprite, line);
      SpritePOOL.pool[q].line--;
      if (SpritePOOL.pool[q].line <= 0) {
        SpritePOOL.pool.splice(q, 1);
      }
    }
  }
};
var EXPLOSIONS = {
  pool: [],
  draw: function(layer) {
    // draws AnimationSPRITE(x, y, type, howmany) from EXPLOSIONS.pool
    // example new AnimationSPRITE(actor.x, actor.y, "AlienExp", 6)
    layer = layer || "explosion";
    var PL = EXPLOSIONS.pool.length;
    if (PL === 0) return;
    ENGINE.layersToClear.add(layer);
    for (var instance = PL - 1; instance >= 0; instance--) {
      var sprite = EXPLOSIONS.pool[instance].pool.shift();
      ENGINE.spriteDraw(
        layer,
        EXPLOSIONS.pool[instance].x - ENGINE.VIEWPORT.vx,
        EXPLOSIONS.pool[instance].y - ENGINE.VIEWPORT.vy,
        SEQ_SPRITE[sprite]
      );
      if (EXPLOSIONS.pool[instance].pool.length === 0) {
        EXPLOSIONS.pool.splice(instance, 1);
      }
    }
  }
};

class LiveSPRITE {
  constructor(left, right, front, back) {
    this.left = left || null;
    this.right = right || null;
    this.front = front || null;
    this.back = back || null;
  }
}
class ACTOR {
  constructor(sprite_class, x, y, orientation, asset) {
    this.class = sprite_class;
    this.x = x || 0;
    this.y = y || 0;
    this.orientation = orientation || null;
    this.asset = asset || null;
    this.vx = 0;
    this.vy = 0;
    this.left_index = 0;
    this.right_index = 0;
    this.front_index = 0;
    this.back_index = 0;
    this.refresh();
  }
  refresh() {
    if (this.orientation === null) {
      this.name = this.class;
    } else {
      this.name =
        this.class +
        "_" +
        this.orientation +
        "_" +
        this[this.orientation + "_index"];
    }
    this.width = SPRITE[this.name].width;
    this.height = SPRITE[this.name].height;
  }
  sprite() {
    return SPRITE[this.name];
  }
  getOrientation(dir) {
    var orientation;
    switch (dir.x) {
      case 1:
        orientation = "right";
        break;
      case -1:
        orientation = "left";
        break;
      case 0:
        switch (dir.y) {
          case 1:
            orientation = "front";
            break;
          case -1:
            orientation = "back";
            break;
          case 0:
            orientation = "front";
            break;
        }
        break;
    }
    return orientation;
  }
  animateMove(orientation) {
    this[orientation + "_index"]++;
    if (this[orientation + "_index"] >= this.asset[orientation].length)
      this[orientation + "_index"] = 0;
    this.refresh();
  }
  static gridToClass(grid, sprite_class) {
    var p = GRID.gridToCenterPX(grid);
    return new ACTOR(sprite_class, p.x, p.y);
  }
}
var GRID = {
  gridToCenterPX: function(grid) {
    var x = grid.x * ENGINE.INI.GRIDPIX + ENGINE.INI.GRIDPIX / 2;
    var y = grid.y * ENGINE.INI.GRIDPIX + ENGINE.INI.GRIDPIX / 2;
    return new Point(x, y);
  },
  gridToSprite: function(grid, actor) {
    GRID.coordToSprite(GRID.gridToCoord(grid), actor);
  },
  coordToSprite: function(coord, actor) {
    actor.x = coord.x + ENGINE.INI.GRIDPIX / 2;
    actor.y = coord.y + ENGINE.INI.GRIDPIX / 2;
  },
  gridToCoord: function(grid) {
    var x = grid.x * ENGINE.INI.GRIDPIX;
    var y = grid.y * ENGINE.INI.GRIDPIX;
    return new Point(x, y); 
  },
  coordToGrid: function(x, y) {
    var tx = Math.floor(x / ENGINE.INI.GRIDPIX);
    var ty = Math.floor(y / ENGINE.INI.GRIDPIX);
    return new Grid(tx, ty);
  },
  create: function(x, y) {
    var temp = [];
    var string = "1".repeat(x);
    for (var iy = 0; iy < y; iy++) {
      temp.push(string);
    }
    return temp;
  },
  grid: function() {
    var CTX = LAYER.grid;
    var x = 0;
    var y = 0;
    CTX.strokeStyle = "#FFF";
    //horizonal lines
    do {
      y += ENGINE.INI.GRIDPIX;
      CTX.beginPath();
      CTX.setLineDash([1, 3]);
      CTX.moveTo(x, y);
      CTX.lineTo(CTX.canvas.width, y);
      CTX.closePath();
      CTX.stroke();
    } while (y <= CTX.canvas.height);
    //vertical lines
    y = 0;
    do {
      x += ENGINE.INI.GRIDPIX;
      CTX.beginPath();
      CTX.setLineDash([1, 3]);
      CTX.moveTo(x, y);
      CTX.lineTo(x, CTX.canvas.height);
      CTX.closePath();
      CTX.stroke();
    } while (x <= CTX.canvas.width);
  },
  paintText: function(point, text, layer, color = "#FFF") {
    var CTX = LAYER[layer];
    CTX.font = "10px Consolas";
    var y = point.y + ENGINE.INI.GRIDPIX / 2;
    var x = point.x + ENGINE.INI.GRIDPIX / 2;
    CTX.fillStyle = color;
    CTX.textAlign = "center";
    CTX.fillText(text, x, y);
  },
  paint: function(
    grid,
    floorIMG,
    wallIMG,
    floorLayer = "floor",
    wallLayer = "wall",
    drawGrid = false
  ) {
    ENGINE.clearLayer(floorLayer);
    ENGINE.clearLayer(wallLayer);
    ENGINE.fill(LAYER[floorLayer], floorIMG);
    ENGINE.fill(LAYER[wallLayer], wallIMG);

    if (drawGrid) {
      ENGINE.clearLayer("grid");
      GRID.grid();
    }
  },
  repaint: function(
    grid,
    floorIMG,
    wallIMG,
    floorLayer = "floor",
    wallLayer = "wall",
    drawGrid = false
  ) {
    GRID.paint(grid, floorIMG, wallIMG, floorLayer, wallLayer, drawGrid);
    const height = grid.length;
    const width = grid[0].length;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        if (grid[y].charAt(x) === "0") {
          let point = GRID.gridToCoord({ x: x, y: y });
          ENGINE.cutGrid(LAYER[wallLayer], point);
        }
      }
    }
  },
  map: {
    pack: function(grid) {
      var RL = grid.length;
      var converted = [];
      for (var i = 0; i < RL; i++) {
        converted.push(parseInt(grid[i], 2));
      }
      return converted;
    },
    unpack: function(map) {
      var h = map.height;
      var w = map.width;
      if (h != map.grid.length) {
        throw "Map corrupted: height:" + h + " grid.length: " + map.grid.length;
      }
      var binary = [];
      for (var i = 0; i < h; i++) {
        let binTemp = float64ToInt64Binary(map.grid[i]).padStart(w, "0");
        binary.push(binTemp);
      }
      return binary;
    }
  },
  isBlock: function(x, y, map = MAP[GAME.level]) {
    var block = map.grid[y].charAt(x);
    if (block === "1") {
      return true;
    } else return false;
  },
  gridIsBlock: function(grid, map = MAP[GAME.level]){
    return GRID.isBlock(grid.x, grid.y, map);
  },
  trueToGrid: function(actor) {
    var TX = actor.x - ENGINE.INI.GRIDPIX / 2;
    var TY = actor.y - ENGINE.INI.GRIDPIX / 2;
    var GX = TX / ENGINE.INI.GRIDPIX;
    var GY = TY / ENGINE.INI.GRIDPIX;
    var MX = TX % ENGINE.INI.GRIDPIX;
    var MY = TY % ENGINE.INI.GRIDPIX;
    if (MX || MY) {
      return null;
    } else return { x: GX, y: GY };
  },
  same: function(grid1, grid2) {
    if (grid1 === null || grid2 === null) return false;
    if (grid1.x === grid2.x && grid1.y === grid2.y) {
      return true;
    } else return false;
  },
  isGridIn: function(grid, gridArray) {
    for (var q = 0; q < gridArray.length; q++) {
      if (grid.x === gridArray[q].x && grid.y === gridArray[q].y) {
        return q;
      }
    }
    return -1;
  },
  getDirections: function(grid) {
    var directions = [];
    for (let D = 0; D < ENGINE.directions.length; D++) {
      let x = grid.x + ENGINE.directions[D].x;
      let y = grid.y + ENGINE.directions[D].y;
      if (!GRID.isBlock(x, y)) {
        directions.push(ENGINE.directions[D]);
      }
    }
    return directions;
  },
  findCrossroad: function(start, dir) {
    let directions = GRID.getDirections(start);
    let back = dir.mirror();
    let BI = back.isInAt(directions);
    if (BI !== -1) directions.splice(BI, 1);
    while (directions.length < 2) {
      dir = directions[0];
      start = start.add(dir);
      directions = GRID.getDirections(start);
      back = dir.mirror();
      BI = back.isInAt(directions);
      if (BI !== -1) directions.splice(BI, 1);
    }
    return start;
  },
  findCrossroadAndLastDir: function(start, dir) {
    let directions = GRID.getDirections(start);
    let back = dir.mirror();
    let BI = back.isInAt(directions);
    if (BI !== -1) directions.splice(BI, 1);
    while (directions.length < 2) {
      dir = directions[0];
      start = start.add(dir);
      directions = GRID.getDirections(start);
      back = dir.mirror();
      BI = back.isInAt(directions);
      if (BI !== -1) directions.splice(BI, 1);
    }
    return { finish: start, dir: dir };
  },
  pathToCrossroad: function(start, dir) {
    let path = [];
    path.push(dir);
    start = start.add(dir);
    let directions = GRID.getDirections(start);
    let back = dir.mirror();
    let BI = back.isInAt(directions);
    if (BI !== -1) directions.splice(BI, 1);
    while (directions.length < 2) {
      dir = directions[0];
      path.push(dir);
      start = start.add(dir);
      directions = GRID.getDirections(start);
      back = dir.mirror();
      BI = back.isInAt(directions);
      if (BI !== -1) directions.splice(BI, 1);
    }
    return path;
  },
  findLengthToCrossroad: function(start, stack) {
    if (stack === null) return;
    var q = 0;
    do {
      if (stack[q] === undefined) return null;
      start = start.add(stack[q]);
      q++;
    } while (GRID.getDirections(start).length < 3);
    return q;
  },
  translateMove: function(entity, changeView = false, onFinish = null) {
    entity.actor.x += entity.MoveState.dir.x * entity.speed;
    entity.actor.y += entity.MoveState.dir.y * entity.speed;
    entity.actor.orientation = entity.actor.getOrientation(
      entity.MoveState.dir
    );
    entity.actor.animateMove(entity.actor.orientation);
    entity.MoveState.homeGrid = GRID.coordToGrid(
      entity.actor.x,
      entity.actor.y
    );

    if (changeView) {
      ENGINE.VIEWPORT.check(entity.actor);
    }

    ENGINE.VIEWPORT.alignTo(entity.actor);
    if (GRID.same(entity.MoveState.endGrid, GRID.trueToGrid(entity.actor))) {
      entity.MoveState.moving = false;
      entity.MoveState.startGrid = entity.MoveState.endGrid;
      entity.MoveState.homeGrid = entity.MoveState.endGrid;

      if (onFinish) onFinish.call();
    }
  },
  findPath: function(start, finish, firstDir = new Vector(0, 0)) {
    if (GRID.isBlock(finish.x, finish.y)) {
      throw "Finging path to block, you idiot!";
    }
    var Q = new NodeQ();
    Q.list.push(new Node(start, finish, [firstDir]));
    if (Q.list[0].dist === 0) return null;
    var selected;
    var round;
    while (Q.list.length > 0) {
      selected = Q.list.shift();
      let dirs = GRID.getDirections(selected.grid);
      let back = selected.prevDir[selected.prevDir.length - 1].mirror();
      let iB = back.isInAt(dirs);
      if (iB !== -1) {
        let waste = dirs.splice(iB, 1);
      }
      for (let q = 0; q < dirs.length; q++) {
        let HG = new Vector(
          selected.grid.x + dirs[q].x,
          selected.grid.y + dirs[q].y
        );
        let I_stack = [].concat(selected.prevDir);
        I_stack.push(dirs[q]);
        let node = new Node(HG, finish, I_stack, selected.path + 1);

        if (node.dist === 0) {
          node.prevDir.splice(0, 1);
          return node.prevDir;
        }

        //if (node.priority < perfect + INI.PATH_TOLERANCE) Q.queue(node);
        Q.queue(node);
      }
      round++;
      if (round > ENGINE.INI.PATH_ROUNDS) {
        console.error("ENGINE:", round, "pathfinding fuckup. returning partial", Q);
        break;
      }
    }
    if (Q.list.length > 0) {
      Q.list[0].prevDir.splice(0, 1);
      return Q.list[0].prevDir;
    } else {
      selected.prevDir.splice(0, 1);
      return selected.prevDir;
    }
  },
  paintPath: function(layer, color, path, start, z = 0) {
    if (path === null) return;
    var CTX = LAYER[layer];
    ENGINE.clearLayer(layer);
    CTX.strokeStyle = color;
    var point = GRID.gridToCenterPX(start);
    point.toViewport();
    var PL = path.length;
    CTX.beginPath();
    CTX.moveTo(point.x + z, point.y + z);
    for (let q = 0; q < PL; q++) {
      point = point.translate(path[q]);
      CTX.lineTo(point.x + z, point.y + z);
      CTX.stroke();
    }
  },
  AI: {
    advancer: {
      hunt: function() {
        let next = GRID.findCrossroadAndLastDir(
          HERO.MoveState.startGrid,
          HERO.MoveState.dir
        );
        let nextCR = next.finish;
        let directions = GRID.getDirections(nextCR);
        let back = next.dir.mirror();
        let BI = back.isInAt(directions);
        if (BI !== -1) directions.splice(BI, 1);
        if (HERO.MoveState.dir.isInAt(directions) !== -1) {
          return {
            type: "grid",
            return: GRID.findCrossroad(
              nextCR.add(HERO.MoveState.dir),
              HERO.MoveState.dir
            )
          };
        } else {
          let LNs = [];
          let CRs = [];
          for (let q = 0; q < directions.length; q++) {
            CRs.push(
              GRID.findCrossroad(nextCR.add(directions[q]), directions[q])
            );
            LNs.push(CRs[q].distance(HERO.MoveState.startGrid));
          }
          let qq = LNs.indexOf(Math.min(...LNs));
          return { type: "grid", return: CRs[qq] };
        }
      }
    },
    default: {
      hunt: function() {
        return {
          type: "grid",
          return: GRID.findCrossroad(
            HERO.MoveState.startGrid,
            HERO.MoveState.dir
          )
        };
      }
    },
    shadower: {
      hunt: function(MS, tolerance) {
        let solutions = MS.endGrid.directionSolutions(HERO.MoveState.homeGrid);
        let directions = GRID.getDirections(MS.endGrid);
        let back = MS.dir.mirror();
        let BI = back.isInAt(directions);
        if (BI !== -1) directions.splice(BI, 1);
        let selected;
        if (directions.length === 1) {
          selected = directions[0];
        } else {
          if (
            MS.goingAway(HERO.MoveState) ||
            !MS.towards(HERO.MoveState, tolerance)
          ) {
            if (HERO.MoveState.dir.isInAt(directions) !== -1) {
              selected = HERO.MoveState.dir;
            } else selected = solve();
          } else {
            let contra = HERO.MoveState.dir.mirror();
            if (contra.isInAt(directions) !== -1) {
              selected = contra;
            } else selected = solve();
          }
        }
        if (!selected) {
          selected = directions.chooseRandom();
        }
        let path = GRID.pathToCrossroad(MS.endGrid, selected);
        return { type: "path", return: path };

        function solve() {
          for (let q = 0; q < 2; q++) {
            if (solutions[q].dir.isInAt(directions) !== -1)
              return solutions[q].dir;
          }
          return null;
        }
      }
    },
    follower: {
      hunt: function() {
        return {
          type: "grid",
          return: GRID.findCrossroad(
            HERO.MoveState.startGrid,
            HERO.MoveState.dir.mirror()
          )
        };
      }
    },
    wanderer: {
      hunt: function(MS) {
        let directions = GRID.getDirections(MS.endGrid);
        let back = MS.dir.mirror();
        let BI = back.isInAt(directions);
        if (BI !== -1) directions.splice(BI, 1);
        let selected = directions.chooseRandom();
        let path = GRID.pathToCrossroad(MS.endGrid, selected);
        return { type: "path", return: path };
      }
    }
  }
};

class Node {
  constructor(HG, goal, stack, path) {
    this.grid = HG;
    this.prevDir = stack;
    this.path = path || 0;
    this.dist = this.grid.distance(goal);
    this.priority = this.path + this.dist;
  }
}
class NodeQ {
  constructor() {
    this.list = [];
  }
  queue(node) {
    var included = false;
    for (let q = 0; q < this.list.length; q++) {
      if (this.list[q].priority > node.priority) {
        this.list.splice(q, 0, node);
        included = true;
        break;
      }
    }
    if (!included) this.list.push(node);
  }
}
class MoveState {
  constructor(startGrid, dir) {
    this.startGrid = Grid.toClass(startGrid);
    this.dir = dir || null;
    this.homeGrid = Grid.toClass(startGrid);
    this.endGrid = Grid.toClass(startGrid);
    this.moving = false;
  }
  setEnd() {
    if (this.dir !== null) {
      this.endGrid = this.startGrid.add(this.dir);
      this.moving = true;
    }
  }
  next(dir) {
    this.startGrid = this.endGrid;
    this.dir = dir;
    this.setEnd();
  }
  flip() {
    this.homeGrid = this.startGrid;
    this.startGrid = this.endGrid;
    this.endGrid = this.homeGrid;
  }
  goingAway(MS) {
    let oldDistance = this.homeGrid.distance(MS.startGrid);
    let newDistance = this.homeGrid.distance(MS.startGrid.add(MS.dir));
    return newDistance > oldDistance;
  }
  towards(MS, tolerance = 5) {
    let oldDistance = this.homeGrid.distance(MS.startGrid);
    let newDistance = this.homeGrid.distance(MS.startGrid.add(MS.dir));
    return newDistance < oldDistance && newDistance < tolerance;
  }
}

//END
console.log(`%cENGINE ${ENGINE.VERSION} loaded.`, ENGINE.CSS);
