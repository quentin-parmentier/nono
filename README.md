# nono
Documentation jeu : “ Nono le robot “


Lancement du jeu :

Le jeu fonctionne uniquement sous Chrome, le drag&drop ne fonctionnant pas sur les autres navigateurs.

Le jeu se lance en double cliquant sur le fichier : character_selection.html

Le joueur sélectionne un personnage → Choix forcé sur nono


Création de niveau supplémentaire :

Toutes les fonctions de création de niveau sont déjà implémentées.

Explication de la création d’un niveau :


Créer une fenêtre modale en début de niveau :

$(".modal-content").empty();
$(".modal-content").append(`divs`)

Utilisez les même classes !

Création du monde :

Les variables : 

vivant et gagne permettent de gérer les fins de niveau.

width et height permettent de gérer la taille du monde
L’origine 0_0 se trouve en haut à gauche

tableau_etoiles permet de positionner les étoiles sur le monde
tableau de texts [x_y]

tableau_mur permet de positionner les murs sur le monde
tableau de texts [x_y]

tableau_action permet de donner les actions disponibles
tableau de texts [d,g,h,b]

startRobot permet de positionner le robot au départ
tableau de text [x_y]

orientation permet de dire vers quelle direction le robot va aller par défaut au début

end permet de positionner la fin du niveau


Actions spéciales :

choixdefautrobot permet d’utiliser le détecteur de mur
Si défini le robot esquive les objets mur
Si non défini le robot rentrer et meurt dans les objets mur


Pour ajouter de nouvelles actions spéciales tel que le détecteur de mur, je conseil d’utiliser la même méthode. Une variable globale qui :
si null → Action de base 
si non null → Action spéciales

On peut imaginer pousser un objet, recevoir un signal, etc...


