var boxes = document.querySelectorAll('.box');//select all boxes
//initialise the dictionary tracker
var dict = {};
boxes.forEach(box=>{
    var idVal = box.id;
    dict[idVal]=[0,0]; //if selected will turn [1,0] for player 1, and [0,1] forr player 2
});
var player = 1;//default
var count = 0;
//addEventListener
boxes.forEach(box=>{
    box.addEventListener('click',(e)=>{
		e.preventDefault();

		if(dict[box.id][player%2]+dict[box.id][(player+1)%2]==1){alert("invalid move"); return;}
		else { count++;
			moveMade(box, player);
			track(box, player);
			player= player==1?2:1;
		}
	});
});
function moveMade(box, player){
	
	if(player==1){
		box.style.backgroundColor='green';
	}else{
		box.style.backgroundColor='orange';
	}
}
function track(box, player){
	player-=1;
	dict[box.id][player]=1;
	upadateStatus(player,count);
	console.log(dict[box.id], count);
}
function upadateStatus(player,count){

	if(dict['a1'][player]+dict['b1'][player]+dict['c1'][player]==3){
		 resetBoxes();
	}
	else if(dict['a2'][player]+dict['b2'][player]+dict['c2'][player]==3){
		 resetBoxes();
	}
	else if(dict['a3'][player]+dict['b3'][player]+dict['c3'][player]==3){
		 resetBoxes();
	}
	
	else if(dict['a1'][player]+dict['a2'][player]+dict['a3'][player]==3){
		 resetBoxes();
	}
	else if(dict['b1'][player]+dict['b2'][player]+dict['b3'][player]==3){
		resetBoxes();
	}
	else if(dict['c1'][player]+dict['c2'][player]+dict['c3'][player]==3){
		resetBoxes(); 
	}
	
	else if(dict['a1'][player]+dict['b2'][player]+dict['c3'][player]==3){
		resetBoxes();
	}
	else if(dict['a3'][player]+dict['b2'][player]+dict['c1'][player]==3){
		resetBoxes();
	}
	else if(count==9) resetBoxes("draw");
	
	
}

var announcementBoard = document.createElement('p');
announcementBoard.style.backgroundColor='blue';
announcementBoard.classList.add('anB');
var body = document.querySelector('body').firstElementChild;
body.insertBefore(announcementBoard, body.querySelector('.footer'));
function resetBoxes(val){
	document.querySelector('.anB').style.width='10%';
	setTimeout(()=>{
		var text="";
		if(val=="draw"){
			//alert('It is a draw...!');
			text="It is a draw ...!";
		}
		else{ 
			//alert('player '+(player%2+1)+' ... won');
			text="player "+(player%2+1)+" ... won";
		 }
		var colour = "";
		var anB = document.querySelector('.anB');
		if(val=="draw"){ colour="blue"; }
		else if(player%2==0){ colour="green"; }
		else {colour="orange";}
		anB.innerText = text;
		anB.style.backgroundColor=colour;
		boxes.forEach(box=>{
			box.style.removeProperty('background-color');
			dict[box.id]=[0,0];
		});
		count=0;
		document.querySelector('.anB').style.width='100%';
	},500);
	
};
