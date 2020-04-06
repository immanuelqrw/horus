/* HTML button interaction scripts */
import $ from "jquery";
import seedrandom from "seedrandom";
let activeRow = [];

export function SetHover(i) {
  let hex = document.getElementById("hex" + i);
  hex.childNodes[0].style.backgroundColor = "rgba(255,255,255,0.3)";

  if (activeRow.length > 0) {
    return;
  }

  let lightlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for (let key in INDICES_PER_ROW) {
    if (INDICES_PER_ROW.hasOwnProperty(key)) {
      for (let r = 0; r < INDICES_PER_ROW[key].length; r++) {
        if (INDICES_PER_ROW[key][r] === i) {
          for (let j = 0; j < INDICES_PER_ROW[key].length; j++) {
            lightlist[INDICES_PER_ROW[key][j]] = 1;
          }
        }
      }
    }
  }
    
  for (i = 1; i <= 19; i++) {
    if (lightlist[i] === 0) {
      hex = document.getElementById("hex" + i);
      hex.childNodes[0].style.backgroundColor = "rgba(0,0,0,.5)";
    }
  }
}

export function SetRowHover(i) {
  let hex = document.getElementById("row" + i);
  hex.childNodes[0].style.backgroundColor = "rgba(255,255,255,0.3)";
}

export function ClearRowHover() {
  for (let i = 1; i <= 5; i++) {
    let hex = document.getElementById("row" + i);
    hex.childNodes[0].style.backgroundColor = "";
  }
}

export function RowHover(row) {
  let lightlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


  if (!row && activeRow.length === 0) {
    return;
  }

  if (row) {
    if (activeRow.indexOf(row) === -1) {
      document.getElementById("hexheader" + row).style.backgroundColor = 'blue';    
    }

    for (let r = 0; r < INDICES_PER_ROW[row].length; r++) {
      lightlist[INDICES_PER_ROW[row][r]] = 1;
    } 
  }

  for (let aRow = 0; aRow < activeRow.length; aRow++) {
    for (let r = 0; r < INDICES_PER_ROW[activeRow[aRow]].length; r++) {
      lightlist[INDICES_PER_ROW[activeRow[aRow]][r]] = 1;
    }    
  }

  for (let i = 1; i <= 19; i++) {
      let hex = document.getElementById("hex" + i);
    if (lightlist[i] === 0) {
      hex.childNodes[0].style.backgroundColor = "rgba(0,0,0,.5)";
    } else {
      hex.childNodes[0].style.backgroundColor = "";      
    }
  }
}

export function ClearHover() {
  for (let key in INDICES_PER_ROW) {
    if (INDICES_PER_ROW.hasOwnProperty(key)) {
      if (activeRow.indexOf(key) === -1) {
        if (document.getElementById("hexheader" + key) === null) { continue; }
        document.getElementById("hexheader" + key).style.backgroundColor = '';    
      }
    }
  }
  CheckBadRow();

  for (let i = 1; i <= 19; i++) {
    let hex = document.getElementById("hex" + i);
    if (hex === null) { continue; }
    hex.childNodes[0].style.backgroundColor = "";
  }

  RowHover();
}

export function RowClick(row) {
  if (activeRow.indexOf(row) != -1) {
    document.getElementById("hexheader" + row).style.backgroundColor = '';
    activeRow.splice(activeRow.indexOf(row), 1);
    ClearHover();
    return;
  }

  activeRow.push(row);
  document.getElementById("hexheader" + row).style.backgroundColor = 'green';
  ClearHover();
}

