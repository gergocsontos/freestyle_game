let game = {
    slot: document.querySelector(".card-slot"),
    queryString: window.location.search,
    // urlParams: new URLSearchParams(this.queryString),
    pairs: 10, // parseInt(this.urlParams.get('cards')),
    openCounter: 0,
    maxNum: 10,
    container: document.querySelector('.container'),
    initGame: function () {
        game.divPlacer();
    }

,
getNumbers: function () {
    let imageNumbers = [];
    do {
        // debugger;
        const randomNumber = Math.ceil(Math.random() * game.maxNum);
        if (!imageNumbers.includes(randomNumber)) {
            imageNumbers.push(randomNumber);
        }
    }
    while (imageNumbers.length !== game.pairs);
    imageNumbers.push.apply(imageNumbers, imageNumbers);
    imageNumbers.sort((a, b) => 0.5 - Math.random());
    imageNumbers.sort((a, b) => 0.5 - Math.random());
    return imageNumbers;
}
,
divPlacer: function () {
    let imageIds = game.getNumbers();
    game.pairs *= 2;
    for (let i = 0; i < game.pairs; i++) {

        const newDiv = document.createElement('div');
        newDiv.classList.add('closed');
        newDiv.classList.add('card-slot');
        const img = document.createElement('img')
        img.src = `images/${imageIds[i]}.png`
        img.style.opacity = '0';
        img.dataset.id = imageIds[i]
        // let openCounter = 0;
        let turnMeter = 0;
        let firstPic;
        img.addEventListener('click', function (e) {
            game.openCounter++;
            console.log(game.openCounter)
            //     if (e.target.style.opacity === '0') {
            //         openCounter += 1;
            //         console.log(openCounter)
            //
            //     if (openCounter === 1) {
            //         firstPic = e.target;
            //     }
            //     if (openCounter === 2) {
            //         turnMeter += 1;
            //         openCounter = 0;
            //         if (e.target.dataset.id === firstPic.dataset.id) {
            //             firstPic.classList.add('open');
            //             e.target.classList.add('open');
            //         }
            //         else {
            //             firstPic.style.opacity = '0';
            //             e.target.style.opacity ='0';
            //         }
            //     }
            //     else {
            //         e.target.style.opacity = '1';
            //     }
            // }
        })
        newDiv.appendChild(img)

        game.container.appendChild(newDiv);
    }
}
,

// for(let i = 1; i <= 10; i++){
//     a
//     slot.appendChild(image);
// }
// Your game can start here, but define separate functions, don't write everything in here :)

}

game.initGame();