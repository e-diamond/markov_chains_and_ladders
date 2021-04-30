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

  fill(color(255,251,130));
  stroke(255,237,33);

  for (var i = 0; i < size; i+=square_size) {
    for (var j = 0; j < size; j+=square_size) {
      square(j, i, square_size);
    }
  }
}
