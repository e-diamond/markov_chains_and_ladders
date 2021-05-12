function getCornerCoords(size, sq_size) {
  let coords = [];

  for (var i = 0; i < size; i+=sq_size) {
    for (var j = 0; j < size; j+=sq_size) {
      coords.push([j, i]);
    }
  }

  return coords;
}

function getCenterCoords(corners, sq_size) {
  let centers = [];
  let shift = sq_size/2;

  for (var corner of corners) {
    centers.push([corner[0]+shift, corner[1]+shift]);
  }

  return centers;
}

// sort an array into alternating row directions
function boardSort(array, length) {
  // new array to return
  let new_array = [];

  for (var i = 0; i < array.length; i+=length) {
    // alternates number order in each row
    if ((i/length) % 2 == 0) {
      new_array = new_array.concat(array.slice(i, i+length));
    } else {
      new_array = new_array.concat(array.slice(i, i+length).reverse());
    }
  }

  // reverses before returning
  return new_array.reverse();
}

function getOpacity(max, value) {
  return (value/max)*255;
}
