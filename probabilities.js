
function createTransitionMatrix(size) {

  // create matrix of zeros
  // cannot store as sparse matrix as math.multiply does not support this
  var matrix = math.zeros(size+1, size+1);

  // probability for 6-sided dice
  const std_prob = 1.0/6.0;

  // dice can only move player to spaces in front
  for (var i = 0; i <= size; i++) {
    for (var j = i+1; j <= size; j++) {
      // dice can move player a maximum of 6 spaces
      if (j <= i+6) {
        matrix.subset(math.index(i, j), std_prob);
      } else {
        break;
      }
    }

    // being less than 6 spaces from the end gives a greater probability of
    // reaching last space (winning)
    if (i > size - 6) {
      let factor = 7 - (size - i)
      matrix.subset(math.index(i, size), std_prob*factor)
    }
  }
  // player never moves from the final space once reached
  matrix.subset(math.index(size, size), 1)

  return matrix;
}

function createBoard(size){
  let row_clm = math.sqrt(size);
  let board = document.getElementById("board");

  spaces = "";

  for (var i = row_clm-1; i >= 0; i--) {
    spaces += "<tr>";
    if (i % 2 == 0) {
      for (var j = 1; j <= row_clm; j++) {
        let id = j+(10*i);
        spaces += ("<td id=\"" + id + "\" class=\"space\"></td>");
      }
    } else {
      for (var j = row_clm; j >= 1; j--) {
        let id = j+(10*i);
        spaces += ("<td id=\"" + id + "\" class=\"space\"></td>");
      }
    }
    spaces += "</tr>";
  }

  board.innerHTML = spaces;
}

function addProbabilitySpots() {
  spaces = document.getElementsByClassName("space");

  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = "<div class=\"spot\"></div>";
    // spaces[i].innerHTML = "<span class=\"spot\"></span>";
  }
}

// called on screen click
function getNewProbabilities(){
  // calculate probability vector
  v = math.multiply(v, T);

  // find max value
  let max = Math.max(...v.toArray());

  // add non-zero probabilities to screen
  for (var i = 1; i <= size; i++) {
    let value = v.subset(math.index(i));

    let spot = document.getElementById(i).firstChild;
    spot.style.opacity = value/max;
    spot.innerHTML = value.toFixed(2);
  }

}

// number of spaces on the board
let size = 100;

// create board
createBoard(size);
// add spots
addProbabilitySpots();

// create transition matrix
let T = createTransitionMatrix(size);

// create probability vector
let v = math.zeros(size+1);
v.subset(math.index(0), 1);

// // update probability vector until probability of winning is > 0.5
// let i = 0;
// while (v.subset(math.index(size)) < 0.5) {
//   v = math.multiply(v, T);
//   i++;
// }
//
// // output stuff
// console.log(v.toArray());
// console.log(i);
