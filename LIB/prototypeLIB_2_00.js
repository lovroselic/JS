console.clear();
console.log("Prototype LIB 2.00 loaded!");
/*

Prototype and helpful functions library
as used by LS
version 2.00

changelog:
2.00: new main version, no backwards compatibility

*/

(function() {
  function RND(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
  }

  function coinFlip() {
    let flip = RND(0, 1);
    if (flip) return true;
    return false;
  }
  function probable(x) {
    let flip = RND(0, 99);
    if (flip <= x) return true;
    return false;
  }
  window.RND = RND;
  window.coinFlip = coinFlip;
  window.probable = probable;
})();

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

CanvasRenderingContext2D.prototype.pixelAt = function(x, y, size) {
  size = size || 1; // default
  this.fillRect(x, y, size, size);
};
CanvasRenderingContext2D.prototype.roundRect = function(
  x,
  y,
  width,
  height,
  radius,
  fill,
  stroke
) {
  var cornerRadius = {
    upperLeft: 0,
    upperRight: 0,
    lowerLeft: 0,
    lowerRight: 0
  };
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "object") {
    for (let side in radius) {
      cornerRadius[side] = radius[side];
    }
  }
  this.beginPath();
  this.moveTo(x + cornerRadius.upperLeft, y);
  this.lineTo(x + width - cornerRadius.upperRight, y);
  this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
  this.lineTo(x + width, y + height - cornerRadius.lowerRight);
  this.quadraticCurveTo(
    x + width,
    y + height,
    x + width - cornerRadius.lowerRight,
    y + height
  );
  this.lineTo(x + cornerRadius.lowerLeft, y + height);
  this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
  this.lineTo(x, y + cornerRadius.upperLeft);
  this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
  this.closePath();
  if (stroke) {
    this.stroke();
  }
  if (fill) {
    this.fill();
  }
};

/* collection of prototypes LS */

Array.prototype.clear = function() {
  if (!this) return false;
  this.splice(0, this.length);
};
Array.prototype.swap = function(x, y) {
  let TMP = this[x];
  this[x] = this[y];
  this[y] = TMP;
  return this;
};
Array.prototype.shuffle = function() {
  var i = this.length,
    j;
  while (--i > 0) {
    j = RND(0, i);
    this.swap(i, j);
  }
  return this;
};
Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};
Array.prototype.average = function() {
  return this.reduce((a, b) => a + b) / this.length;
};
Array.prototype.createPool = function(mx, N) {
  if (!this) return false;
  this.clear();
  var tempArray = [];
  for (var ix = 0; ix < mx; ix++) {
    tempArray[ix] = ix;
  }
  var top;
  for (var iy = 0; iy < N; iy++) {
    top = tempArray.length;
    var addx = RND(0, top - 1);
    this[iy] = tempArray[addx];
    tempArray.splice(addx, 1);
  }
  return this;
};
Array.prototype.compare = function(array) {
  if (!array) return false;
  var LN = this.length;
  if (LN !== array.length) return false;
  for (var x = 0; x < LN; x++) {
    if (this[x] !== array[x]) return false;
  }
  return true;
};
Array.prototype.remove = function(value) {
  var LN = this.length;
  for (var x = 0; x < LN; x++) {
    if (this[x] === value) {
      this.splice(x, 1);
      this.remove(value);
    }
  }
};
Array.prototype.chooseRandom = function() {
  let LN = this.length;
  let choose = RND(1, LN) - 1;
  return this[choose];
};
Array.prototype.removeRandom = function() {
  let LN = this.length;
  let choose = RND(1, LN) - 1;
  return this.splice(choose, 1)[0];
};
Array.prototype.clone = function() {
  return [].concat(this);
};
Array.prototype.sortByPropAsc = function(prop) {
  this.sort(sort);

  function sort(a, b) {
    return a[prop] - b[prop];
  }
};
Array.prototype.sortByPropDesc = function(prop) {
  this.sort(sort);

  function sort(a, b) {
    return b[prop] - a[prop];
  }
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};
String.prototype.trimSpace = function() {
  let temp = this.split(" ");
  temp.remove("");
  return temp.join(" ");
};
String.prototype.changeChar = function(at, char) {
  let LN = this.length - 1;
  if (at > LN || at < 0) return -1;
  const p1 = this.slice(0, at);
  const p2 = this.slice(at + 1, ++LN);
  return [p1, char, p2].join("");
};

