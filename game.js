initGame();

function initGame() {
    const slot = document.querySelector(".card-slot");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pairs = parseInt(urlParams.get('cards'));
    let chosenNumbers = [5, 10, 13, 4];
// element.style.src = `images/${i}.png`
    const maxNum = 10;
    const container = document.querySelector('.container')

    function getNumbers(number) {
        let imageNumbers = [];
        do {
            const randomNumber = Math.ceil(Math.random() * maxNum);
            console.log(randomNumber);
            if (!imageNumbers.includes(randomNumber)) {
                imageNumbers.push(randomNumber);
            }
        }
        while (imageNumbers.length !== number);
        console.log(imageNumbers);
        return imageNumbers;
    }
    divPlacer(pairs)
    function divPlacer(pairs) {
        pairs *= 2;
        for (let i = 0; i < pairs; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('closed');
            newDiv.classList.add('card-slot');
            container.appendChild(newDiv);
        }
    }

// for(let i = 1; i <= 10; i++){
//     a
//     slot.appendChild(image);
// }
    // Your game can start here, but define separate functions, don't write everything in here :)

}
