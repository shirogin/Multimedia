from Settings import w, h, canvasW, canvasH, canvasX, canvasY, bc, fillRGB, sw, lines, circleR, shapeX, slotXP, slotYP, slotX, slotY, positions, FPS, winnerRGB, AI
from game import Game
game = Game("Player 1", "Player 2", AI=AI)


def setup():
    size(w, h)
    frameRate(FPS)
    background(bc)
    textMode(SHAPE)


def draw():
    background(bc)
    stroke(fillRGB[0], fillRGB[1], fillRGB[2])
    drawTitle()
    drawPlayerScore(game.players[0].name, game.players[0].score, 0)
    drawPlayerScore(game.players[1].name, game.players[1].score, 1, 680)
    drawBoard()
    drawValues()
    if(not game.on and game.won):
        drawWinLine()


def drawWinLine():
    l = game.lastWinner["list"]
    strokeWeight(sw)
    if(game.lastWinner["player"] != game.players[0].symbole):
        stroke(200, 0, 0)
    else:
        stroke(0, 200, 0)
    if(l == "P"):
        line(positions[0][0][0]-slotXP, positions[0][0][1]-slotYP,
             positions[2][2][0]+slotXP, positions[2][2][1]+slotYP)
    elif(l == "S"):
        line(positions[0][2][0]-slotXP, positions[0][2][1]+slotYP,
             positions[2][0][0]+slotXP, positions[2][0][1]-slotYP)
    elif(l[0] == "V"):
        line(positions[int(l[1])][0][0], positions[int(l[1])][0][1]-slotYP,
             positions[int(l[1])][2][0], positions[int(l[1])][2][1]+slotYP)
    elif(l[0] == "H"):
        line(positions[0][int(l[1])][0]-slotXP, positions[0][int(l[1])][1],
             positions[2][int(l[1])][0]+slotXP, positions[2][int(l[1])][1])


def drawPlayerScore(name, score, player, paddingX=0):

    if(game.lastWinner["player"] == player):
        fill(winnerRGB[0], winnerRGB[1], winnerRGB[2])
    else:
        fill(fillRGB[0], fillRGB[1], fillRGB[2])
    textSize(25)
    text(name, 65 + paddingX, 200)
    textSize(60)
    text(str(score), 90 + paddingX, 300)


def drawTitle():
    fill(fillRGB[0], fillRGB[1], fillRGB[2])
    textSize(100)
    text("TIC TAC TOE", 140, 100)


def drawValues():
    noFill()
    strokeWeight(sw*3)
    for x in range(3):
        for y in range(3):
            pos = positions[x][y]
            if(game.board.board[x][y] == "O"):
                circle(pos[0], pos[1], circleR)
            elif(game.board.board[x][y] == "X"):
                for l in shapeX:
                    line(l[0]["x"]+pos[0], l[0]["y"]+pos[1],
                         l[1]["x"]+pos[0], l[1]["y"]+pos[1])


def drawBoard():
    fill(255)
    strokeJoin(ROUND)
    strokeWeight(sw*2)
    #rect(canvasX, canvasY, canvasW, canvasH)
    for l in lines:
        line(l[0]["x"], l[0]["y"], l[1]["x"], l[1]["y"])


def mouseClicked():
    if(game.on and game.cp == 0):
        mouseP = getSlot()
        if(mouseP != None):
            game.nextMove(mouseP[0], mouseP[1])


def getSlot():
    if((mouseX > canvasX) and (mouseX < (canvasX+canvasW)) and (mouseY > canvasY) and (mouseY < (canvasY+canvasH))):
        c = mouseX-canvasX
        d = mouseY-canvasY
        i = 0
        j = 0
        for x in range(1, 3):
            if(slotX*(x)) > c:
                break
            i = x
        for x in range(1, 3):
            if(slotY*(x)) > d:
                break
            j = x
        return [i, j]
    else:
        return None
