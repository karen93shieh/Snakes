function init(){
  hoverStyle();
  setGlobVar();
}
//Karen's Functions------------------------------------------------------
function setGlobVar(){
  mainPagesWrapper=document.getElementById("mainPagesWrapper");
  title=document.getElementById("title");
  onePerson=document.getElementById("onePerson");
  twoPeople=document.getElementById("twoPeople");
  timerMode=document.getElementById("timerMode");
  pointsMode=document.getElementById("pointsMode");
  instructionTwoP=document.getElementById("instructionTwoP");
  classicMode=document.getElementById("classicMode");
  instructionOneP=document.getElementById("instructionOneP");
  back=document.getElementById("back");
  instructionTwoTime=document.getElementById("instructionTwoTime");
  instructionOne=document.getElementById("instructionOne");
  instructionWrapper=document.getElementById("instructionWrapper");
  instructionTwoPoint=document.getElementById("instructionTwoPoint");
}
function hoverStyle(){
  var buttonId=document.getElementsByClassName('mainPages');
  
  for (var i=0; i<buttonId.length; i++){
  buttonId[i].addEventListener("mouseover", function(){overButton(this);});
  buttonId[i].addEventListener("mouseout", function(){outButton(this);});
  buttonId[i].addEventListener("mousedown", function(){downButton(this);});
  }
}
function overButton(elem){
  elem.style.backgroundColor="orange";
}
function outButton(elem){
	elem.style.backgroundColor="Gold";
}
function downButton(elem){
	
	elem.style.backgroundColor="DarkOrange";
  if(elem.id=="onePerson"||elem.id=="twoPeople"){
    
    onePerson.style.display="none";
    twoPeople.style.display="none";
    back.style.display="block";
  }
  if(elem.id=="onePerson"){
    backNum[0]++;
    classicMode.style.display="block";
    instructionOneP.style.display="block";
  }else if(elem.id=="twoPeople"){
    backNum[0]++;
    timerMode.style.display="block";
    pointsMode.style.display="block";
    instructionTwoP.style.display="block";
  }else if(elem.id=="instructionOneP"){
    classicMode.style.display="none";
    instructionOneP.style.display="none";
    instructionWrapper.style.display="block";
    instructionOne.style.display="block";
    backNum[0]++;
    backNum[1]=1;
  }else if(elem.id=="instructionTwoP"){
    timerMode.style.display="none";
    pointsMode.style.display="none";
    instructionTwoP.style.display="none";
    instructionTwoPoint.style.display="none"
    instructionWrapper.style.display="block";
    instructionTwoTime.style.display="block";
    backNum[0]++;
    backNum[1]=2;
  }
  console.log(backNum[0]);
  
}
function backClicked(){
  
  if(backNum[0]==1){
    onePerson.style.display="block";
    twoPeople.style.display="block";
    timerMode.style.display="none";
    pointsMode.style.display="none";
    instructionTwoP.style.display="none";
    classicMode.style.display="none";
    instructionOneP.style.display="none";
    back.style.display="none";
    backNum[0]--;
    
  }
  if(backNum[0]==2&&backNum[1]==1){
    instructionWrapper.style.display="none";
    instructionOne.style.display="none";
    classicMode.style.display="block";
    instructionOneP.style.display="block";
    backNum[0]--;
  }
  if(backNum[0]==2&&backNum[1]==2){
    instructionWrapper.style.display="none";
    instructionTwoTime.style.display="none";
    timerMode.style.display="block";
    pointsMode.style.display="block";
    instructionTwoP.style.display="block";
    backNum[0]--;
  }
  console.log(backNum[0]);
  
}
function pageClicked(pageId){
	if(pageId=="nextInstruction"){
    instructionTwoTime.style.display="none";
    instructionTwoPoint.style.display="block"
  }else if(pageId="backInstruction"){
    instructionTwoTime.style.display="block";
    instructionTwoPoint.style.display="none"
  }
}
function disappear(){
  console.log(title);
  mainPagesWrapper.style.display="none";
  title.style.display="none";
  onePerson.style.display="none";
  twoPeople.style.display="none";
  timerMode.style.display="none";
  pointsMode.style.display="none";
  instructionTwoP.style.display="none";
  classicMode.style.display="none";
  instructionOneP.style.display="none";
  back.style.display="none";
  instructionTwoTime.style.display="none";
  instructionOne.style.display="none";
  instructionWrapper.style.display="none";
  instructionTwoPoint.style.display="none";
  
  mainPagesWrapper.style.zIndex="-2";
  title.style.zIndex="-2";
  onePerson.style.zIndex="-2";
  twoPeople.style.zIndex="-2";
  timerMode.style.zIndex="-2";
  pointsMode.style.zIndex="-2";
  instructionTwoP.style.zIndex="-2";
  classicMode.style.zIndex="-2";
  instructionOneP.style.zIndex="-2";
  back.style.zIndex="-2";
  instructionTwoTime.style.zIndex="-2";
  instructionOne.style.zIndex="-2";
  instructionWrapper.style.zIndex="-2";
  instructionTwoPoint.style.zIndex="-2";
  
}
//Global Variables------------------------------------------------------
var mainPagesWrapper=null;
var onePerson=null;
var twoPeople=null;
var title=null;
var timerMode=null;
var pointsMode=null;
var instructionTwoP=null;
var classicMode=null;
var instructionOneP=null;
var back=null;
var instructionWrapper=null;
var instructionOne=null;
var instructionTwoTime=null;
var instructionTwoPoint=null;
var nextInstruction=null;
var backInstruction=null;
var backNum=[0, 0];
//Main Program---------------------------------------------------------
window.onload=function(){
 	init();
}