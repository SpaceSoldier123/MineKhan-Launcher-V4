//Note: Copy this into a new Khan Academy program.

{
var values = [];
var world = [];
}//SAVE YOUR WORLD HERE(PRESS P) GO FORWARD A FEW BLOCKS THEN LOOK RIGHT!

/**VER ALPHA 0.9.6: more blocks update
CREDTIS:
GameChief999{
starting the project
creating movement/jumping
making block function
making place/destroy funciton(help from john314)
}
ScusX{
Fixing rotation
collisions
Making a bse for the block placing function(did not make it, just made the base of it)
NATRUAL GENERATION(COMING SOON!)
}
death12712{
helping, not very active
}
John314{
Block placing/destroying function(with help from GameChief999)
Inventory
}
Mikev(NOT DEVElOPER BUT HELPED){
fixed screen bobing up and down
} Samwise gaunge(BANNED){
hotbar
}
VERSIONS{
alpha 0.9.6: more blocks update
https://www.khanacademy.org/computer-programming/096-alpha-more-blocks-update/6483408218816512
    }
CONTROLS:
WASD to move
arrow keys/drag mouse to look around
right click to place
left click to destroy
IJKL to control the x/z axis of the block placer
U/O to control the Y axis of the block placer
P to save your world(copy the code then paste it in the program then spin off)
numbers 1-9 to select blocks
BLOCK IDS
1: grass(press 1)
2: dirt(press 2)
3: stone(press 3)
4: wood(press 4)
5: leaves(press 5)
6: grass with snow(press 6)
7: coal(press 7)
8: water(cant place yet)
9: sand(press 9)
50: glass(press 8)
*/
var r = function(num) {
    return(round(num * 1000) / 1000);
};

var gen1 = r(random(0.02, 0.03));
var gen2 = r(random(0.4, 0.9));
var gen3 = r(random(30, 70));
var gen4 = r(random(0.02, 0.03));

if(values[0] !== undefined) {
    gen1 = world[0];
    gen2 = world[1];
    gen3 = world[2];
    gen4 = world[3];
}
world[0] = gen1;
world[1] = gen2;
world[2] = gen3;
world[3] = gen4;

var left = color(255, 0, 0);
var right = color(0, 255, 0);
var up = color(0, 0, 255);
var down = color(255, 0, 255);
var front = color(0, 255, 255);
var back = color(255, 255, 0);

//1 = plastic by GameChief999: faster, farther render distance
//2 = realistic by Scott: slower, not as far render distance
var texturePack = 1;
{
//Smaller = faster Larger = see further
//50 = 1 block(for plastic)
var renderDistance = 650;
//smaller screenscale may be faster
var Screenscale = 400;
var displayCordinates = true;}
var input = [];
var isBlockSelected = false;
var ColorPick = 0;
frameRate(60);
var players = 1;
var messages = ["Scott fixed\nrotation!", "Who cut\nthe cheese?", "Winston inside\nyour inventory!", "death codes\njava!", "One does not\nsimply code", "4 + 7 = 11", "KHANKRAFT > awesome", "Don't tickle me", "100% of customers\ntried this out", "WARNING:\nmay contain unsafe levels of epic", "There is aproximately a 1 / 365\nchance that it's your birthday", "There is no message", "I decided to write something too long to fit on screen so that I could say I did", "Hola! Yo hablo\nKHANKRAFT!", "qwertyuiopasdfghjklzxcvbnm", "It's a beautiful day to play", "Watch me watch you watch\nhim watch you watch this", "There is a 1 / 20 chance\nthat you will read this message", "How do I play?", "Great Scott!"];
angleMode = "radians";
var barSelected = 1;
var barHeld = "none";
var e = 0;
var edelay = 15;
var cloudx = 300;
var x = 0;
var y = 0;
var z = 0;
var playerSpeed = 5;
var isWearingPumpkin = 0;
var jump = false;
var fall = false;
var jumpSpeed = 4.6;
var fallSpeed = 0;
var onBlock = null;
imageMode(CENTER);
var sp = round(random(0, 20));
var splash = function() {
    textAlign(CENTER, CENTER);
    fill(255, 150, 0);
    text(messages[sp], 300, 100);
    textAlign(CORNER, CORNER);
};
var ix = 0;
var iy = 0;
var iz = 0;
var irx = 0;
var iry = 0;
var ix2 = 0;
var iy2 = 0;
var iz2 = 0;
var ix3 = 0;
var iy3 = 0;
var iz3 = 0;
var iz4 = 0;
var ix4 = 0;
var iy4 = 0;
var ix5 = 0;
var iy5 = 0;
var ix6 = 0;
var iy6 = 0;
var ix7 = 0;
var iy7 = 0;
var ix8 = 0;
var iy8 = 0;
var slot = 1;
var tab = 0;
var valueLength = values.length;
var blockSelected = 1;
var type = 2;
var Sx = 0;
var Sy = 0;
var Sz = 0;
var vz = 0;
var vx= 0;
var vy = 0;
var g = createGraphics(width, height, P3D);
var HandT;

var handT;
var p = createGraphics(10, 20, JAVA2D);
var hT = function() {
    if(!p) {
        return;
    }
    p.pushMatrix();
    p.strokeWeight(0.4);
    p.background(240, 210, 149);
    p.fill(0, 136, 255);
    p.rect(0,-8,20,20);
    p.popMatrix();
    
    return(p.get());
};
handT = hT();
var hand = function(){
    g.pushMatrix();
    g.background(204, 204, 204, 0);
    g.camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
    g.translate(19, 24, -40);
    //g.translate(0, 0, 30);
    g.rotateY(0.2);
    g.rotateX(-0.3);
    g.rotateZ(2.7);
    //g.rotateY(0.4);
    g.fill(184, 135, 50);
    g.stroke(0, 0, 0);
    g.box(10, 10, 20-2);
    g.translate(0, 0, -15);
    g.translate(0, 0, -6);
    g.translate(0, -3, -2);
    g.noStroke();
    g.rotateX(-1.5708);
    g.translate(-5, -34, 8.1);
    g.fill(255, 255, 255);
    g.stroke(255, 255, 255, 0);
    g.image(handT, 0, 0);
    g.popMatrix();
    return(g.get());

};
HandT = hand();
var hotBar = [[0,0,0,0,0,0,0,0,0]];
var hotBarN = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ];
var hotBS = 1;
var XP = 18;//18
var XPlevels = 0;
var hearts = [[2,2,2,2,2,2,2,2,2,2]];
var armmorB = [[2,2,2,2,2,2,2,2,1,0]];
var hungerb = [[2,2,2,2,2,2,2,2,2,2]];
var halfH = false;
var halfA = false;
var hungertic = 60;
var hungerX = 0;
var halfHth = false;
var healthtic = 60;
var healthX = 0;
var armmorTF = true;
var MPT = 0;
var TOB = "dirt";
var TOT = "hand";
var JD = false;
var invin = [
    [1,2,4,4,4,0,0,0,0],
    [0,0,4,4,4,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    ];
var craft = [
    [0,0,-1,-1,-1],
    [0,0,-1,-1,-1],
    ];
var BlockSelectedI = -1;
var mineing = function(x,y) {
    fill(232, 0, 0);
    rect(0,0,10,10);
    if(mouseIsPressed){
     MPT+=1;
    }else if(!mouseIsPressed){
       MPT = 0;
     JD = false;
    }
    if(TOT==="hand"){
    if(TOB==="dirt"){
    if(MPT>=1){
    stroke(0, 0, 0);
    line(x+5,y+5,x+10,y+10);
    }
    if(MPT>=15){
    stroke(0, 0, 0);
    line(x+5,y,x+5,y+5);
    }
    if(MPT>=25){
    stroke(0, 0, 0);
    line(x+10,y+2,x+5,y+5);
    }
    if(MPT>=35){
    stroke(0, 0, 0);
    line(x+1,y+4,x+5,y+5);
    }
    if(MPT>=45){
    stroke(0, 0, 0);
    line(x+2,y+4,x+4,y+10);
    }
    if(MPT>=55){
    stroke(0, 0, 0);
    line(x+10,y+10,x+7,y+1);
    }
    if(MPT>=65){
    stroke(0, 0, 0);
    line(x,y+8,x+4,y+8);
    }
    if(MPT>=70){
        MPT=0;
        JD = true;
 }
    }
}
    if(TOT==="hand"){
    if(TOB==="stone"){
    if(MPT>=1){
    stroke(0, 0, 0);
    line(x+5,y+5,x+10,y+10);
    }
    if(MPT>=20){
    stroke(0, 0, 0);
    line(x+5,y,x+5,y+5);
    }
    if(MPT>=60){
    stroke(0, 0, 0);
    line(x+11,y+2,x+5,y+5);
    }
    if(MPT>=100){
    stroke(0, 0, 0);
    line(x+1,y+4,x+5,y+5);
    }
    if(MPT>=140){
    stroke(0, 0, 0);
    line(x+2,y+4,x+4,y+14);
    }
    if(MPT>=180){
    stroke(0, 0, 0);
    line(x+14,y+14,x+7,y+1);
    }
    if(MPT>=220){
    stroke(0, 0, 0);
    line(x,y+8,x+4,y+8);
    }
    if(MPT>=260){
        MPT=0;
    JD = true;
 }
}
}
noStroke();
if(JD === true){
    background(255, 0, 0);
}

};
var invintory = function(x,y) {
{
noStroke();
fill(99, 99, 99,200);
rect(x,y,400,400);
fill(143, 143, 143);
rect(x+40,y+40,320,320);
fill(173, 173, 173);
rect(x+50,y+200,300,140);

}
    for(var i = 0; i < craft.length+3;i++){
    for(var e = 0; e < craft.length;e++){
        var x = i*25+190;
        var y = e*25+103;
        switch(craft[e][i]){
        
case -1:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
break;
case 0:
    {
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);

if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&BlockSelectedI > 0&&mouseButton===LEFT){
    craft[e][i]=BlockSelectedI;
    BlockSelectedI = -1;
}
}
if(craft[e][i]&&craft[e][i+1]&&craft[e+1][i+1]&&craft[e+1][i]===4){
            craft[e][i+4]=5;
            craft[e][i]=0;
            craft[e][i+1]=0;
            craft[e+1][i]=0;
            craft[e+1][i+1]=0;
}else if(craft[e][i]&&craft[e+1][i]===4&&craft[e+1][i+1]&&craft[e][i+1]===0){
            craft[e][i+4]=3;
            craft[e][i]=0;
            craft[e+1][i]=0;
}

    break;
case 1:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(153, 79, 0);
rect(x+2,y+2,16,16);
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseIsPressed&&mouseButton===RIGHT&&   BlockSelectedI === -1){
    craft[e][i]=0;
    BlockSelectedI = 1;
}
break;
case 2:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(153, 79, 0);
rect(x+2,y+2,16,16);
fill(0, 153, 0);
rect(x+2,y+2,16,6);
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    craft[e][i]=0;
    BlockSelectedI = 2;
}else{}
break;
case 3:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
stroke(153, 79, 0);
line(x,y+16,x+16,y);
noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    craft[e][i]=0;
    BlockSelectedI = 3;
}
break;
case 4:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(217, 146, 65);
rect(x+2,y+2,16,16);
fill(145, 75, 0);
rect(x+2,y+4,16,2);
rect(x+2,y+8,16,2);
rect(x+2,y+12,16,2);
rect(x+2,y+16,16,2);

noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    craft[e][i]=0;
    BlockSelectedI = 4;
}
break;
case 5:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(217, 146, 65);
rect(x+2,y+2,16,16);
fill(145, 75, 0);
rect(x+2,y+2,16,2);
rect(x+2,y+16,16,2);
fill(189, 189, 189);
rect(x+4,y+4,2,6);
rect(x+8,y+4,2,6);
rect(x+6,y+8,2,6);
fill(145, 145, 145);
rect(x+14,y+4,2,9);
noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    craft[e][i]=0;
    BlockSelectedI = 5;
}
break;
default:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);


        }


        
    }}
{
fill(143, 143, 143);
rect(238,94,50,60);
rect(278,124,50,60);
fill(173, 173, 173);
rect(35*7,28+80,23,10);
triangle(91+35*5,20+80,103+35*5,33+80,91+35*5,46+80);
noStroke();
}
    for(var i = 0; i < invin.length+6;i++){
    for(var e = 0; e < invin.length;e++){
        var x = i*25+180/2;
        var y = e*25+230;
        switch(invin[e][i]){
case 0:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);

if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&BlockSelectedI > 0&&mouseButton===LEFT){
    invin[e][i]=BlockSelectedI;
    BlockSelectedI = -1;
}
    break;
case 1:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(153, 79, 0);
rect(x+2,y+2,16,16);
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseIsPressed&&mouseButton===RIGHT&&   BlockSelectedI === -1){
    invin[e][i]=0;
    BlockSelectedI = 1;

}
break;
case 2:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(153, 79, 0);
rect(x+2,y+2,16,16);
fill(0, 153, 0);
rect(x+2,y+2,16,6);
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    invin[e][i]=0;
    BlockSelectedI = 2;

}
break;
case 3:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
strokeWeight(3);
stroke(153, 79, 0);
line(x+3,y+16,x+16,y+3);
noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    invin[e][i]=0;
    BlockSelectedI = 3;
}
break;
case 4:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(217, 146, 65);
rect(x+2,y+2,16,16);
fill(145, 75, 0);
rect(x+2,y+4,16,2);
rect(x+2,y+8,16,2);
rect(x+2,y+12,16,2);
rect(x+2,y+16,16,2);

noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    invin[e][i]=0;
    BlockSelectedI = 4;
}
break;
case 5:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);

}
rect(x,y,20,20);
fill(217, 146, 65);
rect(x+2,y+2,16,16);
fill(145, 75, 0);
rect(x+2,y+2,16,2);
rect(x+2,y+16,16,2);
fill(189, 189, 189);
rect(x+4,y+4,2,6);
rect(x+8,y+4,2,6);
rect(x+6,y+8,2,6);
fill(145, 145, 145);
rect(x+14,y+4,2,9);
noStroke();
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20&&mouseButton===RIGHT&&mouseIsPressed&&BlockSelectedI === -1){
    invin[e][i]=0;
    BlockSelectedI = 5;
}
break;

default:
if(mouseX>x&&mouseX<x+20&&mouseY>y&&mouseY<y+20){
    fill(209, 209, 209);
}else{
    fill(115, 115, 115);
}
rect(x,y,20,20);
        }
    }}
if(BlockSelectedI === 1){
fill(153, 79, 0);
rect(mouseX-6,mouseY-6,16,16);
    }
if(BlockSelectedI === 2){
fill(153, 79, 0);
rect(mouseX-6,mouseY-6,16,16);
fill(0, 153, 0);
rect(mouseX-6,mouseY-6,16,6); 
    }
if(BlockSelectedI === 3){
strokeWeight(3);
stroke(153, 79, 0);
line(mouseX+3-8,mouseY+16-8,mouseX+16-8,mouseY+3-8);
noStroke();
}
if(BlockSelectedI === 4){
fill(217, 146, 65);
rect(mouseX+2-8,mouseY+2-8,16,16);
fill(145, 75, 0);
rect(mouseX+2-8,mouseY-4,16,2);
rect(mouseX+2-8,mouseY,16,2);
rect(mouseX+2-8,mouseY+4,16,2);
rect(mouseX+2-8,mouseY+8,16,2);
}
if(BlockSelectedI === 5){
fill(217, 146, 65);
rect(mouseX+2-8,mouseY+2-8,16,16);
fill(145, 75, 0);
rect(mouseX+2-8,mouseY+2-8,16,2);
rect(mouseX+2-8,mouseY+16-8,16,2);
fill(189, 189, 189);
rect(mouseX+4-8,mouseY+4-8,2,6);
rect(mouseX+8-8,mouseY+4-8,2,6);
rect(mouseX+6-8,mouseY+8-8,2,6);
fill(145, 145, 145);
rect(mouseX+14-8,mouseY+4-8,2,9);
    }
};

