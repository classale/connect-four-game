let turn = "X"

const grilleAvecGagnant1 = [
    ["","","","","","X"],
    ["","","","","","X"],
    ["","","","","","X"],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""]
];
   
const grilleAvecGagnant2 = [
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ "X", " ", " ", " ", " ", " ", " " ],
    [ "X", " ", " ", " ", " ", " ", " " ],
    [ "X", " ", " ", " ", " ", " ", " " ],
    [ "X", " ", " ", " ", " ", " ", " " ]
];
   
const grilleAvecGagnant3 = [
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", "X", " ", " ", " " ],
    [ " ", " ", "X", "O", " ", " ", " " ],
    [ " ", "X", "O", "O", " ", " ", " " ],
    [ "X", "O", "O", "O", " ", " ", " " ]
];
   
const grilleAvecGagnant4 = [
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", "X", " ", " ", " " ],
    [ " ", " ", "X", "O", " ", " ", " " ],
    [ " ", "O", "O", "O", " ", " ", " " ],
    [ "X", "O", "O", "O", "O", " ", " " ]
];
   
const grilleSansGagnant = [
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", "X", " ", " ", " " ],
    [ " ", " ", "X", "O", "X", " ", " " ],
    [ " ", "O", "O", "O", "O", "X", " " ],
    [ "X", "O", "O", "X", "O", "O", "X" ]
];

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

let moves = 0;

function nbMoves(grille) {
    let out = 0;
    for(let column of grille) for(let _ of column.filter(e => e != " ")) out++;
    return out;
}

function playMove(game, column) {
    game[column][game[column].filter(e => e == "").length - 1] = turn
    turn = turn == "X" ? "O" : "X";
    moves++;
    return game;
}

function canPlay(game, column) {
    return game[column].filter(e => e != " ").length != 6;
}

function ai(grille) {
    for(let x = 0; x < 7; x++) {
        if(grille.canPlay(grille, x)) {
            return playMove(grille, x);
        }
    }

    return playMove(grille, [0, 1, 2, 3, 4, 5, 6].filter(e => canPlay(grille, e)).sort(() => Math.random() - .5)[0]);
}

console.log(negamax(grilleAvecGagnant1, turn))



console.log(checkWinner(grilleAvecGagnant1)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant2)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant3)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant4)); // retourne "O"
console.log(checkWinner(grilleSansGagnant)); // retourne " "