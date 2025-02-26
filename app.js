document.querySelector('.menu').showModal()

let player1Score = 0;
let player2Score = 0;
let column = 0;
let turn = "";
let remainingTime = 0;
let game = [];
let isTimerRunning = false;
let hasWon = false;

let isAi = false;

let interval = 0;

const timer = document.querySelector(".timer > .value")
const timerEl = document.querySelector(".timer")
const timerName = document.querySelector(".timer > p")
const columns = document.querySelectorAll(".column")

function checkWinner(grille) {
    let number = 0;
    let thingies = []
    for(let checking of ["X", "O"]) {
        for(let y = 0; y < grille.length; y++) {
            for(let x = 0; x < grille[y].length; x++) {
                if(grille[y][x] != "X" && grille[y][x] != "O") continue;
                for(let xi = -1; xi < 2; xi++) {
                    for(let yi = -1; yi < 2; yi++) {
                        if(xi != 0 || yi != 0) {
                            for(let i = 0; i < 4; i++) {
                                try {
                                    if(grille[y + (yi * i)][x + (xi * i)] == checking) {
                                        number++;
                                        thingies.push([y + (yi * i), x + (xi * i)])
                                    }
                                } catch {}
                            }
                        }
                        if(number == 4) return [checking, thingies]
                        number = 0;
                        thingies = []
                    }
                }
            }
        }
    }
    return [" ", []];
}

function canPlay(grille, column) {
    return grille[column].filter(e => e == "X" || e == "O").length != 6;
}

function nbMoves(grille) {
    let out = 0;
    for(let column of grille) for(let _ of column.filter(e => e != "")) out++;
    return out;
}

function ai(grille) {
    for(let x = 0; x < 7; x++) {
        if(canPlay(grille, x) && checkWinner(playMove(grille, x, turn == "X" ? "O" : "X"))[0] != " ") {
            return playMove(grille, x, turn, true);
        }
    }

    for(let x = 0; x < 7; x++) {
        if(canPlay(grille, x) && checkWinner(playMove(grille, x, turn))[0] != " ") {
            return playMove(grille, x, turn, true);
        }
    }

    return playMove(grille, [0, 1, 2, 3, 4, 5, 6].filter(e => canPlay(grille, e)).sort(() => Math.random() - .5)[0], turn, true);
}

function playMove(grille, column, turn, playHTML = false) {
    const copiedGrille = JSON.parse(JSON.stringify(grille));
    if(playHTML) {
        const elements = columns[column].querySelectorAll(`*:not(.yellow):not(.red)`)
        elements[elements.length-1].classList.add(turn == "O" ? "red" : "yellow" );
    }
    copiedGrille[column][copiedGrille[column].filter(e => e == "").length - 1] = turn
    return copiedGrille;
}

function checkWin() {
    let [winner, things] = checkWinner(game);
    if(nbMoves(game) == 42) {
        document.querySelector(".grid").appendChild(createVictoryBanner(0))
        document.querySelector(".timer").style.display = "none";
        return true;
    }
    if(winner == " ") return false;
    switch(winner) {
        case "X":
            for(let thing of things) {
                let [y, x] = thing;
                document.querySelectorAll(".column")[y].querySelectorAll("*")[x].classList.add("circle")
            }
            document.querySelector(".grid").appendChild(createVictoryBanner(turn == "O" ? 1 : 2))
            document.querySelector("footer").classList.add(turn == "X" ? "yellow" : "red")
            document.querySelector(".timer").style.display = "none";
            hasWon = true;
            player2Score++;
            clearInterval(interval)
            break;
        case "O":
            for(let thing of things) {
                let [y, x] = thing;
                document.querySelectorAll(".column")[y].querySelectorAll("*")[x].classList.add("circle")
            }
            document.querySelector(".grid").appendChild(createVictoryBanner(turn == "O" ? 1 : 2))
            document.querySelector("footer").classList.add(turn == "X" ? "yellow" : "red")
            document.querySelector(".timer").style.display = "none";
            hasWon = true;
            player1Score++;
            clearInterval(interval)
            break;
    }
    document.getElementById("Player1Score").innerHTML = player1Score
    document.getElementById("Player2Score").innerHTML = player2Score
    return true;
}



document.addEventListener("keydown", e => {
    if(!isTimerRunning || hasWon) return;
    if(e.key == "ArrowRight" && column < 6) column++;
    if(e.key == "ArrowLeft" && column > 0) column--;
    if(e.key == " ") {
        if(!canPlay(game, column)) return;
        game = playMove(game, column, turn, true)
        if(checkWin()) return;
        changeTurn()
        if(isAi) {
            game = ai(game)
            if(checkWin()) return;
            changeTurn()
        }
    }
    for(let columnEl of columns) {
        columnEl.id = ""
    }
    columns[column].id = "selected"
})

/*
<div class="result">
    <p>PLAYER 1</p>
    <span class="big">WINS</span>
    <button class="smallbutton">PLAY AGAIN</button>
</div>
*/

function createVictoryBanner(player) {
    const result = Object.assign(document.createElement("div"), {className: "result"})
    const restartEl = Object.assign(document.createElement("button"), {innerHTML: `PLAY AGAIN`, className: "smallbutton"})
    if(player != 0) {
        result.appendChild(Object.assign(document.createElement("p"), {innerHTML: `PLAYER ${player}`}))
        result.appendChild(Object.assign(document.createElement("span"), {innerHTML: `WINS`, className: "big"}))
    } else {
        result.appendChild(Object.assign(document.createElement("span"), {innerHTML: `DRAW`, className: "big"}))
    }
    result.appendChild(restartEl)
    restartEl.addEventListener("click", e => {
        e.currentTarget.parentElement.remove();
        restart();
    })
    return result
}

