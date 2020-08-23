/* global createCanvas, colorMode, HSB, background, loadImage, text, textSize, textAlign, 
CENTER, width, height, createButton, ellipse, random, rect, image, windowWidth, windowHeight, 
keyCode, RIGHT_ARROW, LEFT_ARROW, keyIsPressed, keyIsDown, UP_ARROW,constrain, fill, stroke, createSprite, dist*/

let backgroundColor;
let pauseButton;
let gameBgd;
let startBgd;
let y1 = 0;
let y2;
let scrollSpeed = 2;


let gameStarted = false;
let firstTime = false;

let player1;
let playerImg;
let waste = [];
let recycle = [];
let trash = [];
let randRecycle, randTrash;

let glassBottle, sodaCan, tinCan, cardboard, soda, bottle;
let teaBags, chips, mango, banana, battery, egg, plasticBag;
let playerScore = 0;
let player2;


let xPos = [30, 170, 320, 470, 620, 730];

// HTML elements
const startBtn = document.getElementById("start");
const quitBtn = document.getElementById("quit");
const scoreText = document.getElementById("score");
const instructions = document.getElementById("instructions");

function preload(){
  // Load game and start backgrounds
  gameBgd = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2FUntitled%20design%20(3).png?v=1598058259172');
  startBgd = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fecosort2.png?v=1598045701092');
  
  // Load character image
  playerImg = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fclipart2796865.png?v=1598072883613');
  
  // Load recycle images
  glassBottle = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com%20(1).png?v=1598082606647');
  sodaCan = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com%20(2).png?v=1598082606704');
  tinCan = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com%20(3).png?v=1598082616855');
  cardboard = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com%20(4).png?v=1598082622207');
  soda = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com%20copy.png?v=1598082637314');
  bottle = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2Fpngfuel.com.png?v=1598082646992');
  
  // Load trash images
  teaBags = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F5a8efd3fb15d5c051b369032.png?v=1598135399304');
  chips = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F%E2%80%94Pngtree%E2%80%94illustrator%20of%20potato%20chips%20snack_4754064.png?v=1598135402027');
  mango = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F5a68f8fc988f2a795ef76ce0.png?v=1598135402467');
  banana = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F5a68f89e988f2a795ef76cd5.png?v=1598135406603');
  battery = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F580b57fbd9996e24bc43bf8c.png?v=1598135408894');
  egg = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F580b57fbd9996e24bc43c107.png?v=1598135413373');
  plasticBag = loadImage('https://cdn.glitch.com/bec6b129-0a8f-4fd8-8305-8d691202f1e6%2F5895feefcba9841eabab60ad.png?v=1598135420570');
  
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  
  // Initialize variables here
  backgroundColor = 90;
  y2 = height;

  
  // Initially hide quit button and score text
  quitBtn.style.display = "none";
  scoreText.style.display = "none";
  
  newGame();
  
  // Initialize player
  player1 = new Player(50,550,120);
  
  // Generate new waste
  for (let i = 0; i < xPos.length; i++) {
    waste.push(new Waste(xPos[i]));
  }
  
  trash.push(teaBags, chips, mango, banana, battery, egg, plasticBag);
  
}

let playerHit = false;
function draw() {
  
  // Set boundaries for character
  if(player1.x < 0){
    player1.x += 5;
  }
  
  
  if(player1.x > width -player1.size){
    player1.x -= 5;
  }
    
 // character movements
  keyPressed();

  if (!gameStarted) {
    return
  }

  
  // Game has started, so show scrolling background
  if (!firstTime) {
    background(backgroundColor);
    image(gameBgd, 0, y1, width, height);
    image(gameBgd, 0, y2, width, height+50);
    // recycle.push(glassBottle, sodaCan, tinCan, cardboard, soda, bottle);
    
    y1 += scrollSpeed;
    y2 += scrollSpeed;
    

    if (y1 > height) {
      y1 = -height;
    }


    if (y2 > height) {
      y2 = -height;
      
    }
    
    player1.display();
    
    // Make if condition only true once when distance is first < waste.size
    
    
    // We need to check -- while game is not over, check every piece of waste for collision with raccoon
    
    displayWaste();
    

    for (let i = 0; i < xPos.length; i++) {
      playerHit = player1.hitWaste(i);
      
      if (playerHit) {
        console.log("hey");
        playerScore+=1;
        console.log(playerScore);
        document.getElementById("score").innerHTML = "SCORE: " + playerScore;
      }
    }

   
  }
  
}

function displayWaste() {
  for (let j = 0; j < xPos.length; j++) {
    waste[j].display(recycle[j]);
    waste[j].wasteFall();
  }
}


  //       for (let k = m+1; k < recycle.length; k++) {
  
//           if (dist(waste[m].x, waste[m].y, waste[k].x, waste[k].y) < waste[m].size + waste[k].size) {
//             overlap = true;
//           } else {
//             overlap = false;
//           }
//       }
      
//       if (overlap) {
//         console.log(waste[m]);
//         waste[m].x = random(width);
//         waste[m].y = random(height/3);
        
//       }


//       if (dist(waste[m].x, waste[m].y, player1.x, player1.y) < waste[m].size/2 + player1.size/2) {
//         playerHit = true;
//       } else {
//         playerHit = false;
//       }
      
//       if (playerHit) {
//         console.log(waste[m]);
//         recycle.pop(recycle[m]);
//       }
function startGame() {
  gameStarted = true;
  firstTime = false;
  
  // Hide start button and instructions once game starts
  startBtn.style.display = "none";
  instructions.style.display = "none";

  
  // Show quit button and score once game starts
  quitBtn.style.display = "block";
  scoreText.style.display = "block";
  
}


function newGame() {
  firstTime = true;
  image(startBgd, 0, 0, width, height);

  // Show start button and instructions on intial start page
  startBtn.style.display = "block";
  instructions.style.display = "block";
  
  
  // Hide quit button and score text on start page
  quitBtn.style.display = "none";
  scoreText.style.display = "none";
  
  recycle.push(glassBottle, sodaCan, tinCan, cardboard, soda, bottle);
}


function keyPressed() {
  if (keyCode === LEFT_ARROW && keyIsPressed) {
    // Decrement x pos
    player1.x -= 3;
    
  } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
    // Increment x pos
    player1.x += 3;
  }
}



class Player {
  
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  display() {
    // ellipse(this.x, this.y, this.size);
    image(playerImg, this.x, this.y, this.size, this.size);
  }
  
  setX(val) {
    //this.x += val;
  }
  
  
  hitWaste(idx) {
    let hitPlayer = false;
    if (Math.floor(dist(player1.x, player1.y, waste[idx].x, waste[idx].y)) == 15) {
      hitPlayer = true;
    } else {
      hitPlayer = false;
    }
    return hitPlayer;
  }
  
}

class Waste {
  
  constructor(x){
    this.x = x;
    this.y = random(height/3);
    this.size = 60;
    this.speed = 2;
    this.color = 255;
  }
  
  display(randImg) {
    image(randImg, this.x, this.y, this.size, this.size);
    
    
    if(this.x < 0){
      this.x += 5;
    }
  
  
    if(this.x > width -this.size){
      this.x -= 5;
    }
  }
  
  
  wasteFall(){
    this.y += (-this.speed, this.speed)
    if (this.y > height) {
      this.y = random(height/10);
      this.color = 255;
    }
  }
  
  changeColor(col) {
    this.color = col;
  }
  
  
}