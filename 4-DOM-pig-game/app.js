/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, 
- it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;
var winnerAppear = false;

init();

// when press the "roll" btn
var preDice = 0;
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(!winnerAppear){
// 1. Random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

// 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
      //Next player
      console.log("You rolled 1 in this round!");
      nextPlayer();
  }
    // if(preDice !== 6 || dice !== 6 ){
    //   preDice = dice;
    //     if(dice !== 1){
    //       roundScore += dice;
    //       document.getElementById('current-' + activePlayer).textContent = roundScore;
    //     }else{
    //       nextPlayer();
    //       preDice = 0;
    //     }
    // } else {
    //   document.querySelector('#score-' + activePlayer).textContent = '0';
    //   nextPlayer();
    //   preDice = 0;
    // }

  }
});

  document.querySelector('.btn-hold').addEventListener('click', function(){
  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  var inputWinningScore = document.getElementById('wScore').value;
  console.log('winning score is ' + inputWinningScore);
  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  // Check if player won the game
  if (scores[activePlayer] >= inputWinningScore){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    winnerAppear = true;
    preDice = 0;
  } else {
    // next player
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
preDice = 0;

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
winnerAppear = false;
}

function nextPlayer(){
  console.log('change player!');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    winnerAppear = false;
}