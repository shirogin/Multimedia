let settings,gameManager;
function preload() {
    settings = loadJSON("./data/Settings.json");
}


function setup() {
    gameManager = new GameManager()

}


function draw() {
    if(gameManager.screenManager.getSlot() || gameManager.screenManager.getSwitch() || (settings.gamePlay.Computer && gameManager.screenManager.getDifficulty())) cursor(HAND)
    else cursor(ARROW)
}

function mousePressed(){
    let slot=gameManager.screenManager.getSlot();
    if(slot) return gameManager.game.nextMove(slot)
    if(gameManager.screenManager.getSwitch()) return gameManager.switchC();
    if(gameManager.screenManager.getDifficulty()) return gameManager.switchD();

}