export function hasClass(el, className) {
  if(el === null || el === undefined) { return false; }
  if (el.classList) {
    return el.classList.contains(className);
  }
  else {
    if (el.className === null || el.className === undefined) { return false; }
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

export function addClass(el, className) {
  if(el === null) { return; }
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className
}

export function removeClass(el, className) {
  if(el === null) { return; }

  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

    el.className = el.className.replace(reg, ' ');
  }
}

export function hexLClick(hex, next) {
  if (!hasClass(hex, 'SelectedGreenHex')) {
    addClass(hex, 'SelectedGreenHex');

    if (next) {
      $("#row" + next).show();   
      fitToParent(".rowspan");
    }
  } else {
    removeClass(hex, 'SelectedGreenHex');
  }
  removeClass(hex, 'SelectedRedHex');
  CheckBadRow();
}
export function hexRClick(hex) {
  if (!hasClass(hex, 'SelectedRedHex')) {
    addClass(hex, 'SelectedRedHex');
  } else {
    removeClass(hex, 'SelectedRedHex');
  }
  removeClass(hex, 'SelectedGreenHex');
  CheckBadRow();
  return false;
}

export function CheckBadRow() { 
  for (let key in INDICES_PER_ROW) {
    if (INDICES_PER_ROW.hasOwnProperty(key)) {
      let rowheader = document.getElementById("hexheader" + key);
      if (rowheader === null) { continue; }
      if (rowheader.style.backgroundColor === 'darkred' || rowheader.style.backgroundColor === '') {
        rowheader.style.backgroundColor = '';
        let done = true;
        for (let r = 0; r < INDICES_PER_ROW[key].length; r++) {
          let hex = document.getElementById("hex" + INDICES_PER_ROW[key][r])
          if (!hasClass(hex, 'SelectedGreenHex')) {
            done = false;
          }
          if (hasClass(hex, 'SelectedRedHex')) {
            rowheader.style.backgroundColor = 'darkred';
            break;
          }
        }
        if (done) {
            rowheader.style.backgroundColor = 'gold';          
        }
      }
    }
  }
}

  
/* Bingo gneration scripts */

/*
     1  2 3
   4  5  6  7
 8  9  10 11 12
  13 14 15 16
    17 18 19
  */

let magicHex =
    [3, 17, 18, 
   19, 7, 1, 11, 
  16, 2, 5, 6, 9, 
   12, 4, 8, 14, 
    10, 13, 15];

let rotateHex =
    [8, 4, 1,
   13, 9, 5, 2,
 17, 14, 10, 6, 3,
  18, 15, 11, 7,
    19,16, 12];

let flipHex =
    [3, 2, 1,
   7, 6, 5, 4,
 12, 11, 10, 9, 8,
  16, 15, 14, 13,
    19, 18, 17];


export function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// This function checks if the specified event is supported by the browser.
// Source: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
export function isEventSupported(eventName) {
  let el = document.createElement('div');
  eventName = 'on' + eventName;
  let isSupported = (eventName in el);
  if (!isSupported) {
    el.setAttribute(eventName, 'return;');
    isSupported = typeof el[eventName] === 'function';
  }
  el = null;
  return isSupported;
}

export function isFraction(num) {
  if (!isNaN(num)) {
    return true;
  }

  let part = num.split("/");
  return ((part.length === 2) && (!isNaN(part[0])) && (!isNaN(part[1])));
}

export function incFraction(num) {
  if (!isNaN(num)) {
    return "1/" + num;
  }

  let part = num.split("/");
  if (part.length != 2) {
    return "NaF";
  }

  if (part[0] - part[1] < 0) {
    part[0]++;
  }

  return part.join("/");
}

export function decFraction(num) {
  if (!isNaN(num)) {
    return num;
  }

  let part = num.split("/");
  if (part.length != 2) {
    return "NaF";
  }

  if (part[0] > 1) {
    part[0]--;
    return part.join("/");
  }
  else {
    return part[1];
  }
}

export function isWhole(num) {
  if (!isNaN(num)) {
    return false;
  }

  let part = num.split("/");
  if (part.length != 2) {
    return false;
  }

  return part[0] === part[1];
}

window.onload = LoadPage;
export function LoadPage() {
  let parts = window.location.search.substr(1).split("&");
  let $_GET = {};
  for (let i = 0; i < parts.length; i++) {
    let temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
  }

  let seed = $_GET.seed;
  if (seed === undefined) {
    seed = '';
  }
  if (document.getElementById("rngseed") !== null) {
    document.getElementById("rngseed").value = seed;
  }

  let game = $_GET.game;
  if (game === undefined || game === "") {
    game = 'botw-mount';
  }
  game += '.js';
  if (document.getElementById("bingogame") !== null) {
    document.getElementById("bingogame").value = game;
  }

  let type = $_GET.type;
  if (type === undefined || type === "") {
    type = 'hex';
  }
  if (document.getElementById("bingotype") !== null) {
    document.getElementById("bingotype").value = type;
  }
  LoadGoalListJS(GenerateBoard);

  $(".hexheaderIn").on( {
    'mouseleave':function() { ClearHover(); }
  });


  // Check which wheel event is supported. Don't use both as it would fire each event 
  // in browsers where both events are supported.
  let wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';

  // Now bind the event to the desired element
  $('.hexIn').on(wheelEvent, function(e) {
    let oEvent = e.originalEvent;
    let delta = -oEvent.deltaY || oEvent.wheelDelta;

    let goal = this.childNodes[1].innerText.split(' ');
    let counter = false;
    if (delta > 0) {
      // Scrolled up
      if (hasClass(this, 'SelectedRedHex')) {
        removeClass(this, 'SelectedRedHex');
        CheckBadRow();
        return;
      }

      for (let i = 0; i < goal.length; i++) {
        if (isFraction(goal[i])) {
          let num = incFraction(goal[i]);
          if (num != "NaF" && num != goal[i]) {
            goal[i] = num;
            counter = true;

            if (isWhole(num)) {
              addClass(this, 'SelectedGreenHex');
            } else {
              removeClass(this, 'SelectedGreenHex');
            }
            removeClass(this, 'SelectedRedHex');
            CheckBadRow();
          }
        }
      }
      if (!counter) {
        addClass(this, 'SelectedGreenHex');
        removeClass(this, 'SelectedRedHex');
        CheckBadRow();
      }
    } else {
      // Scrolled down
      for (let i = 0; i < goal.length; i++) {
        if (isNaN(goal[i]) && isFraction(goal[i])) {
          let num = decFraction(goal[i]);
          if (num != "NaF" && num != goal[i]) {
            goal[i] = num;
            counter = true;
            removeClass(this, 'SelectedGreenHex');
            removeClass(this, 'SelectedRedHex');
            CheckBadRow();
          }
        }
      }
      if (!counter) {
        if (hasClass(this, 'SelectedGreenHex')) {
          removeClass(this, 'SelectedGreenHex');
        } else {
          addClass(this, 'SelectedRedHex');
        }
        CheckBadRow();
      }
    }
    this.childNodes[1].innerText = goal.join(' ');  
  });
  // Now bind the event to the desired element
  $('.rowcell').on(wheelEvent, function(e) {
    let oEvent = e.originalEvent;
    let delta = -oEvent.deltaY || oEvent.wheelDelta;

    let goal = this.childNodes[0].innerText.split(' ');
    let counter = false;
    if (delta > 0) {
      // Scrolled up
      if (hasClass(this, 'SelectedRedHex')) {
        removeClass(this, 'SelectedRedHex');
        CheckBadRow();
        return;
      }

      for (let i = 0; i < goal.length; i++) {
        if (isFraction(goal[i])) {
          let num = incFraction(goal[i]);
          if (num != "NaF" && num != goal[i]) {
            goal[i] = num;
            counter = true;

            if (isWhole(num)) {
              $("#row" + (parseInt(this.id[3]) + 1)).show(); 
              fitToParent(".rowspan");
            } else {
              removeClass(this, 'SelectedGreenHex');
            }
            removeClass(this, 'SelectedRedHex');
            CheckBadRow();
          }
        }
      }
      if (!counter) {
        addClass(this, 'SelectedGreenHex');
        $("#row" + (parseInt(this.id[3]) + 1)).show(); 
        fitToParent(".rowspan");
        removeClass(this, 'SelectedRedHex');
        CheckBadRow();
      }
    } else {
      // Scrolled down
      for (let i = 0; i < goal.length; i++) {
        if (isNaN(goal[i]) && isFraction(goal[i])) {
          let num = decFraction(goal[i]);
          if (num != "NaF" && num != goal[i]) {
            goal[i] = num;
            counter = true;
            removeClass(this, 'SelectedGreenHex');
            removeClass(this, 'SelectedRedHex');
            CheckBadRow();
          }
        }
      }
      if (!counter) {
        if (hasClass(this, 'SelectedGreenHex')) {
          removeClass(this, 'SelectedGreenHex');
        } else {
          addClass(this, 'SelectedRedHex');
        }
        CheckBadRow();
      }
    }
    this.childNodes[0].innerText = goal.join(' ');  
  });
}

export default function LoadGoalListJS(callback) {
  let options = document.getElementById("bingogame");
  if (options === null) { return; }
  let file = options.value;
  if (file === 'URL') {
    file = prompt("Enter URL to bingo goal list JavaScript file");
    let x = document.getElementById("bingogame");
    let option = document.createElement("option");
    option.text = file;
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    options.add(option);
    options.selected = option;
  } else if (file === 'JSON') {
    window.window.bingoList = JSON.parse(prompt("Paste JSON object of the bingo goal list"));
    return;
  } else {
    file = "goallist/" + file;
  }

  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = file; 

  if (callback) {
    script.onload = callback;
  }

  document.getElementsByTagName("head")[0].appendChild(script);
}


/**
 * Fit all elements matching a given CSS selector to their parent elements'
 * width and height, by adjusting the font-size attribute to be as large as
 * possible. Uses binary search.
 */
export let fitToParent = function(selector) {
    let numIter = 5;  // Number of binary search iterations
    let regexp = /\d+(\.\d+)?/;
    let fontSize = function(elem) {
        let match = elem.css('font-size').match(regexp);
        let size = match === null ? 16 : parseFloat(match[0]);
        return isNaN(size) ? 16 : size;
    };

    let sizes = [];
    $(selector).each(function() {
        let elem = $(this);
        let parentWidth = elem.parent().outerWidth();
        let parentHeight = elem.parent().height();
        //if (elem.outerWidth() > parentWidth || elem.outerHeight() > parentHeight) {
            let maxSize = 50, minSize = 0.1;
            let currSize = (minSize + maxSize) / 2;
            elem.css('overflow-wrap', 'break-word');
            for (let i = 0; i < numIter; i++) {
                currSize = (minSize + maxSize) / 2;
                elem.css('font-size', currSize);
                if ((elem.outerHeight() > parentHeight)) {
                    maxSize = currSize;
                } else {
                    minSize = currSize;
                }
            }
            //minSize = .1;
            elem.css('right', 'auto');
            elem.css('overflow-wrap', 'normal');
            do {
                if (elem.outerWidth() > parentWidth) {
                  currSize--;
                  elem.css('font-size', currSize);
                  minSize = currSize;
                } else {
                  break;
                }
            } while (true);
            elem.css('right', '');
            elem.css('font-size', minSize);
        //}

        sizes.push(Number(elem.css('font-size').slice(0, -2)));
    });

    let stats = CalculateStatistic(sizes);
    let maxSize = stats.mean - stats.std;

    $(selector).each(function(i, elem) {
      let currentSize = sizes[i];
      if (currentSize > maxSize) {
        // $(this).css('font-size', maxSize);
      }
      if (currentSize >= 4) {
        $(this).css('font-size', 10);
      } else if (currentSize >= 2 && currentSize <= 3) {
        $(this).css('font-size', 6);
      } else {
        $(this).css('font-size', 5);
      }
    });
};

export function CalculateStatistic(arr) {
  if (!arr || !arr.length) {
    return false;
  }

  let min = Math.min.apply(Math, arr);
  let max = Math.max.apply(Math, arr);

  let sum = arr.reduce(function(a, b) { return a + b; });
  let mean = sum / arr.length;

  let squarediffs = arr.map(function(x) {
    return Math.pow(x - mean, 2);
  });
  let std = Math.sqrt(squarediffs.reduce(function(a, b) { return a + b; }) 
    / (squarediffs.length - 1));


  return {
    sum: sum,
    mean: mean,
    std: std,
    min: min,
    max: max
  };
}



let bingoBoard = []; //the board itself stored as an array first
window.window.bingoList = {};
export function GenerateBoard() {
  for (let i = 1; i <= 19; i++) {
    let hex = document.getElementById("hex" + i);
    removeClass(hex, 'SelectedGreenHex');
    removeClass(hex, 'SelectedRedHex');
  }
  for (let i = 1; i <= 5; i++) {
    let hex = document.getElementById("row" + i);
    removeClass(hex, 'SelectedGreenHex');
    removeClass(hex, 'SelectedRedHex');
  }

  activeRow = [];
  ClearHover();

  if (window.bingoList['rules']) {
    $("#rulesbutton").show();
    let xmlString = window.bingoList['rules']
      , parser = new DOMParser()
      , doc = parser.parseFromString(xmlString, "text/html");
    document.getElementById("rules").replaceChild(doc.firstChild, document.getElementById("rules").childNodes[1]);
  } else {
    $("#rulesbutton").hide();
  }

  if (window.bingoList['tips']) {
    $("#tipsbutton").show(); 
    let xmlString = window.bingoList['tips']
      , parser = new DOMParser()
      , doc = parser.parseFromString(xmlString, "text/html");
    document.getElementById("tips").replaceChild(doc.firstChild, document.getElementById("tips").childNodes[1]);
  } else {
    $("#tipsbutton").hide();
  }

  let txtRNG = document.getElementById("rngseed");
  let rngseed = txtRNG.value
  if (rngseed === undefined || rngseed === '') {
    seedrandom();
    rngseed = Math.floor(Math.random() * 1000000).toString();
  }
  txtRNG.value = '';
  document.getElementById("seeddisplay").innerText = rngseed;

  let bingotype = document.getElementById("bingotype").value;

  window.history.replaceState(null, null,  
    "?seed=" + rngseed + 
    "&game=" + document.getElementById("bingogame").value.split('.')[0] +
    "&type=" + bingotype);

  seedrandom(rngseed);

  if (bingotype === "hex") {
    $("#rowContainer").hide();
    $("#hexContainer").show();
  }
  else if (bingotype === "mission") {
    $("#rowContainer").show();
    $("#hexContainer").hide();
  }

  let bingoGenerator = new BingoGenerator(window.bingoList,
    {
      "mode": "normal",
      "seed": rngseed
    });

  window.card = false;
  let iterations = 0;
  while (!window.card && iterations < 10) {
    if (bingotype === "hex"){
      window.card = bingoGenerator.makeCard();
    } 
    else if (bingotype === "mission") {
      window.card = bingoGenerator.makeMissions();
    }
    iterations++;
  }

  if (!window.card) { window.card = {}; }
  window.card["meta"] = {
    iterations: iterations
  };


  let populationOrder = [1, 5, 10, 15, 19]

  if (bingotype === "hex") {
    for (let i = 1; i <= 19; i++) {
      if (window.card[i] === undefined) { continue; }
        document.getElementById("hex" + i).childNodes[1].innerText = 
          window.card[i].name;
    }
    fitToParent('.hexspan');
  }
  else if (bingotype === "mission") {
    let elem;
    if (window.card[1] === undefined) { return; }
    document.getElementById("row1").childNodes[0].innerText = window.card[1].name;
    document.getElementById("row2").childNodes[0].innerText = window.card[5].name;
    document.getElementById("row3").childNodes[0].innerText = window.card[10].name;
    document.getElementById("row4").childNodes[0].innerText = window.card[15].name;
    document.getElementById("row5").childNodes[0].innerText = window.card[19].name;
    $("#row2").hide();
    $("#row3").hide();
    $("#row4").hide();
    $("#row5").hide();

    fitToParent('.rowspan');
  }
}



/* From SRL OoT Bingo Generator */
/* Modified for hexbingo and non-oot goal lists */

let TOO_MUCH_SYNERGY = 100;
let SQUARES_PER_ROW = 5;
let DEFAULT_PROFILE = {
  defaultMinimumSynergy: -3,
  defaultMaximumSynergy: 7,
  defaultMaximumIndividualSynergy: 4.5,
  defaultMaximumSpill: 2,
  defaultInitialOffset: 0.1,
  defaultMaximumOffset: 2,
  baselineTime: 28.25,
  timePerDifficulty: 0.75
};
let NORMAL_PROFILE = {
  defaultMinimumSynergy: DEFAULT_PROFILE.defaultMinimumSynergy,
  defaultMaximumSynergy: DEFAULT_PROFILE.defaultMaximumSynergy,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: DEFAULT_PROFILE.defaultInitialOffset,
  defaultMaximumOffset: DEFAULT_PROFILE.defaultMaximumOffset,
  baselineTime: DEFAULT_PROFILE.baselineTime,
  timePerDifficulty: DEFAULT_PROFILE.timePerDifficulty
};
let SHORT_PROFILE = {
  defaultMinimumSynergy: DEFAULT_PROFILE.defaultMinimumSynergy,
  defaultMaximumSynergy: 3,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: DEFAULT_PROFILE.defaultInitialOffset,
  defaultMaximumOffset: DEFAULT_PROFILE.defaultMaximumOffset,
  baselineTime: 12,
  timePerDifficulty: 0.5
};
let BLACKOUT_PROFILE = {
  defaultMinimumSynergy: -10,
  defaultMaximumSynergy: 10,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: 2,
  defaultMaximumOffset: 6,
  baselineTime: DEFAULT_PROFILE.baselineTime,
  timePerDifficulty: DEFAULT_PROFILE.timePerDifficulty
};
let SHORTBLACKOUT_PROFILE = {
  defaultMinimumSynergy: -4,
  defaultMaximumSynergy: 4,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: 2,
  defaultMaximumOffset: 6,
  baselineTime: 12,
  timePerDifficulty: 0.5
};

Array.prototype.sortNumerically = function() {
  return this.stableSort(function(a, b) {
    return a - b;
  });
};

Array.prototype.stableSort = function(compare) {
  if (this.length === 0) {
    return [];
  }

  if (!compare) {
    compare = function(a, b) {
      return a - b;
    }
  }
  let sorted = [this[0]];
  for (let i = 1; i < this.length; i++) {
    let x = this[i];
    let j = sorted.length - 1;
    while ((j >= 0) && (compare(sorted[j], x) > 0)) {
      sorted[j + 1] = sorted[j];
      j = j - 1;
    }
    sorted[j + 1] = x;
  }

  return sorted;
};

Array.prototype.shuffled = function() {
  let toShuffle = this.slice();
  for (let i = 0; i < toShuffle.length; i++) {
    let randElement = Math.floor(Math.random() * (i + 1));
    let temp = toShuffle[i];
    toShuffle[i] = toShuffle[randElement];
    toShuffle[randElement] = temp;
  }
  return toShuffle;
};

export function hasDuplicateStrings(array) {
  let seen = {};
  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (el in seen) {
      return true;
    }
    seen[el] = true;
  }
  return false;
}

