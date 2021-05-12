
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

function initProbVector(size){
  let vector = math.zeros(size+1);
  vector.subset(math.index(0), 1);

  return vector;
}

function newProbVector(vector, matrix) {
  return math.multiply(vector, matrix);
}

function fetchValue(vector, ind) {
  return vector.subset(math.index(ind));
}
