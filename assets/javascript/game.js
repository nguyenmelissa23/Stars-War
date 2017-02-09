$(document).ready(function(){
	var charLife;
	var charName;
	var character;
	var defLife;
	var defName;
	var defender;
	var restartbtn = $("<button>");
	//Object Game
	var swGame = {
		charLoss: 0,
		defLoss: 0,
		wait : true,
		attackwait: false, 
		//reset: false, 
	}; 

	//Assign names

	function print() {
		$("#obiName").text($("#obik").attr("data-Name"));
		$("#lukeName").text($("#lukes").attr("data-Name"));	
		$("#sidName").text($("#sid").attr("data-Name"));
		$("#maulName").text($("#maul").attr("data-Name"));
		$("#obipt").text($("#obik").attr("data-Life"));
		$("#lukept").text($("#lukes").attr("data-Life"));	
		$("#sidpt").text($("#sid").attr("data-Life"));
		$("#maulpt").text($("#maul").attr("data-Life"));
		$("#enemiesAvai").text("Enemies Available to Attack");
		$("#yourText").text("Your Character");

	}

	function Initialize() {
		$("#obik").attr("data-Name", "Obi-wan Kenobi");
		$("#lukes").attr("data-Name", "Luke Skywalker");
		$("#sid").attr("data-Name", "Darth Sidious");
		$("#maul").attr("data-Name", "Darth Maul");
		//Assign point attack, changing everything it attacks
		$("#obik").attr("data-cPtAttack", 8);
		$("#lukes").attr("data-cPtAttack", 10);
		$("#sid").attr("data-cPtAttack", 12);
		$("#maul").attr("data-cPtAttack", 14);
		//defender point attack is constant
		$("#obik").attr("data-dPtAttack", 8);
		$("#lukes").attr("data-dPtAttack", 10);
		$("#sid").attr("data-dPtAttack", 12);
		$("#maul").attr("data-dPtAttack", 14);
		//Assign life point
		$("#obik").attr("data-Life", 120);
		$("#lukes").attr("data-Life", 100);
		$("#sid").attr("data-Life", 150);
		$("#maul").attr("data-Life", 180);
		
		$("#yourText").text("");
		$("#defLossPt").text("");
		$("#charLossPt").text("");
		$("#winlose").text("");

		$("#charOpt").append($("#obik"));
		$("#charOpt").append($("#lukes"));
		$("#charOpt").append($("#sid"));
		$("#charOpt").append($("#maul"));
		
	}

	function newgame(){
		
	}

	function start(){
		$(".allchars").on("click", function(){
			if (swGame.wait){
				$("#winlose").text("");
				$("#enemiesAvai").text("Enemies Available to Attack");
				$(this).detach(); //detach this out of wherever it is
				$("#yourText").text("Your Character");
				$(this).appendTo("#yourChar"); //attach this to #yourChar
				$("#charOpt").children().addClass("red");
				$("#charOpt").appendTo("#enemy");
				character = $(this);
				charName = $(this).attr("data-Name");
				charPtAttack = 0;
				charLife = Number($(this).attr("data-Life"));
				console.log(charLife);
				//cannot be clicked on anymore? 
				//$(this).removeClass("allchars");
				swGame.wait = false;
			}
			else {
				swGame.attackwait=true;
				$("#restart").text("");
				$("#winlose").text("");
				$(this).detach();
				$(this).appendTo("#defender");
				$(this).addClass("black");
				defender = $(this);
				defName = $(this).attr("data-Name");
				defPtAttack = Number($(this).attr("data-dPtAttack"));
				defLife = Number($(this).attr("data-Life"));
				swGame.wait= false;
			}
		})
	} 

	function attack(){
		$("#att").on("click", function(){
			if (swGame.attackwait){
				// Character life value after being attacked
				charLife = charLife - defPtAttack;
				// Update the life value for character
				character.attr("data-Life", charLife);
				// Character attack defender with this much damages
				// this changes by constant (character.attr("data-dPtAttack"))
				charPtAttack =  charPtAttack + Number(character.attr("data-dPtAttack"));
				defLife = defLife - charPtAttack;
				defender.attr("data-Life", defLife);
				$("#charLossPt").text("You attacked "+ defName + " for " + charPtAttack + " damages.");
				$("#defLossPt").text(defName + " attacked you back for " + defPtAttack + " damages.");
				print();
				check();
			}
		})
	}

	function check(){
		if (charLife < 0 || defLife < 0) {
			if (charLife< defLife){
				$("#winlose").text("YOU LOST to " + defName +". Click Restart button to play again.");
				swGame.attackwait = false;
				//swGame.reset=true;
				resBtn();
			}
			else if (defLife < charLife){
				$("#winlose").text("You defeated " + defName + ". Choose another enemy to fight.");
				swGame.attackwait = false;
				//defender.detach("#defender");
				defender.addClass("hidden");
				defender.appendTo("#yourChar");
				console.log($("#enemy button").text().length);
				if ( $("#enemy button").text().length === 0 ) {
					$("#winlose").text("YOU WON!");
					$("#defLossPt").text("");
					$("#defLossPt").text("");
					resBtn();	
				}		
			}
		}
	} 

	function resBtn(){
		$("#restart").removeClass("hidden");
		restartbtn.text("Restart");
		$("#restart").append(restartbtn);
		$("#restart").on("click", function(){
			Initialize();
			$(this).addClass("hidden");
			$("#charOpt").children().removeClass("red black");
			$("#charOpt").children().removeClass("allchars");
			$("#charOpt").children().addClass("allchars");
			$("#charOpt").children().removeClass("hidden");
			$("#charOpt").appendTo($("#wrap"));
			print();
			swGame.wait=true;
			swGame.attackwait=false;
		})
	}


	Initialize();
	print();
	start();
	attack();

});