let score = 0;
let level = 1;
let lives = 3;
let foodTimer = 0;
let gameover = false;
let interval;
let fishEnemiesList = [];
let fishEntryPositions = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];
let fishImages = [{ src: "shark.gif", weight: 1.7 },{ src: "gray_fish.gif", weight: 1.2 },{ src: "whiteFish.gif", weight: 0.8 }, { src: "yellowFish.gif", weight: 1.4 }];
let playerNumber;

//localStorage.setItem("HScore" , 0) ; 

let fishPlayer = document.getElementById("fishPlayer");
let container = document.getElementById("container");
let eatSound = document.getElementById("eat");
let underWater = document.getElementById("underWater") ; 
let scoreRecord = document.getElementById("score") ; 
let levelRecord = document.getElementById("level") ; 
let HScoreRecord = document.getElementById("HScore") ; 


container.onmousemove = function (event) {

    let rect = container.getBoundingClientRect();

    if (parseInt(fishPlayer.style.left) < event.clientX - rect.left) {
        fishPlayer.src = "./images/Characters/player" + playerNumber + "-right.gif"; // change right
    } else if (parseInt(fishPlayer.style.left) > event.clientX - rect.left) {
        fishPlayer.src = "./images/Characters/player" + playerNumber + "-left.gif"; // change left
    }

    window.scrollBy(event.clientX - parseInt(fishPlayer.style.left), event.clientY - parseInt(fishPlayer.style.top));

    fishPlayer.style.left = (event.clientX - rect.left) + 'px';
    fishPlayer.style.top = (event.clientY - rect.top) + 'px';


    if (event.clientX >= window.innerWidth - fishPlayer.width) {
    
        fishPlayer.style.left = window.innerWidth - fishPlayer.width + 'px';   
    }

    if (event.clientY >= window.innerHeight - fishPlayer.height) {

        fishPlayer.style.top = window.innerHeight - fishPlayer.height + 'px';
    }

};

function UpdateGameGrid() {

    createEnemyFishes();
    detectCollisionBetweenPlayerFishAndEnemyFishes();
    detectCollisionBetweenEnemyFishes();
    moveEnemyFishes();
    scoreAndLevel() ; 
    adjustBoard(score,level,playerNumber,lives);
    
    if(gameover === true){
        alert("You Lost : Game Over");
        clearInterval(interval);
        if(confirm("Play a gain ?"))
            location.reload();
    
    }

}

let startGame = function () {
    
    playerNumber = 1;
    fishPlayer.src = "./images/Characters/player" + playerNumber + "-right.gif";
    interval = setInterval(UpdateGameGrid, 20);
}

let playUnderWater = function (){
    underWater.play() ; 
}
sound = setInterval(playUnderWater , 2000) ; 

//startGame();
