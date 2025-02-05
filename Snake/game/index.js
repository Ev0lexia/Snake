const gridContainer = document.querySelector(".grid");
const rows = 30; 
const cols = 50; 
let playerExists = false;
let currentMoveSide = "right"; 
let horizontalLocation = 1;
let verticalLocation = 13;
let fullLocation = verticalLocation + "," + horizontalLocation;
let snakeLength = 5;
let snakeLocations = [fullLocation];
let appleLocation;
let beerLocation;  
let gameIsStarted = false;

for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= cols; j++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `${i},${j}`;
    gridContainer.appendChild(cell);
  }
}

function spawnSnake(){
    if (!gameIsStarted){
        spawnApple();
        spawnBeer(); 
        window.setInterval(startSnake, 100);
        gameIsStarted = true;
    }
}

function startSnake(){
    window.addEventListener('keydown', function (e) {
        switch(e.key){
            case "w":
            case "W":
            case "ArrowUp":
                if (currentMoveSide != "top" && currentMoveSide != "bottom"){
                    currentMoveSide = "top";
                }
            break;
            case "a": 
            case "A":
            case "ArrowLeft":
                if (currentMoveSide != "left" && currentMoveSide != "right"){
                    currentMoveSide = "left";
                }
            break;
            case "s":
            case "S":   
            case "ArrowDown": 
                if (currentMoveSide != "top" && currentMoveSide != "bottom"){
                currentMoveSide = "bottom";
                }
                break;
            case "d":
            case "D":
            case "ArrowRight": 
                if (currentMoveSide != "left" && currentMoveSide != "right"){
                currentMoveSide = "right";
                }
            break;          
        }
    });

    let snake = document.getElementById(fullLocation);

    if (snake == null){
        die();
    }
    snake.style.backgroundColor = "red";
    switch (currentMoveSide){
        case "right":
            horizontalLocation++;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            if (fullLocation === beerLocation) {
                drinkBeer(); 
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
            }
            break;
        case "left":
            horizontalLocation--;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            if (fullLocation === beerLocation) {
                drinkBeer();  
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
            }
            break;
        case "top":
            verticalLocation--;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            if (fullLocation === beerLocation) {
                drinkBeer();  
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
            }
            break;
        case "bottom":
            verticalLocation++;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            if (fullLocation === beerLocation) {
                drinkBeer(); 
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
            }
            break;    
    }
}

function updateSnake() {
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const cell = document.getElementById(`${i},${j}`);
            // Clear any background color except for apple or beer
            if (cell.style.backgroundImage !== "url('/pictures/apple.jpeg')" || cell.style.backgroundColor !== "rgba(0, 0, 255, 1)") {
                cell.style.backgroundColor = "rgba(255, 255, 255, 1)";
            }
        }
    }

    // Update snake locations
    for (const location of snakeLocations) {
        const cell = document.getElementById(location);
        if (cell) {
            cell.style.backgroundColor = "red"; // Mark snake parts as red
        }
    }
}

function spawnApple() {
    const randomRow = Math.floor(Math.random() * rows) + 1;
    const randomCol = Math.floor(Math.random() * cols) + 1;
    appleLocation = randomRow + "," + randomCol;
    let whereToSpawnApple = document.getElementById(appleLocation);
    if (whereToSpawnApple != null) {
        whereToSpawnApple.style.backgroundImage = "url('/pictures/apple.jpeg')";
    }
}

function eatApple(){
    document.getElementById("score").innerText = "Score: " + snakeLength;

    const appleCell = document.getElementById(appleLocation);
    if (appleCell) {
        appleCell.style.backgroundImage = "";
    }
    const eatSound = new Audio('/sound/pickup.mp3');
    eatSound.play();
    spawnApple();
    snakeLength++;
}

function drinkBeer() {
    document.getElementById("score").innerText = "Score: " + snakeLength;

    const beerCell = document.getElementById(beerLocation);
    if (beerCell) {
        beerCell.style.backgroundColor = "white";  
    }
    const beerSound = new Audio('/sound/pickup.mp3');  
    beerSound.play();

    // Apply initial beer effect (blur and invert)
    document.body.style.filter = "invert(35%) blur(30px) brightness(100%)";  

    // Gradually reduce the blur and brightness over 10 seconds
    let blurAmount = 30;
    let brightnessAmount = 400;

    const effectInterval = setInterval(() => {
        blurAmount -= 0.5; // Decrease blur by 3px every interval
        brightnessAmount -= 5; // Decrease brightness by 3% every interval

        if (blurAmount <= 0 && brightnessAmount <= 0) {
            clearInterval(effectInterval); // Stop the interval when both blur and brightness reach their limits
            document.body.style.filter = ""; // Reset the filter after fading
        } else {
            // Update the filter with the new blur and brightness values
            document.body.style.filter = `blur(${blurAmount}px) brightness(${brightnessAmount}%)`; 
        }
    }, 100); // Interval every 100 milliseconds

    spawnBeer();  
}




function spawnBeer() {
    let beerSpawned = false;
    while (!beerSpawned) {
        const randomRow = Math.floor(Math.random() * rows) + 1;
        const randomCol = Math.floor(Math.random() * cols) + 1;
        beerLocation = randomRow + "," + randomCol;
        const beerCell = document.getElementById(beerLocation);
        if (beerCell && !snakeLocations.includes(beerLocation) && beerCell.style.backgroundImage !== "url('/pictures/apple.jpeg')") {
            beerCell.style.backgroundColor = "rgb(0, 69, 45)";
            beerSpawned = true;
        }
    }
}

function checkForDeath(){
    for (const snakeLocation of snakeLocations) {
        if (snakeLocation === fullLocation){
            die();
        }
    }
}

function die() {
    window.location.replace("/deathScreen/death.html");
}
