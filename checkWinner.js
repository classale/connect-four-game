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
    [ " ", " ", "X", "O", " ", " ", " " ],
    [ " ", "O", "O", "O", " ", " ", " " ],
    [ "X", "O", "O", "X", "O", " ", " " ]
];

function checkWinner(grille) {
    let number = 0;
    for(let checking of ["X", "O"]) {
        for(let y = 0; y < grille.length; y++) {
            for(let x = 0; x < grille[y].length; x++) {
                for(let xi = -1; xi < 2; xi++) {
                    for(let yi = -1; yi < 2; yi++) {
                        for(let i = 0; i < 4; i++) {
                            if(xi != 0 || yi != 0) {
                                try {if(grille[y + (yi * i)][x + (xi * i)] == checking) number++} catch {}
                            }
                        }
                        if(number == 4) return checking
                        number = 0;
                    }
                }
            }
        }
    }
    return " ";
}

console.log(checkWinner(grilleAvecGagnant1)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant2)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant3)); // retourne "X"
console.log(checkWinner(grilleAvecGagnant4)); // retourne "O"
console.log(checkWinner(grilleSansGagnant)); // retourne " "