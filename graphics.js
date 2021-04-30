var size;

function setup() {
  let scalar = 0.9;

  // make canvas
  if (windowHeight < windowWidth) {
    size = windowHeight*scalar;
  } else {
    size = windowWidth*scalar;
  }
  let canvas = createCanvas(size, size);
  canvas.center("horizontal");
}

function draw() {
  // set up game spaces
  let resolution = 10;
  let square_size = size/resolution;
  // store coordinates of square corners
  let corner_coords = [];

  // square colour
  fill(255,251,130);
  stroke(255,237,33);

  // draw squares
  for (var i = 0; i < size; i+=square_size) {
    for (var j = 0; j < size; j+=square_size) {
      square(j, i, square_size);
      // add corner coordinates to array
      corner_coords.push([j, i]);
    }
  }

  // sort array into appropriate order
  corner_coords = boardSort(corner_coords, resolution);

  // show numbers on game squares
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(square_size/5);
  let pad = square_size/20;

  for (var i = 0; i < corner_coords.length; i++) {
    text(i+1, corner_coords[i][0]+pad, corner_coords[i][1]+pad);
  }

  // draw probability spots
  let shift = square_size/2;
  let spot_color = color(255,0,0);

  for (var coord of corner_coords) {
    fill(spot_color);
    circle(coord[0]+shift, coord[1]+shift, square_size/2);
  }

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
