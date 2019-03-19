//change this variable to the url where the game will redirect when completed
var win_url= "GameWin.html";

//insert paths to your images
var src_array = [
"/images/slika1.jpg",
"/images/slika2.jpg",
"/images/slika3.jpg",
"/images/slika4.jpg",
"/images/slika5.jpg",
"/images/slika6.jpg",
"/images/slika7.jpg",
"/images/slika8.jpg"
];

// don't change the following code
var all_vals =[];
var all_fields=[];

fillInitVal(all_vals,16);
all_vals = mixArray(all_vals);


for(var i=0;i<16;i++){
all_fields[i]=createClickable("main_cont",all_vals[i]);
if((i+1)%4==0){createNewlineDiv("main_cont");}
}


var selected=[];
var selecting_allowed=true;



function createClickable(addto,pass_val){

var temp_sqr = document.createElement("div");
temp_sqr.memo_val=pass_val;
var image = document.createElement("img");
image.src=src_array[pass_val-1];
//image.style.pointerEvents= "none";
image.style.display="none";
//temp_sqr.innerHTML=pass_val;
temp_sqr.solved=false;
temp_sqr.classList.add('clickable_square');
temp_sqr.appendChild(image);
temp_sqr.texture=image;
temp_sqr.addEventListener("click",clickedHandler);
document.getElementById(addto).appendChild(temp_sqr);

return temp_sqr;
}

function clickedHandler(event){
console.log(event.target.memo_val+" was clicked");
if(event.target.memo_val){
if(selecting_allowed){
if(selected.length<2){
selected.push(event.target);
//event.target.style.background="lightblue";
event.target.texture.style.display="inline-block";
if(selected.length==2){
if(selected[0].memo_val==selected[1].memo_val){resetSelection();}else{setTimeout(resetSelection,1000);}}
}else{selecting_allowed=true; resetSelection();}
}
}
}


function resetSelection(){
	if(typeof selected[0].memo_val!=="undefined"){
if(selected[0].memo_val==selected[1].memo_val){
selected[0].solved=true;
selected[1].solved=true;
}else{
//selected[0].style.background="gray";
selected[0].texture.style.display="none";
//selected[1].style.background="gray";
selected[1].texture.style.display="none";
}
}
selected=[];
selecting_allowed=true;
checkBoard();
}

function checkBoard(){
var completed=true;
for(var i=0;i<all_fields.length;i++){
if(!all_fields[i].solved){completed=false;}
}

console.log("game completed ="+completed);
if(completed){window.location.href = win_url;}
}

function createNewlineDiv(addto){

var temp_sqr = document.createElement("div");
temp_sqr.classList.add('newline_div');
document.getElementById(addto).appendChild(temp_sqr);

}

function mixArray(arr){
var temp_arr =[];
var fix_len = arr.length;
for (var i=0;i<fix_len;i++){
temp_arr[i]=arr.splice(Math.floor(Math.random()*arr.length),1)[0];
}
return temp_arr;
}

function fillInitVal(arr,max_len){
	if(max_len%2==0){
  	for(let m=0;m<max_len/2;m++){
    	arr.push(m+1);
      arr.push(m+1);
    }

  }else{
  console.log("Wrong parameter input for fillInitVal() - max_len must be an even number ");
  }

}