let INDICES_PER_ROW = {
  'RO': [1, 2, 3],
  'RY': [2, 6, 11, 16],
  'RG': [1, 5, 10, 15, 19],
  'RB': [2, 5, 9, 13],
  'RP': [1, 4, 8],
  'OY': [3, 7, 12],
  'OG': [7, 11, 15, 18],
  'OB': [3, 6, 10, 14, 17],
  'OP': [4, 5, 6, 7],
  'YG': [12, 16, 19],
  'YB': [13, 14, 15, 16],
  'YP': [8, 9, 10, 11, 12],
  'GB': [17, 18, 19],
  'GP': [4, 9, 14, 18],
  'BP': [8, 13, 17]
};

export function invertObject(obj) {
  let ret = {};
  Object.keys(obj).forEach(function(key) {
    obj[key].forEach(function(item) {
      if (!ret[item]) ret[item] = [];
      ret[item].push(key);
    });
  });
  return ret;
}

let ROWS_PER_INDEX = invertObject(INDICES_PER_ROW);
let BingoGenerator = function(bingoList, options) {
  if (!options) {
    options = {};
  }
  this.language = options.lang || 'name';
  this.mode = options.mode || 'normal';
  this.seed = options.seed || Math.ceil(999999 * Math.random()).toString();

  if (window.bingoList.info && window.bingoList.info.isCombined === 'true') {
    if (window.bingoList[this.mode]) {
      window.bingoList = window.bingoList[this.mode];
    }
    else if (window.bingoList["normal"]) {
      window.bingoList = window.bingoList["normal"];
    }
  }

  this.profile = NORMAL_PROFILE;
  if (this.mode === 'short') {
    this.profile = SHORT_PROFILE;
  }
  else if (this.mode === 'blackout') {
    this.profile = BLACKOUT_PROFILE;
  }

  this.baselineTime = options.baselineTime || this.profile.baselineTime;
  this.timePerDifficulty = options.timePerDifficulty || this.profile.timePerDifficulty;
  this.minimumSynergy = options.minimumSynergy || this.profile.defaultMinimumSynergy;
  this.maximumSynergy = options.maximumSynergy || this.profile.defaultMaximumSynergy;
  this.maximumIndividualSynergy = options.maximumIndividualSynergy || this.profile.defaultMaximumIndividualSynergy;
  this.maximumSpill = options.maximumSpill || this.profile.defaultMaximumSpill;
  this.initialOffset = options.initialOffset || this.profile.defaultInitialOffset;
  this.maximumOffset = options.maximumOffset || this.profile.defaultMaximumOffset;

  this.goalsByDifficulty = window.bingoList;
  this.rowtypeTimeSave = window.bingoList.rowtypes;
  this.synergyFilters = window.bingoList.synfilters || {};
  this.goalsList = [];

  for (let i = 1; i <= 25; i++) {
    for (let g in window.bingoList[i]) {
      let goal = window.bingoList[i][g];
      if (!goal.difficulty) {
        goal.difficulty = i;
      }

      if (!goal.time) {
        goal.time = goal.difficulty * this.timePerDifficulty;          
      }

      if (!goal.id) {
        goal.id = goal.name;
      }

      if (!goal.types) {
        goal.types = {};
      } else if (Array.isArray(goal.types)) {
        let objTypes = {};
        for (let t = 0; t < goal.types.length; t++) {
          objTypes[goal.types[t]] = 1;
        }
        goal.types = objTypes;
      }
    }
  }

  for (let i = 1; i <= 25; i++) {
    this.goalsList = this.goalsList.concat(window.bingoList[i]);
  }

  this.goalsList = this.goalsList.stableSort(function(a, b) {
    if (a === undefined || b === undefined) { return; }
    let timeDiff = a.time - b.time;
    if (timeDiff !== 0) {
        return timeDiff;
    }
    if(a.id > b.id) {
        return 1;
    }
    else if (a.id < b.id) {
        return -1;
    }
    else {
        return 0;
    }
  });

  this.goalsByName = {};
  for (let i = 0; i < this.goalsList.length; i++) {
    let goal = this.goalsList[i];
    if (goal === undefined) { continue; }
    this.goalsByName[goal.name] = goal;
  }

  seedrandom(this.seed);
};

