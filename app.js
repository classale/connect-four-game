document.querySelector('.menu').showModal()

/*
<dialog class="rules">
    <h1>RULES</h1>
    <h2>OBJECTIVES</h2>
    <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</p>
    <h2>HOW TO PLAY</h2>
    <ol>
        <li>Red goes first in the first game.</li>
        <li>Players must alternate turns, and only one disc can be dropped in each turn.</li>
        <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
        <li>The starter of the previous game goes second on the next game.</li>
    </ol>
    <button class="red"><img src="assets/checkmark.svg" alt="Checkmark"><button>
</dialog>
*/

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
    dialog.appendChild(button)
    return dialog
}

