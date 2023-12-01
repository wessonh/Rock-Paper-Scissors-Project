// Henry Wessson
// SD 230
// 11/10/2023
// Rock, Paper, Scissors - JavaScript 

// This is the JavaScript File for my Rock, Paper, Scissors program. 
// Contains the functions that handle the game logic. 

// variables
let userScore = 0;
let computerScore = 0;
let tieScore = 0;
let userChoice = null;
let timeEnd;
let timerCompleted = false;
let buttonsDisabled = false;

function startTimer(callback) { // this function controls the timer 
	const timerElement = document.getElementById("timer");
	const word = [ // array for the different words for the timer countdown
		'<span style="color: blue;">ROCK!</span>',
		'<span style="color: brown;">PAPER!</span>',
		'<span style="color: red;">SCISSORS!</span>',
		'<span style="color: orange;">SHOOT!</span>',
	];

	let i = 0; // sets index to 0
	timeEnd = setInterval(() => {
		if (i === word.length) { // if i is the length of word array, end the timer
			clearInterval(timeEnd);
			timerElement.innerHTML = '';
			timerCompleted = true;
			if (callback) { //callback to call playGame
				callback();
			}
		} else { // otherwise it incrementally goes through the word array elements each loop
			timerElement.innerHTML = word[i];
			i++;
		}
	}, 1500); // sets each loop to 1.5 second intervals. one second seems too quick
}

function startGame() { // this function starts the game 
	document.getElementById('start-button').style.display = 'none'; // hides start button
	document.getElementById('game-scene').style.display = 'block';
	resetGame(); // calls reset game
	startTimer(playGame); // starts the timer
}

function selectMove(move) { // This function handles clicking the move to select it or deselect. If the play button is selected you can't select a move, must deselect it first.
	if (timerCompleted || document.getElementById('play-button').classList.contains('selected')) { // checks if the timer is completed or play button is selected
		return;
	}
	if (userChoice === move) { // if the user choice is assigned to a move
		userChoice = null; // set the move the null
	} else { // otherwise user choice is a move
		userChoice = move;
	}

	updateButtonStates(move); // updates move button states on click
	document.getElementById('play-button').removeAttribute('disabled'); // makes play button clickable
}

function playButtonClick() { // this function handles clicking the play button
	const playButton = document.getElementById('play-button');
	playButton.classList.toggle('selected'); // toggles the selected state of the play button
	
	if (playButton.classList.contains('selected')) { // if the play button is selected
		playGame(); // calls playGame
	} else { // otherwise
		playButton.removeAttribute('disabled'); // enable and make clickable if deselected
	}
}

function updateButtonStates() { // this function handles updating the button states
	const moves = ['Rock', 'Paper', 'Scissors']; // move array has rock, paper, and scissors
	
    moves.forEach(move => { // for each move in the array
		const button = document.getElementById(`${move.toLowerCase()}-button`); // gets the buttons for each move in the array
		
        if (userChoice === move) { // if user choice is a move
			button.classList.add('selected'); // button displays as selected
		} else { // otherwise 
			button.classList.remove('selected'); //remove selected state from button
		}
		
	});

	const playButton = document.getElementById('play-button');

	if (userChoice !== null) { // if user choice is not null
		playButton.classList.remove('selected'); // remove playButton selected
	} else { // otherwise
		playButton.classList.add('selected'); // add selected state to playbutton
	}
}

function playGame() { // this function handles the game logic, the computer choice, and the random choice is the user fails to select a move
    
    if (timerCompleted) { // if the timer is completed
        const choices = ['Rock', 'Paper', 'Scissors']; // array of choices
        const playButton = document.getElementById('play-button');
        let result = ''; // sets result to blank
  
        if (!playButton.classList.contains('selected') || userChoice === null) { // if play button hasn't been selected
            userChoice = choices[Math.floor(Math.random() * 3)]; // randomly choose for player
        
            const button = document.getElementById(`${userChoice.toLowerCase()}-button`); // sets button to button corresponding to user choice
            button.classList.add('selected'); // adds the selected state to button
            result = `Computer randomly chose ${userChoice} for you.<br><br>`; // says computer chose for player
        }
  
        const computerChoice = choices[Math.floor(Math.random() * 3)]; // computer choice is randomly determined
  
        if (userChoice === computerChoice) { // if user choice is the same as computer choice its a tie, add to tie score
            result += '<span style="color: orange; font-weight: bold;">It\'s a tie!</span><br><br>';
            result += `Computer also chose ${computerChoice}.<br><br>`;
            tieScore++;
        } else if ( // if user choice best the computer, user wins, add to user score
            (userChoice === 'Rock' && computerChoice === 'Scissors') ||
            (userChoice === 'Paper' && computerChoice === 'Rock') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            result += `Computer chose ${computerChoice}. <br><br>${userChoice} beats ${computerChoice}.<br><br>`;
            result += '<span style="color: blue; font-weight: bold;">Humanity is victorious!</span>';
            userScore++;
        } else { // otherwise, computer wins, add to computer score
            result += `Computer chose ${computerChoice}. <br><br>${computerChoice} beats ${userChoice}.<br><br>`;
            result += '<span style="color: red; font-weight: bold;">Computer wins, pitiful human!</span>';
            computerScore++;
        }
  
        document.getElementById('result').innerHTML = result; // dispalys the result message
        document.getElementById('score').innerText = `User: ${userScore}, Computer: ${computerScore}, Ties: ${tieScore}`; // displays the score
  
        playButton.style.display = 'none'; // hides the play button
        document.getElementById('play-again-button').style.display = 'inline-block'; // show the play again button
  
        userChoice = null; // sets the user choice to null
        updateButtonStates(null); // sets the button states to null
    }
}

function playAgain() { // this function handles the play again button
	document.getElementById('result').innerText = ''; // sets result to blank
	document.getElementById('play-again-button').style.display = 'none'; // hides play again button
	document.getElementById('play-button').setAttribute('disabled', 'true'); // resets the play button

	resetGame(); // calls reset game
	timerCompleted = false; // sets timer completed to false
	startTimer(playGame); // restarts the timer
}

function resetGame() { // this function resets the game. user choice and button states
	userChoice = null;
	updateButtonStates(null);
	document.getElementById('play-button').style.display = 'inline-block'; // shows play button instead of play again
	document.getElementById('play-button').classList.remove('selected'); // deselects play button
}