class Grid {
  constructor(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
  }
  static toClass(grid) {
    return new Grid(grid.x, grid.y);
  }
  add(vector) {
    return new Grid(this.x + vector.x, this.y + vector.y);
  }
  isInAt(dirArray) {
    for (let q = 0; q < dirArray.length; q++) {
      if (this.x === dirArray[q].x && this.y === dirArray[q].y) {
        return q;
      }
    }
    return -1;
  }
  direction(vector) {
    var dx = (vector.x - this.x) / Math.abs(this.x - vector.x) || 0;
    var dy = (vector.y - this.y) / Math.abs(this.y - vector.y) || 0;
    return new Vector(dx, dy);
  }
  absDirection(vector) {
    let dx = vector.x - this.x;
    let dy = vector.y - this.y;
    return new Vector(dx, dy);
  }
  same(vector) {
    if (this.x === vector.x && this.y === vector.y) {
      return true;
    } else return false;
  }
  distance(vector) {
    let distance = Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y);
    return distance;
  }
  directionSolutions(vector) {
    let solutions = [];
    let dir = this.direction(vector);
    let absDir = this.absDirection(vector);
    let split = dir.ortoSplit();
    solutions.push(new Direction(split[0], Math.abs(absDir.x)));
    solutions.push(new Direction(split[1], Math.abs(absDir.y)));
    //SORT!!
    if (solutions[0].len < solutions[1].len) solutions.swap(0, 1); //check
    return solutions;
  }
}
class Vector {
  constructor(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
  }
  static toClass(vector) {
    return new Vector(vector.x, vector.y);
  }
  isInAt(dirArray) {
    for (let q = 0; q < dirArray.length; q++) {
      if (this.x === dirArray[q].x && this.y === dirArray[q].y) {
        return q;
      }
    }
    return -1;
  }
  isInPointerArray(dirArray) {
    for (let q = 0; q < dirArray.length; q++) {
      if (this.x === dirArray[q].vector.x && this.y === dirArray[q].vector.y) {
        return q;
      }
    }
    return -1;
  }
  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  mul(vector, num) {
    return new Vector(this.x + num * vector.x, this.y + num * vector.y);
  }
  distance(vector) {
    let distance = Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y);
    return distance;
  }
  mirror() {
    let nx, ny;
    if (this.x) {
      nx = -this.x;
    } else {
      nx = 0;
    }
    if (this.y) {
      ny = -this.y;
    } else {
      ny = 0;
    }
    return new Vector(nx, ny);
  }
  direction(vector) {
    let dx = (vector.x - this.x) / Math.abs(this.x - vector.x) || 0;
    let dy = (vector.y - this.y) / Math.abs(this.y - vector.y) || 0;
    return new Vector(dx, dy);
  }
  absDirection(vector) {
    let dx = vector.x - this.x;
    let dy = vector.y - this.y;
    return new Vector(dx, dy);
  }
  directionSolutions(vector) {
    let solutions = [];
    let dir = this.direction(vector);
    let absDir = this.absDirection(vector);
    let split = dir.ortoSplit();
    solutions.push(new Direction(split[0], Math.abs(absDir.x)));
    solutions.push(new Direction(split[1], Math.abs(absDir.y)));
    //SORT!!
    if (solutions[0].len < solutions[1].len) solutions.swap(0, 1); //check
    return solutions;
  }
  ortoSplit() {
    let split = [];
    split.push(new Vector(this.x, 0));
    split.push(new Vector(0, this.y));
    return split;
  }
  cw() {
    let directions = [UP, RIGHT, DOWN, LEFT];
    let q;
    for (q = 0; q < 4; q++) {
      if (this.same(directions[q])) {
        q++;
        if (q > 3) q = 0;
        return directions[q];
      }
    }
    return null;
  }
  ccw() {
    let directions = [UP, RIGHT, DOWN, LEFT];
    let q;
    for (q = 0; q < 4; q++) {
      if (this.same(directions[q])) {
        q--;
        if (q < 0) q = 3;
        return directions[q];
      }
    }
    return null;
  }
  same(vector) {
    if (this.x === vector.x && this.y === vector.y) {
      return true;
    } else return false;
  }
  isOrto() {
    return this.x * this.y === 0;
  }
  isContra(vector) {
    let X = this.x + vector.x;
    let Y = this.y + vector.y;
    return X === 0 && Y === 0;
  }
  getDirectionAxis(){
    if (this.x !== 0) {
      return "x";
    } else if (this.y !== 0) {
      return "y";
    } else throw("error getting direction axis from", this);
  }
  trimMirror(dirArray){
    let axis = this.getDirectionAxis();
    let LN = dirArray.length;
    for(let q = LN-1; q >= 0; q--){
      if (dirArray[q][axis] === this[axis]) dirArray.splice(q, 1);
    }
    
    return dirArray;
  }
}
class Direction {
  constructor(vector, len, weight) {
    //this.dir = vector;
    this.dir = new Vector(vector.x, vector.y);
    this.len = len || 1;
    this.weight = weight || 0;
  }
  isInAt(dirArray) {
    for (let q = 0; q < dirArray.length; q++) {
      if (
        this.dir.x === dirArray[q].dir.x &&
        this.dir.y === dirArray[q].dir.y
      ) {
        return q;
      }
    }
    return -1;
  }
}
class Point {
  constructor(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
  }
  static toClass(point) {
    return new Grid(point.x, point.y);
  }
  translate(vector, len = ENGINE.INI.GRIDPIX) {
    return new Point(this.x + vector.x * len, this.y + vector.y * len);
  }
  toViewport() {
    //change to offset
    this.x = this.x - ENGINE.VIEWPORT.vx;
    this.y = this.y - ENGINE.VIEWPORT.vy;
  }
}
class Pointer {
  constructor(grid, vector) {
    this.grid = Grid.toClass(grid);
    this.vector = Vector.toClass(vector);
  }
}
class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