function changeTurn() {
    turn = turn == "O" ? "X" : "O"
    timerName.innerHTML = `PLAYER ${turn == "O" ? 1 : 2}'S TURN`
    timer.innerHTML = `PLAYER ${turn == "O" ? 1 : 2}'S TURN`
    for(let columnEl of columns) {
        if(columnEl.classList.contains("red")) {
            columnEl.className = columnEl.className.replace("red", "yellow");
            timerEl.className = timerEl.className.replace("red", "yellow");
            continue;
        }
        if(columnEl.classList.contains("yellow")) {
            columnEl.className = columnEl.className.replace("yellow", "red");
            timerEl.className = timerEl.className.replace("yellow", "red");
            continue;
        } 
    }
    remainingTime = 15;
    timer.innerHTML = `${remainingTime}s`
}

function initGame() {
    document.querySelector(".timer").style.display = "block";
    hasWon = false;
    document.querySelector("footer").classList.remove("yellow")
    document.querySelector("footer").classList.remove("red")
    timerEl.classList.remove("yellow")
    timerEl.classList.add("red")
    for(let columnEl of columns) {
        columnEl.classList.remove("yellow")
        columnEl.classList.add("red")
    }
    clearInterval(interval)
    for(let columnEl of columns) {
        for(el of columnEl.children) {
            el.classList.remove("red")
            el.classList.remove("yellow")
            el.classList.remove("circle")
        }
    }
    resetGame();
    remainingTime = 15;
    timer.innerHTML = `${remainingTime}s`
    column = 0;
    for(let columnEl of columns) {
        columnEl.id = ""
    }
    columns[column].id = "selected"
    turn = "O";
    isTimerRunning = true;
    document.getElementById("Player1Score").innerHTML = player1Score
    document.getElementById("Player2Score").innerHTML = player2Score
    interval = setInterval(() => {
        remainingTime--;
        if(remainingTime < 0) {
            changeTurn()
            if(isAi) {
                game = ai(game);
                changeTurn();
                checkWin()
            }
        }
        timer.innerHTML = `${remainingTime}s`
    }, 1000)
}

function restart(e) {
    initGame();
}

function quitGame(e) {
    try {document.querySelector(".result").remove()} catch {};
    player1Score = 0
    player2Score = 0
    isTimerRunning = false;
    clearInterval(interval)
    e.currentTarget.parentElement.remove()
    document.querySelector('.menu').showModal()
}

function resetGame() {
    game = []
    for(let y = 0; y < 7; y++) {
        let line = [];
        for(let x = 0; x < 6; x++) {
            line.push("")
        }
        game.push(line);
    }
}

resetGame();

function createPause() {
    const dialog = Object.assign(document.createElement("dialog"), {className: "pause"})
    dialog.appendChild(Object.assign(document.createElement("button"), {innerText: "CONTINUE GAME", onclick: e => e.currentTarget.parentElement.remove()}))
    const restartButton = Object.assign(document.createElement("button"), {innerText: "RESTART"})
    dialog.appendChild(restartButton)
    restartButton.addEventListener("click", e => {
        e.currentTarget.parentElement.remove()
        restart()
    })
    const quitGameButton = Object.assign(document.createElement("button"), {innerText: "QUIT GAME", className: "red"})
    dialog.appendChild(quitGameButton)
    quitGameButton.addEventListener("click", quitGame)
    return dialog;
}

function createRules() {
    const dialog = Object.assign(document.createElement("dialog"), {className: "rules"})
    dialog.appendChild(Object.assign(document.createElement("h1"), {innerText: "RULES"}))
    dialog.appendChild(Object.assign(document.createElement("h2"), {innerText: "Objectives"}))
    dialog.appendChild(Object.assign(document.createElement("p"), {innerText: "Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally)."}))
    dialog.appendChild(Object.assign(document.createElement("h2"), {innerText: "HOW TO PLAY"}))
    const rulesList = document.createElement("ol");
    for(let string of [ "Red goes first in the first game.", "Players must alternate turns, and only one disc can be dropped in each turn.", "The game ends when there is a 4-in-a-row or a stalemate.", "The starter of the previous game goes second on the next game."]) {
        rulesList.appendChild(Object.assign(document.createElement("li"), {innerText: string}))
    }
    dialog.appendChild(rulesList)
    const button = Object.assign(document.createElement("button"), {className: "confirmButton"})
    button.appendChild(Object.assign(document.createElement("img"), {"src": "./assets/checkmark.svg", alt: "Checkmark"}))
    button.addEventListener("click", () => dialog.remove())
    dialog.appendChild(button)
    return dialog
}

function startGame(e) {
    e.currentTarget.parentElement.close()
    initGame()
}

document.querySelector(".play").addEventListener("click", startGame)
document.querySelector(".playai").addEventListener("click", e => {
    isAi = true;
    startGame(e)
})
document.querySelector(".restart-button").addEventListener("click", restart)

document.querySelector(".rulesbutton").addEventListener("click", () => {
    let rules = createRules();
    document.body.appendChild(rules)
    rules.showModal()
})

document.querySelector(".pause-button").addEventListener("click", () => {
    let pause = createPause();
    document.body.appendChild(pause)
    pause.showModal()
})