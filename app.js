document.querySelector('.menu').showModal()

let player1Score = 0;
let player2Score = 0;
let column = 0;
let turn = 0;
let remainingTime = 0;
let game = []

for(let y = 0; y < 6; y++) {
    let line = [];
    for(let x = 0; x < 7; x++) {
        line.push("")
    }
    game.push(line);
}

function createPause() {
    const dialog = Object.assign(document.createElement("dialog"), {className: "pause"})
    dialog.appendChild(Object.assign(document.createElement("button"), {innerText: "CONTINUE GAME", onclick: e => e.currentTarget.parentElement.remove()}))
    dialog.appendChild(Object.assign(document.createElement("button"), {innerText: "RESTART"}))
    dialog.appendChild(Object.assign(document.createElement("button"), {innerText: "QUIT GAME", className: "red"}))
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

document.querySelector(".play").addEventListener("click", e => e.currentTarget.parentElement.remove())

document.querySelector(".rules").addEventListener("click", () => {
    let rules = createRules();
    document.body.appendChild(rules)
    rules.showModal()
})

document.querySelector(".pause-button").addEventListener("click", () => {
    let pause = createPause();
    document.body.appendChild(pause)
    pause.showModal()
})