var UP = new Vector(0, -1);
var DOWN = new Vector(0, 1);
var LEFT = new Vector(-1, 0);
var RIGHT = new Vector(1, 0);

var float64ToInt64Binary = (function() {
  //https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
  var flt64 = new Float64Array(1);
  var uint16 = new Uint16Array(flt64.buffer);
  var MAX_SAFE = Math.pow(2, 53) - 1;
  var MAX_INT32 = Math.pow(2, 31);

  function uint16ToBinary() {
    var bin64 = "";
    for (var word = 0; word < 4; word++) {
      bin64 = uint16[word].toString(2).padStart(16, 0) + bin64;
    }
    return bin64;
  }

  return function float64ToInt64Binary(number) {
    if (Math.abs(number) > MAX_SAFE) {
      throw new RangeError("Absolute value must be less than 2**53");
    }
    if (Math.abs(number) <= MAX_INT32) {
      return (number >>> 0).toString(2).padStart(64, "0");
    }

    // little endian byte ordering
    flt64[0] = number;

    // subtract bias from exponent bits
    var exponent = ((uint16[3] & 0x7ff0) >> 4) - 1023 + 1; //+1!!
    // encode implicit leading bit of mantissa
    uint16[3] |= 0x10;
    // clear exponent and sign bit
    uint16[3] &= 0x1f;
    // only keep integer part of mantissa
    var bin64 = uint16ToBinary().substr(11, Math.max(exponent, 0));
    return bin64;
  };
})();
