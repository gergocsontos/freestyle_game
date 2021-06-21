initGame();

function initGame() {
    const slot = document.querySelector(".card-slot");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pairs = parseInt(urlParams.get('cards'));
// element.style.src = `images/${i}.png`
    const maxNum = 10;
    const container = document.querySelector('.container')

    function getNumbers(number) {
        let imageNumbers = [];
        do {
            // debugger;
            const randomNumber = Math.ceil(Math.random() * maxNum);
            console.log(randomNumber);
            if (!imageNumbers.includes(randomNumber)) {
                imageNumbers.push(randomNumber);
            }
        }
        while (imageNumbers.length !== number);
        imageNumbers.push.apply(imageNumbers, imageNumbers)
        imageNumbers.sort((a, b) => 0.5 - Math.random());
        imageNumbers.sort((a, b) => 0.5 - Math.random());
        console.log(imageNumbers)
        console.log(typeof(imageNumbers))
        return imageNumbers;
    }
    divPlacer(pairs)
    function divPlacer(pairs) {
        let imageIds = getNumbers(pairs)
        console.log(imageIds)
        pairs *= 2;
        for (let i = 0; i < pairs; i++) {

            const newDiv = document.createElement('div');
            newDiv.classList.add('closed');
            newDiv.classList.add('card-slot');
            const img = document.createElement('img')
            img.src = `images/${imageIds[i]}.png`
            img.dataset.id = imageIds[i]
            newDiv.appendChild(img)

            container.appendChild(newDiv);
        }
    }

// for(let i = 1; i <= 10; i++){
//     a
//     slot.appendChild(image);
// }
    // Your game can start here, but define separate functions, don't write everything in here :)

}
