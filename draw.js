// coordinates and sizes of elements
var corner_coords, ctr_coords;
var sq_size;

// DOM elements
var checkbox, turn_counter;
var count = 0;

// for probability calculations
var v, T;

function setup() {
  // size of canvas relative to page
  let scalar = 0.8;
  let size;

  // make canvas
  if (windowHeight < windowWidth) {
    size = windowHeight*scalar;
  } else {
    size = windowWidth*scalar;
  }
  let cvs = createCanvas(size, size);

  // update probability vector when canvas is clicked
  cvs.mousePressed(update);

  // find DOM elements
  checkbox = document.getElementById("prob_check");
  turn_counter = document.getElementById("turn_num");

  // define size of board squares
  let resolution = 10;
  sq_size = size/resolution;

  // find square coordinates
  corner_coords = boardSort(getCornerCoords(size, sq_size), resolution);
  ctr_coords = getCenterCoords(corner_coords, sq_size);
  console.log(ctr_coords);

  // set up transition matrix and probability vector
  let squares = 100;
  T = createTransitionMatrix(squares);
  v = initProbVector(squares);
}

function update() {
  // get new probability vector
  v = newProbVector(v, T);

  // update turn counter
  count++
  turn_counter.innerHTML = count;
}

function draw() {
  // square colour
  let sq_fill = color(255,251,130);
  let sq_stroke = color(255,237,33);
  fill(sq_fill);
  stroke(sq_stroke);
  // draw squares
  for (var coord of corner_coords) {
    square(coord[0], coord[1], sq_size);
  }

  // number format
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(sq_size/5);
  let pad = sq_size/20;
  // display numbers on squares
  corner_coords.forEach((corner, i) => {
    text(i+1, corner[0]+pad, corner[1]+pad);
  });

  // draw snakes and ladders
  strokeWeight(4);
  stroke(0,255,0);
  for (let pair of ladders) {
    line(ctr_coords[pair[0]-1][0], ctr_coords[pair[0]-1][1], ctr_coords[pair[1]-1][0], ctr_coords[pair[1]-1][1]);
  }
  stroke(0,0,255);
  for (let pair of snakes) {
    line(ctr_coords[pair[0]-1][0], ctr_coords[pair[0]-1][1], ctr_coords[pair[1]-1][0], ctr_coords[pair[1]-1][1]);
  }
  strokeWeight(1);
  noStroke();

  // draw probability spots
  let spot_color = color(255,0,0);
  let text_color = color(0);

  // get max value of probability vector
  let v_max = Math.max(...v.toArray());
  let circ_size = sq_size*0.6;

  ctr_coords.forEach((coord, i) => {
    let value = fetchValue(v, i+1);
    spot_color.setAlpha(getOpacity(v_max, value));

    fill(spot_color);
    circle(coord[0], coord[1], circ_size);

    fill(text_color);
    textAlign(CENTER, CENTER);

    if (checkbox.checked) {
      text(value.toFixed(2), coord[0], coord[1]);
    }
  });

}
