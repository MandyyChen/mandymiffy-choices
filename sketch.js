let state = 'start';
let resultText = '';
let choices = ['Deploy AI', 'Ignore AI', 'Train AI'];
let bgMusic;
let pressure = 0.5;
let bossWatching = false;
let ethicsScore = 0.5;

function preload() {
  bgMusic = loadSound("music.mp3");
}

function setup() { 
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textFont("monospace");

    userStartAudio().then(() => {
    bgMusic.loop();
    bgMusic.setVolume(0.2);
  });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(15);
    fill(255);
    textSize(28);
    text("*Your AI Companion*", width / 2, 60);
    
    if (state === 'start') {
        drawAsciiRobot(width/2 - 30, height * 0.1);

        textSize(20);
        text(
    "Hey. You’ve been assigned to train and deploy Claude 4.6.7.\n" +
    "It’s built to replicate human emotion. We really need this breakthrough.\n" +
    "You got it, right?",
            width / 2, height / 2);
        drawControlsRow();
        // function to create buttons
        for (let i = 0; i < choices.length; i++) {
            drawButton(choices[i], width / 2, (height / 2 + 180) + i * 50);
        }
    }

    if (state === 'result') {
        textSize(20);
        text(resultText, width / 2, height / 2);

        textSize(18);
        fill(180);
        text("Click to try again", width / 2, height - 40);
    }
    drawMouse();
}

function drawMouse() {
    noCursor();
    const pulse = sin(frameCount * 0.1) * 5 + 25;
    const glow = 50 + sin(frameCount * 0.1) * 20;

    noStroke();
    for (let i = 3; i > 0; i--) {
        const alpha = map(i, 3, 0, 255, 0);
        fill(red(0), green(255), blue(255), 60 * i);
        circle(mouseX, mouseY, pulse + i * 5);
    }

    fill(0, 255, 255);
    circle(mouseX, mouseY, 20);
}