BingoGenerator.prototype.makeMissions = function() {

  let populationOrder = [1, 5, 10, 15, 19];
  this.bingoBoard = [];
  for (let i = 1; i <= 5; i++) {
    let difficulty = 1 + ((i - 1) * 5) + Math.floor(Math.random() * 5);
    this.bingoBoard[populationOrder[i - 1]] = {
      difficulty: difficulty,
      desiredTime: difficulty * this.timePerDifficulty
    };
  }

  for (let i = 1; i <= 5; i++) {
    let position = populationOrder[i - 1];

    let result = false;
    let desiredDifficulty = this.bingoBoard[position].difficulty;
    let desiredTime = desiredDifficulty * this.timePerDifficulty;
    for (let offset = this.initialOffset; offset <= this.maximumOffset; offset++) {
      let minTime = desiredTime - offset;
      let maxTime = desiredTime + offset;
      let goalsAtTime = this.getGoalsInTimeRange(minTime, maxTime).shuffled();

      for (let j = 0; j < goalsAtTime.length; j++) {
        let goal = goalsAtTime[j];
        if (this.hasGoalOnBoard(goal)) {
          continue;
        }

        result = {
          goal: goal,
        };
        offset = this.maximumOffset + 1;
        break;
      }
    }

    if (!result || !result.goal) {
      return false;
    }

    this.bingoBoard[position].types = result.goal.types;
    this.bingoBoard[position].subTypes = result.goal.subtypes;
    this.bingoBoard[position].rowtypes = result.goal.rowtypes;
    this.bingoBoard[position].name = result.goal[this.language] || result.goal.name;
    this.bingoBoard[position].id = result.goal.id;
    this.bingoBoard[position].time = result.goal.time;
    this.bingoBoard[position].goal = result.goal;
    this.bingoBoard[position].synergy = result.synergy;
  }

  return this.bingoBoard;  
};

