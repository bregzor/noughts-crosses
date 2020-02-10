//Whole game is scalable based on boardSize
let boardSize;
const players = {
    x: "<i class='fas fa-times'></i>",
    o: "<i class='far fa-circle'></i>"
}

//all relevant variables for game
let gameArray = [];
let turn = 0;
let totalTurn = 1;
let col = 0;
let row = 0;

//Creating boardarea to be called when pressing start
function DrawGameArea() {
    const gameArea = document.querySelector(".gameArea");
    for (let y = 0; y < boardSize; y++) {
        const divEl = document.createElement("div");
        const button = document.createElement("button");
        gameArea.appendChild(divEl);
        divEl.classList.add("row");
        divEl.id = `row_${y}`;
        for (let x = 0; x < boardSize; x++) {
            const buttonH = document.createElement("button");
            divEl.appendChild(buttonH);
            buttonH.setAttribute("id", `tile_${x}`);
            buttonH.dataset.chk = "n";
            buttonH.classList.add("tile");
        }
    }
}

//Inits 2d array with dummy data
function Init(arr, row, col) {
    for (let i = 0; i < row; i++) {
        arr.push([]);
        arr[i].push(new Array(col));
        for (let x = 0; x < col; x++) {
            arr[i][x] = "b";
        }
    }
}

//Gets position from board to array
function AddPosToArray(el) {
    col = el.id.replace("tile_", "")
    col = parseInt(col);
    row = el.parentElement.id.replace("row_", "")
    row = parseInt(row);
    if (el.children.length > 0) {
        el.innerHTML.includes("fas") ?
            gameArray[row][col] = "x" :
            gameArray[row][col] = "o";
    }

    return gameArray[row][col];
}

//Check winner based on vertical/horizotal/diagal conditions
function CheckWinner(arr, player) {

    //Checks if all is equal to determine winner
    function isFive(a, b, c, d, e) {
        return (a === b && b === c && c === d && d === e && a != "");
    }

    let winner = null;
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr.length; x++) {
            const current = arr[y][x];
            let isChecked = false;
            if (current == player) {

                if (!isChecked) {
                    //horizontal
                    if (isFive(arr[y][x], arr[y][x + 1], arr[y][x + 2],
                            arr[y][x + 3], arr[y][x + 4])) {
                        winner = player;
                        isChecked = true;
                    }
                }

                if (!isChecked) {
                    //diagonal 1
                    if (isFive(arr[y][x], arr[y + 1][x + 1], arr[y + 2][x + 2],
                            arr[y + 3][x + 3], arr[y + 4][x + 4])) {
                        winner = player;
                        isChecked = true;
                    }
                }
                if (!isChecked) {
                    //diagonal 2
                    if (isFive(arr[y][x], arr[y + 1][x - 1], arr[y + 2][x - 2],
                            arr[y + 3][x - 3], arr[y + 4][x - 4])) {
                        winner = player;
                        isChecked = true;
                    }
                }
                if (!isChecked) {
                    //vertical
                    if (isFive(arr[y][x], arr[y + 1][x],
                            arr[y + 2][x], arr[y + 3][x], arr[y + 4][x])) {
                        winner = player;
                        isChecked = true;
                    }
                }
            }
        }
    }
    return winner;
}

//Creates winner area and calls reset button function
function DrawWinnerAndReset(winner) {

    function messageWinner(wi) {
        if (wi === "o") {
            wMessage = `SPELARE ${players.o} ÄR VINNAREN!`;
        } else if (wi === "x") {
            wMessage = `SPELARE ${players.x} ÄR VINNAREN!`;
        }
        return wMessage;
    }

    let w = winner;
    const area = document.querySelector(".gameArea");
    const section = document.querySelector(".gameSection")

    area.style.display = "none";
    let winEl = document.createElement("h2");

    if (!section.querySelector(".winnerMessage")) {
        section.appendChild(winEl);
        winEl.classList.toggle("fadeIn");
    } else {
        section.querySelector(".winnerMessage").style.display = "block";
        section.querySelector(".btn").style.display = "block";
    }

    winEl.classList.add("winnerMessage");

    //Sets winner bg color
    winner === "o" ? section.classList.add("winnerColorRed") : section.classList.add("winnerColorGreen");
    section.querySelector(".winnerMessage").innerHTML = messageWinner(winner);

    ResetGame(area, section);
}

