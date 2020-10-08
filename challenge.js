/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, rosundScore, activePlayer, dice, isNotWinner, previousDice;
initGame();

//button_roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(isNotWinner){
        //roll dice
    dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.dice'+activePlayer).src = "dice-" + dice + ".png";
        //add points current
        if(dice === 6 && previousDice === 6){
            //player looses score
            scores[activePlayer] = 0;
            roundScore = 0;
            document.getElementById('score-'+activePlayer).textContent = "0";
             document.getElementById('current-'+activePlayer).textContent = 0;
            changePlayer();
        } else if(dice !== 1){
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
        document.querySelector('.dice'+activePlayer).style.display = 'block';
        } else {
        //change player
        changePlayer();  
        }
    previousDice = dice;
}})

//button_hold
document.querySelector('.btn-hold').addEventListener('click', function (){
        if(isNotWinner){
            //set winningScore
            let winningScore;
            let input = document.getElementById('set-winningScore').value;
            // undefined, 0, null or "" are coerced to false
            //anything else is coerced to true
            if(input){
                winningScore = input;
            } else {
                winningScore = 100;
            }
            scores[activePlayer] += roundScore;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            //test winner
            if(scores[activePlayer] >= winningScore){
            isNotWinner = false;
                document.getElementById('name-'+activePlayer).textContent = "Winner";
                document.querySelector('.player-name').classList.add('winner');
      
        }
            //change player
            changePlayer();
        }
    
    })

function changePlayer (){
    roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = 0;
    document.querySelector('.dice'+activePlayer).style.display = 'none';
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


document.querySelector('.btn-new').addEventListener('click', initGame);

//button_new_game
function initGame(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isNotWinner = true;
    
    document.querySelector('.dice'+activePlayer).style.display = 'none';
    
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('Winner');
    document.querySelector('.player-1-panel').classList.remove('Winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  
}