var armmor = function(x,y,t,s){
pushMatrix();
scale(s);
noStroke();
if(t==="full"){
fill(0,0,0);
rect(x+1,y,2,1);
rect(x+6,y,2,1);
rect(x,y+1,1,3);
rect(x+8,y+1,1,3);
rect(x+1,y+4,1,4);
rect(x+7,y+4,1,4);
rect(x+2,y+8,5,1);
rect(x+3,y+1,1,1);
rect(x+5,y+1,1,1);
rect(x+4,y+2,1,1);
fill(176, 176, 176);
rect(x+1,y+1,2,1);
rect(x+6,y+1,2,1);
rect(x+1,y+2,3,1);
rect(x+5,y+2,3,1);
rect(x+1,y+3,7,1);
rect(x+2,y+4,5,4);
fill(255, 255, 255);
rect(x+1,y+1,1,1);
rect(x+6,y+1,1,1);
fill(117, 117, 117);
rect(x+2,y+7,5,1);
}
if(t === "half"){
fill(0,0,0);
rect(x+1,y,2,1);
rect(x+6,y,2,1);
rect(x,y+1,1,3);
rect(x+8,y+1,1,3);
rect(x+1,y+4,1,4);
rect(x+7,y+4,1,4);
rect(x+2,y+8,5,1);
rect(x+3,y+1,1,1);
rect(x+5,y+1,1,1);
rect(x+4,y+2,1,1);
fill(176, 176, 176);
rect(x+1,y+1,2,1);
rect(x+6,y+1,2,1);
rect(x+1,y+2,3,1);
rect(x+5,y+2,3,1);
rect(x+1,y+3,7,1);
rect(x+2,y+4,5,4);
fill(255, 255, 255);
rect(x+1,y+1,1,1);
rect(x+6,y+1,1,1);
fill(117, 117, 117);
rect(x+2,y+7,5,1);
fill(91,91,91);
rect(x+5,y+2,3,2);
rect(x+6,y+1,2,1);
rect(x+5,y+4,2,4);
fill(0, 0, 0);
rect(x+4,y+3,1,5);

}
if(t === "empty"){
fill(0,0,0);
rect(x+1,y,2,1);
rect(x+6,y,2,1);
rect(x,y+1,1,3);
rect(x+8,y+1,1,3);
rect(x+1,y+4,1,4);
rect(x+7,y+4,1,4);
rect(x+2,y+8,5,1);
rect(x+3,y+1,1,1);
rect(x+5,y+1,1,1);
rect(x+4,y+2,1,1);
fill(91, 91, 91);
rect(x+1,y+1,2,1);
rect(x+6,y+1,2,1);
rect(x+1,y+2,3,1);
rect(x+5,y+2,3,1);
rect(x+1,y+3,7,1);
rect(x+2,y+4,5,4);
rect(x+1,y+1,1,1);
rect(x+6,y+1,1,1);
rect(x+2,y+7,5,1);

}
popMatrix();
};
var food = function(x,y,t,s){
pushMatrix();
scale(s);
noStroke();
if(t==="full"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+1,y+1,1,1);
rect(x,y+2,1,2);
rect(x+1,y+4,1,1);
rect(x+2,y+5,1,1);
rect(x+3,y+6,3,1);
rect(x+4,y+1,1,1);
rect(x+5,y+2,1,1);
rect(x+6,y+3,1,3);
rect(x+7,y+6,2,1);
rect(x+6,y+7,1,2);
rect(x+7,y+8,1,1);
rect(x+8,y+7,1,1);
fill(150, 0, 0);
rect(x+2,y+1,2,1);
rect(x+3,y+2,1,1);
rect(x+1,y+2,1,2);
rect(x+2,y+3,1,2);
fill(122, 89, 54);
rect(x+3,y+3,3,2);
rect(x+4,y+2,1,4);
rect(x+3,y+5,3,1);
fill(255, 255, 255);
rect(x+2,y+2,1,1);
rect(x+6,y+6,1,1);
rect(x+7,y+7,1,1);
}
if(t === "half"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+1,y+1,1,1);
rect(x,y+2,1,2);
rect(x+1,y+4,1,1);
rect(x+2,y+5,1,1);
rect(x+3,y+6,3,1);
rect(x+4,y+1,1,1);
rect(x+5,y+2,1,1);
rect(x+6,y+3,1,3);
rect(x+7,y+6,2,1);
rect(x+6,y+7,1,2);
rect(x+7,y+8,1,1);
rect(x+8,y+7,1,1);
fill(150, 0, 0);
rect(x+2,y+1,2,1);
rect(x+3,y+2,1,1);
rect(x+1,y+2,1,2);
rect(x+2,y+3,1,2);
fill(122, 89, 54);
rect(x+3,y+3,3,2);
rect(x+4,y+2,1,4);
rect(x+3,y+5,3,1);
fill(255, 255, 255);
rect(x+2,y+2,1,1);
rect(x+6,y+6,1,1);
rect(x+7,y+7,1,1);
fill(91,91,91);
rect(x+2,y+1,2,1);
rect(x+3,y+2,2,1);
rect(x+4,y+3,2,1);
rect(x+5,y+4,1,2);
rect(x+4,y+4,2,1);
rect(x+3,y+3,2,1);
rect(x+4,y+3,2,1);
}
if(t === "empty"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+1,y+1,1,1);
rect(x,y+2,1,2);
rect(x+1,y+4,1,1);
rect(x+2,y+5,1,1);
rect(x+3,y+6,3,1);
rect(x+4,y+1,1,1);
rect(x+5,y+2,1,1);
rect(x+6,y+3,1,3);
rect(x+7,y+6,2,1);
rect(x+6,y+7,1,2);
rect(x+7,y+8,1,1);
rect(x+8,y+7,1,1);
fill(91, 91, 91);
rect(x+2,y+1,2,1);
rect(x+3,y+2,1,1);
rect(x+1,y+2,1,2);
rect(x+2,y+3,1,2);
rect(x+3,y+3,3,2);
rect(x+4,y+2,1,4);
rect(x+3,y+5,3,1);
rect(x+2,y+2,1,1);
rect(x+6,y+6,1,1);
rect(x+7,y+7,1,1);
}
popMatrix();
};
var heart = function(x,y,t,s){
pushMatrix();
scale(s,1.3);
noStroke();
if(t==="full"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+5,y,2,1);
rect(x+4,y+1,1,1);
rect(x+1,y+1,1,1);
rect(x+7,y+1,1,1);
rect(x,y+2,1,4);
rect(x+8,y+2,1,4);
rect(x+1,y+6,1,1);
rect(x+7,y+6,1,1);
rect(x+2,y+7,1,1);
rect(x+6,y+7,1,1);
rect(x+3,y+8,1,1);
rect(x+5,y+8,1,1);
rect(x+4,y+9,1,1);

fill(255, 0, 0);
rect(x+2,y+1,2,1);
rect(x+5,y+1,2,1);
rect(x+4,y+2,1,1);
rect(x+1,y+2,1,1);
rect(x+1,y+2,7,4);
rect(x+2,y+6,5,1);
rect(x+3,y+7,3,1);
fill(148, 0, 0);
rect(x+2,y+6,1,1);
rect(x+3,y+7,1,1);
rect(x+4,y+8,1,1);
rect(x+6,y+6,1,1);
rect(x+5,y+7,1,1);
rect(x+1,y+5,1,1);
rect(x+7,y+5,1,1);
fill(255, 255, 255);
rect(x+2,y+2,1,1);
}
if(t === "half"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+5,y,2,1);
rect(x+4,y+1,1,1);
rect(x+1,y+1,1,1);
rect(x+7,y+1,1,1);
rect(x,y+2,1,4);
rect(x+8,y+2,1,4);
rect(x+1,y+6,1,1);
rect(x+7,y+6,1,1);
rect(x+2,y+7,1,1);
rect(x+6,y+7,1,1);
rect(x+3,y+8,1,1);
rect(x+5,y+8,1,1);
rect(x+4,y+9,1,1);

