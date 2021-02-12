const delay = ms => new Promise(res => setTimeout(res, ms));
class GameManager {
    constructor() {
        console.dir(settings);
        this.setup();
        this.game = new Game("Player 1", "Player 2", this)
        this.screenManager = new ScreenManager(this);
    }
    setup() {
        var slotX = settings.display.table.width/3,
            slotY = settings.display.table.height/3;
        settings.shapes = {
            slot: {
                "width": slotX,
                "height": slotY,
                "middleX": slotX / 2,
                "middleY": slotY / 2
            },
            "slots": [[], [], []],
            "lines": [
                [
                    {
                        "x": settings.display["table"]["x"] + slotX,
                        "y": settings.display["table"]["y"]
                    },
                    {
                        "x": settings.display["table"]["x"] + slotX,
                        "y": settings.display["table"]["y"] + settings.display["table"]["height"]
                    }
                ],
                [
                    {
                        "x": settings.display["table"]["x"] + (slotX * 2),
                        "y": settings.display["table"]["y"]
                    },
                    {
                        "x": settings.display["table"]["x"] + (slotX * 2),
                        "y": settings.display["table"]["y"] + settings.display["table"]["height"]
                    }
                ],
                [
                    {
                        "x": settings.display["table"]["x"],
                        "y": settings.display["table"]["y"] + slotY
                    },
                    {
                        "x": settings.display["table"]["x"] + settings.display["table"]["width"],
                        "y": settings.display["table"]["y"] + slotY
                    }
                ],
                [
                    {
                        "x": settings.display["table"]["x"],
                        "y": settings.display["table"]["y"] + (slotY * 2)
                    },
                    {
                        "x": settings.display["table"]["x"] + settings.display["table"]["width"],
                        "y": settings.display["table"]["y"] + (slotY * 2)
                    }
                ],
            ]
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                settings.shapes.slots[x][y]=[(x * slotX) + slotX / 2 + settings.display["table"]["x"],
                    (y * slotY) + slotY / 2 + settings.display["table"]["y"]];
            }

        }
        background(...settings.display.background)
        createCanvas(settings.display.width, settings.display.height)
        frameRate(settings.render.FPS)
        textFont(settings.display.font);
        textAlign(CENTER)
    }
    async gameOver(){
        if(this.game.lastWinner && this.game.lastWinner.player!=="TIE"){
            this.screenManager.drawWinLine();
            this.screenManager.drawDialog(this.game.players[this.game.lastWinner.player].name)
        }else{
            this.screenManager.drawDialog("TIE")
        }
        await delay(settings.gamePlay.Dialog*1000);
        this.screenManager.init()
        this.game.init()
    }
}