BingoGenerator.prototype.makeCard = function() {
  this.bingoBoard = this.generateMagicSquare();
  let populationOrder = this.generatePopulationOrder();
  for (let i = 1; i <= 19; i++) {
    let nextPosition = populationOrder[i - 1];
    let result = this.chooseGoalForPosition(nextPosition);
    if (result.goal) {
      this.bingoBoard[nextPosition].types = result.goal.types;
      this.bingoBoard[nextPosition].subTypes = result.goal.subtypes;
      this.bingoBoard[nextPosition].rowtypes = result.goal.rowtypes;
      this.bingoBoard[nextPosition].name = result.goal[this.language] || result.goal.name;
      this.bingoBoard[nextPosition].id = result.goal.id;
      this.bingoBoard[nextPosition].time = result.goal.time;
      this.bingoBoard[nextPosition].goal = result.goal;
      this.bingoBoard[nextPosition].synergy = result.synergy;
    }
    else {
      return false;
    }
  }
  return this.bingoBoard;
};

BingoGenerator.prototype.generateMagicSquare = function() {
  let newhex = JSON.parse(JSON.stringify(magicHex));
  let copyhex = [];

  let flip = Math.floor(Math.random() * 2);
  if (flip) {
    copyhex = JSON.parse(JSON.stringify(newhex));
    for (let i = 0; i < 19; i++) {
      newhex[i] = copyhex[flipHex[i] - 1];
    }
  }

  let rotate = Math.floor(Math.random() * 6);
  for (; rotate > 0; rotate--) {
    copyhex = JSON.parse(JSON.stringify(newhex));
    for (let i = 0; i < 19; i++) {
      newhex[i] = copyhex[rotateHex[i] - 1];
    }
  }

  let newdiff = 0;
  let maxdiff = 0;
  let diffmap = [];
  for (let i = 1; i <= 19; i++) {
    do {
      newdiff = clamp(Math.floor((i - 1) * 25.1 / 19) +
        (Math.floor(Math.random() * 3) - 1),
        1, 25);
    } while (newdiff <= maxdiff);
    diffmap[i] = newdiff;
    maxdiff = newdiff;
  }
    
  for (let i = 0; i < 19; i++) {
    newhex[i] = diffmap[newhex[i]];
  }
  
  let magicSquare = [];
  for (let i = 1; i <= 19; i++) {
    let difficulty = newhex[i - 1];
    magicSquare[i] = {
      difficulty: difficulty,
      desiredTime: difficulty * this.timePerDifficulty
    };
  }
 return magicSquare;
};

