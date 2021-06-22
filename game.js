let game = {
    slot: document.querySelector(".card-slot"),
    isClickable: true,
    pairsVar: undefined,
    pairs: function () {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        game.pairsVar = parseInt(urlParams.get('cards'));
    },
    openCounter: 0,
    maxNum: 10,
    foundPairs: 0,
    clock: 0,
    hasStarted: false,
    time: undefined,
    container: document.querySelector('.container'),
    firstPic: '',
    turnMeter: 0,
    won: function () {
        clearInterval(game.time)
        const postgameText = document.querySelector('#postgame-text');
        postgameText.textContent = 'Nice job!';
    },
    initGame: function () {
        game.pairs();
        console.log(game.pairsVar);
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
        while (imageNumbers.length !== game.pairsVar);
        imageNumbers.push.apply(imageNumbers, imageNumbers);
        imageNumbers.sort((a, b) => 0.5 - Math.random());
        imageNumbers.sort((a, b) => 0.5 - Math.random());
        return imageNumbers;
    }
    ,
    divPlacer: function () {
        let imageIds = game.getNumbers();
        let paired = game.pairsVar;
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
                if (game.isClickable) {
                    game.clockStart();
                    if (e.target.style.opacity === '0') {
                        game.openCounter += 1;

                        if (game.openCounter === 1) {
                            game.firstPic = e.target;
                        }
                        if (game.openCounter === 2) {
                            game.isClickable = false;
                            game.turnMeter += 1;
                            document.querySelector('#turns').value = game.turnMeter;
                            game.openCounter = 0;
                            e.target.style.opacity = '1';
                            if (e.target.dataset.id === game.firstPic.dataset.id) {
                                game.firstPic.classList.add('open');
                                e.target.classList.add('open');
                                game.foundPairs++;
                                game.isClickable = true;
                                if (game.foundPairs === game.pairsVar) {
                                    game.won();
                                }
                            } else {
                                setTimeout(function () {
                                    game.isClickable = true;
                                    game.firstPic.style.opacity = '0';
                                    e.target.style.opacity = '0';
                                }, 1500);

                            }
                        } else {
                            e.target.style.opacity = '1';
                        }
                    }
                }
            })
            newDiv.appendChild(img)

            game.container.appendChild(newDiv);
        }
    },
    lostGame: function () {
        clearInterval(game.time)
        const postgameText = document.querySelector('#postgame-text');
        postgameText.textContent = 'Boo, you lost!'
    },
    clockStart: function () {
        if (!game.hasStarted) {
            game.time = setInterval(() => {
                    game.hasStarted = true;
                    game.clock++;
                    document.querySelector('#time').value = game.clock;
                }, 1000)
        }
    }

// for(let i = 1; i <= 10; i++){
//     a
//     slot.appendChild(image);
// }
// Your game can start here, but define separate functions, don't write everything in here :)

}

game.initGame();