fill(255, 0, 0);
rect(x+2,y+1,2,1);
rect(x+5,y+1,2,1);
rect(x+4,y+2,1,1);
rect(x+1,y+2,1,1);
rect(x+1,y+2,7,4);
rect(x+2,y+6,5,1);
rect(x+3,y+7,3,1);
fill(148, 0, 0);
rect(x+2,y+6,1,1);
rect(x+3,y+7,1,1);
rect(x+4,y+8,1,1);
rect(x+6,y+6,1,1);
rect(x+5,y+7,1,1);
rect(x+1,y+5,1,1);
rect(x+7,y+5,1,1);
fill(255, 255, 255);
rect(x+2,y+2,1,1);
fill(91,91,91);
rect(x+5,y+2,3,4);
rect(x+5,y+1,2,1);
rect(x+5,y+6,2,1);
rect(x+5,y+7,1,1);
}
if(t === "empty"){
fill(0,0,0);
rect(x+2,y,2,1);
rect(x+5,y,2,1);
rect(x+4,y+1,1,1);
rect(x+1,y+1,1,1);
rect(x+7,y+1,1,1);
rect(x,y+2,1,4);
rect(x+8,y+2,1,4);
rect(x+1,y+6,1,1);
rect(x+7,y+6,1,1);
rect(x+2,y+7,1,1);
rect(x+6,y+7,1,1);
rect(x+3,y+8,1,1);
rect(x+5,y+8,1,1);
rect(x+4,y+9,1,1);
fill(91, 91, 91);
rect(x+2,y+1,2,1);
rect(x+5,y+1,2,1);
rect(x+4,y+2,1,1);
rect(x+1,y+2,1,1);
rect(x+1,y+2,7,4);
rect(x+2,y+6,5,1);
rect(x+3,y+7,3,1);
rect(x+2,y+6,1,1);
rect(x+3,y+7,1,1);
rect(x+4,y+8,1,1);
rect(x+6,y+6,1,1);
rect(x+5,y+7,1,1);
rect(x+1,y+5,1,1);
rect(x+7,y+5,1,1);
}
popMatrix();
};
var hunger = function(){
if(input[17]&&hungerX<7*8){
    hungertic -= 0.017*9;
}
  if(hungerX<80){
  hungertic -= 0.017;
}
  if(floor(hungertic)<0&&halfH===false&&hungerX<80){
      hungertic = 60;
      hungerb[0].pop([1]);
      hungerX+=8;
      halfH=true;
  }
  if(halfH===true&&hungerX<80){
      food(hungerX+8+211-25-8,8+287-73,"half",1.5);
  }
  if(floor(hungertic)<0&&halfH===true&&hungerX<80){
      hungertic = 60;
      halfH=false;
  }
};
var health = function(){
  if(healthX>-80&&hungerX>=80){
  healthtic -= 1;
}
  if(floor(healthtic)<0&&halfHth===false&&healthX>-88+8){
      healthtic = 60;
      hearts[0].pop([1]);
      healthX-=8;
      halfHth=true;
  }
  if(halfHth===true&&healthX>-88+8){
      heart(healthX+120-25+80,330-73,"half",1.5);
  }
  if(floor(healthtic)<0&&halfHth===true&&healthX>-80){
      healthtic = 60;
      halfHth=false;
  }
};
var hotBarI;
var hotBarF = function() {
    var p = createGraphics(500, 400, JAVA2D);

        //draw the blocks
        p.background(255, 255, 255,0);
        p.stroke(120, 120, 120);
    p.strokeWeight(4);
    for(var x = 0; x < hotBar[0].length; x++){
        for(var y = 0; y < hotBar.length; y++){
            var bx = x*30+200-76+20;
            var by = y*30+359;
                    p.fill(196, 196, 196,200);
                    p.rect(bx, by, 30, 30);
            
            
            switch(hotBar[y][x]){
                case 0:
                    p.fill(0,0,0,0);//the color of the sky
                  p.rect(bx, by, 30, 30);
                    break;
                case 1:
                    p.fill(9, 133, 5);
                    p.rect(bx, by, 30, 30);
                    break;
                case 2:
                    p.fill(20, 201, 201);//the color of the sky
                    p.rect(bx, by, 30, 30);
                    break;
                case 3:
                    p.fill(207, 45, 207);
                    p.rect(bx, by, 30, 30);
                    break;
                    case 4:
                    p.fill(222, 98, 222);
                    p.rect(bx, by, 30, 30);
                    break;
                case 5:
                    p.fill(6, 102, 102);//the color of the sky
                    p.rect(bx, by, 30, 30);
                    break;
                case 6:
                    p.fill(135, 0, 135);
                    p.rect(bx, by, 30, 30);
                    break;
                    case 7:
                    p.fill(255, 0, 255);
                    p.rect(bx, by, 30, 30);
                    break;
                case 8:
                    p.fill(181, 232, 232);//the color of the sky
                    p.rect(bx, by, 30, 30);
                    break;
                case 9:
                    p.fill(143, 21, 143);
                    p.rect(bx, by, 30, 30);
                    break;
            }
        }
    }

for(var count = 0;count < 9;count+=1){
if(hotBarN>0){
p.fill(0, 0, 0);
p.text(hotBarN[count].length,count*30+138+20,386);
}
}

return(p.get());
};
hotBarI = hotBarF();
var drawHotBar = function(){
    pushMatrix();
    translate(-80,0);
strokeWeight(1);

if(armmorTF===true){
for(var fx =0;fx < 80;fx+=8){
    armmor(128-25-8+fx,8+277-73,"empty",1.5);
}
}
    for(var x3 = 0; x3 < armmorB[0].length; x3++){
        for(var y3 = 0; y3 < armmorB.length; y3++){
            var bx = x3*8+120-25;
            var by = y3*8+285-73;
            switch(armmorB[y3][x3]){
                case 0:
                     armmor(bx,by,"empty",1.5);   
                    break;
                case 1:
                      armmor(bx,by,"half",1.5);   
                    break;
                case 2:
                      armmor(bx,by,"full",1.5);   
                    break;
            }
        }
    }

for(var fx =0;fx < 80;fx+=8){
    heart(128-25-8+fx,8+322-73,"empty",1.5);
}
    for(var x3 = 0; x3 < hearts[0].length; x3++){
        for(var y3 = 0; y3 < hearts.length; y3++){
            var bx = x3*8+120-25;
            var by = y3*8+330-73;
            switch(hearts[y3][x3]){
                case 0:
                     heart(bx,by,"empty",1.5);   
                    break;
                case 1:
                      heart(bx,by,"half",1.5);   
                    break;
                case 2:
                      heart(bx,by,"full",1.5);   
                    break;
            }
        }
    }
        for(var fx =0;fx < 80;fx+=8){
    food(227-25-8+fx,8+287-73,"empty",1.5);
}

        for(var x3 = 0; x3 < hungerb[0].length; x3++){
        for(var y3 = 0; y3 < hungerb.length; y3++){
            var bx = x3*8+219-25+hungerX;
            var by = y3*8+295-73;
            switch(hungerb[y3][x3]){
                case 0:
                     food(bx,by,"empty",1.5);   
                    break;
                case 1:
                      food(bx,by,"half",1.5);   
                    break;
                case 2:
                      food(bx,by,"full",1.5);   
                    break;
            }
        }
    }

hunger();
health();
    popMatrix();

if(healthX<=-80){
background(204, 0, 0,150);

}
    pushMatrix();
translate(180,200);
image(hotBarI,0,0,500,400);
popMatrix();
pushMatrix();
translate(-100+30,0);

for(var e = 0; e < 9; e +=1){
if(hotBS===e){
    noFill();
    stroke(158, 158, 158);
    strokeWeight(6);
    rect(144+e*30, 359, 30, 30);
    strokeWeight(4);
    noStroke();
}
if(input[49+e]){
    hotBS = e;
}
}
popMatrix();

};
var inventory = function() {
    if (players > 1) {
        pushMatrix();
        scale(0.5);
    }
    rectMode(CENTER);
    strokeWeight(1);
    fill(200, 200, 200);
    for (var i = 0; i < 5; i++) {
        rect(width / 2 - 135 + i * 30, height / 2 - 162 + 50, 30, 36, 7);
        if (mouseIsPressed && mouseX < width / 2 - 135 + i * 30 + 15 && mouseX > width / 2 - 135 + i * 30 - 15 && mouseY < height / 2 - 162 + 15 + 50 && mouseY > height / 2 - 162 - 15 + 50) {
            tab = i;
        }
    }
    rect(width / 2, height / 2 + 25, 300, 250, 7);
    fill(156, 42, 0);
    rect(width / 2 - 135 + 0 * 30, height / 2 - 164 + 50, 20, 20);
    for (var i = 0; i < 3; i++) {
        line(width / 2 - 135 + 0 * 30 - 10, height / 2 - 164 + 20 / 3 * i - 7 + 50, width / 2 - 135 + 0 * 30 + 10, height / 2 - 164 + 20 / 3 * i - 7 + 50);
        line(width / 2 - 135 + 0 * 30 - 10 + 20 / 3 * i, height / 2 - 164 + 50, width / 2 - 135 + 0 * 30 - 10 + 20 / 3 * i, height / 2 - 158 + 50);
        line(width / 2 - 135 + 0 * 30 - 10 + 20 / 3 * i, height / 2 - 174 + 50, width / 2 - 135 + 0 * 30 - 10 + 20 / 3 * i, height / 2 - 172 + 50);

    }
    fill(230, 230, 230);
    for (var j = 0; j < 9; j++) {
        for (var k = 0; k < 5; k++) {
            rect(width / 2 - (26 * 5) + j * 32, height / 2 - 100 + k * 32 + 50, 28, 28, 3);
        }
    }
    fill(99, 99, 99);
    textSize(20);
    textAlign(CENTER, CENTER);
    switch (tab) {
        case 0:
            text("Building Blocks", width / 2 - 75, height / 2 - 133 + 50);
            fill(139, 69, 19);
            rect(width / 2 - (26 * 5) + 0 * 32, height / 2 - 100 + 0 * 32 + 50, 24, 24);
            fill(61, 144, 64);
            rect(width / 2 - (26 * 5) + 0 * 32, height / 2 - 100 + 0 * 32 - 10 + 50, 24, 4);

            fill(139, 69, 0);
            rect(width / 2 - (26 * 5) + 1 * 32, height / 2 - 100 + 0 * 32 + 50, 24, 24);
            line(width / 2 - (26 * 5) + 1 * 32, height / 2 - 100 + 0 * 32 + 47, width / 2 - (26 * 5) + 1 * 32, height / 2 - 100 + 0 * 32 + 55);
            line(width / 2 - (26 * 5) + 1 * 32 - 10, height / 2 - 100 + 0 * 32 + 42, width / 2 - (26 * 5) + 1 * 32 - 10, height / 2 - 100 + 0 * 32 + 55);
            line(width / 2 - (26 * 5) + 1 * 32 + 5, height / 2 - 100 + 0 * 32 + 53, width / 2 - (26 * 5) + 1 * 32 + 5, height / 2 - 100 + 0 * 32 + 58);
            line(width / 2 - (26 * 5) + 1 * 32 + 8, height / 2 - 100 + 0 * 32 + 40, width / 2 - (26 * 5) + 1 * 32 + 8, height / 2 - 100 + 0 * 32 + 55);
            line(width / 2 - (26 * 5) + 1 * 32 - 6, height / 2 - 100 + 0 * 32 + 50 + 7, width / 2 - (26 * 5) + 1 * 32 - 6, height / 2 - 100 + 0 * 32 + 45);
            line(width / 2 - (26 * 5) + 1 * 32 - 2, height / 2 - 100 + 0 * 32 + 40, width / 2 - (26 * 5) + 1 * 32 - 2, height / 2 - 100 + 0 * 32 + 45);

            fill(222, 184, 135);
            rect(width / 2 - (26 * 5) + 2 * 32, height / 2 - 100 + 0 * 32 + 50, 24, 24);
            line(width / 2 - (26 * 5) + 2 * 32 - 12, height / 2 - 100 + 0 * 32 + 50 - 8, width / 2 - (26 * 5) + 2 * 32 + 12, height / 2 - 100 + 0 * 32 + 50 - 8);
            line(width / 2 - (26 * 5) + 2 * 32 - 12, height / 2 - 100 + 0 * 32 + 50 - 4, width / 2 - (26 * 5) + 2 * 32 + 12, height / 2 - 100 + 0 * 32 + 50 - 4);
            line(width / 2 - (26 * 5) + 2 * 32 - 12, height / 2 - 100 + 0 * 32 + 50, width / 2 - (26 * 5) + 2 * 32 + 12, height / 2 - 100 + 0 * 32 + 50);
            line(width / 2 - (26 * 5) + 2 * 32 - 12, height / 2 - 100 + 0 * 32 + 50 + 4, width / 2 - (26 * 5) + 2 * 32 + 12, height / 2 - 100 + 0 * 32 + 50 + 4);
            line(width / 2 - (26 * 5) + 2 * 32 - 12, height / 2 - 100 + 0 * 32 + 50 + 8, width / 2 - (26 * 5) + 2 * 32 + 12, height / 2 - 100 + 0 * 32 + 50 + 8);

            fill(255, 255, 255);
            rect(width / 2 - (26 * 5) + 3 * 32, height / 2 - 100 + 0 * 32 + 50, 24, 24);
            line(width / 2 - (26 * 5) + 3 * 32 - 6, height / 2 - 100 + 0 * 32 + 50 - 4, width / 2 - (26 * 5) + 3 * 32 + 6, height / 2 - 100 + 0 * 32 + 50 + 6);
            line(width / 2 - (26 * 5) + 3 * 32 + 3, height / 2 - 100 + 0 * 32 + 50 - 4, width / 2 - (26 * 5) + 3 * 32 + 10, height / 2 - 100 + 0 * 32 + 50 + 2);
            line(width / 2 - (26 * 5) + 3 * 32 - 6, height / 2 - 100 + 0 * 32 + 50 + 4, width / 2 - (26 * 5) + 3 * 32 + 2, height / 2 - 100 + 0 * 32 + 50 + 10);

            break;
        case 1:
            text("Coming soon!", width / 2 - 80, height / 2 - 133 + 50);
            break;
        case 2:
            text("Coming soon!", width / 2 - 80, height / 2 - 133 + 50);
            break;
        case 3:
            text("Coming soon!", width / 2 - 80, height / 2 - 133 + 50);
            break;
        case 4:
            text("Coming soon!", width / 2 - 80, height / 2 - 133 + 50);
            break;
    }
    if (players > 1) {
        popMatrix();
    }
    rectMode(CORNER);
    textAlign(CORNER, CORNER);
};
var hitBox = createGraphics(width, height, P3D);
var colColors = [];
var colPos = [];
var hitBoxCols = 0;
var hitBoxDist = 250;
var hitBoxColor = color(255, 255, 255);
var p3D = createGraphics(width, height, P3D);
var cube = ({
    x: 200,
    y: 640,
    z: -130,
    rotation: {
        x: 0,
        y: 0,
        z: 0
    }
});
var pCube = {
    x: cube.x,
    y: cube.y,
    z: cube.z
};
var p3d = createGraphics(width, height, P3D);
var cuby = ({
    x: cloudx,
    y: 150,
    z: 20,
    rotation: {
        x: 0,
        y: 0,
        z: 0
    }
});
if (texturePack === 1) {
    var charSize = {
        w: 20,
        topH: 15,
        bottomH: 75
    };
}
if (texturePack === 2) {
    var charSize = {
        w: 30,
        topH: 30,
        bottomH: 210
    };
}
var iw = 0;
var ih = 0;
var id = 0;
var oreType = 0;
var directionOfCube;

