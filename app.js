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
var moveMade = false;
table.querySelectorAll('td').forEach(e => e.addEventListener('click',()=>{
	//console.log(e.parentElement.rowIndex);
	moveMade=true;
	if(moveMade && player==0){
		e.classList.add('moveMade');
		e.style.color="black";
	}
	else if(moveMade && player==1){
		e.classList.add('moveMade');
		e.style.color="white";
	}
	val=player==0?1:-1;
	addMove(e.parentElement.rowIndex, e.cellIndex, val);
	player = player==0?1:0;
}));
function addMove(e,row,col,val){
	for(var i=row-4<0?0:row-4;i<(k=row+4<table.rows.length?row+5:table.rows.length);i++){
		//if(table.rows[i].cells[col].style.color!=e.style.color) break;
		gameArray[i][col]+=val;
		if(gameArray[i][col]==5 || gameArray[i][col]==-5) {setTimeout(()=>{alert('winner found');},100); return;}
	}
	for(var j=col-4<0?0:col-4;i<(k=col+4<table.rows[0].cells.length?col+5:table.rows[0].cells.length);i++){
		gameArray[row][j]+=val;
		if(gameArray[row][j]==5 || gameArray[row][j]==-5) {setTimeout(()=>{alert('winner found');},500); return;}
	}
	console.log(gameArray);
}
