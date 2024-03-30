function initTable(mode){
	
	if(mode=="points"){
		scoreBoard = document.getElementById("scoreboard");
		scoreBoard.style.display="block";
		snakeOneScoreV2 = document.getElementById("snakeOneScoreV2");
		snakeOneScoreV2.innerHTML = "0";
		snakeTwoScoreV2 = document.getElementById("snakeTwoScoreV2");
		snakeTwoScoreV2.innerHTML = "0";
	}
	
	if(mode=="time"){
		var timerTable = document.getElementById("timerTable");
		timerTable.minutes = 3; 
		timerTable.secondsTens = 0;
		timerTable.secondsOnes = 0;
		snakeOneScoreV1 = document.getElementById("snakeOneScoreV1");
		snakeOneScoreV1.innerHTML = "0";
		
		snakeTwoScoreV1 = document.getElementById("snakeTwoScoreV1");
		snakeTwoScoreV1.innerHTML = "0";
		
		timer = document.getElementById("timer");
		timer.innerHTML = "3:00";
		
		timerTable.style.display="block"
		timerAnimation = setInterval(myTimer, 1000);
	}
}

function myTimer () {
	timerDisplay = timerTable.minutes + ":" + timerTable.secondsTens + timerTable.secondsOnes; 
	if(timerTable.minutes == 0 && timerTable.secondsTens == 0 && timerTable.secondsOnes == 0) {
		
		clearInterval(timerAnimation);
		setTimeout(nextGame,1000);
		timerDisplay = timerTable.minutes + ":" + timerTable.secondsTens + timerTable.secondsOnes; 
		timer.innerHTML = timerDisplay;
		return;
	}
	else if(timerTable.secondsTens == 0 && timerTable.secondsOnes == 0) {
		timerTable.secondsTens = 5;
		timerTable.secondsOnes = 9;
		timerTable.minutes--;
		timer.innerHTML = (timerDisplay);
		return;
	}
	else if(timerTable.secondsOnes == 0) {
		timerTable.secondsOnes = 9;
		timerTable.secondsTens--;
		timer.innerHTML = (timerDisplay);
		return;
	}
	timerTable.secondsOnes--;
	timer.innerHTML = (timerDisplay);
	
}

var timerAnimation;
