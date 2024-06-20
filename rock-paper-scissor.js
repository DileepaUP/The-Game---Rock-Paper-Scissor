let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loss: 0,
    tie: 0
};

updateScoreElement();

// if (score === null) {
//     score = {
//         wins: 0,
//         losses: 0,
//         tie: 0
//     };
// }


let isAutoPlaying = false;
let intervalId;

function autoplay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playMove = pickComputerMove();
            playGame(playMove);
        }, 1000);
        isAutoPlaying = true;

        document.querySelector('.autoplay-btn').innerHTML = 'Stop Play';

        } else {
            clearInterval(intervalId);
            isAutoPlaying = false;

            document.querySelector('.autoplay-btn').innerHTML = 'Auto Play';
        }   
}

document.querySelector('.autoplay-btn').addEventListener('click', () => {
    autoplay();
})

document.querySelector('.js-rock-button').addEventListener('click',() => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});


document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('Rock');
    }else if(event.key === 'p'){
        playGame('Paper');
    }else if(event.key === 's'){
        playGame('Scissors');
    }else if(event.key === 'a'){
        autoplay();
    }else if(event.key === 'Backspace'){
        updateScoreElement();
    }
})


function playGame(playMove) {
    //computer's selection
    const computerMove = pickComputerMove();

    //result
    let result = '';

    if (playMove === 'Rock') {
        if (computerMove == 'Rock') {
            result = 'Tie';
        }
        else if (computerMove == 'Paper') {
            result = 'You loose';
        }
        else if (computerMove == 'Scissors') {
            result = 'You win';
        }

    } else if (playMove === 'Paper') {
        if (computerMove == 'Paper') {
            result = 'Tie';
        }
        else if (computerMove == 'Rock') {
            result = 'You win';
        }
        else if (computerMove == 'Scissors') {
            result = 'You loose';
        }

    } else if (playMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You loose';
        }
        else if (computerMove === 'Paper') {
            result = 'You win';
        }
        else if (computerMove === 'Scissors') {
            result = 'Tie';
        }
    } else {
        console.log("Error");
    }

    if (result === 'You win') {
        score.wins += 1;
    }
    else if (result === 'You loose') {
        score.loss += 1;
    }
    else if (result === 'Tie') {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move').innerHTML = `
    You
    <img src="${playMove}-emoji.png" class="play-img">
    <img src="${computerMove}-emoji.png" class="play-img">
    Computer`;
}


function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Loss: ${score.loss} Tie: ${score.tie}`;

}

function pickComputerMove() {

    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;

}

function resetScore() {
    score.wins = 0;
    score.loss = 0;
    score.tie = 0;

    localStorage.removeItem('score');
    updateScoreElement();
       
}


document.querySelector('.reset-score-btn').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = `
        <p class="para-reset">
            Are you sure you want to reset the score?
            <button class="reset-btn-option-yes">Yes</button>
            <button class="reset-btn-option-no">No</button>
        </p>
    `;

    document.querySelector('.reset-btn-option-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    })

    document.querySelector('.reset-btn-option-no').addEventListener('click', () => {
        hideResetConfirmation();
    })

})


function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = '';
    
}