//resets data and board
function ResetGame(areaToReset, section) {

    const resetbtn = document.createElement("button");
    if (!section.querySelector(".btn")) {
        resetbtn.classList.add("btn");
        resetbtn.textContent = "STARTA OM SPELET";
        section.appendChild(resetbtn);
    }
    //Clear inner buttons symbols
    resetbtn.addEventListener("click", () => {
        areaToReset.style.display = "flex";
        // DrawGameArea()
        areaToReset.querySelectorAll("button").forEach(e => {
            e.innerHTML = "";
            e.dataset.chk = "n";
        });

        resetbtn.style.display = "none";
        document.querySelector(".winnerMessage").style.display = "none";
        document.querySelector(".winnerMessage").innerHTML = "";

        //Resets counters, arrays, texts and background gradients,
        turn = 0;
        totalTurn = 1;
        gameArray = [];
        Init(gameArray, boardSize + 5, boardSize + 5);

        document.querySelector(".player").innerHTML = `SPELARE TUR: ${players.x}`;
        document.querySelector(".totalTurn").textContent = `Totalt antal drag: ${totalTurn}`;
        section.classList.contains("winnerColorRed") ?
            section.classList.remove("winnerColorRed") :
            section.classList.remove("winnerColorGreen");

    });
}

//Determines player turn and insert correct symbol type
function DrawPlayerAndTurn(count, el) {

    if (count === 0) {
        player = players.o;
        el.innerHTML = players.x;
        el.querySelector("i").classList.toggle("fadeIn");
    } else if (count === 1) {
        player = players.x;
        el.innerHTML = players.o;
        el.querySelector("i").classList.toggle("fadeIn");
        turn = 0;
    }

    document.querySelector(".totalTurn").textContent = `Totalt antal drag: ${totalTurn++}`;
    const playerEl = document.querySelector(".player");
    playerEl.innerHTML = `SPELARE TUR: ${player}`;
    playerEl.classList.toggle("fadeIn");

    return player;

}

function doGame(e) {

    //Adds turn and make sure that not same is clickable/replacable
    const btn = e;
    if (btn.dataset.chk === "n") {
        if (!btn.children.length > 0) {
            DrawPlayerAndTurn(turn++, btn);
            btn.dataset.chk = "y";
        }
    }
    //Setting btn position in array and return player type
    const player = AddPosToArray(btn);
    //Checks if there is any winner, is it then function will return who won.
    let isWinner = null;
    //Starts to check winner after 10 turns
    if (totalTurn >= 10) {
        isWinner = CheckWinner(gameArray, player);
        if (isWinner !== null) {
            console.log("Vinnare: " + isWinner);
            DrawWinnerAndReset(isWinner);
        }
    }
}

//Draw gamearea based on input from user
const startBtn = document.querySelector(".welcomeSection > .btn");
const gArea = document.querySelector(".gameArea");
const sizeInput = document.querySelector("#size")
startBtn.addEventListener("click", () => {
    document.querySelector(".gameSection").style.display = "block";
    document.querySelector(".welcomeSection").style.display = "none";
    document.querySelector(".d-depth").style.display = "flex";
    boardSize = parseInt(sizeInput.options[sizeInput.selectedIndex].value);
    Init(gameArray, boardSize + 5, boardSize + 5);
    DrawGameArea();
    //Aligns 3D correctly based on size
    gArea.classList.toggle("fadeIn");
    if (boardSize <= 15) {
        gArea.style.top = "100px";
    } else {
        gArea.style.top = "-100px";
    }

});

//Calls all function on each click (using bubbling)
const boardArea = document.querySelector(".gameArea");
boardArea.addEventListener("click", () => {
    doGame(event.target);
});