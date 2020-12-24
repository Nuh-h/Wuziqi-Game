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

	var leftWard = false, rightWard = false, topWard = false, downWard = false;
	var pldiagWard = false, prdiagWard = false, nldiagWard = false, nrdiagWard = false;
	var k = 1;
	var leftSum = 0, rightSum = 0, topSum = 0, downSum = 0;
	var pldiagSum = 0, prdiagSum=0, nldiagSum = 0, nrdiagSum=0;
	while(!leftWard || !rightWard || !topWard || !downWard || !nldiagWard || !nrdiagWard || !pldiagWard || !prdiagWard){
		
		if(!leftWard){
			if(col-k<0 || gameArray[row][col-k]!=gameArray[row][col]){ leftWard=true;}
			else{ leftSum+=gameArray[row][col-k];}//gameArray[row][col-k]+=val; }
		}
		if(!rightWard){
			if(col+k>14 || gameArray[row][col+k]!=gameArray[row][col]){ rightWard=true;}			
			else{ rightSum+=gameArray[row][col+k];}//+=val; }
		}
		if(!topWard){
			if(row-k<0 || gameArray[row-k][col]!=gameArray[row][col]){ topWard=true;}
			else{ topSum+=gameArray[row-k][col];}//+=val; }
		}
		if(!downWard){
			if(row+k>14 || gameArray[row+k][col]!=gameArray[row][col]){ downWard=true;}
			else{ downSum+=gameArray[row+k][col];}//+=val; }
		}
		
		if(!nldiagWard){
			if(col-k<0 || row-k<0 || gameArray[row-k][col-k]!=gameArray[row][col]){ nldiagWard=true;}
			else{ nldiagSum+=gameArray[row-k][col-k];}//gameArray[row][col-k]+=val; }
		}
		if(!nrdiagWard){
			if(col+k>14 || row+k>14 || gameArray[row+k][col+k]!=gameArray[row][col]){ nrdiagWard=true;}			
			else{ nrdiagSum+=gameArray[row+k][col+k];}//+=val; }
		}
		if(!prdiagWard){
			if(row-k<0 || col+k>14 || gameArray[row-k][col+k]!=gameArray[row][col]){ prdiagWard=true;}
			else{ prdiagSum+=gameArray[row-k][col+k];}//+=val; }
		}
		if(!pldiagWard){
			if(row+k>14 || col-k<0 || gameArray[row+k][col-k]!=gameArray[row][col]){ pldiagWard=true;}
			else{ pldiagSum+=gameArray[row+k][col-k];}//+=val; }
		}
		
		k++;
	}

	//console.log(gameArray);
	if((leftSum+rightSum)>3 || (topSum+downSum)>3 || (leftSum+rightSum)<-3 || (topSum+downSum)<-3) alert("game over::: player "+player+" won");
	if((nldiagSum+nrdiagSum)>3 || (pldiagSum+prdiagSum)>3 || (nldiagSum+nrdiagSum)<-3 || (pldiagSum+prdiagSum)<-3) alert("game over::: player "+(player%2+1)+ " won");
}	
