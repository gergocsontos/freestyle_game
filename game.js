let game = {
    slot: document.querySelector(".card-slot"),
    pairs: function() {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        return parseInt(urlParams.get('cards'));
    },
    // pair: game.pairer(),
    openCounter: 0,
    maxNum: 10,
    container: document.querySelector('.container'),
    firstPic: '',
    turnMeter: 0,
    initGame: function () {
        console.log(game.pairs());
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
    while (imageNumbers.length !== game.pairs());
    imageNumbers.push.apply(imageNumbers, imageNumbers);
    imageNumbers.sort((a, b) => 0.5 - Math.random());
    imageNumbers.sort((a, b) => 0.5 - Math.random());
    return imageNumbers;
}
,
divPlacer: function () {
    let imageIds = game.getNumbers();
    let paired = game.pairs();
    paired *= 2;
    for (let i = 0; i < paired; i++) {

        const newDiv = document.createElement('div');
        newDiv.classList.add('closed');
        newDiv.classList.add('card-slot');
        const img = document.createElement('img')
        img.src = `images/${imageIds[i]}.png`
        img.style.opacity = '0';
        img.dataset.id = imageIds[i]
        // let openCounter = 0
        img.addEventListener('click', function (e) {
                if (e.target.style.opacity === '0') {
                    game.openCounter += 1;

                if (game.openCounter === 1) {
                    game.firstPic = e.target;
                }
                if (game.openCounter === 2) {
                    game.turnMeter += 1;
                    game.openCounter = 0;
                    e.target.style.opacity = '1';
                    if (e.target.dataset.id === game.firstPic.dataset.id) {
                        game.firstPic.classList.add('open');
                        e.target.classList.add('open');
                    }
                    else {
                        setTimeout(function () {
                            console.log('heyy')
                            game.firstPic.style.opacity = '0';
                            e.target.style.opacity ='0';
                        }, 1500);

                    }
                }
                else {
                    e.target.style.opacity = '1';
                }
            }
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