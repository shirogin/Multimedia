AI = True
w = 900
h = 600
FPS = 10
difficulty = 50/100
canvasW = 400
canvasH = 400
canvasX = 250
canvasY = 140

bc = 255
fillRGB = [112, 112, 112]
winnerRGB = [80, 80, 80]

sw = 3
circleR = 60

slotX = canvasW/3
slotY = canvasH/3
shapeX = [
    [{"x": -(circleR/2), "y": -(circleR/2)},
     {"x": (circleR/2), "y": (circleR/2)}],
    [{"x": -(circleR/2), "y": (circleR/2)},
     {"x": (circleR/2), "y": -(circleR/2)}]

]
lines = [
    [{"x": canvasX+slotX, "y": canvasY}, {"x": canvasX+slotX, "y": canvasY+canvasH}],
    [{"x": canvasX+(slotX*2), "y": canvasY},
        {"x": canvasX+(slotX*2), "y": canvasY+canvasH}],
    [{"x": canvasX, "y": canvasY+slotY},
        {"x": canvasX + canvasW, "y": canvasY + slotY}],
    [{"x": canvasX, "y": canvasY + (slotY * 2)},
        {"x": canvasX + canvasW, "y": canvasY + (slotY*2)}],

]
slotXP = slotX/2
slotYP = slotY/2
positions = [[], [], []]
for x in range(3):
    for y in range(3):
        positions[x].append([(x*slotX) + slotXP + canvasX,
                             (y*slotY) + slotYP + canvasY])
