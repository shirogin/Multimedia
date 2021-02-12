let settings,gameManager;
function preload() {
    settings = loadJSON("./data/Settings.json");
}


function setup() {
    gameManager = new GameManager()

}


function draw() {

}

function mousePressed(){
    let slot=gameManager.screenManager.getSlot();
    if(slot) return gameManager.game.nextMove(slot)
    
}