var oreColors = [color(90, 165, 245), color(41, 41, 41)];

var textures = {
    stoneColor: [color(156, 156, 156), color(128, 128, 128)],
    stone: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    grassColor: [color(87, 55, 0), color(107, 86, 0), color(117, 117, 117), color(10, 122, 0), color(12, 143, 0)],
    grassSide: [4, 3, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 4, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 3, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 3, 4, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 3, 4, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 0, 4, 4, 4, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 3, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 2, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 2, 0, 1, 0, 0, 0, 3, 4, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 3, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 3, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    grassTop: [4, 4, 4, 3, 3, 3, 3, 4, 4, 3, 4, 4, 4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 4, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 3, 4, 4, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 4, 3, 3, 4, 3, 4, 3, 4, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 4, 4, 3, 3, 4, 3, 3, 3, 4, 4, 4, 3, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
    dirt: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    plankColor: [color(179, 153, 74), color(168, 127, 55), color(128, 116, 70)],
    plank: [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 2, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 2, 1, 0, 0, 1, 0, 1, 1, 2, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 2, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 2, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 2, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 2, 1, 0, 0, 1, 1, 0, 1, 2, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 2, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 2, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    woodColor: [color(179, 153, 74), color(168, 127, 55), color(69, 54, 0), color(43, 32, 0)],
    woodTop: [3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 3, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 3, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 3, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 2, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 3, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 2, 3],
    woodSide: [2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2],
    leafColor: [color(19, 237, 26, 0), color(15, 138, 8), color(42, 171, 17)],
    leaves: [1, 0, 2, 0, 1, 1, 1, 2, 1, 1, 0, 2, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 2, 0, 2, 1, 2, 2, 2, 0, 0, 2, 1, 1, 2, 2, 1, 2, 0, 2, 1, 0, 0, 1, 2, 0, 2, 1, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 2, 0, 2, 2, 1, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 0, 1, 0, 0, 0, 2, 2, 1, 0, 0, 2, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 1, 2, 1, 1, 0, 2, 0, 0, 1, 2, 0, 2, 0, 1, 0, 1, 1, 0, 0, 2, 1, 0, 1, 1, 2, 0, 2, 0, 0, 2, 1, 1, 0, 0, 1, 2, 2, 1, 1, 0, 1, 0, 1, 1, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 2, 2, 1, 2, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 2, 0, 2, 0, 2, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 0, 2, 0, 0, 1, 2, 1, 2, 0, 1],
    snowColor: [color(87, 55, 0), color(107, 86, 0), color(117, 117, 117), color(214, 214, 214), color(240, 240, 240)],
    GlassColors: [color(255, 255, 255, 0), color(255, 255, 255, 100), color(193, 232, 245, 100)],
    Glass: [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 01, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
    oreColor: [color(156, 156, 156), color(128, 128, 128), oreColors[oreType]],
    ore: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 2, 1, 0, 1, 0, 0, 1, 2, 0, 0, 1, 0, 2, 0, 1, 0, 2, 1, 0, 0, 2, 1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 2, 2, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 2, 1, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 2, 0, 0, 2, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 2, 2, 1, 0, 2, 2, 0, 1, 0, 0, 0, 1, 0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 1, 0, 2, 2, 1, 0, 0, 1, 0, 2, 1, 0, 0, 0, 1, 0, 1, 0, 2, 2, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 1, 0, 0, 2, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
};

var diamondOreTexture;
var diamondOreT = function() {
    var diamondOre = createGraphics(160, 160, JAVA2D);
    if (!diamondOre) {
        return;
    }
    oreType = 0;
    diamondOre.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            if (textures.ore[(i * 16) + d] === 2) {
                diamondOre.fill(oreColors[oreType]);
            } else {
                diamondOre.fill(textures.oreColor[textures.ore[(i * 16) + d]]);
            }
            diamondOre.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (diamondOre.get());
};
diamondOreTexture = diamondOreT();

var coalOreTexture;
var coalOreT = function() {
    var coalOre = createGraphics(160, 160, JAVA2D);
    if (!coalOre) {
        return;
    }
    oreType = 1;
    coalOre.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            if (textures.ore[(i * 16) + d] === 2) {
                coalOre.fill(oreColors[oreType]);
            } else {
                coalOre.fill(textures.oreColor[textures.ore[(i * 16) + d]]);
            }
            coalOre.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (coalOre.get());
};
coalOreTexture = coalOreT();

var glassTexture;
var glassT = function() {
    var glass = createGraphics(160, 160, JAVA2D);
    if (!glass) {
        return;
    }
    glass.background(0, 0, 0, 0);
    glass.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            glass.fill(textures.GlassColors[textures.Glass[(i * 16) + d]]);
            glass.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (glass.get());
};
glassTexture = glassT();

var stoneTexture;
var stoneT = function() {
    var stone = createGraphics(160, 160, JAVA2D);
    if (!stone) {
        return;
    }
    stone.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            stone.fill(textures.stoneColor[textures.stone[(i * 16) + d]]);
            stone.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (stone.get());
};
stoneTexture = stoneT();

var grassSideTexture;
var grassSideT = function() {
    var grassSide = createGraphics(160, 160, JAVA2D);
    if (!grassSide) {
        return;
    }
    grassSide.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            grassSide.fill(textures.grassColor[textures.grassSide[(i * 16) + d]]);
            grassSide.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (grassSide.get());
};
grassSideTexture = grassSideT();

var grassTopTexture;
var grassTopT = function() {
    var grassTop = createGraphics(160, 160, JAVA2D);
    if (!grassTop) {
        return;
    }
    grassTop.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            grassTop.fill(textures.grassColor[textures.grassTop[(i * 16) + d]]);
            grassTop.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (grassTop.get());
};
grassTopTexture = grassTopT();

var dirtTexture;
var dirtT = function() {
    var dirt = createGraphics(160, 160, JAVA2D);
    if (!dirt) {
        return;
    }
    dirt.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            dirt.fill(textures.grassColor[textures.dirt[(i * 16) + d]]);
            dirt.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (dirt.get());
};
dirtTexture = dirtT();

var plankTexture;
var plankT = function() {
    var plank = createGraphics(160, 160, JAVA2D);
    if (!plank) {
        return;
    }
    plank.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            plank.fill(textures.plankColor[textures.plank[(i * 16) + d]]);
            plank.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (plank.get());
};
plankTexture = plankT();

var woodTopTexture;
var woodTopT = function() {
    var woodTop = createGraphics(160, 160, JAVA2D);
    if (!woodTop) {
        return;
    }
    woodTop.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            woodTop.fill(textures.woodColor[textures.woodTop[(i * 16) + d]]);
            woodTop.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (woodTop.get());
};
woodTopTexture = woodTopT();

var woodSideTexture;
var woodSideT = function() {
    var woodSide = createGraphics(160, 160, JAVA2D);
    if (!woodSide) {
        return;
    }
    woodSide.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            woodSide.fill(textures.woodColor[textures.woodSide[(i * 16) + d]]);
            woodSide.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (woodSide.get());
};

woodSideTexture = woodSideT();

var leavesTexture;
var leavesT = function() {
    var leaves = createGraphics(160, 160, JAVA2D);
    if (!leaves) {
        return;
    }
    leaves.background(255, 0, 0, 0);
    leaves.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            leaves.fill(textures.leafColor[textures.leaves[(i * 16) + d]]);
            leaves.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (leaves.get());
};
leavesTexture = leavesT();

var snowGrassSideTexture;
var snowGrassSideT = function() {
    var snowGrassSide = createGraphics(160, 160, JAVA2D);
    if (!snowGrassSide) {
        return;
    }
    snowGrassSide.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            snowGrassSide.fill(textures.snowColor[textures.grassSide[(i * 16) + d]]);
            snowGrassSide.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (snowGrassSide.get());
};
snowGrassSideTexture = snowGrassSideT();

var Red = 0;
var Blue = 0;
var Green = 0;

var snowTexture;
var snowT = function() {
    var snow = createGraphics(160, 160, JAVA2D);
    if (!snow) {
        return;
    }
    snow.noStroke();
    //stone.fill(128, 127, 125);
    //stone.rect(0,0,300,300);
    for (var i = 0; i < 16; i += 1) {
        for (var d = 0; d < 16; d += 1) {
            snow.fill(textures.snowColor[textures.grassTop[(i * 16) + d]]);
            snow.rect(i * 10, d * 10, 10, 10);
        }
    }
    return (snow.get());
};
snowTexture = snowT();
var texturedCube = function(Size, image1, image2, image3, image4, image5, image6) {
    p3D.pushMatrix();
    p3D.translate(-Size / 2, -Size / 2, Size / 2);
    p3D.image(image1, 0, 0, Size, Size);
    p3D.rotateY(1.5708);
    p3D.image(image2, 0, 0, Size, Size);
    p3D.translate(0, 0, Size);
    p3D.image(image4, 0, 0, Size, Size);
    p3D.rotateY(1.5708);
    p3D.translate(0, 0, Size);
    p3D.image(image3, 0, 0, Size, Size);
    p3D.translate(0, 0, -Size);
    p3D.rotateX(1.5708);
    p3D.image(image5, 0, 0, Size, Size);
    p3D.translate(0, 0, -Size);
    p3D.image(image6, 0, 0, Size, Size);
    p3D.popMatrix();
};
var CollisionBox = function(x, y, z, w, h, d) {
    if (w < 0) {
        w *= -1;
    }
    if (h < 0) {
        h *= -1;
    }
    if (d < 0) {
        d *= -1;
    }
    //if(cube.x > x && cube.z > z && cube.z < z + d) {
    //cube.x = x;
    //}
    ix = x - charSize.w;
    iy = y - charSize.topH;
    iz = z - charSize.w;
    iw = w + charSize.w * 2;
    ih = h + charSize.bottomH + charSize.topH;
    id = d + charSize.w * 2;
    if (cube.x > ix && cube.x < ix + iw && cube.z > iz && cube.z < iz + id && cube.y > iy && cube.y < iy + ih) {
        if (pCube.y > iy) {
            cube.y = iy + ih + 0.4;
        }
        if (pCube.y < iy + ih) {
            cube.y = pCube.y;
        }
        if (pCube.x < ix) {
            cube.x = pCube.x;
        }
        if (pCube.x > ix + iw) {
            cube.x = pCube.x;
        }
        if (pCube.z < iz) {
            cube.z = pCube.z;
        }
        if (pCube.z > iz + id) {
            cube.z = pCube.z;
        }
        if (cube.y - 2 < iy + ih) {
            onBlock = true;
            fallSpeed = 0;
            if (texturePack === 1) {
                jumpSpeed = 4.6;
                fall = false;
                cube.y = pCube.y + 1;
                cube.y += fallSpeed;
            }
            if (texturePack === 2) {
                onBlock = true;
                fallSpeed = 0;
                jumpSpeed = 9.2;
                fall = false;
                cube.y = iy + ih;
                cube.y += fallSpeed;
            }
        }
    }
};
var determineDirection = function(x1, y1, z1) {
    hitBox.translate(-x1, -y1, -z1);
    hitBox.fill(front);
    hitBox.translate(0, 0, -25);
    hitBox.box(50, 50, 1);
    hitBox.fill(back);
    hitBox.translate(0, 0, 50);
    hitBox.box(50, 50, 1);
    hitBox.fill(right);
    hitBox.translate(-25, 0, -25);
    hitBox.box(1, 50, 50);
    hitBox.fill(left);
    hitBox.translate(50, 0, 0);
    hitBox.box(1, 50, 50);
    hitBox.translate(-25, 25, 0);
    hitBox.fill(up);
    hitBox.box(50, 1, 50);
    hitBox.fill(down);
    hitBox.translate(0, -50, 0);
    hitBox.box(50, 1, 50);
};
//
var swimBox = function(x, y, z, w, h, d) {
    if (w < 0) {
        w *= -1;
    }
    if (h < 0) {
        h *= -1;
    }
    if (d < 0) {
        d *= -1;
    }
    //if(cube.x > x && cube.z > z && cube.z < z + d) {
    //cube.x = x;
    //}
    ix = x - charSize.w;
    iy = y - charSize.topH;
    iz = z - charSize.w;
    iw = w + charSize.w * 2;
    ih = h + charSize.bottomH + charSize.topH;
    id = d + charSize.w * 2;
    if (cube.x > ix && cube.x < ix + iw && cube.z > iz && cube.z < iz + id && cube.y > iy && cube.y < iy + ih) {
        if (pCube.y > iy) {
            cube.y = iy + ih + 0.4;
        }
        if (pCube.y < iy + ih) {
            cube.y = pCube.y;
        }
        if (pCube.x < ix) {
            cube.x = pCube.x;
        }
        if (pCube.x > ix + iw) {
            cube.x = pCube.x;
        }
        if (pCube.z < iz) {
            cube.z = pCube.z;
        }
        if (pCube.z > iz + id) {
            cube.z = pCube.z;
        }
        if (cube.y - 2 < iy + ih) {
            onBlock = true;
            fallSpeed = 0;
            if (texturePack === 1) {
                jumpSpeed = 4.6;
                fall = false;
                cube.y -= 5;
            }
            if (texturePack === 2) {
                onBlock = true;
                fallSpeed = 0;
                jumpSpeed = 9.2;
                fall = false;
                cube.y = iy + ih;
                cube.y -= 10;
            }
        }
    }
};
var snowGrass = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(89, 13, 13);
    p3D.box(50, 49, 50);
    p3D.fill(255, 255, 255);
    p3D.box(49, 50, 49);
    p3D.popMatrix();
};
var snow = function(x1, y1, z1) {};
var grass = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(89, 13, 13);
    p3D.box(50, 49, 50);
    p3D.fill(0, 255, 0);
    p3D.box(49, 50, 49);
    p3D.popMatrix();
};
var sand = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(210, 235, 112);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var water = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.noFill();
    p3D.fill(0, 10, 200, 20);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var dirt = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(89, 13, 13);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var stone = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(92, 92, 92);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var glass = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.noFill();
    p3D.stroke(255, 255, 255);
    p3D.box(50, 50, 50);
    p3D.strokeWeight(1);
    p3D.stroke(0, 0, 0);
    p3D.popMatrix();
};
var wood = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(97, 38, 1);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var leaves = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(0, 245, 29, 200);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var coal = function(x1, y1, z1) {
    p3D.pushMatrix();
    p3D.translate(-x1, -y1, -z1);
    p3D.fill(20, 20, 20);
    p3D.box(50, 50, 50);
    p3D.popMatrix();
};
var factor = 160 / 50;
var block = function(type, x1, y1, z1, breakTime) {
    if (texturePack === 2) {
        x1 *= factor;
        y1 *= factor;
        z1 *= factor;
        var dx = cube.x - x1,
            dy = cube.y - y1,
            dz = cube.z - z1;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) > renderDistance) {
            return;
        }
    }
    if (texturePack === 1) {
        var dx = cube.x - x1,
            dy = cube.y - y1,
            dz = cube.z - z1;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) > renderDistance) {
            return;
        }
        if(dist(dz, dist(dx, dy, 0, 0), 0, 0) < hitBoxDist) {
            while(colColors.indexOf(color(Red, Green, Blue)) !== -1) {
            Red = random(4, 255);
            Green = random(4, 255);
            Blue = random(4, 255);
            }
            colColors[hitBoxCols] = color(Red, Green, Blue);
            colPos[hitBoxCols*3] = x1;
            colPos[hitBoxCols*3+1] = y1;
            colPos[hitBoxCols*3+2] = z1;
            hitBox.pushMatrix();
            hitBox.fill(colColors[hitBoxCols]);
            hitBox.translate(-x1, -y1, -z1);
            hitBox.box(50, 50, 50);
            hitBox.popMatrix();
            hitBoxCols ++;
        }
    }
    if (type === 1 || type === grass) {
        if (texturePack === 1) {
            grass(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, grassSideTexture, grassSideTexture, grassSideTexture, grassSideTexture, grassTopTexture, dirtTexture);
            p3D.popMatrix();
        }
    }
    if (type === 2 || type === dirt) {
        if (texturePack === 1) {
            dirt(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, dirtTexture, dirtTexture, dirtTexture, dirtTexture, dirtTexture, dirtTexture);
            p3D.popMatrix();
        }
    }
    if (type === 3 || type === stone) {
        if (texturePack === 1) {
            stone(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, stoneTexture, stoneTexture, stoneTexture, stoneTexture, stoneTexture, stoneTexture);
            p3D.popMatrix();
        }
    }
    if (type === 4 || type === wood) {
        if (texturePack === 1) {
            wood(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, woodSideTexture, woodSideTexture, woodSideTexture, woodSideTexture, woodTopTexture, woodTopTexture);
            p3D.popMatrix();
        }
    }
    if (type === 5 || type === leaves) {
        if (texturePack === 1) {
            leaves(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, leavesTexture, leavesTexture, leavesTexture, leavesTexture, leavesTexture, leavesTexture);
            p3D.popMatrix();
        }
    }
    if (type === 6 || type === snowGrass) {
        if (texturePack === 1) {
            snowGrass(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, snowGrassSideTexture, snowGrassSideTexture, snowGrassSideTexture, snowGrassSideTexture, snowTexture, dirtTexture);
            p3D.popMatrix();
        }
    }
    if (type === 7 || type === coal) {
        if (texturePack === 1) {
            coal(x1, y1, z1);
        }
        if (texturePack === 2) {
            p3D.pushMatrix();
            p3D.translate(-x1, -y1, -z1);
            texturedCube(160, coalOreTexture, coalOreTexture, coalOreTexture, coalOreTexture, coalOreTexture, coalOreTexture);
            p3D.popMatrix();
        }
    }
    if(type===8||type===water){
        if(texturePack===1){
        water(x1, y1, z1);
        swimBox(x1 - 25, y1 - 25, z1 - 25, 50, 50, 50);
        }
    }
    if(type===9||type===sand){
        if(texturePack===1){
            sand(x1, y1, z1);
        }
    }
    if (type === 50 || type === glass) {
        if (texturePack === 1) {
            glass(x1, y1, z1);
        }
    }
    if(type!==water||type!==8){
    if (texturePack === 1) {
        CollisionBox(x1 - 25, y1 - 25, z1 - 25, 50, 50, 50);
    }
    if (texturePack === 2) {
        CollisionBox(x1 - 80, y1 - 80, z1 - 80, 160, 160, 160);
    }
    }
};
var tree = function(x1, y1, z1) {
    block(leaves, x1, y1 + 150, z1);
    block(wood, x1, y1 + 100, z1);
    block(wood, x1, y1 - 50, z1);
    block(wood, x1, y1, z1);
    block(wood, x1, y1 + 50, z1);
    block(leaves, x1 - 50, y1 + 100, z1 - 50);
    block(leaves, x1 - 50, y1 + 100, z1);
    block(leaves, x1 - 50, y1 + 100, z1 + 50);
    block(leaves, x1 + 50, y1 + 100, z1 - 50);
    block(leaves, x1 + 50, y1 + 100, z1);
    block(leaves, x1 + 50, y1 + 100, z1 + 50);
    block(leaves, x1, y1 + 100, z1 + 50);
    block(leaves, x1, y1 + 100, z1 - 50);
};
var Sx2 = 0;
var Sy2 = 0;
var Sz2 = 0;
var chunk1 = random(1, 1);
var game = true;
var menu = false;
var PE = false;
var mode = 0;
var load = 55;
var ver = "alpha 0.9.6";
mouseDragged = function() {
    if (game === true && load < 0) {
        cube.rotation.y += (mouseX - pmouseX) / 50;
        if (cube.rotation.x < -1.4) {
            cube.rotation.x = -1.4;
        }
        if (cube.rotation.x > 1.4) {
            cube.rotation.x = 1.4;
        }
        if (cube.rotation.x < 140 && cube.rotation.x > -140 && cube.rotation.z < 140 && cube.rotation.z > -140) {
            cube.rotation.x -= (mouseY - pmouseY) / 100;
            if (PE === true && mouseY > 400) {
                cube.rotation.y += (pmouseX - mouseX) / 100;
                if (cube.rotation.x < 140 && cube.rotation.x > -140 && cube.rotation.z < 140 && cube.rotation.z > -140) {
                    cube.rotation.x -= (pmouseY - mouseY) / 100;
                }
            }
        }
    }
};
var generateWorld = function() {
    if (chunk1 === 1) {
        block(grass, -100, 50, -100);
        block(grass, -150, 50, -150);
        block(grass, -150, 50, -50);
        block(grass, -200, 50, -100);
        block(grass, -150, 100, -100);
        block(grass, 0, 0, -150);
        block(wood, 50, 50, 150);
        block(wood, 50, 100, 150);
        block(wood, 50, 150, 150);
        block(wood, 50, 200, 150);
        block(leaves, 0, 200, 150);
        block(leaves, 0, 200, 100);
        block(leaves, 50, 200, 100);
        block(leaves, 100, 200, 150);
        block(leaves, 100, 200, 100);
        block(leaves, 50, 200, 200);
        block(leaves, 0, 200, 200);
        block(leaves, 100, 200, 200);
        block(leaves, 50, 250, 150);
        block(grass, 100, 0, -250);
        block(grass, 150, 0, -250);
        block(grass, 200, 0, -250);
        block(grass, 250, 0, -250);
        block(grass, 50, 50, -250);
        block(grass, 0, 50, -250);
        block(grass, 150, 0, -300);
        block(grass, 200, 0, -300);
        block(grass, 250, 0, -300);
        block(grass, 250, 50, -350);
        block(grass, 250, 50, -400);
        block(grass, 250, 50, -450);
        block(grass, 250, 50, -500);
        block(grass, 250, 100, -550);
        block(dirt, 250, 50, -550);
        block(dirt, 250, 0, -550);
        block(stone, 250, -50, -550);
        block(stone, 200, -50, -550);
        block(grass, 0, 100, -600);
        block(wood, 0, 150, -350);
        block(wood, 0, 200, -350);
        block(grass, 0, 100, -350);
        block(dirt, 0, 50, -350);
        block(dirt, 0, 50, -400);
        block(dirt, 0, 50, -450);
        block(dirt, 0, 50, -400);
        block(dirt, 0, 50, -550);
        block(dirt, 0, 50, -550);
        block(dirt, 0, 0, -350);
        block(dirt, 0, 0, -400);
        block(dirt, 0, 0, -450);
        block(dirt, 0, 0, -400);
        block(dirt, 0, 0, -550);
        block(dirt, 0, 0, -550);
        block(wood, 0, 250, -350);
        block(wood, 0, 300, -350);
        block(leaves, -50, 300, -350);
        block(leaves, 50, 300, -350);
        block(leaves, 0, 350, -350);
        block(leaves, -50, 300, -400);
        block(leaves, 0, 300, -400);
        block(leaves, 50, 300, -400);
        block(leaves, -50, 300, -300);
        block(leaves, 0, 300, -300);
        block(leaves, 50, 300, -300);
        block(1, 0, 100, -550);
        block(1, 0, 100, -500);
        block(1, 0, 100, -450);
        block(1, 0, 100, -400);
        block(1, 0, 100, -350);
        block(1, 0, 100, -300);
        block(3, 100, 0, -300);
        block(3, 100, -50, -300);
        block(3, 100, -50, -350);
        block(3, 150, -50, -350);
        block(3, 200, -100, -350);
        block(3, 250, -50, -350);
        block(2, 250, 0, -350);
        block(2, 200, -50, -300);
        block(3, 200, -150, -400);
        block(3, 150, -150, -400);
        block(coal, 150, -200, -400);
        block(coal, 150, -200, -450);
        block(coal, 200, -200, -450);
        block(coal, 200, -200, -400);
        block(coal, 150, -250, -400);
        block(coal, 150, -250, -450);
        block(coal, 200, -250, -450);
        block(coal, 200, -250, -400);
        block(3, 250, -200, -400);
        block(2, 250, -150, -400);
        block(2, 200, -150, -400);
        block(1, 300, 0, -250);
        tree(200, 200, 200);
        block(2, 200, 100, 200);
        block(1, 150, 100, 200);
        block(1, 250, 100, 200);
        block(2, 250, 50, 200);
        block(2, 200, 50, 200);
        block(2, 150, 50, 200);
        block(1, 150, 50, 150);
        block(1, 200, 0, 150);
        block(1, 250, 0, 150);
        block(1, 200, 0, 100);
        block(1, 250, 50, 100);
        block(1, 200, -50, 50);
        block(1, 250, -50, 50);
        block(1, 150, -50, 50);
        block(2, 250, 0, 100);
        block(2, 250, -50, 100);
        block(3, 250, -100, 100);
        block(3, 250, -150, 100);
        block(3, 250, -150, 100);
        block(1, 150, 50, 250);
        block(1, 100, 50, 100);
        block(1, 150, 50, 100);
        block(1, 150, 0, 0);
        block(1, 150, 0, 50);
        block(1, 150, 0, -50);
        block(1, 150, 50, -100);
        block(2, 150, 0, -100);
        block(1, 150, -50, -100);
        block(1, 100, 0, -50);
        block(1, 200, 0, -50);
        block(1, 200, 0, -100);
        block(1, 200, 0, 0);
        block(1, 200, 0, 50);
        block(6, 200, 0, 500);
        block(2, 200, -50, 500);
        block(2, 200, -100, 500);
        block(6, 200, -50, 550);
        block(6, 250, -50, 550);
        block(6, 200, -50, 550);
        block(6, 200, 0, 450);
        block(6, 150, 0, 450);
        block(6, 200, 50, 400);
        block(6, 250, 50, 400);
        block(2, 250, 50, 350);
        tree(250, 150, 350);
        block(6, 300, 50, 350);
        block(6, 200, 50, 350);
        block(6, 200, 50, 300);
        block(6, 250, 50, 300);
        block(6, 300, 0, 300);
        block(6, 300, 0, 250);
        block(6, 350, 0, 250);
        block(1, 200, 50, 250);
        block(1, 250, 100, 250);
        block(3, 250, 50, 250);
        block(3, 250, 0, 1000);
        block(3, 300, 0, 1000);
        block(3, 300, 50, 1000);
        block(3, 300, 100, 1050);
        block(7, 300, 50, 1050);
        block(7, 250, 50, 1050);
        block(7, 250, 0, 1050);
        block(7, 250, 50, 1000);
        block(3, 200, 0, 950);
        block(3, 200, 50, 950);
        block(3, 200, 100, 1000);
        block(3, 250, 100, 1050);
        block(3, 200, 150, 1050);
        block(3, 150, 100, 1050);
        block(2, 150, 50, 1050);
        block(2, 150, 0, 1050);
        block(6, 150, 0, 1000);
        block(6, 100, 0, 1000);
        block(2, 100, -50, 1000);
        block(2, 100, -100, 1000);
        block(3, 100, -150, 1000);
        block(3, 100, -200, 1000);
        block(6, 100, 0, 950);
        block(6, 100, -50, 900);
        block(6, 100, 0, 850);
        block(6, 50, 0, 850);
        block(6, 150, -50, 850);
        block(6, 150, -50, 800);
        block(6, 100, -50, 800);
        block(6, 50, 0, 800);
        block(6, 50, 0, 750);
        block(6, 100, -50, 750);
        block(6, 150, -50, 750);
        block(6, 150, -50, 700);
        block(6, 100, -50, 700);
        block(6, 50, -50, 700);
        block(6, 50, -100, 650);
        block(6, 100, -50, 650);
        block(6, 150, 0, 650);
        block(6, 150, 0, 600);
        block(6, 100, 0, 600);
        block(6, 50, 0, 600);
        block(2, 50, -50, 600);
        block(2, 50, -100, 600);
        block(2, 100, -50, 600);
        block(2, 100, -100, 600);
        block(2, 150, -50, 600);
        block(3, 150, -100, 600);
        block(8, -200, 100, 600);
        block(8, 200, 100, 600);
        for(var i = 0; i < valueLength; i += 4) {
//        p3D.translate(values[i], values[i+1],values[i+2]);
        block(values[i+3], values[i], values[i+1],values[i+2]);
    }
    /*p3D.pushMatrix();
    p3D.translate(Sx, Sy, Sz);
    p3D.noFill();
    p3D.stroke(colColors);
    if(texturePack===2){
    p3D.box(160, 160, 160);
    }
    if(texturePack===1){
        p3D.box(50, 50, 50);
    }
    p3D.fill(255, 0, 0,0);
p3D.popMatrix();*/
valueLength = values.length;
    }
};
keyPressed = function() {
    input[keyCode] = true;
};
keyReleased = function() {
        if(input[73]){
        if(texturePack===2){
        Sx += 160;
        Sx2 += 160;
        }if(texturePack===1){
        Sx += 50;
        Sx2 += 50;
        }
        vz +=1;

    }        if(input[80]){
            println("values = [" + values + "];");
        }
    if(input[75]){
                if(texturePack===2){
        Sx -= 160;
        Sx2 -= 160;
                }
                if(texturePack===1){
        Sx -= 50;
        Sx2 -= 50;
                }
        vz -=1;
    }
    if(input[74]){
        if(texturePack===2){
        Sz -= 160;
        Sz2 -= 160;
        }
        if(texturePack===1){
                    Sz -= 50;
        Sz2 -= 50;
        }
    vx -=1;
    
    }
    if(input[76]){
        if(texturePack===2){
        Sz += 160;
        Sz2 += 160;
        }
        if(texturePack===1){
                    Sz += 50;
        Sz2 += 50;
        }
        vx+=1;
    }
    if(input[85]){
        if(texturePack===2){
    Sy -= 160;
        }
        if(texturePack===1){
                Sy -= 50;
        }
    vy-=1;
    
    }
    if(input[79]){
        if(texturePack===2){
        Sy += 160;
        }
        if(texturePack===1){
                    Sy += 50;
        }
    vy+=1;
    
    }
    if(input[49]){
     blockSelected = 1;
    }
        if(input[50]){
     blockSelected = 2;
    }
        if(input[51]){
     blockSelected = 3;
    }if(input[52]){
        blockSelected = 4;
    }if(input[53]){
        blockSelected = 5;
    }if(input[54]){
        blockSelected = 6;
    }if(input[55]){
        blockSelected = 7;
    }if(input[56]){
        blockSelected = 50;
    }if(input[57]){
        blockSelected = 9;
    }
    input[keyCode] = false;
};
var vel = 0;
mouseClicked = function() {
if (menu === true) {
if (mouseX > 250 && mouseX < 335 && mouseY > 250 && mouseY < 300) {
menu = false;
game = true;
}
if (mouseX > 200 && mouseX < 390 && mouseY > 350 && mouseY < 385) {
mode += 1;
}
}
if(mouseButton===RIGHT&&mouseIsPressed&&blockSelected){
hitBox.pushMatrix();
hitBox.background(0, 0, 0);
hitBox.camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
hitBox.rotateX(cube.rotation.x);
hitBox.rotateY(cube.rotation.y);
hitBox.rotateZ(cube.rotation.z);
hitBox.translate(cube.x, cube.y, cube.z);
hitBox.popMatrix();
determineDirection(-Sx, -Sy, -Sz);
image(hitBox, width / 2, height / 2);
directionOfCube = get(width / 2, height / 2);

vz = Sz;
vy = Sy;
vx = Sx;
if(directionOfCube === down) {
    println("down");
}
if(directionOfCube === up) {
    println("up");
}
if(directionOfCube === color(0, 0, 0)) {
    println("Oops");
}

values[valueLength] = -vz;
values[valueLength+1] = -vy;
values[valueLength+2] = -vx;
values[valueLength+3] = blockSelected;
}
if(mouseButton===LEFT&&mouseIsPressed){
values.pop(vx);
values.pop(vy+1);
values.pop(vz+2);
values.pop(3);
}};

