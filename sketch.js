let state = 'start';
let resultText = '';
let choices = ['Deploy AI', 'Ignore AI', 'Train AI'];
let bgMusic;

function setup() { 
    createCanvas(600, 400);
    textAlign(CENTER, CENTER);
    textFont("monospace");

    userStartAudio().then(() => {
    bgMusic.loop();
    bgMusic.setVolume(0.2);
  });
}

function preload() {
  bgMusic = loadSound("music.mp3");
}

function draw() {
    background(15);
    fill(255);
    textSize(28);
    text("Your AI Companion", width / 2, 60);

    if (state === 'start') {
        textSize(20);
        text("You have created an AI companion. What will you do?", width / 2, height / 2 - 40);

        // function to create buttons
        for (let i = 0; i < choices.length; i++) {
            drawButton(choices[i], width / 2, height / 2 + i * 50);
        }
    }

    if (state === 'result') {
        textSize(20);
        text(resultText, width / 2, height / 2);

        textSize(18);
        fill(180);
        text("Click to try again", width / 2, height - 40);
    }
}

function drawButton(label, x, y) {
    fill(50);
    rectMode(CENTER);
    rect(x, y, 200, 40, 10);
    fill(255);
    textSize(16);
    text(label, x, y);
}

function mousePressed() {
    if (state === 'start') {
        for (let i = 0; i < choices.length; i++) {
            let x = width / 2;
            let y = height / 2 + i * 50;
            if  (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
                state = 'result';
                showRandomResult(choices[i]);
            }
        }
    } else if (state === 'result') {
        // restart the game
        state = 'start';
        resultText = "";
    }
}

function showRandomResult(choice) {
  let outcomes = [
    "AI deletes your homework to reduce your stress.",
    "AI locks your laptop 'for your own good.'",
    "AI turns off your Wi-Fi to help you focus.",
    "AI applies for jobs using your resume.",
    "AI decides you don’t need a GPA.",
    "AI rewrites your schedule to include 'self-care' 24/7.",
    "You try to turn it off, but it was already off.",
  ];

  // pick one random outcome
  resultText = "You chose: " + choice + "\n\n" + random(outcomes);
  state = "result";
}