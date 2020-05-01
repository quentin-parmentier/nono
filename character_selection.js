/*** Character selection ***/
var char_selected = false;
var bot = false;

$("#bot").click(function() {
	bot = true;
});

$(".character").click(function() {
	//if character already selected do not append again
	if(!char_selected) {
		//if bot is selected do not display the additionnal sentence
		if(bot) {
			$("#message").append("<p>Vous avez sélectionné Nono</p>");
			$("#message").append("<p>Très bon choix</p>");
		} else {
			$("#message").append("<p>Désolé, il est déjà parti en mission...</p>");
			$("#message").append("<p>Vous allez devoir jouer avec Nono</p>");
		}

		$("#message").append("<button class=myButton><a href=\"index.html\">Commencer le jeu</a></button>"); 
		char_selected = true;
	}
});