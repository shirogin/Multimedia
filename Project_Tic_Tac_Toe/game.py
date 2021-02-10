from threading import Timer
import random


class Player:
    def __init__(self, name, symbole):
        self.name = name
        self.score = 0
        self.symbole = symbole

    def addScore(self):
        self.score += 1


class Board:
    def __init__(self):
        self.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        self.available = 9

    def state(self):
        won = False
        for i in range(3):
            if((self.board[0][i] != "") and (self.board[0][i] == self.board[1][i]) and (self.board[0][i] == self.board[2][i])):
                return {
                    "player": self.board[0][i],
                    "elements": "H"+str(i)
                }
        for i in range(3):
            if((self.board[i][0] != "") and (self.board[i][0] == self.board[i][1]) and (self.board[i][0] == self.board[i][2])):
                return {
                    "player": self.board[i][0],
                    "elements": "V"+str(i)
                }
        if((self.board[0][0] != "") and (self.board[0][0] == self.board[1][1]) and (self.board[0][0] == self.board[2][2])):
            return {
                "player": self.board[0][0],
                "elements": "P"
            }
        if((self.board[2][0] != "") and (self.board[2][0] == self.board[1][1]) and (self.board[2][0] == self.board[0][2])):
            return {
                "player": self.board[2][0],
                "elements": "S"
            }
        if(self.available == 0):
            return {
                "player": "TIE"
            }
        else:
            return None

    def setCase(self, i, j, symbole):
        if(self.board[i][j] == ""):
            self.board[i][j] = symbole
            self.available -= 1
            return True
        else:
            return False

    def copy(self):
        board = Board()
        for i in range(3):
            for j in range(3):
                board.board[i][j] = self.board[i][j]
        return board

    def getAvailable(self):
        av = []
        for i in range(3):
            for j in range(3):
                if(self.board[i][j] == ""):
                    av.append([i, j])
        return av


class Game:
    def __init__(self, name1, name2, Computer=True, depth=9, AI=False, X=True):
        self.Computer = Computer
        self.AI = AI
        self.depth = depth
        x = ["X", "O"] if X else ["O", "X"]
        self.players = [Player(name1, x[0]), Player(name2, x[1])]
        self.cp = 0
        self.init()
        self.lastWinner = {
            "player": 2,
            "list": []
        }

    def init(self):
        self.won = False
        self.on = True
        self.board = Board()
        self.checkStep()

    def minimax(self, board, depth, maxim=True, Init=True):
        state = board.state()
        if(depth == 0 or state != None):
            if state == None or state["player"] == "TIE":
                return 0
            elif state["player"] == self.players[0].symbole:
                return (-1*(depth+1))
            else:
                return (1*(depth+1))
        avs = board.getAvailable()
        if(maxim):
            maxEval = float('-inf')
            maxElm = []
            for x in avs:
                nBoard = board.copy()
                nBoard.board[x[0]][x[1]] = self.players[1].symbole
                val = self.minimax(nBoard, depth-1, False, False)
                if val > maxEval:
                    maxEval = val
                    maxElm = [x]
                elif val == maxEval:
                    maxElm.append(x)
            if(Init):
                return maxElm
            return maxEval
        else:
            minEval = float('inf')
            for x in avs:
                nBoard = board.copy()
                nBoard.board[x[0]][x[1]] = self.players[0].symbole
                val = self.minimax(nBoard, depth-1, True, False)
                if val < minEval:
                    minEval = val
            return minEval

    def nextStep(self):
        availables = self.board.getAvailable()
        step = random.randint(0, len(availables)-1)
        self.nextMove(availables[step][0], availables[step][1])

    def AIStep(self):
        minimax = self.minimax(self.board, self.board.available)
        step = random.randint(0, len(minimax)-1)
        self.nextMove(minimax[step][0], minimax[step][1])

    def checkStep(self):
        if(self.on and self.Computer == True and self.cp == 1):
            if(self.AI):
                self.AIStep()
            else:
                self.nextStep()

    def nextMove(self, i, j):
        if(not self.board.setCase(i, j, self.players[self.cp].symbole)):
            return False

        state = self.board.state()
        if(state != None):
            if(state["player"] == "X" or state["player"] == "O"):
                self.players[self.cp].addScore()
                self.lastWinner = {
                    "player": self.cp,
                    "list": state["elements"]
                }
                self.won = True
            self.on = False
            Timer(5, self.init).start()
        self.cp = (self.cp+1) % 2
        self.checkStep()

        return True
