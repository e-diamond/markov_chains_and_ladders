
function createTransitionMatrix(size) {
  // create sparse matrix as mostly zeros
  var matrix = math.zeros(size+1, size+1, "sparse");

  // for testing
  // var matrix = math.zeros(size+1, size+1);

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

console.log(createTransitionMatrix(10));
