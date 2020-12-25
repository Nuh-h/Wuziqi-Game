var info = document.createElement('span');
//info.innerHTML='<p> Instructions: to win the game, you should attain five pieces in a row, whatever colour you are assigned. Black is the default colour for the first player.<p>';
info.classList.add('info');
info.addEventListener('click',()=>{
	Swal.fire({
    icon: 'info',
	iconColor: 'green',
    title: 'How to play:',
    text: 'To win the game, you should attain five pieces in a row (horizontally, diagonally, or vertically), whatever colour you are assigned. Black is by default player 1.'}	
)
});
document.body.insertBefore(info,document.body.firstElementChild);

document.body.querySelector('.restart').addEventListener('click',resetBoard);
document.body.querySelector('.reset').addEventListener('click', ()=>{ resetBoard(); scores=[0,0];});
document.body.querySelector('.scores').addEventListener('click', ()=>{
	document.body.querySelector('.message').classList.toggle('hide');
	document.body.querySelector('.message').innerHTML = "The score is currently "+scores[0]+" - "+scores[1];
	//Swal.fire({icon:'info',text:"The score is currently "+scores[0]+" - "+scores[1]});
	});
/*var score1 = document.createElement('p');
 var score2 = document.createElement('p');
score1.innerText = 0;
score2.innerText = 0;
score1.classList.add('score1');
score2.classList.add('score2');
var scores = document.createElement('div');
scores.appendChild(score1);
scores.appendChild(score2);
scores.classList.add('scores');	 */
//container.insertBefore(scores,table);
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
var movesCount=0;
var scores = [0,0];
table.querySelectorAll('td').forEach(e => e.addEventListener('click',()=>{
	//console.log(gameArray);
	val=player==0?1:-1;
	if(gameArray[e.parentElement.rowIndex][e.cellIndex]!=0){
		alert("invalid move");
	}else{
		gameArray[e.parentElement.rowIndex][e.cellIndex]=val;
		e.classList.add('moveMade');
		e.style.color=colours[player];
		movesCount++;
		checkWinner(e, e.parentElement.rowIndex, e.cellIndex);
		player = player==0?1:0;
	}
}));
function checkWinner(e,row,col){

	if(movesCount==15*15) {
		Swal.fire({
			icon: 'error',
			title: 'It is a draw!'
		});
		resetBoard();
		return;
	}
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
	if((leftSum+rightSum)>3 || (topSum+downSum)>3 || (leftSum+rightSum)<-3 || (topSum+downSum)<-3){
		var message = "game over::: player "+(player%2+1)+" won";
		Swal.fire({
			icon: 'success',
			title: message
		});
		scores[player]++;
		resetBoard();
	}
	if((nldiagSum+nrdiagSum)>3 || (pldiagSum+prdiagSum)>3 || (nldiagSum+nrdiagSum)<-3 || (pldiagSum+prdiagSum)<-3){
		var message = "game over::: player "+(player%2+1)+" won";
		Swal.fire({
			icon: 'success',
			title: message
		});
		scores[player]++;
		resetBoard();
	}
}	
function resetBoard(){
	gameArray=newArray();
	movesCount=0;
	table.querySelectorAll('td').forEach(e => e.classList.remove('moveMade'));
	var toPlayer = (scores[0]==scores[1])?"":(scores[0]>scores[1]?" to player 1":" to player 2");
	document.body.querySelector('.message').innerHTML = "The score is currently "+scores[0]+" - "+scores[1];
	console.log("The score is currently "+scores[0]+" - "+scores[1]+toPlayer);
}
function newArray(){
	const newArr = [];
	for(var i=0; i<15; i++){
		const array_r = []
		for(var j=0; j<15; j++){
			array_r.push(0);
		}	
		newArr.push(array_r);
	}
	return newArr;
}

document.querySelector('.feedbackBtn').addEventListener('click',launchSwalForm)
async function launchSwalForm(){
	const { value: val } = await Swal.fire({
		title: 'Feedback',
		html: '<form class="feedbackForm" name="Feedback Form" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="Feedback Form"/><input type="text" id="name" name="name" class="swal2-input" placeholder="Your name"><textarea id="feedback" name="message" class="swal2-input" placeholder="Your feedback..."></textarea></form>',
		showCancelButton: true,
		confirmButtonText: "Submit"//,
		//preConfirm: 
	})
	document.querySelector('.swal2-confirm').onclick(swal.getHtmlContainer().querySelector('form').submit());
	//document.querySelector('#swal2-content form').submit();
	if (val) {
	  //testing this, highly unlikely to work
	  function encode(data) {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&")
	  }
	
	  const handleSubmit = (event) => {
		event.preventDefault()
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({
			  "form-name": event.target.getAttribute("name"),
			  ...name
			})
		 })
	  }
	  var feedback = swal.getHtmlContainer().querySelector('form');
	  feedback.addEventListener('submit', handleSubmit);
	  
	  //console.log(feedback.querySelector('.name').value);
	  /* const { value: finish } = await Swal.fire({
		  icon:'success',
		  text:'Thank you very much '+swal.getHtmlContainer().querySelector('#name').value.trim()+' for your feedback!!'
	  });
	  if(finish){ 
	  //document.body.querySelector('.hidden').appendChild(feedback);
	  setTimeout(feedback.submit(),500);} */
	}
};