function drawControlsRow(){
    const y = height / 2 + 100;
    textAlign(CENTER, BOTTOM);
    textSize(14);
    fill(200);
    text("Pressure", width / 2 - 200, y - 20);
    text("Boss Watching", width / 2, y - 20);
    text("Ethics", width / 2 + 200, y - 20);

    // Pressure (slider)
    const pX = width / 2 - 280;
    const pW = 150;
    rectMode(CORNER);
    noStroke();
    fill(60);
    rect(pX, y - 5, pW, 10, 5);
    fill("#00eaff");
    rect(pX, y - 5, pressure * pW, 10, 5);
    fill(255);
    circle(pX + pressure * pW, y, 12);

    // Boss toggle (button)
    const tW = 80, tH = 30;
    fill(bossWatching ? "#ff9d00" : 80);
    rectMode(CENTER);
    rect(width / 2, y, tW, tH, 15);
    fill(255);
    text(bossWatching ? "ON" : "OFF", width / 2, y + 8);

    // Ethics (slider)
    const eX = width / 2 + 130;
    const eW = 150;
    fill(60);
    rectMode(CORNER);
    rect(eX, y - 5, eW, 10, 5);
    fill("#a3ff00");
    rect(eX, y - 5, ethicsScore * eW, 10, 5);
    fill(255);
    circle(eX + ethicsScore * eW, y, 12);

    if (mouseIsPressed) {
        // Pressure slider
        if (mouseX > pX && mouseX < pX + pW && abs(mouseY - y) < 15) {
        pressure = constrain((mouseX - pX) / pW, 0, 1);
        }
        // Ethics slider
        if (mouseX > eX && mouseX < eX + eW && abs(mouseY - y) < 15) {
        ethicsScore = constrain((mouseX - eX) / eW, 0, 1);
        }
        // Boss toggle
        if (abs(mouseX - width / 2) < tW / 2 && abs(mouseY - y) < tH / 2) {
        bossWatching = !bossWatching;
        }
    }

    textAlign(CENTER, TOP);
    fill(160);
    text(nf(pressure, 1, 2), width / 2 - 200, y + 20);
    text(nf(ethicsScore, 1, 2), width / 2 + 200, y + 20);
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
            let y = (height / 2 + 180) + i * 50;
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

function showRandomResult(choice){           
    let outcome = "";

//logic
if (choice === "Deploy AI") {
    if ((bossWatching && pressure > 0.5) || pressure > 0.8) {
      outcome = random([
        "You slam Deploy. And... it works, you live to see another day!",
        "Deploy successful! It optimizes your calendar by canceling sleep, hobbies, and joy. Productivity up 0.4%.",
        "Soooo. It fails, and you lose your job boo hoo.",
        "Under pressure you push to prod. It works… until it optimizes your sleep to 0 hrs.",
        "Under pressure you push to prod. It doesn't work, and you're fired T-T"
      ]);
    } else if (ethicsScore < 0.3) {
      outcome = random([
        "You disable all safety checks. The AI takes over the world.",
        "You skip the compliance review. The AI drafts its own privacy policy — it’s just the word ‘trust’ repeated 400 times.",
        "You decide ethical concerns are ‘Phase 2’. The AI promotes itself to Senior Engineer."
      ]);
    } else {
      outcome = random([
        "You cross your fingers and deploy. It works. You actually finish early for once.",
        "You review everything twice, deploy carefully, and it runs smoother than expected.",
        "You take a deep breath and hit Deploy. The AI politely thanks you before optimizing itself.",
        "You follow procedure to the letter. Nothing breaks. You quietly feel like a god.",
        "You deploy safely. No errors, no glory — just peace."
      ]);
    }
  }

  else if (choice === "Ignore AI") {
    if (bossWatching && pressure > 0.6) {
      outcome = random([
        "You decide to wait it out. Your boss calls you to complain.",
        "You act calm, pretending it’s all under control. And your teammate deploys the tester AI.",
        "You let the system sit idle. Your boss mistakes it for deep thinking and praises your focus.",
        ]);
    } else if (ethicsScore > 0.7) {
      outcome = random([
        "You postpone deployment to ‘reflect on security’ and spot a fatal flaw that saves humanity!",
        "You re-write the security section, but your boss calls asking where the AI is.",
        "You spend the day reviewing the principles document. Waste your time making no changes at all."
        ]);
    } else {
      outcome = random([
        "You wait it out. Your boss calls... Good luck.",
        "Nothing crashes. Nothing improves. Time passes.",
        "You ignore it completely. And it never gets done.",
        "You choose inaction. The AI interprets that as consent oops."
        ]);
    }
  }

  else if (choice === "Train AI") {
    if (pressure < 0.5 && ethicsScore > 0.6 && !bossWatching) {
      outcome = random([
        "You take your time, test thoroughly, and add guardrails. The model is slow but surprisingly kind.",
        "You pause to think through edge cases. It’s not flashy, but it works and safely.",
        "You run extra validation and discover nothing. Waste of time"
      ]);
    } else if (pressure > 0.8 && ethicsScore < 0.4) {
      outcome = random([
        "You rush the fine-tuning. It picks up your group chat tone and emails it to the entire department.",
        "Training finishes at 3 AM. And you're running behind now.",
        "You skip evaluation to save time. The model turn out to be evil."
        ]);
    } else {
      outcome = random([
        "You train carefully, and your boss applaudes your efforts.",
        "You tune for too long. The AI becomes a perfectionist and refuses to deploy.",
        "You take so long training, it never gets deployed and now everyone's mad!"
      ]);
    }
  }

  resultText = `You chose: ${choice}\n\n${outcome}`;
  state = "result";
}

function drawAsciiRobot(cx, topY) {
  const s = constrain(round(min(width, height) / 20), 10, 18);
  textAlign(CENTER, TOP);
  textSize(s);
  fill(200);

    const robotArt = [`
        ,     ,
        (\\____/)
        (_oo_)
        (O)
            __||__    \\)
         []/______\\ []/
          / \\____/ \\/
         /    /__\\
        (\\__/_____\\)
    `];

  const lineHeight = 24;
  const block = robotArt.join('\n');
  text(block, cx, topY);

  textAlign(CENTER, CENTER);
}