			var tailTwo=document.getElementsByClassName("tailTwo");
			var columnNum=0;
			var rowNum=0;
			var marginLeft=0;
			var marginTop=0;
			var appleCoordinate=[];
			var apple=null;
			var addLength=[450];
			
			var greenArrTime=[];
			var greenKeyCodeTime=[];
			var greenAddLengthTime=[0];
			var greenColdDownTime=[0];
			
			var blueArrTime=[];
			var blueKeyCodeTime=[];
			var blueAddLengthTime=[0];
			var blueColdDownTime=[0];
		//Function Library----------------------------------------------------
			
			/**init()--The function set the number of rows and colunms and the margin
						of the side. The snake is facing downwards at first.
			*/
			function initTwoSnakesTime(){
				//alert();
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				
				columnNum=parseInt(window.innerWidth/50)-1;
				rowNum=parseInt(window.innerHeight/50)-2;
				marginLeft=(window.innerWidth-(columnNum*50))/2;
				marginTop=(window.innerHeight-(rowNum*50))/2+50;
				
				apple=document.getElementById("apple");
				countDown=document.getElementById("countDown");
				apple.style.display="block";
				
				tailTwo.rSpdGreen=1;
				tailTwo.cSpdGreen=0;
				tailTwo.rSpdBlue=-1;
				tailTwo.cSpdBlue=0;
				
				greenKeyCodeTime[0]=[83];
				blueKeyCodeTime[0]=[38];
				
				setGridTime();
				startPositionTime();
				setSnakeTime();
				setAppleTime();
				setTimeout(function(){
					shiftSnakeTime();
					pushSnakeTime();
				}, 1000);
			}
			function resetSnakeTimes(){
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				tailTwo.rSpdGreen=1;
				tailTwo.cSpdGreen=0;
				greenKeyCodeTime[0]=[83];
				
				tailTwo.rSpdBlue=-1;
				tailTwo.cSpdBlue=0;
				blueKeyCodeTime[0]=[38];
				
				startPositionTime();
				setSnakeTime();
				setAppleTime();
				setTimeout(function(){
					shiftSnakeTime();
					pushSnakeTime();
				},1000);
				//console.log("box" +tailTwo.length);
			}
			
			/**setGridTime()--The function creates div elements and set the height
							width of 50px. The class name of the divs is "tailTwo",
							and it attatch the "coordinate" to the div element.
							
			*/
			function setGridTime(){
				for(var i=0; i<rowNum; i++){
					for(var j=0; j<columnNum; j++){
						var tempBox=document.createElement("div");
						tempBox.className="tailTwo";
						tempBox.style.position="absolute";
						tempBox.style.top=i*50+marginTop+"px";
						tempBox.style.left=j*50+marginLeft+"px";
						document.body.appendChild(tempBox);
						tempBox.coordinate=[i,j];
						tempBox.style.border="1px solid silver";
						tempBox.innerHTML=i+", "+j;
					}
				}	
				//i=column, j=row
			}
			function startPositionTime(){
				greenArrTime=[];
				blueArrTime=[];
				var greenTopSpace=parseInt(rowNum*0.2);
				var blueTopSpace=parseInt(rowNum*0.8);
				
				for(var i=0; i<5; i++){
					greenArrTime.push([greenTopSpace+i, 1]);
					blueArrTime.push([blueTopSpace-i, columnNum-2]);
				}
				//console.log(rowNum);
				//console.log(blueArrTime);
				
			}
			/**setSnakeTime()--The function sees if the greenArrTime and the "coordinate" of
							the box match up. If it does, the background-color turn into
							green, if not powderBlue.
			*/
			function setSnakeTime(){
				for(var i=0; i<greenArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(greenArrTime[i][0]!=tailTwo[j].coordinate[0]||greenArrTime[i][1]!=tailTwo[j].coordinate[1]){
							tailTwo[j].style.backgroundColor="white";
							//tailTwo[j].innerHTML="";
							tailTwo[j].style.zIndex="-1";
							tailTwo[j].style.border="1px solid silver";
							tailTwo[j].innerHTML="";
						}
					}
				}
				for(var i=0; i<blueArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(blueArrTime[i][0]!=tailTwo[j].coordinate[0]||blueArrTime[i][1]!=tailTwo[j].coordinate[1]){
							tailTwo[j].style.backgroundColor="white";
							//tailTwo[j].innerHTML="";
							tailTwo[j].style.zIndex="-1";
							tailTwo[j].style.border="1px solid silver";
							tailTwo[j].innerHTML="";
						}
					}
				}
				for(var i=0; i<greenArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(greenArrTime[i][0]==tailTwo[j].coordinate[0]&&greenArrTime[i][1]==tailTwo[j].coordinate[1]){
							tailTwo[j].style.backgroundColor="green";
							tailTwo[j].style.zIndex="1";
							tailTwo[j].style.border="1px solid black";
							tailTwo[j].innerHTML="";
						}
						
					}
				}
				for(var i=0; i<blueArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(blueArrTime[i][0]==tailTwo[j].coordinate[0]&&blueArrTime[i][1]==tailTwo[j].coordinate[1]){
							tailTwo[j].style.backgroundColor="blue";
							tailTwo[j].style.zIndex="1";
							tailTwo[j].style.border="1px solid black";
							tailTwo[j].innerHTML="";
						}
						
					}
				}
				for(var i=0; i<greenArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(greenArrTime[greenArrTime.length-1][0]==tailTwo[j].coordinate[0]&&greenArrTime[greenArrTime.length-1][1]==tailTwo[j].coordinate[1]){
							//console.log(tailTwo[j].coordinate);
							
							tailTwo[j].style.backgroundColor="darkGreen";
						}
					}
				}
				for(var i=0; i<blueArrTime.length; i++){
					for(var j=0; j<tailTwo.length; j++){
						if(blueArrTime[blueArrTime.length-1][0]==tailTwo[j].coordinate[0]&&blueArrTime[blueArrTime.length-1][1]==tailTwo[j].coordinate[1]){
							//console.log(tailTwo[j].coordinate);
							tailTwo[j].style.backgroundColor="darkBlue";
						}
						
					}
				}
				
			}
			/**shiftSnakeTime()--The funciton delete the first coordinate in the greenArrTime.
								It calls setSnakeTime();
			*/
			function shiftSnakeTime(){
				tailTwo.timerShift=setInterval(function(){
					if(greenAddLengthTime[0]==0){
						greenArrTime.shift();
						setSnakeTime();
					}else if(greenAddLengthTime[0]==1){
						setTimeout(function(){
							setSnakeTime();
							greenAddLengthTime[0]=0;
							//alert();
						}, addLength[0]);
					}
					if(blueAddLengthTime[0]==0){
						blueArrTime.shift();
						setSnakeTime();
					}else if(blueAddLengthTime[0]==1){
						setTimeout(function(){
							setSnakeTime();
							blueAddLengthTime[0]=0;
							//alert();
						}, addLength[0]);
					}
				}, 300);
				
				
			}
			/**pushSnakeTimes()--The funciton add the next coordinate to the greenArrTime.
								It calls setSnakeTime();	
			*/
			function pushSnakeTime(){
				tailTwo.timerPush=setInterval(function(){
					greenArrTime.push([greenArrTime[greenArrTime.length-1][0]+tailTwo.rSpdGreen,greenArrTime[greenArrTime.length-1][1]+tailTwo.cSpdGreen]);
					blueArrTime.push([blueArrTime[blueArrTime.length-1][0]+tailTwo.rSpdBlue,blueArrTime[blueArrTime.length-1][1]+tailTwo.cSpdBlue]);
					checkAppleCollisionTime(greenArrTime[greenArrTime.length-1][0],greenArrTime[greenArrTime.length-1][1], "green");
					checkAppleCollisionTime(blueArrTime[blueArrTime.length-1][0],blueArrTime[blueArrTime.length-1][1], "blue");
					checkCollisionTime();
					setSnakeTime();
					greenColdDownTime[0]=0;
					blueColdDownTime[0]=0;
					console.log("adf");
					
				}, 300);
			}
			/**keyDown()--The function detect if WASD is pressed and changes the 
							snake's direction.
			*/
			
			function keyDownTwoTime(e, name){
				if(e.keyCode==87&&greenKeyCodeTime[0]!=83&&greenKeyCodeTime[0]!=87&&greenColdDownTime[0]==0){
					greenColdDownTime[0]=1;
					tailTwo.rSpdGreen=-1;
					tailTwo.cSpdGreen=0;
					greenKeyCodeTime.pop();
					greenKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==65&&greenKeyCodeTime[0]!=68&&greenKeyCodeTime[0]!=65&&greenColdDownTime[0]==0){
					greenColdDownTime[0]=1;
					tailTwo.rSpdGreen=0;
					tailTwo.cSpdGreen=-1;
					greenKeyCodeTime.pop();
					greenKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==83&&greenKeyCodeTime[0]!=87&&greenKeyCodeTime[0]!=83&&greenColdDownTime[0]==0){
					greenColdDownTime[0]=1;
					tailTwo.rSpdGreen=1;
					tailTwo.cSpdGreen=0;
					greenKeyCodeTime.pop();
					greenKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==68&&greenKeyCodeTime[0]!=65&&greenKeyCodeTime[0]!=68&&greenColdDownTime[0]==0){
					greenColdDownTime[0]=1;
					tailTwo.rSpdGreen=0;
					tailTwo.cSpdGreen=1;
					greenKeyCodeTime.pop();
					greenKeyCodeTime.push(e.keyCode);
				}else if (e.keyCode==32){
					greenAddLengthTime[0]=1;
				}
				if(e.keyCode==38&&blueKeyCodeTime[0]!=40&&blueKeyCodeTime[0]!=38&&blueColdDownTime[0]==0){
					blueColdDownTime[0]=1;
					tailTwo.rSpdBlue=-1;
					tailTwo.cSpdBlue=0;
					blueKeyCodeTime.pop();
					blueKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==37&&blueKeyCodeTime[0]!=39&&blueKeyCodeTime[0]!=37&&blueColdDownTime[0]==0){
					blueColdDownTime[0]=1;
					tailTwo.rSpdBlue=0;
					tailTwo.cSpdBlue=-1;
					blueKeyCodeTime.pop();
					blueKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==40&&blueKeyCodeTime[0]!=38&&blueKeyCodeTime[0]!=40&&blueColdDownTime[0]==0){
					blueColdDownTime[0]=1;
					tailTwo.rSpdBlue=1;
					tailTwo.cSpdBlue=0;
					blueKeyCodeTime.pop();
					blueKeyCodeTime.push(e.keyCode);
				}else if(e.keyCode==39&&blueKeyCodeTime[0]!=37&&blueKeyCodeTime[0]!=39&&blueColdDownTime[0]==0){
					blueColdDownTime[0]=1;
					tailTwo.rSpdBlue=0;
					tailTwo.cSpdBlue=1;
					blueKeyCodeTime.pop();
					blueKeyCodeTime.push(e.keyCode);
				}else if (e.keyCode==13){
					blueAddLengthTime[0]=1;
				}
			}
			
			function setAppleTime(){
				var kG=true;
				appleCoordinate[0]=parseInt(Math.random()*rowNum);
				appleCoordinate[1]=parseInt(Math.random()*columnNum);
				apple.style.left=(appleCoordinate[1]*50)+marginLeft+"px";
				apple.style.top=(appleCoordinate[0]*50)+marginTop+"px";
					for(var i=0; i<greenArrTime.length; i++){
							if(greenArrTime[i][0]==appleCoordinate[0]&&greenArrTime[i][1]==appleCoordinate[1]){
								setAppleTime();
							}
					}
					for(var i=0; i<blueArrTime.length; i++){
						if(blueArrTime[i][0]==appleCoordinate[0]&&blueArrTime[i][1]==appleCoordinate[1]){
							setAppleTime();
						}
					}
			}
			function checkAppleCollisionTime(headRow, headColumn, snakeColor){
				//console.log(appleCoordinate);
				//console.log(greenArrTime);
				if(appleCoordinate[0]==headRow&&appleCoordinate[1]==headColumn&&snakeColor=="green"){
					greenAddLengthTime[0]=1;
					setAppleTime();
				}
				if(appleCoordinate[0]==headRow&&appleCoordinate[1]==headColumn&&snakeColor=="blue"){
					blueAddLengthTime[0]=1;
					//greenPoint[0]++;
					//scoreBox.innerHTML=greenPoint[0];
					setAppleTime();
				}
			}
			function checkCollisionTime(){
				var greenSnake=0;
				var blueSnake=0;
				
				if(greenArrTime[greenArrTime.length-1][0]<0||greenArrTime[greenArrTime.length-1][0]>rowNum-1){
					blueSnake++;
					
				}else if(greenArrTime[greenArrTime.length-1][1]<0||greenArrTime[greenArrTime.length-1][1]>columnNum-1){
					blueSnake++;
				}
				if(blueArrTime[blueArrTime.length-1][0]<0||blueArrTime[blueArrTime.length-1][0]>rowNum-1){
					greenSnake++;
					
				}else if(blueArrTime[blueArrTime.length-1][1]<0||blueArrTime[blueArrTime.length-1][1]>columnNum-1){
					greenSnake++;
				}
				for (var i=0; i<greenArrTime.length-1; i++){
					if(greenArrTime[i][0]==greenArrTime[greenArrTime.length-1][0]&&greenArrTime[i][1]==greenArrTime[greenArrTime.length-1][1]){
						blueSnake++;
					}
				}
				for (var i=0; i<blueArrTime.length-1; i++){
					if(blueArrTime[i][0]==blueArrTime[blueArrTime.length-1][0]&&blueArrTime[i][1]==blueArrTime[blueArrTime.length-1][1]){
						greenSnake++;
					}
				}
				for(var i=0; i<greenArrTime.length; i++){
					if(greenArrTime[i][0]==blueArrTime[blueArrTime.length-1][0]&&greenArrTime[i][1]==blueArrTime[blueArrTime.length-1][1]){
						greenSnake++;
					}
				}
				for(var i=0; i<blueArrTime.length; i++){
					if(blueArrTime[i][0]==greenArrTime[greenArrTime.length-1][0]&&blueArrTime[i][1]==greenArrTime[greenArrTime.length-1][1]){
						blueSnake++;
					}
				}
				
				if(greenSnake==1&&blueSnake==1){
					console.log(greenSnake, blueSnake);
					setTimeout(function(){nextRoundTime("Tie");}, 10);
				}else if(greenSnake==1&&blueSnake==0){
					console.log(greenSnake, blueSnake);
					snakeOneScoreV1.innerHTML++;
					setTimeout(function(){nextRoundTime("Player 1 Wins");}, 10);
				}else if(greenSnake==0&&blueSnake==1){
					console.log(greenSnake, blueSnake);
					snakeTwoScoreV1.innerHTML++;
					setTimeout(function(){nextRoundTime("Player 2 Wins");}, 10);
				}
			}
			
			function nextRoundTime(){
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				setTimeout(resetSnakeTimes, 1000);
				
			}
			
			
			function nextGame(){
				var nextRoundTime=true;
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				clearInterval(myTimer);
				nextRoundTime=confirm("Do you want to play again?");
				if(nextRoundTime){
					initTable("time");
					snakeOneScoreV1.innerHTML=0;
					snakeTwoScoreV1.innerHTML=0;
					resetSnakeTimes();
					
				}else{
					for(var i=0; i<tailTwo.length; i++){
						tailTwo[i].style.display="none";
						
					}
					clearInterval(tail.timerPush);
					clearInterval(tail.timerShift);
					clearInterval(tailTwo.timerPush);
					clearInterval(tailTwo.timerShift);
					snakeOneScoreV1.innerHTML=0;
					snakeTwoScoreV1.innerHTML=0;
					apple.style.display="none";
					timerTable.style.display="none";
					mainPagesWrapper.style.display="block";
					title.style.display="block";
					onePerson.style.display="block";
					twoPeople.style.display="block";
					backNum[0]=0;
				}
				
			}