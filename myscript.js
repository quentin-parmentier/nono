var plateauM;
var choixdefautrobot;
var level = 1;
var start = true;
var vivant = true;
var gagne = false;

function actulevel(level){

	$("#level").append("Level - "+level);
}

function createplateau(h,w){ //Les cases peuvent être vide ou e pour etoile ou m pour mur

	$('#plateau').append('<table>');

	for(var y=0; y<h; y++){

		$('#plateau').append('<tr>');

	   	for(var x=0; x<w; x++){

      		$('#plateau').append("<td id='"+x+'_'+y+"' class='case' ondrop='drop(event)' ondragover='allowDrop(event)'></td>)");

	   	}

		$('#plateau').append('</tr>');

	}

	$('#plateau').append('</table>');

	plateauM = new Array(h);

	for (var i = 0; i < h; i++){

		plateauM[i] = new Array(w);

	}

}

/*** Grid appearance ***/
for(var i = 0; i < 10; i++) {
	$("#0_" + i).addClass("left_border");
	$("#9_" + i).addClass("right_border");
	$("#" + i + "_0").addClass("top_border");
	$("#" + i + "_7").addClass("bottom_border");
}

function placeretoiles(etoiles){

	$(etoiles).each(function(index){

		$("#"+this).addClass("etoile");

		pos = this.split("_");

		plateauM[pos[1]][pos[0]] = "e";

	});

}

function placermur(murs){

	$(murs).each(function(index){

		$("#"+this).addClass("mur");

		pos = this.split("_");

		plateauM[pos[1]][pos[0]] = "m";

	});

}

function placerrobot(startRobot){

	$("#"+startRobot).addClass("start");

	pos = startRobot.split("_");

	plateauM[pos[1]][pos[0]] = "r";
	
}

function placerfin(fin){

	$("#"+fin).addClass("end");

	pos = fin.split("_");

	plateauM[pos[1]][pos[0]] = "f";
}

function creermvt(actions){

	$("#actions").append("<br><br><p> Vos actions possibles sont : </p>");
	$(actions).each(function(index){

		$("#actions").append("<div id='"+this+"_"+index+"' draggable='true' ondragstart='drag(event)' class='action "+this+"'></div>");

	});

}

function avancer(direction){

}

function start(startpos, orientation){

}

//Fonction drag and drop

function allowDrop(ev) {

	if(ev.path[0].className == "case"){

		ev.preventDefault();

	}

}

function drag(ev) {

  ev.dataTransfer.setData("text", ev.target.id);

  start_pos = ev.path[1].id;
  console.log(start_pos);
  if(start_pos != "actions"){ //Si c'est déjà sur une case on l'enlève du dom

  	pos = start_pos.split("_");

	plateauM[pos[1]][pos[0]] = "";

  }

}

function drop(ev) {

  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  end_pos = ev.target.id;

  pos = end_pos.split("_");

  actiontab = data.split("_");
  plateauM[pos[1]][pos[0]] = actiontab[0];

  console.log(plateauM);

}

function testchemin(startRobot, orientation, end, height, width, score_max){

	positionA = startRobot.split("_");
	positionA[0] = parseInt(positionA[0]);
	positionA[1] = parseInt(positionA[1]);
	orientationA = orientation;
	scoreA = 0;
	

	while(vivant && !gagne){

		//Je regarde la case d'après et me déplace si possible
		nextcaseIs = checkNextCase(positionA, orientationA, height, width);

		console.log(positionA);



		//Est-ce que mes états changent ?
		switch(nextcaseIs) {

			case "out":
				console.log("Mort");
				vivant = false;
			break;

			case "e":
				console.log("ETOILE <3");

				scoreA++;
			break;

			case "d":

				orientationA = nextcaseIs;
			
			break;

			case "g":

				orientationA = nextcaseIs;
			
			break;

			case "h":

				orientationA = nextcaseIs;
			
			break;

			case "b":

				orientationA = nextcaseIs;
			
			break;

			case "f":

				gagne = true;

			break;

		}

	}


	if(!vivant){
		console.log("T PERDU");
		$("#rego").show();
	}

	if(gagne){

		if(score_max != scoreA){

			console.log("Bien, mais essaye d'avoir le meilleur score !");
			$("#rego").show();

		}else{

			console.log("T GAGNE");
			start = true;
			$("#nextlevel").show();
		}
	}


}

