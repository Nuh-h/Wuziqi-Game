var container = document.querySelector('.container');
var table = document.createElement('table');
for(var i=0; i<15; i++){
	var row = document.createElement('tr');
	for(var j=0; j<15; j++){
		var cell = document.createElement('td');
		row.appendChild(cell);
	}
	table.appendChild(row);
}
container.appendChild(table);

var player=0;
var moveMade = false;
table.querySelectorAll('td').forEach(e => e.addEventListener('click',()=>{
	console.log(e.parentElement.rowIndex);
	moveMade=true;
	if(moveMade && player==0){
		e.classList.add('moveMade');
		e.style.color="black";
	}
	else if(moveMade && player==1){
		e.classList.add('moveMade');
		e.style.color="white";
	}
	player = player==0?1:0;
}));