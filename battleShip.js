var map = document.getElementById("map");
var messageBox = document.getElementById("messageBox");
var allButton = document.getElementsByTagName("button");

var b = new Array(10);
var clicks = 0
var playerLocations  = new Array();

for(let i =0; i < 10; i++) 
    b[i] = new Array(10);

var oceanMap = new Array(100);
for(let i =0; i<100; i++)
    oceanMap[i] = 0;
playerDeployed = 0;
 playerShipCount = 0;
 computerShipCount = 0;

for(let j=0;j<10;j++)
    for(let i=0;i<10;i++) {
        b[j][i] = document.createElement("button");
        b[j][i].style.width = "30px";
        b[j][i].style.height = "30px";
        b[j][i].style.backgroundImage = "url('sea.jpg')";
        b[j][i].id = j*10+i;
        b[j][i].addEventListener("click",function() {clicked(this)});
        map.appendChild(b[j][i]);
    }

function clicked(that) {
    if (playerDeployed == 0) 
        playerDeploy(that);
    else
        play(that);
}

function playerDeploy(that) {
    if(playerShipCount >= 5 && oceanMap[that.id] == 0)
        alert("You have deployed maximum number of ships.\nSelect a deployed ship to change its location or click deploy to confirm the location.")
    else {
        if(oceanMap[that.id] == 0)
            deploy(that);
        else
            undeploy(that);
    }
}

function deploy(that) {
    oceanMap[that.id] = 1;
    that.style.backgroundImage = "url('pship.jpg')";
    playerShipCount++;
    playerLocations.push(that);
}

function undeploy(that) {
    oceanMap[that.id] = 0;
    that.style.backgroundImage = "url('sea.jpg')";
    playerShipCount--;
    playerLocations.splice(playerLocations.indexOf(that),1);
}

function submit() {
    if(playerShipCount == 5) {
        let sub = document.getElementById("submit");
        playerDeployed = 1;
        sub.style.display = "None";
        disablePlayerLocations();
        deployComputerShips();
    }
    else
        alert("Please click on the location to deploy your ships.");
}

function deployComputerShips() {
    while(computerShipCount < 5) {
        let loc = Math.floor(Math.random()*100);
        if(oceanMap[loc] == 0) {
            oceanMap[loc] = 2;
            computerShipCount++;
        }
    }
    messageBox.innerHTML = "You and computer have deployed your ships. <br>Now click on a location to attack."
}

function play(that) {
    if (playerShipCount > 0 && computerShipCount > 0) {
        playerTurn(that);
        if(computerShipCount > 0)
            computerTurn();
        else
            play(that);
    }
    else {
        if(playerShipCount > 0) 
            messageBox.innerHTML += "<br>You won.";
        else
            messageBox.innerHTML += "<br>You lost.";
        for(let w = 0; w < allButton.length; w++)
            allButton[w].disabled = true;
    }
}

function playerTurn(that) {
    if(oceanMap[that.id] == 2) {
        messageBox.innerHTML = "You sunk one of computer's ships.";
        that.disabled = true;
        that.style.backgroundImage = "url('phit.jpg')";
        computerShipCount--;
    }
    else {
        messageBox.innerHTML = "You missed.";
        that.disabled = true;
        that.style.backgroundImage = "url('try.jpg')";
    }
}

function computerTurn() {
    if(computerShipCount == 0)
        return;
    let loc = Math.floor(Math.random()*100);
    if(oceanMap[loc] == 2 || oceanMap[loc] == 9)
        computerTurn();
    else {
        messageBox.innerHTML += "<br>Computer's turn"
        if(oceanMap[loc] == 1) {
            messageBox.innerHTML+="<br>Computer sunk one of your ships.<br>Your turn";
            b[Math.floor(loc/10)][loc%10].style.backgroundImage = "url('chit.jpg')";
            oceanMap[loc] = 9;
            playerShipCount--;
            if(playerShipCount == 0)
                play(null);
        }
        else{
            oceanMap[loc] = 9;
            messageBox.innerHTML+="<br>Computer missed.<br>Your turn."
        }
    }
}

function disablePlayerLocations() {
    for(let i = 0; i < 5; i++) 
        playerLocations[i].disabled = true;
}