BingoGenerator.prototype.chooseGoalForPosition = function(position) {
  let desiredDifficulty = this.bingoBoard[position].difficulty;
  let desiredTime = desiredDifficulty * this.timePerDifficulty;
  let bestGoals = [];
  for (let offset = this.initialOffset; offset <= this.maximumOffset; offset++) {
    let minTime = desiredTime - offset;
    let maxTime = desiredTime + offset;
    let goalsAtTime = this.getGoalsInTimeRange(minTime, maxTime);

    for (let j = 0; j < goalsAtTime.length; j++) {
      let goal = goalsAtTime[j];
      if (this.hasGoalOnBoard(goal)) {
        continue;
      }

      if(this.mode === 'blackout') {
        if (this.hasConflictsOnBoard(goal)) {
          continue;
        }
      }

      let synergies = this.checkLine(position, goal);
      synergies.weightedSynergy += offset;
      if (this.maximumSynergy >= synergies.maxSynergy && synergies.minSynergy >= this.minimumSynergy) {
        bestGoals.push({
          goal: goal,
          synergy: synergies.weightedSynergy
        });
      }
    }
  }

  if (bestGoals.length === 0) {
    return false;
  }

  let cutoff = 0.1 + Math.min.apply(Math, bestGoals.map(function(x) { 
    return x.synergy
  }));
  bestGoals = bestGoals.filter(function(goal) {
    return goal.synergy < cutoff;
  }).shuffled();

  return bestGoals[0] || false;
};

