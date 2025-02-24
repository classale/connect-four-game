const grilleAvecGagnant1 = [
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ " ", " ", " ", " ", " ", " ", " " ],
    [ "X", "X", "X", "X", " ", " ", " " ]
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
    [ " ", " ", "X", " ", " ", " ", " " ],
    [ " ", "X", " ", " ", " ", " ", " " ],
    [ "X", " ", " ", " ", " ", " ", " " ]
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
    [ " ", "O", "O", "O", " ", "X", " " ],
    [ "X", "O", "O", "X", "O", " ", "X" ]
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

console.log(checkWinner(grilleAvecGagnant1)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant2)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant3)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant4)); // retourne "O"
console.log(checkWinner(grilleSansGagnant)); // retourne " "