let game = {
    slot: document.querySelector(".card-slot"),
    isClickable: true,
    pairsVar: undefined,
    turnLimit: undefined,
    timeLimit: undefined,
    pairs: function () {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        game.pairsVar = parseInt(urlParams.get('cards'));
        game.turnLimit = urlParams.get('turns');
        game.timeLimit = urlParams.get('timer');
    },
    initGame: function () {
        game.pairs();
        game.timerCalculator();
        game.turnCalculator();
        game.divPlacer();
        game.displayTurns();
        game.displayTimer();
    },
    openCounter: 0,
    maxNum: 30,
    foundPairs: 0,
    // startTime - now() - convert to secs
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
        document.querySelector('#play-again').hidden = false;
        // reload page ??
        // location.reload();
    },
    getNumbers: function () {
        let imageNumbers = [];
        do {
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
            img.src = `images/${imageIds[i]}.png`;
            img.draggable = false;
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
                            ///////////
                            game.displayTurns();

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
                                }, 1000);

                            }
                            if (game.turnLimit === game.turnMeter) {
                                game.lostGame();
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
        document.querySelector('#play-again').hidden = false;
    },
    clockStart: function () {
        if (!game.hasStarted) {
            game.hasStarted = true;
            game.time = setInterval(() => {
                game.clock++;
                document.querySelector('#time').value = game.clock;
                document.querySelector('#timer').value = game.timeLimit - game.clock;
                if (game.timeLimit - game.clock === 0) {
                    game.lostGame();
                }
            }, 1000)
        }
    },
    turnCalculator: function () {
        if (game.turnLimit === 'hard') {
            Math.ceil(game.turnLimit = game.pairsVar * 1.5);
        } else if (game.turnLimit === 'medium') {
            game.turnLimit = game.pairsVar * 2;
        } else if (game.turnLimit === 'easy') {
            game.turnLimit = game.pairsVar * 3;
        }
    },
    timerCalculator: function () {
        if (game.timeLimit === 'hard') {
            game.timeLimit = game.pairsVar * 6;
        } else if (game.timeLimit === 'medium') {
            game.timeLimit = game.pairsVar * 9;
        } else if (game.timeLimit === 'easy') {
            game.timeLimit = game.pairsVar * 12;
        }
    },
    displayTurns: function () {
        if (Number.isInteger(game.turnLimit)) {
            console.log(`${game.turnLimit} / ${game.turnMeter}`)
            document.querySelector('#turns').value = `${game.turnLimit} / ${game.turnMeter}`
        } else {
            document.querySelector('#turns').value = game.turnMeter;
        }
    },
    displayTimer: function () {
        let timeInputDiv = document.querySelector('.time');
        let timerInputDiv = document.querySelector('.timer');
        let timerInput = document.querySelector('#timer');
        let timeInput = document.querySelector('#time');
        if (Number.isInteger(game.timeLimit)) {
            timeInputDiv.style.display = 'none';
            timerInput.value = game.timeLimit - game.clock;
        } else {
            timeInput.value = game.clock;
            timerInputDiv.style.display = 'none';
        }
    }
}

game.initGame();