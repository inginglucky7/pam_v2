import {GamePage, LoginPage} from "../layouts/index.jsx";

const sth = document.querySelectorAll(".tdtd")

let board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let w; // = width / 5;
let h; // = height / 5;

let AI = "X";
let human = "O";
let currentPlayer = human;
let count = 0;

function setup() {
  createCanvas(600, 600);
  w = width / 5;
  h = height / 5;
  bestMove();
}

function equals5(a, b, c, d, e) {
  count = 0;
  return a == b && b == c && c == d && d == e && a != "";
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 5; i++) {
    if (
      equals5(board[i][0], board[i][1], board[i][2], board[i][3], board[i][4])
    ) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 5; i++) {
    if (
      equals5(board[0][i], board[1][i], board[2][i], board[3][i], board[4][i])
    ) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (
    equals5(board[0][0], board[1][1], board[2][2], board[3][3], board[4][4])
  ) {
    winner = board[0][0];
  }
  if (
    equals5(board[4][0], board[3][1], board[2][2], board[1][3], board[0][4])
  ) {
    winner = board[4][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

export default function mousePressed() {
  console.log("Pressed")
}

function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(w * 3, 0, w * 3, height);
  line(w * 4, 0, w * 4, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  line(0, h * 3, width, h * 3);
  line(0, h * 4, width, h * 4);

  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 5; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == AI) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}