BingoGenerator.prototype.generatePopulationOrder = function() {
  return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].shuffled();
};

BingoGenerator.prototype.getGoalsInTimeRange = function(minTime, maxTime) {
  return this.goalsList.filter(function(goal) {
    if (goal === undefined) { return; }
    return minTime <= goal.time && goal.time <= maxTime;
  });
};

BingoGenerator.prototype.hasGoalOnBoard = function(goal) {
  for (let i = 1; i <= 19; i++) {
    if (this.bingoBoard[i] && this.bingoBoard[i].id === goal.id) {
      return true;
    }
  }
  return false;
};

BingoGenerator.prototype.hasConflictsOnBoard = function(goal) {
  for (let i = 1; i <= 19; i++) {
    let square = this.bingoBoard[i];
    if (square.goal) {
      let squares = [goal, square.goal];
      let synergy = this.evaluateSquares(squares);
      if (synergy >= TOO_MUCH_SYNERGY) {
        return true;
      }
    }
  }
  return false;
};

BingoGenerator.prototype.getOtherSquares = function(row, position) {
  let rowIndices = INDICES_PER_ROW[row].filter(function(index) {
    return index != position;
  });
  let board = this;
  return rowIndices.map(function(index) {
    return board.bingoBoard[index];
  });
};

BingoGenerator.prototype.checkLine = function(position, potentialGoal) {
  let rows = ROWS_PER_INDEX[position];
  let maxSynergy = 0;
  let minSynergy = TOO_MUCH_SYNERGY;
  let weightedSynergy = 0;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    let row = rows[rowIndex];
    let potentialSquare = JSON.parse(JSON.stringify(potentialGoal));
    potentialSquare.desiredTime = this.bingoBoard[position].desiredTime;
    let potentialRow = this.getOtherSquares(row, position);
    potentialRow.push(potentialSquare);
    let effectiveRowSynergy = this.evaluateSquares(potentialRow, row);
    maxSynergy = Math.max(maxSynergy, effectiveRowSynergy);
    minSynergy = Math.min(minSynergy, effectiveRowSynergy);
    weightedSynergy += Math.pow(effectiveRowSynergy, 2);
  }

  return {
    minSynergy: minSynergy,
    maxSynergy: maxSynergy,
    weightedSynergy: Math.sqrt(weightedSynergy)
  };
};

