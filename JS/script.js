let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.buttons');

const playerSelection = document.querySelector('#playerSelection');
const computerSelection = document.querySelector('#computerSelection');

const scorePlayer = document.querySelector('#playerScore');
const scorecomputer = document.querySelector('#computerScore');

const whoBeats = document.querySelector('#whoBeats');
const resultMsg = document.querySelector('#result');

const modalMessage = document.querySelector('#modalMessage');
const restart = document.querySelector('#restart');
const overlay = document.querySelector('.overlay');

function computerPlay(){
    let choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function roundCheck(playerSelection, computerSelection){
    let str=[];
    if(playerSelection == computerSelection){
        str[0] = `It's a tie`;
        resultMsg.style.color = 'black';
    }
    else if((playerSelection=="rock" && computerSelection=="scissors") || (playerSelection=="scissors" && computerSelection=="paper") || (playerSelection=="paper" && computerSelection=="rock")){
        str[0] = `You Won!`;
        resultMsg.style.color = 'greenyellow';

        str[1] = `${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`; 
        playerScore++;
    }
    else{
        str[0] = `You Lose...`;
        resultMsg.style.color = 'red';

        str[1] = `${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}`; 
        computerScore++;
    }

    if(playerScore>computerScore){
        scorePlayer.style.color = 'greenyellow';
        scorecomputer.style.color = 'red';
    }
    else if(playerScore<computerScore){
        scorePlayer.style.color = 'red';
        scorecomputer.style.color = 'greenyellow';
    }
    else{
        scorecomputer.style.color = scorePlayer.style.color = 'greenyellow';
    }
    return str;
}

function playAgain(){
    location.reload();
}

function modal(){
    overlay.classList.add('activeRestart');

    if(playerScore==5){
        modalMessage.style.color = 'greenyellow';
        modalMessage.textContent = 'You Won!';
    }
    else{
        modalMessage.style.color = 'red';
        modalMessage.textContent = 'You Lose..';
    }

    restart.addEventListener('click', playAgain);
}

function playRound(button){
    playerSelection.classList.add('active');
    computerSelection.classList.add('active');

    playerSelection.src = button.target.src;

    const comp = document.querySelector(`#${computerPlay()}`);
    computerSelection.src = comp.firstChild.src;

    let str = roundCheck(button.target.alt, comp.id);
    resultMsg.textContent = str[0];
    whoBeats.textContent = str[1];

    scorePlayer.textContent = playerScore;
    scorecomputer.textContent = computerScore;

    if(playerScore==5 || computerScore==5){
        modal();
    }
}

buttons.forEach((button)=>{
    button.addEventListener('click', playRound);
});