var draw = function() {
    try{
        p3D.beginDraw();
    if (fall === true) {
        fallSpeed += 0.3;
        cube.y -= fallSpeed;
    }
    if (jump === true && fall === false) {
        cube.y += jumpSpeed;
        jumpSpeed -= 0.2;
    }
    if (jumpSpeed < 0) {
        jumpSpeed = 0;
        jump = false;
        fall = true;
    }
    if (jump === false && fall === false) {
        fall = true;
    }
    pCube.x = cube.x;
    pCube.y = cube.y;
    pCube.z = cube.z;
    if (game === true) {
        if (PE === true) {
            players = 1;
            if (mouseX > 50 && mouseY > 450 && mouseX < 100 && mouseY < 500) {
                cube.z += 5;
            }
            if (mouseX > 50 && mouseY > 550 && mouseX < 100 && mouseY < 600) {
                cube.z -= 5;
            }
            if (mouseX < 50 && mouseY > 500 && mouseY < 550) {
                cube.x += 2;
            }
            if (mouseX > 100 && mouseY > 500 && mouseY < 550 && mouseX < 150) {
                cube.x -= 2;
            }
            if (mouseX > 50 && mouseX < 100 && mouseY > 500 && mouseY < 550) {
                cube.y -= 2;
            }
            if (mouseX < 50 && mouseY > 450 && mouseY < 500) {
                cube.z += 5;
                cube.x += 5;
            }
        }


        background(0, 255, 255);
        p3D.background(0, 255, 255);
        p3D.camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
        //if(players===1){
        if (e < 1 && load < 0) {
            cursor(ARROW);
            if (input[UP] && cube.rotation.x < 1.4) {
                cube.rotation.x += 0.02;
            }
            if (input[DOWN] && cube.rotation.x > -1.4) {
                cube.rotation.x -= 0.02;
            }
            if (input[LEFT]) {
                cube.rotation.y -= 0.05;
            }
            if (input[RIGHT]) {
                cube.rotation.y += 0.05;
            }
            if (input[32]) {
                jump = true;
            }
            if (input[SHIFT]) {
                cube.y -= 5;
            }
            if (input[87]) {
                cube.z += cos(cube.rotation.y) * playerSpeed;
                cube.x += -sin(cube.rotation.y) * playerSpeed;
            }
            if (input[65]) {
                cube.z += sin(cube.rotation.y) * playerSpeed;
                cube.x += cos(cube.rotation.y) * playerSpeed;
            }
            if (input[68]) {
                cube.z -= sin(cube.rotation.y) * playerSpeed;
                cube.x -= cos(cube.rotation.y) * playerSpeed;
            }
            if (input[83]) {
                cube.z -= cos(cube.rotation.y) * playerSpeed;
                cube.x -= -sin(cube.rotation.y) * playerSpeed;
            }
        }
        if (input[69] && edelay < 0) {
            edelay = 2;
            e += 1;
        }
        //}
        if (texturePack === 1) {
            playerSpeed = 4;
        }
        if (texturePack === 2) {
            playerSpeed = 8;
        }
        edelay -= 1;
        hitBoxCols = 0;
        colColors = [];
        colPos = [];
        hitBox.pushMatrix();
        hitBox.camera(0, 0, 0, 0, 0, -1, 0, 1, 0);
        hitBox.background(0, 0, 0);
        hitBox.noStroke();
        p3D.pushMatrix();
        p3D.noStroke();
        world = [];
        hitBox.rotateX(cube.rotation.x);
        hitBox.rotateY(cube.rotation.y);
        hitBox.rotateZ(cube.rotation.z);
        hitBox.translate(cube.x, cube.y, cube.z);
        p3D.rotateX(cube.rotation.x);
        p3D.rotateY(cube.rotation.y);
        p3D.rotateZ(cube.rotation.z);
        p3D.translate(cube.x, round(cube.y/2)*2, cube.z);
        generateWorld();
        hitBox.popMatrix();
        
        image(hitBox, width / 2, height / 2);
        ColorPick = get(width / 2, height / 2);
        isBlockSelected = false;
        if(ColorPick !== color(0, 0, 0)) {
        var i = colColors.indexOf(ColorPick);
        Sx = colPos[i*3];
        Sy = colPos[i*3+1];
        Sz = colPos[i*3+2];
        p3D.pushMatrix();
        p3D.noFill();
        p3D.stroke(hitBoxColor);
        p3D.translate(-Sx, -Sy, -Sz);
        p3D.box(51, 51, 51);
        p3D.popMatrix();
        isBlockSelected = true;
        }
        
        p3D.popMatrix();
        p3D.endDraw();
        
        

        if (players === 1) {
            image(p3D, 200, 200, Screenscale, Screenscale);
        }
        if (players === 2) {
            image(p3D, 0, 0, 300, 300);
        }
        //image(hitBox, width / 2, height / 2);
        textSize(12);
        if (displayCordinates === true) {
            text(cube.x + "\n" + cube.y + "\n" + cube.z + "\n" + vel, 20, 20);
        }
        
        if (e > 1) {
            e = 0;
        }
        if (players > 1) {
            pushMatrix();
            scale(0.5);
        }

        fill(87, 87, 87);
        ellipse(200, 200, 10, 10);
        if (players > 1) {
            popMatrix();
        }
    }
    textSize(12);
    text(mouseX + "\n" + mouseY, 20, 200);
    if (game === true) {
        if (load > -1) {
            textSize(40);
            text("Generating World\nPlease wait a few\nseconds", 50, 180);
            load -= 1;
            cursor("WAIT");
        }
    image(HandT, 200, 200);
    drawHotBar();
    fill(0, 0, 0);
    text(hungertic,0,0);
        if (isWearingPumpkin === 1) {
            noStroke();
    fill(0, 0, 0);
    rect(144,215,100,0,-100);
    rect(-100,215,100,0,-100);
    rect(400,215,100,0,-100);
    rect(144,215-140,100,0,-100);
    rect(-100,215-140,100,0,-100);
    rect(400,215-140,100,0,-100);
    rect(0,0,400,75);
    rect(0,213,400,70);
    rect(0,360,400,41);
    rect(140,75,105,139);
    rect(-100,232,100,51,-100);
    rect(400,232,100,51,-100);
    rect(147,251,100,-1,-100);
    rect(102,404,100,-1,-100);
    rect(202,404,100,-1,-100);

        }
if (e === 1) {
            invintory(0,0);
        }
        textSize(15);
        text(ver, 320, 370);
    }
    }catch(error){
        background(255, 255, 255, 0);
/*    noStroke()
background(0,0,255);
textSize(20);
    fill(255);
    rect(150, 20, 100, 30);
    fill(0, 0, 255);
    text("Oh Shnap!", 150, 40);
    fill(0, 0, 0);
    text("Looks like we had trouble, heres the error:\n\n"+error, 0, 70, 400, 3000);*/
}
};
//short p3d