function checkNextCase(position, orientation, height, width){


	switch(orientation) {

		case "d":

			if(position[0]+1 < width){

				if(plateauM[position[1]][position[0]+1] != "m"){ //Si on a pas de un mur on avance

					position[0] = position[0] + 1;
					$( "#robot" ).animate({ "left": "+=64px" }, "slow" );

				}else{ //Sinon on ne bouge pas mais on tourne

					if(choixdefautrobot == "gchoix"){


						return "h";

					}else if(choixdefautrobot == "dchoix"){


						return "b";
					}else{

						return "out";
					}
				}
			
			}else{
			
				return "out";
			
			}

		break;

		case "g":

			if(position[0]+1 >= 0){
				
				if(plateauM[position[1]][position[0]-1] != "m"){

					position[0] = position[0] - 1;
					$( "#robot" ).animate({ "left": "-=64px" }, "slow" );

				}else{

					if(choixdefautrobot == "gchoix"){


						return "b";

					}else if(choixdefautrobot == "dchoix"){


						return "h";
					}else{

						return "out";
					
					}
				}
			
			}else{
			
				return "out";
			
			}

		break;

		case "h":

			if(position[1]-1 >= 0){
				
				if(plateauM[position[1]-1][position[0]] != "m"){

					position[1] = position[1] - 1;
					$( "#robot" ).animate({ "top": "-=64px" }, "slow" );

				}else{

					if(choixdefautrobot == "gchoix"){


						return "g";

					}else if(choixdefautrobot == "dchoix"){


						return "d";
					}else{

						return "out";
					
					}
				}
			
			}else{
			
				return "out";
			
			}

		break;

		case "b":

			if(position[1]+1 < height){
				
				if(plateauM[position[1]+1][position[0]] != "m"){ 

					position[1] = position[1] + 1;
					$( "#robot" ).animate({ "top": "+=64px" }, "slow" );

				}else{

					if(choixdefautrobot == "gchoix"){


						return "d";

					}else if(choixdefautrobot == "dchoix"){


						return "g";
					}else{

						return "out";
					
					}
				}
			
			}else{
			
				return "out";
			
			}

		break;
	  
	}

	if(position[0] >= 0 && position[0] < width && position[1] >= 0 && position[1] <= height){ //Si on est dans la map

		return plateauM[position[1]][position[0]];


	}else{

		return "out";
	}

}

$("#nextlevel").on('click',function(){

	$( "#robot" ).stop();
	$( "#robot" ).stop();
	$( "#robot" ).stop();

	if(level == 1 && start){

		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$( "#robot" ).stop();

		start = false;
		level = 2;
		$("#actions").empty();
		$("#plateau").empty();
		$("#level").empty();
		$("#gainitem").empty();
		level2();
	}

	if(level == 2 && start){

		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$( "#robot" ).stop();

		start = false;
		level = 3;
		$("#actions").empty();
		$("#plateau").empty();
		$("#level").empty();
		$("#gainitem").empty();
		level3();

	}

});

$(".close").on('click',function(){

	$('.modal').hide();

});

function level1(){
	
	$( "#robot" ).stop();
	$( "#robot" ).stop();
	$( "#robot" ).stop();

	$("#nextlevel").hide();
	vivant = true;
	gagne = false;
	width = 10;
	height = 8;
	tableau_etoiles = ["7_5","6_2","2_1"];
	startRobot = "0_6";
	orientation = "d";
	end = "0_0";
	tableau_action = ["h","h","g","g"];

	$("#robot").css('top', 386);
	$("#robot").css('left', 52);

	createplateau(height,width);
	placeretoiles(tableau_etoiles);
	placerrobot(startRobot);
	placerfin(end);

	creermvt(tableau_action);
	actulevel(1);

	$("#go").show();
	$("#rego").hide();

	$("#commence").empty();

	$("#commence").append("<br><br><h2><b> Le robot ira à droite automatiquement au début</b></h2>");

	$("#go").on('click', function(){

		$("#go").hide();

		testchemin(startRobot, orientation, end, height, width, tableau_etoiles.length);

	});

	$('#rego').on('click', function(){


		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$("#actions").empty();
		$("#plateau").empty();
		$("#level").empty();
		level1();

	});
}

