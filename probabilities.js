
const ladders = [[1, 38], [4, 14], [9, 31], [21, 42], [28, 84], [36, 44], [51, 67], [71, 91], [80, 100]];
const snakes = [[98, 78], [95, 75], [93, 73], [87, 24], [64, 60], [62, 19], [56, 53], [49, 11], [47, 26], [16, 6]];

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
        let found = false;

        // check if part of ladder
        for (var pair of ladders) {
          if (pair[0] == j) {
            matrix.subset(math.index(i, pair[1]), std_prob);
            found = true;
            break;
          }
        }

        // check if part of snake
        if (!found) {
          for (var pair of snakes) {
            if (pair[0] == j) {
              matrix.subset(math.index(i, pair[1]), std_prob);
              found = true;
              break;
            }
          }
        }

        // else
        if (!found) {
          matrix.subset(math.index(i, j), std_prob);
        }
        
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
