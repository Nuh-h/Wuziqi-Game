var gameArray = [];

var container = document.querySelector('.container');
var table = document.createElement('table');
for(var i=0; i<15; i++){
	var row = document.createElement('tr');
	var array_i = []
	for(var j=0; j<15; j++){
		var cell = document.createElement('td');
		row.appendChild(cell);
		array_i.push(0);
	}
	table.appendChild(row);
	gameArray.push(array_i);
}
container.appendChild(table);

var player=0;
var colours=["black","white"];
table.querySelectorAll('td').forEach(e => e.addEventListener('click',()=>{

	val=player==0?1:-1;
	if(gameArray[e.parentElement.rowIndex][e.cellIndex]!=0){
		alert("invalid move");
	}else{
		gameArray[e.parentElement.rowIndex][e.cellIndex]=val;
		e.classList.add('moveMade');
		e.style.color=colours[player];
		addMove(e, e.parentElement.rowIndex, e.cellIndex);
		player = player==0?1:0;
	}
}));
function addMove(e,row,col){
	//var minrow = row-4<0?0:row-4;
	//var maxrow = row+4<table.rows.length?row+5:table.rows.length;
	//var mincol = col-4<0?0:col-4;
	//var maxcol = col+4<table.rows.length?col+5:table.rows.length;
	//for(var i=minrow;i<maxrow;i++){
		//gameArray[i][col]+=val;	
		//if(gameArray[i][col]==5 || gameArray[i][col]==-5) {setTimeout(()=>{alert('winner found');},100); return;}
	//}
	//for(var j=mincol;j<maxcol;j++){
		//gameArray[row][j]+=val;
		//console.log(gameArray[row][col]);
		//if(gameArray[row][j]==5 || gameArray[row][j]==-5) {setTimeout(()=>{alert('winner found');},500); return;}
	//}
	var leftWard = false;
	var rightWard = false;
	var topWard = false;
	var downWard = false;
	var k = 1;
	var leftSum = 0;
	var rightSum = 0;
	var topSum = 0;
	var downSum = 0;
	while((!leftWard) || (!rightWard) || (!topWard) || (!downWard)){
		
		if(!leftWard){
			if(col-k<0 || gameArray[row][col-k]!=gameArray[row][col]){ leftWard=true;}
			else{ leftSum+=gameArray[row][col-k];}//gameArray[row][col-k]+=val; }
		}
		if(!rightWard){
			if(col+k>14 || gameArray[row][col+k]!=gameArray[row][col]){ rightWard=true;}			
			else{ rigthSum+=gameArray[row][col+k];}//+=val; }
		}
		if(!topWard){
			if(row-k<0 || gameArray[row-k][col]!=gameArray[row][col]){ topWard=true;}
			else{ topSum+=gameArray[row-k][col];}//+=val; }
		}
		if(!downWard){
			if(row+k>14 || gameArray[row+k][col]!=gameArray[row][col]){ downWard=true;}
			else{ downSum+=gameArray[row+k][col];}//+=val; }
		}
		k++;
	}
	console.log(gameArray);
	if((leftWard+rightWard)>3 || (topSum+downSum)>3 || (leftWard+rightWard)<-3 || (topSum+downSum)<-3) console.log("game over");
}	