function level2(){
	
	$( "#robot" ).stop();
	$( "#robot" ).stop();
	$( "#robot" ).stop();

	$(".modal-content").empty();
	$(".modal-content").append(`
		<div class="modal-content">
	    <span class="close">&times;</span>

	    <p class="text" id="textmodal">

	    	<p>Dans le niveau que tu viens de passer, le robot a agit selon les ordres que tu lui a donné au préalable. Il n’a donc fait que suivre une liste d’instructions que tu as décidé pour lui :</p>
			<p>Instruction 1 : VA À GAUCHE</p>
			<p>Instruction 2 : VA EN HAUT</p>
			<p>Instruction 3 : VA À DROITE</p>
			<p>…</p>
			<p>Si dans son environnement il avait rencontré des obstacles, il n’aurait pas pu les détecter si nous ne lui avions pas donné l’instruction de l’éviter.</p>


	    </p>
	`);

	$(".close").on('click',function(){

		$('.modal').hide();

	});

	$(".modal").show();


	vivant = true;
	gagne = false;
	$("#nextlevel").hide();

	$("#commence").empty();

	width = 10;
	height = 8;
	tableau_etoiles = ["3_7","7_5","4_1"];
	startRobot = "0_6";
	orientation = "d";
	end = "2_3";
	tableau_action = ["d","d","g","b","g","b","h","b","g","h"];
	tableau_mur = ["3_6","7_6","5_5","6_3","6_1", "3_3"];

	$("#robot").css('top', 386);
	$("#robot").css('left', 52);

	createplateau(height,width);
	placeretoiles(tableau_etoiles);
	placerrobot(startRobot);
	placerfin(end);
	placermur(tableau_mur);

	creermvt(tableau_action);
	actulevel(2);

	$("#rego").hide();
	$("#go").show();

	$("#commence").append("<br><br><h2><b> Le robot ira à droite automatiquement au début</b></h2>");

	$("#go").on('click', function(){

		$("#go").hide();

		testchemin(startRobot, orientation, end, height, width, tableau_etoiles.length);

	});

	$('#rego').on('click', function(){

		$( "#robot" ).stop();
		$( "#robot" ).stop();

		$("#actions").empty();
		$("#plateau").empty();
		$("#level").empty();
		$("#gainitem").empty();
		level2();

	});
}

function level3(){

	$( "#robot" ).stop();
	$( "#robot" ).stop();
	$( "#robot" ).stop();

	$(".modal-content").empty();
	$(".modal-content").append(`
		<div class="modal-content">
	    <span class="close">&times;</span>

	    <p class="text" id="textmodal">

	    	<p>L’action de tourner pour le robot se fait à l’aide d’un gyroscope.</p>
			<p>Mais il existe de nombreux autres capteurs que l’on peut ajouter sur un robot...</p>

			<p>Dans ce troisième niveau, tu as débloqué le détecteur d’obstacle. </p>
			<p>Maintenant le robot peut donc suivre une liste d’instructions qu’il a reçu au départ. </p>
			<p>Il est aussi capable de s’adapter à la situation à chaque instant ainsi qu’à son environnement. </p>
			<p>C’est un élément indispensable pour un robot qui doit se déplacer.</p>


	    </p>
	`);

	$(".close").on('click',function(){

		$('.modal').hide();

	});
	
	$(".modal").show();
	
	vivant = true;
	gagne = false;
	
	$("#nextlevel").hide();

	$("#commence").empty();

	width = 10;
	height = 8;
	tableau_etoiles = ["7_5","6_2","2_1","2_3"];
	startRobot = "0_3";
	orientation = "b";
	end = "5_0";
	tableau_action = ["h","d","h","d"];
	tableau_mur = ["8_6","7_1","2_0","0_1"];

	$("#robot").css('top', 194);
	$("#robot").css('left', 52);

	createplateau(height,width);
	placeretoiles(tableau_etoiles);
	placerrobot(startRobot);
	placerfin(end);
	placermur(tableau_mur);

	creermvt(tableau_action);
	actulevel(3);

	$("#gainitem").append("<p>Vous venez de gagner un détecteur d'obstacle !</p> <p> Il peut désormais choisir une direction par défaut quand il rencontre un obstacle, vers où devrait-il aller ?</p>");
	$("#gainitem").append(`<div> Choisis où il devrait aller :
		<br>
						   <button id='gchoix' class="myButton actionchoix"><div  class='actionchoix'> Vers sa gauche </div></button>
						   <button id='dchoix' class="myButton actionchoix"><div  class='actionchoix'> Vers sa droite </div></button>
		`);

	$("#go").hide();
	$("#rego").hide();

	$("#commence").append("<br><br><h2><b> Le robot ira en bas automatiquement au début</b></h2>");

	$("#go").on('click', function(){

		$("#go").hide();
		
		testchemin(startRobot, orientation, end, height, width, tableau_etoiles.length);

	});

	$("#gchoix").on('click', function(){

		$("#go").show();
		$(".actionchoix").hide();
		$("#rego").hide();

		console.log(this);
		choixdefautrobot = this.id;

		$("#gainitem").append("<br><b>Vers sa gauche</b>");

	});

	$("#dchoix").on('click', function(){

		$("#go").show();
		$(".actionchoix").hide();
		$("#rego").hide();

		console.log(this);
		choixdefautrobot = this.id;

		$("#gainitem").append("<br><b>Vers sa droite</b>");

	});

	$('#rego').on('click', function(){

		$( "#robot" ).stop();
		$( "#robot" ).stop();
		$( "#robot" ).stop();

		$("#actions").empty();
		$("#plateau").empty();
		$("#level").empty();
		$("#gainitem").empty();
		level3();

	});

}

level1();