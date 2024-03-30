//Global Variables----------------------------------------------
			var boxes=document.getElementsByClassName("boxes");
			var rowNum=0;
			var columnNum=0;
			var marginLeft=0;
			var marginTop=0;
			var indexNum=0;
			var onePersonArr=[];
			var onePersonKeyCode=[];
			var onePersonAddLength=[0]
			var onePersonColdDown=[0];
			var addLength=[450];
			var appleCoordinate=[];
			var apple=null;
			var singlePlayerPoints=null;
			var points=null;
		//Function Library----------------------------------------------------
			
			/**init()--The function set the number of rows and colunms and the margin
						of the side. The snake is facing downwards at first.
			*/
			function initOneSnake(){
				singlePlayerPoints=document.getElementById("singlePlayerPoints");
				singlePlayerPoints.style.display="block";
				points=document.getElementById("points");
				
				//alert(singlePlayerPoints.style.display);
				rowNum=parseInt(window.innerWidth/50)-1;
				columnNum=parseInt(window.innerHeight/50)-2;
				console.log(rowNum);
				console.log(columnNum);
				marginLeft=(window.innerWidth-(rowNum*50))/2;
				marginTop=((window.innerHeight-(columnNum*50))/2)+50;
				boxes.rSpd=1;
				boxes.cSpd=0;
				onePersonKeyCode[0]=[83];
				apple=document.getElementById("apple");
				apple.style.display="block";
				countDownOne=document.getElementById("countDownOne");
				setGridOne();
				setAppleOne();
				startPositionOne();
				setSnakeOne();
				setTimeout(function(){
					shiftSnakeOne();
					pushSnakeOne();
				}, 1000);
			}
			function resetOne(){
				boxes.rSpd=1;
				boxes.cSpd=0;
				onePersonKeyCode[0]=[83];
				startPositionOne();
				setSnakeOne();
				setAppleOne();
				setTimeout(function(){
					shiftSnakeOne();
					pushSnakeOne();
				},1000);
				console.log("box" +boxes.length);
			}
			
			/**setGridOne()--The function creates div elements and set the height
							width of 50px. The class name of the divs is "boxes",
							and it attatch the "coordinate" to the div element.
							
			*/
			function setGridOne(){
				for(var i=0; i<columnNum; i++){
					for(var j=0; j<rowNum; j++){
						var tempBox=document.createElement("div");
						tempBox.className="boxes";
						tempBox.style.position="absolute";
						tempBox.style.top=i*50+marginTop+"px";
						tempBox.style.left=j*50+marginLeft+"px";
						document.body.appendChild(tempBox);
						tempBox.coordinate=[i,j];
						tempBox.style.border="1px solid silver";
						//tempBox.innerHTML=i+", "+j;
					}
				}	
				
			}
			function startPositionOne(){
				onePersonArr=[];
				var topSpace=parseInt(rowNum*0.1);
				console.log("topSpace "+topSpace)
				for (var i=0; i<5; i++){
					onePersonArr.push([topSpace+i, 1]);
				}
			}
			/**setSnakeOne()--The function sees if the onePersonArr and the "coordinate" of
							the box match up. If it does, the background-color turn into
							onePerson, if not powderBlue.
			*/
			function setSnakeOne(){
				for(var i=0; i<onePersonArr.length; i++){
					for(var j=0; j<boxes.length; j++){
						if(onePersonArr[i][0]!=boxes[j].coordinate[0]||onePersonArr[i][1]!=boxes[j].coordinate[1]){
							boxes[j].style.backgroundColor="white";
							boxes[j].innerHTML="";
							boxes[j].style.zIndex="-1";
							boxes[j].style.border="1px solid silver";
						}
					}
				}
				for(var i=0; i<onePersonArr.length; i++){
					for(var j=0; j<boxes.length; j++){
						if(onePersonArr[i][0]==boxes[j].coordinate[0]&&onePersonArr[i][1]==boxes[j].coordinate[1]){
							boxes[j].style.backgroundColor="green";
							boxes[j].style.zIndex="1";
							boxes[j].style.border="1px solid black";
						}
						
					}
				}
				for(var i=0; i<onePersonArr.length; i++){
					for(var j=0; j<boxes.length; j++){
						if(onePersonArr[onePersonArr.length-1][0]==boxes[j].coordinate[0]&&onePersonArr[onePersonArr.length-1][1]==boxes[j].coordinate[1]){
							//console.log(boxes[j].coordinate);
							
							boxes[j].style.backgroundColor="darkGreen";
						}
					}
				}
				
			}
			/**shiftSnakeOne()--The funciton delete the first coordinate in the onePersonArr.
								It calls setSnakeOne();
			*/
			function shiftSnakeOne(){
				boxes.timerShift=setInterval(function(){
					if(onePersonAddLength[0]==0){
						onePersonArr.shift();
						setSnakeOne();
					}else if(onePersonAddLength[0]==1){
						setTimeout(function(){
							setSnakeOne();
							onePersonAddLength[0]=0;
							//alert();
						}, addLength[0]);
					}
				}, 300);
				
				
			}
			/**pushSnakeOnes()--The funciton add the next coordinate to the onePersonArr.
								It calls setSnakeOne();	
			*/
			function pushSnakeOne(){
				
				boxes.timerPush=setInterval(function(){
					onePersonArr.push([onePersonArr[onePersonArr.length-1][0]+boxes.rSpd,onePersonArr[onePersonArr.length-1][1]+boxes.cSpd]);
					checkAppleCollisionOne(onePersonArr[onePersonArr.length-1][0],onePersonArr[onePersonArr.length-1][1]);
					checkBorderCollisionOne();
					checkSnakeCollisionOne(onePersonArr[onePersonArr.length-1][0],onePersonArr[onePersonArr.length-1][1]);
					setSnakeOne();
					onePersonColdDown[0]=0;
					
				}, 300);
			}
			/**keyDown()--The function detect if WASD is pressed and changes the 
							snake's direction.
			*/
			
			function keyDownOne(e){
				if((e.keyCode==87&&onePersonKeyCode[0]!=83&&onePersonKeyCode[0]!=87&&onePersonKeyCode[0]!=40&&onePersonColdDown[0]==0)||
					(e.keyCode==38&&onePersonKeyCode[0]!=40&&onePersonKeyCode[0]!=38&&onePersonKeyCode[0]!=83&&onePersonColdDown[0]==0)){
					onePersonColdDown[0]=1;
					boxes.rSpd=-1;
					boxes.cSpd=0;
					onePersonKeyCode.pop();
					onePersonKeyCode.push(e.keyCode);
				}else if((e.keyCode==65&&onePersonKeyCode[0]!=68&&onePersonKeyCode[0]!=65&&onePersonKeyCode[0]!=39&&onePersonColdDown[0]==0)||
					(e.keyCode==37&&onePersonKeyCode[0]!=39&&onePersonKeyCode[0]!=37&&onePersonKeyCode[0]!=68&&onePersonColdDown[0]==0)){
					onePersonColdDown[0]=1;
					boxes.rSpd=0;
					boxes.cSpd=-1;
					onePersonKeyCode.pop();
					onePersonKeyCode.push(e.keyCode);
				}else if(e.keyCode==83&&onePersonKeyCode[0]!=87&&onePersonKeyCode[0]!=83&&onePersonKeyCode[0]!=38&&onePersonColdDown[0]==0||
					(e.keyCode==40&&onePersonKeyCode[0]!=38&&onePersonKeyCode[0]!=40&&onePersonKeyCode[0]!=87&&onePersonColdDown[0]==0)){
					onePersonColdDown[0]=1;
					boxes.rSpd=1;
					boxes.cSpd=0;
					onePersonKeyCode.pop();
					onePersonKeyCode.push(e.keyCode);
				}else if((e.keyCode==68&&onePersonKeyCode[0]!=65&&onePersonKeyCode[0]!=68&&onePersonKeyCode[0]!=37&&onePersonColdDown[0]==0)||
					(e.keyCode==39&&onePersonKeyCode[0]!=37&&onePersonKeyCode[0]!=39&&onePersonKeyCode[0]!=65&&onePersonColdDown[0]==0)){
					onePersonColdDown[0]=1;
					boxes.rSpd=0;
					boxes.cSpd=1;
					onePersonKeyCode.pop();
					onePersonKeyCode.push(e.keyCode);
					
				}else if (e.keyCode==13){
					onePersonAddLength[0]=1;
				}
			}
			
			function setAppleOne(){
				var kG=true;
				appleCoordinate[0]=parseInt(Math.random()*columnNum);
				appleCoordinate[1]=parseInt(Math.random()*rowNum);
				console.log(appleCoordinate);
				apple.style.left=(appleCoordinate[1]*50)+marginLeft+"px";
				apple.style.top=(appleCoordinate[0]*50)+marginTop+"px";
				for(var i=0; i<onePersonArr.length; i++){
						if(onePersonArr[i][0]==appleCoordinate[0]&&onePersonArr[i][1]==appleCoordinate[1]){
							setAppleOne();
						
						}
				}
			}
			function checkAppleCollisionOne(headRow, headColumn){
				//console.log(appleCoordinate);
				//console.log(onePersonArr);
				if(appleCoordinate[0]==headRow&&appleCoordinate[1]==headColumn){
					onePersonAddLength[0]=1;
					points.innerHTML=parseInt(points.innerHTML)+1;
					setAppleOne();
				}
			}
			function checkBorderCollisionOne(){
				
				if(onePersonArr[onePersonArr.length-1][0]<0||onePersonArr[onePersonArr.length-1][0]>columnNum-1){
					setTimeout(nextRoundOne, 5);
					
				}else if(onePersonArr[onePersonArr.length-1][1]<0||onePersonArr[onePersonArr.length-1][1]>rowNum-1){
					setTimeout(nextRoundOne, 5);
				}
				
			}
			function checkSnakeCollisionOne(headRow, headColumn){
				for (var i=0; i<onePersonArr.length-1; i++){
					if(onePersonArr[i][0]==headRow&&onePersonArr[i][1]==headColumn){
						setTimeout(nextRoundOne, 5);
					}
				}
			}
			function nextRoundOne(){
				clearInterval(boxes.timerPush);
				clearInterval(boxes.timerShift);
				var nextRoundOne=true;
				nextRoundOne=confirm("Do you want to play again?");
				if(nextRoundOne){
					points.innerHTML=0;
					resetOne();
				}else{
					for(var i=0; i<boxes.length; i++){
						boxes[i].style.display="none";
						apple.style.display="none";
					}
					points.innerHTML=0;
					singlePlayerPoints.style.display="none";
					mainPagesWrapper.style.display="block";
					title.style.display="block";
					onePerson.style.display="block";
					twoPeople.style.display="block";
					 backNum[0]=0;
				}
			}
			