const gridContainer = document.querySelector(".grid");
const rows = 30; 
const cols = 50; 
let playerExists = false;
let currentMoveSide = "right"; //right, left, top, bottom
let horizontalLocation = 1;
let verticalLocation = 13;
let fullLocation = verticalLocation + "," + horizontalLocation;
let snakeLength = 1;
let snakeLocations = [fullLocation];
let appleLocation;
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
        window.setInterval(startSnake, 100);
        gameIsStarted = true;
    }


}

function startSnake(){
    document.onkeydown = function (e){
        switch(e.key){
            case "w":
                if (currentMoveSide != "top" && currentMoveSide != "bottom"){
                    currentMoveSide = "top";
                }
            break;
            case "a": 
                if (currentMoveSide != "left" && currentMoveSide != "right"){
                    currentMoveSide = "left";
                }

            break;
            case "s":
                if (currentMoveSide != "top" && currentMoveSide != "bottom"){
                currentMoveSide = "bottom";
                }
                break;
            case "d":
                if (currentMoveSide != "left" && currentMoveSide != "right"){
                currentMoveSide = "right";
                }
            break;          
        }
    }



    let snake = document.getElementById(fullLocation);

    if (snake == null){
        die();
    }
    snake.style.backgroundColor = "white";
    switch (currentMoveSide){
        case "right":
            horizontalLocation++;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            console.log("horizontal location updated!");
            console.log(fullLocation);
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
                console.log(snakeLocations);
            }
            break;
        case "left":
            horizontalLocation--;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            console.log("horizontal location updated!");
            console.log(fullLocation);
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
                console.log(snakeLocations);
            }
            break;
        case "top":
            verticalLocation--;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            console.log("vertical location updated!");
            console.log(fullLocation);
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
                console.log(snakeLocations);
            }
            break;
        case "bottom":
            verticalLocation++;
            fullLocation = verticalLocation + "," + horizontalLocation;
            document.getElementById(fullLocation).style.backgroundColor = "red";
            console.log("vertical location updated!");
            console.log(fullLocation);
            checkForDeath();
            if (fullLocation === appleLocation){
                eatApple();
            }
            snakeLocations.push(fullLocation);
            if (snakeLocations.length > snakeLength){
                const snakeToRemove = snakeLocations.shift();
                updateSnake();
                console.log(snakeLocations);
            }
            break;    
    }
}


function updateSnake() {
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const cell = document.getElementById(`${i},${j}`);
            if (cell.style.backgroundImage !== "url('pictures/apple.jpeg')"){
                cell.style.backgroundColor = "white"; 
            }

        }
    }

    for (const location of snakeLocations) {
        const cell = document.getElementById(location);
        if (cell) {
            cell.style.backgroundColor = "red";
        }
    }
}

function spawnApple() {
    const randomRow = Math.floor(Math.random() * rows) + 1;
    const randomCols = Math.floor(Math.random() * cols) + 1;
    appleLocation = randomRow + "," + randomCols;
    let whereToSpawnApple = document.getElementById(appleLocation);
    if (whereToSpawnApple != null){
        console.log(whereToSpawnApple);
        whereToSpawnApple.style.backgroundImage = "url('/pictures/apple.jpeg')";
    } else {
        console.log(whereToSpawnApple + "Is not a valid location!");
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

function checkForDeath(){
    for (const snakeLocation of snakeLocations) {
        if (snakeLocation === fullLocation){
            die();
            sendData();
        }
    }
}

function die() {
    window.location.replace("/deathScreen/death.html");
}
