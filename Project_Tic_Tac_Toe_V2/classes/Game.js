class Player{
    constructor(name, X){
        this.name = name
        this.score = 0
        this.symbole =  X ? "X": "O"
    }

    addScore(){
        this.score += 1
    }
}
class Board{
    constructor(){
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        this.available = 9
    }
    state(){
        let won = false
        for(let i=0;i<3;i++){
            if((this.board[0][i] != "") && (this.board[0][i] == this.board[1][i]) && (this.board[0][i] == this.board[2][i]))
                return {
                    "player": this.board[0][i],
                    "elements": "H"+str(i)
                };
        }
        for(let i=0;i<3;i++){
            if((this.board[i][0] != "") && (this.board[i][0] == this.board[i][1]) && (this.board[i][0] == this.board[i][2]))
                return {
                    "player": this.board[i][0],
                    "elements": "V"+str(i)
                }
        }
        if((this.board[0][0] != "") && (this.board[0][0] == this.board[1][1]) && (this.board[0][0] == this.board[2][2]))
            return {
                "player": this.board[0][0],
                "elements": "P"
            }
        if((this.board[2][0] != "") && (this.board[2][0] == this.board[1][1]) && (this.board[2][0] == this.board[0][2]))
            return {
                "player": this.board[2][0],
                "elements": "S"
            }
        if(this.available == 0)
            return {
                "player": "TIE"
            }
        else
            return null
    }
    setCase( i, j, symbole){
        if(this.board[i][j] === ""){
            this.board[i][j] = symbole
            this.available -= 1
            return true
        }
        else
            return false
    }
    set(i,j,val){
        this.board[i][j]=val;
    }
    copy(){
        let board = new Board()
        for(let i=0;i<3;i++)
            for(let j=0;j<3;j++)
                board.set(i,j,this.board[i][j]);
        return board
    }
    getAvailable(){
        let av = []
        for(let i=0;i<3;i++)
            for(let j=0;j<3;j++)
                if(this.board[i][j] == "")
                    av.push([i, j]);
        return av;
    }
}
    
class Game{
    constructor(Player1, Player2, gameManager, X=true){
        this.gameManager = gameManager
        this.players = [new Player(Player1, X), new Player(Player2, ! X)]
        this.cp = 0
        this.init()
        
    }

    get(x,y){
        return this.board.board[x][y];
    }

    init(){
        this.won = false
        this.on = true
        this.board =new  Board()
        this.checkStep()
        this.lastWinner = null
    }

    initDraw(){
        this.init()
        // drawF()
    }
    minimax( board, depth, maxim=true, Init=true){
        let state = board.state()
        if(depth == 0 || state != null){
            if (state == null || state["player"] == "TIE")
                return 0;
            else if (state["player"] == this.players[0].symbole)
                return -(depth+1);
            else
                return depth+1;
        }
        let avs = board.getAvailable()
        if(maxim){
            let maxEval = Number.NEGATIVE_INFINITY,
                maxElm = []
            avs.forEach(x => {
                let nBoard = board.copy()
                nBoard.board[x[0]][x[1]] = this.players[1].symbole
                let val = this.minimax(nBoard, depth-1, false, false)
                if (val > maxEval){
                    maxEval = val
                    maxElm = [[x[0], x[1], val]]
                }
                else if (val == maxEval)
                    maxElm.push([x[0], x[1], val])
            });
            if(Init) return maxElm
            return maxEval
        }
        else{
            let minEval = Number.POSITIVE_INFINITY;
            avs.forEach(x => {
                let nBoard = board.copy()
                nBoard.board[x[0]][x[1]] = this.players[0].symbole
                let val = this.minimax(nBoard, depth-1, true, false)
                if (val < minEval)
                    minEval = val;
            });
            return minEval
        }
    }

    nextStep(){
        let availables = this.board.getAvailable(),
            step =Math.floor( Math.random()* (availables.length-1))
        this.nextMove(availables[step][0], availables[step][1])
    }

    AIStep(){
        console.log(ceil(this.board.available/settings.gamePlay.Difficulty));
        let minimax = this.minimax(this.board, ceil(this.board.available/settings.gamePlay.Difficulty)),
            step =Math.floor( Math.random()* (minimax.length-1)) 
        this.nextMove({x:minimax[step][0],y:minimax[step][1]} )
    }

    checkStep(){
        if(this.on && settings.gamePlay.Computer && this.cp == 1)
            if(settings.gamePlay.AI) this.AIStep();
            else this.nextStep()
    }

    nextMove( {x, y}){
        if(! this.on || ! this.board.setCase(x, y, this.players[this.cp].symbole))
            return false
        let state = this.board.state()
        this.gameManager.screenManager.drawValue({x,y});
        if(state != null){
            if(state.player === "X" || state.player === "O"){
                this.players[this.cp].addScore()
                this.lastWinner = {
                    "player": this.cp,
                    "list": state["elements"]
                }
                this.won = true
            }
            this.on = false
            this.gameManager.gameOver();
        }
        this.cp = (this.cp+1) % 2
        this.checkStep()
        return true
    }

}