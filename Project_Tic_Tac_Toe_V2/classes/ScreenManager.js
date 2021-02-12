class ScreenManager {
    constructor(gameManager) {
        this.gameManager=gameManager;
        console.log(this.gameManager)
        this.init();
    }   
    init(){
        this.drawBackground()
        this.drawBoard()
        this.drawChoice()
        if(settings.gamePlay.Computer)this.drawDifficulty()
        if(this.gameManager.game){
            this.drawPlayerScore(0)
            this.drawPlayerScore(1)
        }
    }
    drawPlayerScore( player ){
        if(this.gameManager.game.lastWinner && this.gameManager.game.lastWinner.player === player) {
            fill(...settings.display.players[player].highlighted)
            stroke(...settings.display.players[player].highlighted)
        }
        else {
            fill(...settings.display.players[player].color)
            stroke(...settings.display.players[player].color)
        }
        strokeWeight(settings.display.players[player].name.stroke)
        textSize(settings.display.players[player].name.size)
        text(this.gameManager.game.players[player].name, settings.display.players[player].name.x, settings.display.players[player].name.y)
        strokeWeight(settings.display.players[player].score.stroke)
        textSize(settings.display.players[player].score.size)
        text(this.gameManager.game.players[player].score, settings.display.players[player].score.x, settings.display.players[player].score.y)
    }
    drawBackground() {
        background(...settings.display.background)
        this.drawTitle()
        this.drawBoard()
        //stroke(...settings.display.stroke)
    }
    drawTitle() {
        noStroke()
        fill(...settings.display.title.color)
        textSize(100)
        text("TIC TAC TOE", settings.display.title.x, settings.display.title.y)
    }
    drawDialog(message){
        fill(settings.display.dialog.background)
        rect(...settings.display.dialog.rect)
        fill(settings.display.dialog.color)
        text(message,...settings.display.dialog.message)
    }
    drawChoice(){
        textSize(settings.display.twoPlayer.size)
        stroke(...settings.display.twoPlayer.color)
        strokeWeight(1)
        fill(...settings.display.twoPlayer.color)
        text(settings.gamePlay.Computer?"2 Players":"Computer",...settings.display.twoPlayer.text)
    }
    drawDifficulty(){
        textSize(settings.display.difficulty.size)
        stroke(...settings.display.difficulty.color)
        strokeWeight(1)
        fill(...settings.display.difficulty.color)
        text(["Very Hard","Hard","Normal","Easy"][settings.gamePlay.Difficulty-1],...settings.display.difficulty.text)
    }
    drawWinLine() {
        let l = this.gameManager.game.lastWinner.list,
        game=this.gameManager.game,
        {middleX: slotXP,middleY: slotYP}=settings.shapes.slot
        strokeWeight(settings.display.WinStroke)    
        stroke(...settings.display.players[game.lastWinner.player].win);
        if (l == "P")
            return line(settings.shapes.slots[0][0][0] - slotXP, settings.shapes.slots[0][0][1] - slotYP,
                settings.shapes.slots[2][2][0] + slotXP, settings.shapes.slots[2][2][1] + slotYP);
        if (l == "S")
            return line(settings.shapes.slots[0][2][0] - slotXP, settings.shapes.slots[0][2][1] + slotYP,
                settings.shapes.slots[2][0][0] + slotXP, settings.shapes.slots[2][0][1] - slotYP);
        if (l[0] == "V")
            return line(settings.shapes.slots[int(l[1])][0][0], settings.shapes.slots[int(l[1])][0][1] - slotYP,
                settings.shapes.slots[int(l[1])][2][0], settings.shapes.slots[int(l[1])][2][1] + slotYP)
        if (l[0] == "H")
            return line(settings.shapes.slots[0][int(l[1])][0] - slotXP, settings.shapes.slots[0][int(l[1])][1],
                settings.shapes.slots[2][int(l[1])][0] + slotXP, settings.shapes.slots[2][int(l[1])][1]);
    }
    drawBoard() {
        noFill()
        strokeJoin(ROUND)
        strokeWeight(settings.display.table.stroke)
        stroke(...settings.display.table.color)
        if(settings.display.table.border) rect(settings.display.table.x, settings.display.table.y, settings.display.table.width, settings.display.table.height);
        settings.shapes.lines.forEach(l => line(l[0]["x"], l[0]["y"], l[1]["x"], l[1]["y"]) );

    }
    getSlot(){
        if((mouseX > settings.display.table.x) && (mouseX < (settings.display.table.x+settings.display.table.width)) && (mouseY > settings.display.table.y) && (mouseY < (settings.display.table.y+settings.display.table.height))){
            let c = mouseX-settings.display.table.x,
                d = mouseY-settings.display.table.y,
                x = 0,bj=false,
                y = 0;
            for(let i=1; i< 3;i++){
                if((settings.shapes.slot.width*(i)) > c) break;
                x=i;
            }
            for(let i=1; i< 3;i++){
                if((settings.shapes.slot.height*(i)) > d) break;
                y=i;
            }
            return {x,y}
        }
        return null;
    }
    getSwitch(){
        let [x,y,width,height]=settings.display.twoPlayer.rect
        if((mouseX > x) && (mouseX < (x+width)) && (mouseY > y) && (mouseY < (y+height))) return true;
        return false;
    }
    getDifficulty(){
        let [x,y,width,height]=settings.display.difficulty.rect
        if((mouseX > x) && (mouseX < (x+width)) && (mouseY > y) && (mouseY < (y+height))) return true;
        return false;
    }
    drawValue({x,y}){
        noFill()
        strokeWeight(settings.display.shapes.stroke)
        let pos = settings.shapes.slots[x][y],
            shape=this.gameManager.game.get(x,y);
        if(shape === "O") {
            stroke(...settings.display.shapes.circle.color)
            circle(pos[0], pos[1], settings.display.shapes.circle.radius)
        }
        else if(shape === "X"){
            stroke(...settings.display.shapes.cross.color)
            settings.display.shapes.cross.lines.forEach( l =>
                line(l[0].x+pos[0], l[0].y+pos[1],l[1].x+pos[0], l[1].y+pos[1])
                )
        }
            
    }
}