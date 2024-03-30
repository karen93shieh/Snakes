			var tail=document.getElementsByClassName("tail");
			var columnNum=0;
			var rowNum=0;
			var marginLeft=0;
			var marginTop=0;
			var appleCoordinate=[];
			var apple=null;
			var addLength=[450];
			
			var greenArr=[];
			var greenKeyCode=[];
			var greenAddLength=[0];
			var greenColdDown=[0];
			
			var blueArr=[];
			var blueKeyCode=[];
			var blueAddLength=[0];
			var blueColdDown=[0];
		//Function Library----------------------------------------------------
			
			/**init()--The function set the number of rows and colunms and the margin
						of the side. The snake is facing downwards at first.
			*/
			function initTwoSnakes(playMode){
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
				
				tail.rSpdGreen=1;
				tail.cSpdGreen=0;
				tail.rSpdBlue=-1;
				tail.cSpdBlue=0;
				
				greenKeyCode[0]=[83];
				blueKeyCode[0]=[38];
				
				setGrid();
				startPosition();
				setSnake();
				setApple();
				setTimeout(function(){
					shiftSnake();
					pushSnake();
				}, 1000);
			}
			function resetSnakes(){
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				tail.rSpdGreen=1;
				tail.cSpdGreen=0;
				greenKeyCode[0]=[83];
				
				tail.rSpdBlue=-1;
				tail.cSpdBlue=0;
				blueKeyCode[0]=[38];
				
				startPosition();
				setSnake();
				setApple();
				setTimeout(function(){
					shiftSnake();
					pushSnake();
				},1000);
				//console.log("box" +tail.length);
			}
			
			/**setGrid()--The function creates div elements and set the height
							width of 50px. The class name of the divs is "tail",
							and it attatch the "coordinate" to the div element.
							
			*/
			function setGrid(){
				for(var i=0; i<rowNum; i++){
					for(var j=0; j<columnNum; j++){
						var tempBox=document.createElement("div");
						tempBox.className="tail";
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
			function startPosition(){
				greenArr=[];
				blueArr=[];
				var greenTopSpace=parseInt(rowNum*0.2);
				var blueTopSpace=parseInt(rowNum*0.8);
				
				for(var i=0; i<5; i++){
					greenArr.push([greenTopSpace+i, 1]);
					blueArr.push([blueTopSpace-i, columnNum-2]);
				}
				//console.log(rowNum);
				//console.log(blueArr);
				
			}
			/**setSnake()--The function sees if the greenArr and the "coordinate" of
							the box match up. If it does, the background-color turn into
							green, if not powderBlue.
			*/
			function setSnake(){
				for(var i=0; i<greenArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(greenArr[i][0]!=tail[j].coordinate[0]||greenArr[i][1]!=tail[j].coordinate[1]){
							tail[j].style.backgroundColor="white";
							//tail[j].innerHTML="";
							tail[j].style.zIndex="-1";
							tail[j].style.border="1px solid LightSteelBlue";
							tail[j].innerHTML="";
						}
					}
				}
				for(var i=0; i<blueArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(blueArr[i][0]!=tail[j].coordinate[0]||blueArr[i][1]!=tail[j].coordinate[1]){
							tail[j].style.backgroundColor="white";
							//tail[j].innerHTML="";
							tail[j].style.zIndex="-1";
							tail[j].style.border="1px solid silver";
							tail[j].innerHTML="";
						}
					}
				}
				for(var i=0; i<greenArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(greenArr[i][0]==tail[j].coordinate[0]&&greenArr[i][1]==tail[j].coordinate[1]){
							tail[j].style.backgroundColor="green";
							tail[j].style.zIndex="1";
							tail[j].style.border="1px solid black";
							tail[j].innerHTML="";
						}
						
					}
				}
				for(var i=0; i<blueArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(blueArr[i][0]==tail[j].coordinate[0]&&blueArr[i][1]==tail[j].coordinate[1]){
							tail[j].style.backgroundColor="blue";
							tail[j].style.zIndex="1";
							tail[j].style.border="1px solid black";
							tail[j].innerHTML="";
						}
						
					}
				}
				for(var i=0; i<greenArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(greenArr[greenArr.length-1][0]==tail[j].coordinate[0]&&greenArr[greenArr.length-1][1]==tail[j].coordinate[1]){
							//console.log(tail[j].coordinate);
							
							tail[j].style.backgroundColor="darkGreen";
						}
					}
				}
				for(var i=0; i<blueArr.length; i++){
					for(var j=0; j<tail.length; j++){
						if(blueArr[blueArr.length-1][0]==tail[j].coordinate[0]&&blueArr[blueArr.length-1][1]==tail[j].coordinate[1]){
							//console.log(tail[j].coordinate);
							tail[j].style.backgroundColor="darkBlue";
						}
						
					}
				}
				
			}
			/**shiftSnake()--The funciton delete the first coordinate in the greenArr.
								It calls setSnake();
			*/
			function shiftSnake(){
				tail.timerShift=setInterval(function(){
					if(greenAddLength[0]==0){
						greenArr.shift();
						setSnake();
					}else if(greenAddLength[0]==1){
						setTimeout(function(){
							setSnake();
							greenAddLength[0]=0;
							//alert();
						}, addLength[0]);
					}
					if(blueAddLength[0]==0){
						blueArr.shift();
						setSnake();
					}else if(blueAddLength[0]==1){
						setTimeout(function(){
							setSnake();
							blueAddLength[0]=0;
							//alert();
						}, addLength[0]);
					}
				}, 300);
				
				
			}
			/**pushSnakes()--The funciton add the next coordinate to the greenArr.
								It calls setSnake();	
			*/
			function pushSnake(){
				tail.timerPush=setInterval(function(){
					greenArr.push([greenArr[greenArr.length-1][0]+tail.rSpdGreen,greenArr[greenArr.length-1][1]+tail.cSpdGreen]);
					blueArr.push([blueArr[blueArr.length-1][0]+tail.rSpdBlue,blueArr[blueArr.length-1][1]+tail.cSpdBlue]);
					checkAppleCollision(greenArr[greenArr.length-1][0],greenArr[greenArr.length-1][1], "green");
					checkAppleCollision(blueArr[blueArr.length-1][0],blueArr[blueArr.length-1][1], "blue");
					checkCollision();
					setSnake();
					greenColdDown[0]=0;
					blueColdDown[0]=0;
					console.log("adf");
					
				}, 300);
			}
			/**keyDown()--The function detect if WASD is pressed and changes the 
							snake's direction.
			*/
			
			function keyDownTwo(e){
				if(e.keyCode==87&&greenKeyCode[0]!=83&&greenKeyCode[0]!=87&&greenColdDown[0]==0){
					greenColdDown[0]=1;
					tail.rSpdGreen=-1;
					tail.cSpdGreen=0;
					greenKeyCode.pop();
					greenKeyCode.push(e.keyCode);
				}else if(e.keyCode==65&&greenKeyCode[0]!=68&&greenKeyCode[0]!=65&&greenColdDown[0]==0){
					greenColdDown[0]=1;
					tail.rSpdGreen=0;
					tail.cSpdGreen=-1;
					greenKeyCode.pop();
					greenKeyCode.push(e.keyCode);
				}else if(e.keyCode==83&&greenKeyCode[0]!=87&&greenKeyCode[0]!=83&&greenColdDown[0]==0){
					greenColdDown[0]=1;
					tail.rSpdGreen=1;
					tail.cSpdGreen=0;
					greenKeyCode.pop();
					greenKeyCode.push(e.keyCode);
				}else if(e.keyCode==68&&greenKeyCode[0]!=65&&greenKeyCode[0]!=68&&greenColdDown[0]==0){
					greenColdDown[0]=1;
					tail.rSpdGreen=0;
					tail.cSpdGreen=1;
					greenKeyCode.pop();
					greenKeyCode.push(e.keyCode);
				}else if (e.keyCode==32){
					greenAddLength[0]=1;
				}
				if(e.keyCode==38&&blueKeyCode[0]!=40&&blueKeyCode[0]!=38&&blueColdDown[0]==0){
					blueColdDown[0]=1;
					tail.rSpdBlue=-1;
					tail.cSpdBlue=0;
					blueKeyCode.pop();
					blueKeyCode.push(e.keyCode);
				}else if(e.keyCode==37&&blueKeyCode[0]!=39&&blueKeyCode[0]!=37&&blueColdDown[0]==0){
					blueColdDown[0]=1;
					tail.rSpdBlue=0;
					tail.cSpdBlue=-1;
					blueKeyCode.pop();
					blueKeyCode.push(e.keyCode);
				}else if(e.keyCode==40&&blueKeyCode[0]!=38&&blueKeyCode[0]!=40&&blueColdDown[0]==0){
					blueColdDown[0]=1;
					tail.rSpdBlue=1;
					tail.cSpdBlue=0;
					blueKeyCode.pop();
					blueKeyCode.push(e.keyCode);
				}else if(e.keyCode==39&&blueKeyCode[0]!=37&&blueKeyCode[0]!=39&&blueColdDown[0]==0){
					blueColdDown[0]=1;
					tail.rSpdBlue=0;
					tail.cSpdBlue=1;
					blueKeyCode.pop();
					blueKeyCode.push(e.keyCode);
				}else if (e.keyCode==13){
					blueAddLength[0]=1;
				}
			}
			
			function setApple(){
				var kG=true;
				appleCoordinate[0]=parseInt(Math.random()*rowNum);
				appleCoordinate[1]=parseInt(Math.random()*columnNum);
				apple.style.left=(appleCoordinate[1]*50)+marginLeft+"px";
				apple.style.top=(appleCoordinate[0]*50)+marginTop+"px";
					for(var i=0; i<greenArr.length; i++){
							if(greenArr[i][0]==appleCoordinate[0]&&greenArr[i][1]==appleCoordinate[1]){
								setApple();
							}
					}
					for(var i=0; i<blueArr.length; i++){
						if(blueArr[i][0]==appleCoordinate[0]&&blueArr[i][1]==appleCoordinate[1]){
							setApple();
						}
					}
			}
			function checkAppleCollision(headRow, headColumn, snakeColor){
				//console.log(appleCoordinate);
				//console.log(greenArr);
				if(appleCoordinate[0]==headRow&&appleCoordinate[1]==headColumn&&snakeColor=="green"){
					greenAddLength[0]=1;
					setApple();
				}
				if(appleCoordinate[0]==headRow&&appleCoordinate[1]==headColumn&&snakeColor=="blue"){
					blueAddLength[0]=1;
					//greenPoint[0]++;
					//scoreBox.innerHTML=greenPoint[0];
					setApple();
				}
			}
			function checkCollision(){
				var greenSnake=0;
				var blueSnake=0;
				
				if(greenArr[greenArr.length-1][0]<0||greenArr[greenArr.length-1][0]>rowNum-1){
					blueSnake++;
					
				}else if(greenArr[greenArr.length-1][1]<0||greenArr[greenArr.length-1][1]>columnNum-1){
					blueSnake++;
				}
				if(blueArr[blueArr.length-1][0]<0||blueArr[blueArr.length-1][0]>rowNum-1){
					greenSnake++;
					
				}else if(blueArr[blueArr.length-1][1]<0||blueArr[blueArr.length-1][1]>columnNum-1){
					greenSnake++;
				}
				for (var i=0; i<greenArr.length-1; i++){
					if(greenArr[i][0]==greenArr[greenArr.length-1][0]&&greenArr[i][1]==greenArr[greenArr.length-1][1]){
						blueSnake++;
					}
				}
				for (var i=0; i<blueArr.length-1; i++){
					if(blueArr[i][0]==blueArr[blueArr.length-1][0]&&blueArr[i][1]==blueArr[blueArr.length-1][1]){
						greenSnake++;
					}
				}
				for(var i=0; i<greenArr.length; i++){
					if(greenArr[i][0]==blueArr[blueArr.length-1][0]&&greenArr[i][1]==blueArr[blueArr.length-1][1]){
						greenSnake++;
					}
				}
				for(var i=0; i<blueArr.length; i++){
					if(blueArr[i][0]==greenArr[greenArr.length-1][0]&&blueArr[i][1]==greenArr[greenArr.length-1][1]){
						blueSnake++;
					}
				}
				
				if(greenSnake==1&&blueSnake==1){
					console.log(greenSnake, blueSnake);
					setTimeout(function(){nextRound("Tie");}, 10);
				}else if(greenSnake==1&&blueSnake==0){
					console.log(greenSnake, blueSnake);
					snakeOneScoreV2.innerHTML++;
					setTimeout(function(){nextRound("Player 1 Wins");}, 10);
				}else if(greenSnake==0&&blueSnake==1){
					console.log(greenSnake, blueSnake);
					snakeTwoScoreV2.innerHTML++;
					setTimeout(function(){nextRound("Player 2 Wins");}, 10);
				}
			}
			
			function nextRound(winner){
				var nextRound=true;
				clearInterval(tail.timerPush);
				clearInterval(tail.timerShift);
				clearInterval(tailTwo.timerPush);
				clearInterval(tailTwo.timerShift);
				if(snakeOneScoreV2.innerHTML==3||snakeTwoScoreV2.innerHTML==3){
					nextRound=confirm(winner+". Do you want to play again?");
						if(nextRound){
							
							snakeOneScoreV2.innerHTML=0;
							snakeTwoScoreV2.innerHTML=0;
							resetSnakes();
							
						}else{
							for(var i=0; i<tail.length; i++){
								tail[i].style.display="none";
								
							}
							clearInterval(tail.timerPush);
							clearInterval(tail.timerShift);
							clearInterval(tailTwo.timerPush);
							clearInterval(tailTwo.timerShift);
							snakeOneScoreV2.innerHTML=0;
							snakeTwoScoreV2.innerHTML=0;
							apple.style.display="none";
							scoreboard.style.display="none";
							mainPagesWrapper.style.display="block";
							title.style.display="block";
							onePerson.style.display="block";
							twoPeople.style.display="block";
							backNum[0]=0;
						}
				}else {
					setTimeout(resetSnakes, 1000);
					
				}
			}