BingoGenerator.prototype.evaluateSquares = function(squares, row) {
  let ids = squares.map(function(el) {
    return el.id;
  }).filter(function(el) {
    return el;
  });
  if (hasDuplicateStrings(ids)) {
    return TOO_MUCH_SYNERGY;
  }

  let synergiesForSquares = this.calculateSynergiesForSquares(squares);
  return this.calculateEffectiveSynergyForSquares(synergiesForSquares, row);
};

BingoGenerator.prototype.calculateSynergiesForSquares = function(squares) {
  let typeSynergies = {};
  let subtypeSynergies = {};
  let rowtypeSynergies = {};
  let timeDifferences = [];

  for (let m = 0; m < squares.length; m++) {
    let square = squares[m];
    this.mergeTypeSynergies(typeSynergies, square.types);
    this.mergeTypeSynergies(subtypeSynergies, square.subtypes);
    this.mergeTypeSynergies(rowtypeSynergies, square.rowtypes);
    if (square.time !== undefined && square.desiredTime !== undefined) {
      timeDifferences.push(square.desiredTime - square.time);
    }
  }

  return {
    typeSynergies: typeSynergies,
    subtypeSynergies: subtypeSynergies,
    rowtypeSynergies: rowtypeSynergies,
    goals: squares,
    timeDifferences: timeDifferences
  };
};

BingoGenerator.prototype.mergeTypeSynergies = function(typeSynergies, newTypeSynergies) {
  for (let type in newTypeSynergies) {
    if (!typeSynergies[type]) {
      typeSynergies[type] = [];
    }
    typeSynergies[type].push(newTypeSynergies[type]);
  }
};

BingoGenerator.prototype.calculateCombinedTypeSynergies = function(synergiesForSquares) {
  let typeSynergies = synergiesForSquares.typeSynergies;
  let subtypeSynergies = synergiesForSquares.subtypeSynergies;
  let combinedTypeSynergies = {};
  for (let type in typeSynergies) {
    if (type in subtypeSynergies) {
      combinedTypeSynergies[type] = typeSynergies[type].concat(subtypeSynergies[type]);
    }
    else {
      combinedTypeSynergies[type] = typeSynergies[type];
    }
  }
  return combinedTypeSynergies;
};

BingoGenerator.prototype.filterRowtypeSynergies = function(synergiesForSquares, row) {
  let rowtypeSynergies = {};
  for (let rowtype in synergiesForSquares.rowtypeSynergies) {
    let rowtypeSynergy = synergiesForSquares.rowtypeSynergies[rowtype];
    if (!row || rowtypeSynergy.length < INDICES_PER_ROW[row]) {
      continue;
    }
    let rowtypeCost = 0;
    for (let i = 0; i < rowtypeSynergy.length; i++) {
      rowtypeCost += rowtypeSynergy[i];
    }
    if(this.rowtypeTimeSave[rowtype] > rowtypeCost) {
      rowtypeSynergies[rowtype] = this.rowtypeTimeSave[rowtype] - rowtypeCost;
    }
  }
  return rowtypeSynergies;
};

BingoGenerator.prototype.calculateEffectiveTypeSynergies = function(typeSynergies) {
  let effectiveTypeSynergies = {};
  for (let type in typeSynergies) {
    let synergies = typeSynergies[type];
    let effectiveSynergies = this.filterSynergyValuesForType(type, synergies);
    if (effectiveSynergies.length > 0) {
      effectiveTypeSynergies[type] = effectiveSynergies;
    }
  }
  return effectiveTypeSynergies;
};

BingoGenerator.prototype.filterSynergyValuesForType = function(type, synergies) {
  synergies = synergies.sortNumerically();
  let filter = this.synergyFilters[type] || "";
  if (/^min/.test(filter)) {
    let count = Number(filter.split(" ")[1]);
    return synergies.slice(0, count);
  }
  else if (/^max/.test(filter)) {
    let count = Number(filter.split(" ")[1]);
    synergies.reverse();
    return synergies.slice(0, count);
  }
  else {
    return synergies.slice(0, -1);
  }
};

BingoGenerator.prototype.calculateEffectiveSynergyForSquares = function(synergiesForSquares, row) {
  let typeSynergies = this.calculateCombinedTypeSynergies(synergiesForSquares);
  let rowtypeSynergies = this.filterRowtypeSynergies(synergiesForSquares, row);
  let effectiveTypeSynergies = this.calculateEffectiveTypeSynergies(typeSynergies);


  let rowSynergy = 0;
  for (let type in effectiveTypeSynergies) {
    let synergies = effectiveTypeSynergies[type];
    for (let i = 0; i < synergies.length; i++) {
      if (synergies[i] > this.maximumIndividualSynergy) {
        return TOO_MUCH_SYNERGY;
      }
      rowSynergy += synergies[i];
    }
  }

  for(let rowtype in rowtypeSynergies) {
    rowSynergy += rowtypeSynergies[rowtype];
  }

  let timeDifferences = synergiesForSquares.timeDifferences;
  for (let i = 0; i < timeDifferences.length; i++) {
    let timeDifference = timeDifferences[i];
    rowSynergy += timeDifference;
  }

  return rowSynergy;
};
