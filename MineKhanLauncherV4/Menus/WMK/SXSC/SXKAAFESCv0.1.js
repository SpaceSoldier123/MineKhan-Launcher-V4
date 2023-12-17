//Note: Copy this into a new Khan Academy program.

//To save your world, copy and paste your save code here and make a spin-off:

var world = {blocks: [],blockTypes: [],};

//As a quick note: There was a copy of this program in its alpha stage. While I was working on the code, someone hacked into it and released it as original code. This is the version they hacked (To view it, change var version to equal "Alpha 0.1"):

//https://www.khanacademy.org/computer-programming/new-program/4919775080022016

//Thank you to Hard Programmer and the 1# planet propenent for bringing this to my attention.




//You can change the render distance in the options menu.

/**
    Since many people on khan academy have made versions of minecraft, I decided to see whether I could make one myself. This is the result.
**/

/** @Scuscraft version Alpha 0.1

    Controls:
    
 * Right-click (or command click for mac users) - place block
 * Left- click - remove block
 * Shift - sprint
 * W - walk forward
 * S - walk backward
 * A - walk left
 * D - walk right
 * Arrow Keys - look around
 * Escape - pause
 * 1-9 navigate hotbar
 * Spacebar - jump

    
    Features:

 * Infinite world generation with trees (ores will be added soon)
 * Save codes
 * Block placement
 * Block removal
 * Movement
 * Looking around
 * Inventory hotbar
 * Options menu
 * Main menu
 * Pause menu

**/

/** @Ideas_for_future_updates

 * Multipule worlds
 * Chunk-based save codes for lag reduction
 * More blocks
 * Ores
 * Fully-functional inventory
 * Survival mode

**/



























if(true) {

var generator = {
    height: 100,
    smooth: 0.02,
};

var treeNum = 0;
var treeNum2 = 0;
    
var treeSeed = random(-10000, 10000);

var treeFactor = 0.59;

if(world.treeSeed !== undefined) {
    treeSeed = world.treeSeed;
}

if(world.seed === undefined) {
    var worldSeed = random(-10000, 10000);
}
else {
    var worldSeed = world.seed;
}

var treeHeight = 0;

var detectTrees = function(x1, z1) {
    
    if(noise(treeSeed, x1, z1) > treeFactor) {
        treeHeight = round(noise(x1 * generator.smooth, z1 * generator.smooth, worldSeed) * generator.height) + 20;
        return(1);
    }
    else if(noise(treeSeed, x1 + 1, z1) > treeFactor) {
        treeHeight = round(noise((x1 + 1) * generator.smooth, z1 * generator.smooth, worldSeed) * generator.height) + 20;
        return(2);
    }
    else if(noise(treeSeed, x1 - 1, z1) > treeFactor) {
        treeHeight = round(noise((x1 - 1) * generator.smooth, z1 * generator.smooth, worldSeed) * generator.height) + 20;
        return(2);
    }
    else if(noise(treeSeed, x1, z1 + 1) > treeFactor) {
        treeHeight = round(noise(x1 * generator.smooth, (z1 + 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(2);
    }
    else if(noise(treeSeed, x1, z1 - 1) > treeFactor) {
        treeHeight = round(noise(x1 * generator.smooth, (z1 - 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(2);
    }
    else if(noise(treeSeed, x1 + 1, z1 + 1) > treeFactor) {
        treeHeight = round(noise((x1 + 1) * generator.smooth, (z1 + 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(3);
    }
    else if(noise(treeSeed, x1 - 1, z1 + 1) > treeFactor) {
        treeHeight = round(noise((x1 - 1) * generator.smooth, (z1 + 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(3);
    }
    else if(noise(treeSeed, x1 + 1, z1 - 1) > treeFactor) {
        treeHeight = round(noise((x1 + 1) * generator.smooth, (z1 - 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(3);
    }
    else if(noise(treeSeed, x1 - 1, z1 - 1) > treeFactor) {
        treeHeight = round(noise((x1 - 1) * generator.smooth, (z1 - 1) * generator.smooth, worldSeed) * generator.height) + 20;
        return(3);
    }
    else {
        treeHeight = 0;
        return(0);
    }
};


    //Settings

var renderDistance = 4; // render distance in number of blocks (try 6, 7, or 8 if you have a SUPER good computer)

var blockOutlines = true; // true if blocks should be outlined, false if blocks shouldn't be outlined

var mp = false;
var mhp = false;

var version = "Alpha 0.1";

noiseSeed(1);

var reach = 3; // blocks

var screen = "menu";

var subScreen = "main";

smooth();

angleMode = "radians";

var hitBox = {
    colors: [],
    render: createGraphics(width / 4, height / 4, OPENGL),
    pos: [],
    count: 0,
    world: [[]],
    color: 0,
    block: 0,
};

hitBox.color = color(random(5, 250), random(5, 250), random(5, 250));
for(var i = 0; i < 150; i ++) {
    while(hitBox.colors.indexOf(hitBox.color) !== -1) {
        hitBox.color = color(random(5, 250), random(5, 250), random(5, 250));
    }
    hitBox.colors[i] = hitBox.color;
}

var holding = 0;

var Key = {
    num: [],
};

keyPressed = function() {
    Key.num[keyCode] = true;
    Key[key.toString().toUpperCase()] = true;
    Key.newNum[keyCode] = true;
    if(keyCode === 81) {
        holding += 1;
    }
    
};
keyReleased = function() {
    Key.num[keyCode] = false;
    Key[key.toString().toUpperCase()] = false;
};

var g = createGraphics(width / 2, height / 2, OPENGL);
var fov = PI/3;
var cameraZ = (height/2.0) / tan(fov/2.0);

var setFOV = function(factor) {
    fov = PI/factor;
    cameraZ = (height/2.0) / tan(fov/2.0);
    g.perspective(fov, width/height, cameraZ/10.0, cameraZ*10.0);
    hitBox.render.perspective(fov, width/height, cameraZ/10.0, cameraZ*10.0);
};
setFOV(3);

var gen = 0;

var p = {
    speed: 8,
    sprintSpeed: 1.5,
    x: 0,
    y: round(noise(0, 0, worldSeed) * generator.height + 20) * 160 - 360,
    z: 0,
    w: 60,
    bottomH: 240,
    topH: 50,
    rx: 0,
    ry: 0,
    gravity: 0,
    onGround: false,
    jumpSpeed: 15,
    maxGravity: 30,
    gravityStength: 0.6,
};

if(world.start !== undefined) {
    p.x = world.start.x;
    p.y = world.start.y;
    p.z = world.start.z;
    p.rx = world.start.rx;
    p.ry = world.start.ry;
}
else {
    if(detectTrees(round(p.x / 160), round(p.z / 160)) === 1) {
        p.y = (treeHeight - 6) * 160;
    }
    else if(detectTrees(round(p.x / 160), round(p.z / 160)) === 2) {
        p.y = (treeHeight - 6) * 160;
    }
    else if(detectTrees(round(p.x / 160), round(p.z / 160)) === 3) {
        p.y = (treeHeight - 5) * 160;
    }
    world.start = {};
    world.start.x = p.x;
    world.start.y = p.y;
    world.start.z = p.z;
    world.start.rx = p.rx;
    world.start.ry = p.ry;
}

var pP = {
    x: p.x,
    y: p.y,
    z: p.z,
};

var pyTrans = 0;

var move = {
    x: 0,
    y: 0,
    z: 0,
    ang: sin(HALF_PI / 2),
};

var p2 = {
    x: 0,
    y: 0,
    z: 0,
};

var blockIds = {
    background: color(166, 252, 255),
    air: 0,
    grass: 1,
    stone: 3,
    dirt: 2,
    bedrock: 4,
    oak_planks: 5,
    oak_wood: 6,
};

var blockColors = [color(255, 255, 255, 0), color(12, 235, 45), color(214, 141, 32), color(145, 145, 145)];

var ix, iy, iz, iw, ih, id, blk, place, pauseIMG, the;

var printableSaveCode = [];
var printableSaveCode2 = [];

var loadSaveCode = false;

var load = 0;
var load2 = 0;

var colors = {
    top: color(255, 0, 0),
    bottom: color(0, 0, 255),
    left: color(0, 255, 0),
    right: color(255, 255, 0),
    front: color(0, 255, 255),
    back: color(255, 0, 255),
};

var inventory = {
    hotbar: [1, 2, 3, 4, 5, 6, 7, 0, 0],
    main: [],
    hotbarSlot: 0,
    size: 30,
};

} //define variables

if(true) {
    
    
    var blockImgs = [undefined];
    
    var newBlockImg = function() {
        blockImgs.push(get(0, 0, 160, 160));
    };
    
    var loadBlocks = function() {
        noStroke();
        background(140, 100, 21);
        fill(22, 133, 45);
        rect(0, 0, 160, 40);
        newBlockImg(); // grass
        background(140, 100, 21);
        newBlockImg(); // dirt
        background(120, 120, 120);
        newBlockImg(); // stone
        background(51, 51, 51);
        newBlockImg(); // bedrock
        background(186, 152, 52);
        newBlockImg(); // oak planks
        background(97, 75, 14);
        fill(186, 152, 52);
        rect(25, 25, 120, 120);
        newBlockImg(); // oak wood
        background(37, 102, 11);
        newBlockImg(); // leaves
    };
    loadBlocks();
} //textures

var Cube_3D = function() {
    hitBox.render.pushMatrix();
    hitBox.render.noStroke();
    hitBox.render.translate(0, -80, 0);
    hitBox.render.fill(colors.top);
    hitBox.render.box(160, 1, 160);
    hitBox.render.translate(0, 160, 0);
    hitBox.render.fill(colors.bottom);
    hitBox.render.box(160, 1, 160);
    hitBox.render.translate(0, -80, -80);
    hitBox.render.fill(colors.front);
    hitBox.render.box(160, 160, 1);
    hitBox.render.translate(0, 0, 160);
    hitBox.render.fill(colors.back);
    hitBox.render.box(160, 160, 1);
    hitBox.render.translate(-80, 0, -80);
    hitBox.render.fill(colors.right);
    hitBox.render.box(1, 160, 160);
    hitBox.render.translate(160, 0, 0);
    hitBox.render.fill(colors.left);
    hitBox.render.box(1, 160, 160);
    hitBox.render.popMatrix();
};

var boxCollision = function(x, y, z, w, h, d) {
    ix = x - w/2 - p.w;
    iw = w + p.w*2;
    iz = z - d/2 - p.w;
    id = d + p.w*2;
    iy = y - h/2 - p.bottomH;
    ih = h + p.bottomH + p.topH;
    if(p.x > ix && p.y > iy && p.z > iz && p.x < ix + iw && p.y < iy + ih && p.z < iz + id) {
        if(pP.x <= ix) {
            p.x = ix;
        }
        else if(pP.x >= ix + iw) {
            p.x = ix + iw;
        }
        else if(pP.z <= iz) {
            p.z = iz;
        }
        else if(pP.z >= iz + id) {
            p.z = iz + id;
        }
        else if(pP.y <= iy) {
            p.y = iy;
            p.gravity = 0;
            p.onGround = true;
        }
        else if(pP.y >= iy + ih) {
            p.y = iy + ih;
            p.onGround = false;
            p.gravity = 0;
        }
    }
};

var inBox = function(x, y, z, w, h, d) {
    ix = x - w/2 - p.w;
    iw = w + p.w*2;
    iz = z - d/2 - p.w;
    id = d + p.w*2;
    iy = y - h/2 - p.bottomH;
    ih = h + p.bottomH + p.topH;
    if(p.x > ix && p.y > iy && p.z > iz && p.x < ix + iw && p.y < iy + ih && p.z < iz + id) {
        return(true);
    }
    else {
        return(false);
    }
};

var runGravity = function() {
    if(p.onGround) {
        if(Key[" "]) {
            p.gravity = p.jumpSpeed;
        }
        else {
            p.gravity = 0;
        }
    }
    else {
        p.gravity -= p.gravityStength;
        if(p.gravity < -p.maxGravity) {
            p.gravity = -p.maxGravity;
        }
    }
    p.y -= p.gravity;
    p.onGround = false;
    
};

var block = function(x, y, z, t) {
    if(g.dist(x, y, z, p.x, pyTrans + 80, p.z) < renderDistance * 160 - 80 && t !== 0) {
        switch(t) {
            case 1: //grass
                g.pushMatrix();
                g.translate(x, y + 20, z);
                g.fill(140, 100, 21);
                g.box(160, 120, 160);
                g.translate(0, -80, 0);
                g.fill(22, 133, 45);
                g.box(160, 40, 160);
                g.popMatrix();
            break;
            case 2: //dirt
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(140, 100, 21);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 3: //stone
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(120, 120, 120);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 4: //bedrock
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(51, 51, 51);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 5: //oak planks
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(186, 152, 52);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 6: //oak wood
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(97, 75, 14);
                g.box(160, 160, 160);
                g.fill(186, 152, 52);
                g.box(120, 160.1, 120);
                g.popMatrix();
            break;
            case 7: //leaves
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(37, 102, 11);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
        }
        boxCollision(x, y, z, 160, 160, 160);
        if(g.dist(x, y, z, p.x, pyTrans + 80, p.z) < reach * 160) {
            hitBox.render.pushMatrix();
            hitBox.render.translate(x, y, z);
            hitBox.render.fill(hitBox.colors[hitBox.count]);
            hitBox.render.box(160, 160, 160);
            hitBox.render.popMatrix();
            hitBox.count ++;
            hitBox.world.push([x / 160, y / 160, z / 160]);
        }
    }
};

var block2 = function(x, y, z, t) {
    switch(t) {
            case 1: //grass
                g.pushMatrix();
                g.translate(x, y + 20, z);
                g.fill(140, 100, 21);
                g.box(160, 120, 160);
                g.translate(0, -80, 0);
                g.fill(22, 133, 45);
                g.box(160, 40, 160);
                g.popMatrix();
            break;
            case 2: //dirt
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(140, 100, 21);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 3: //stone
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(120, 120, 120);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
            case 4: //bedrock
                g.pushMatrix();
                g.translate(x, y, z);
                g.fill(51, 51, 51);
                g.box(160, 160, 160);
                g.popMatrix();
            break;
    }
};

var changeWorldBlock = function(t) {
    if(hitBox.pos !== undefined) {
        if(hitBox.pos[1] > 0 && hitBox.pos[1] < 100) {
            blk = world.blocks.indexOf(hitBox.pos[0] + "_" + hitBox.pos[1] + "_" + hitBox.pos[2]);
            if(blk === -1) {
                world.blocks.push(hitBox.pos[0] + "_" + hitBox.pos[1] + "_" + hitBox.pos[2]);
                world.blockTypes.push(t);
            }
            else {
                world.blockTypes[blk] = t;
            }
        }
    }
};

var newWorldBlock = function() {
    switch(hitBox.color) {
        case colors.top:
            hitBox.pos[1] -= 1;
        break;
        case colors.bottom:
            hitBox.pos[1] += 1;
        break;
        case colors.front:
            hitBox.pos[2] -= 1;
        break;
        case colors.back:
            hitBox.pos[2] += 1;
        break;
        case colors.right:
            hitBox.pos[0] -= 1;
        break;
        case colors.left:
            hitBox.pos[0] += 1;
        break;
    }
    if(!inBox(hitBox.pos[0] * 160, hitBox.pos[1] * 160, hitBox.pos[2] * 160, 160, 160, 160)) {
        changeWorldBlock(holding);
    }
};

var generateBlock = function(x, y, z) {
    gen = round(noise(x * generator.smooth, z * generator.smooth, worldSeed) * generator.height) + 20;
    if(y < 100) {
        if(y >= gen && y > 0) {
            if(y === gen) {
                return(1);
            }
            else {
                if(y > gen + 3) {
                    return(3);
                }
                else {
                    return(2);
                }
            }
        }
        else {
            treeNum = detectTrees(x, z);
            if(y <= treeHeight - 5) {
                return(0);
            }
            else {
                
                if(treeNum === 0) {
                    return(0);
                }
                else if(treeNum === 1) {
                    if(y > treeHeight - 4) {
                        return(6);
                    }
                    else {
                        return(7);
                    }
                }
                else if(treeNum === 2) {
                    if(y > treeHeight - 5 && y < treeHeight - 2) {
                        return(7);
                    }
                    else {
                        return(0);
                    }
                }
                else if(treeNum === 3) {
                    if(y > treeHeight - 4 && y < treeHeight - 2) {
                        return(7);
                    }
                    else {
                        return(0);
                    }
                }
            }
        }
    }
    else {
        if(y > 100) {
            return(0);
        }
        else {
            return(4);
        }
    }
};

var defineWorld = function() {
    hitBox.count = 0;
    hitBox.world = [];
    pyTrans = floor(p.y);
    g.pushMatrix();
    /*if(Key.num[16]) { //Changes FOV when sprinting (removed)
        setFOV(2.5);
    }
    else {
        setFOV(3);
    }*/
    if(blockOutlines) {
        g.stroke(0, 0, 0);
    }
    else {
        g.noStroke();
    }
    g.background(blockIds.background);
    g.camera(0, 0, 0, 0, 0, 1, 0, 1, 0);
    g.rotateX(p.rx);
    g.rotateY(p.ry);
    g.translate(-p.x, -pyTrans, -p.z);
    
    hitBox.render.pushMatrix();
    hitBox.render.noStroke();
    hitBox.render.background(0, 0, 0);
    hitBox.render.camera(0, 0, 0, 0, 0, 1, 0, 1, 0);
    hitBox.render.rotateX(p.rx);
    hitBox.render.rotateY(p.ry);
    hitBox.render.translate(-p.x, -pyTrans, -p.z);
    p2.x = round(p.x / 160);
    p2.y = round(p.y / 160);
    p2.z = round(p.z / 160);
    for(var i = -ceil(renderDistance) + p2.x; i < ceil(renderDistance) + p2.x; i ++) {
        for(var d = ceil(renderDistance) + p2.y; d > -ceil(renderDistance) + p2.y; d --) {
            for(var q = -ceil(renderDistance) + p2.z; q < ceil(renderDistance) + p2.z; q ++) {
                blk = world.blocks.indexOf(i + "_" + d + "_" + q);
                if(blk === -1) {
                    block(i * 160, d * 160, q * 160, generateBlock(i, d, q));
                }
                else {
                    block(i * 160, d * 160, q * 160, world.blockTypes[blk]);
                }
            }
        }
    }
    if(hitBox.pos !== undefined) {
        g.pushMatrix();
        g.translate(hitBox.pos[0] * 160, hitBox.pos[1] * 160, hitBox.pos[2] * 160);
        g.noFill();
        g.stroke(255, 255, 255);
        g.box(160.2, 160.2, 160.2);
        g.popMatrix();
        
        if(place) {
            hitBox.render.pushMatrix();
            hitBox.render.translate(hitBox.pos[0] * 160, hitBox.pos[1] * 160, hitBox.pos[2] * 160);
            Cube_3D();
            hitBox.render.popMatrix();
        }
    }
    hitBox.render.popMatrix();
    g.popMatrix();
};

var controls = function() {
    move.x = 0;
    move.z = 0;
    if(Key.W) {
        //move.z += cos(p.ry) * p.speed;
        //move.x -= sin(p.ry) * p.speed;
        move.z += p.speed;
    }
    if(Key.S) {
        //move.z -= cos(p.ry) * p.speed;
        //move.x += sin(p.ry) * p.speed;
        move.z -= p.speed;
    }
    if(Key.A) {
        //move.x += cos(p.ry) * p.speed;
        //move.z += sin(p.ry) * p.speed;
        move.x += p.speed;
    }
    if(Key.D) {
        //move.x -= cos(p.ry) * p.speed;
        //move.z -= sin(p.ry) * p.speed;
        move.x -= p.speed;
    }
    /*if(Key[" "]) {
        p.y -= 5;
    }
    if(Key.num[16]) {
        p.y += 5;
    }*/
    if(Key.num[LEFT]) {
        p.ry -= 0.05;
    }
    if(Key.num[RIGHT]) {
        p.ry += 0.05;
    }
    if(Key.num[UP]) {
        p.rx -= 0.05;
    }
    if(Key.num[DOWN]) {
        p.rx += 0.05;
    }
    if(Key.num[16]) {
        move.x *= p.sprintSpeed;
        move.z *= p.sprintSpeed;
    }
    if(abs(move.x) > 0 && abs(move.z) > 0) {
        move.x *= move.ang;
        move.z *= move.ang;
    }
    //println(move.x);
    //p.x += move.x;
    //p.z += move.z;
    p.x += cos(p.ry) * move.x;
    p.z += sin(p.ry) * move.x;
    p.z += cos(p.ry) * move.z;
    p.x -= sin(p.ry) * move.z;
    while(p.ry > PI*2) {
        p.ry -= PI*2;
    }
    while(p.ry < 0) {
        p.ry += PI*2;
    }
    if(p.rx > HALF_PI) {
        p.rx = HALF_PI;
    }
    if(p.rx < -HALF_PI) {
        p.rx = -HALF_PI;
    }
};

var button = function(x, y, w, h) {
    if(mouseX > x && mouseY > y && mouseX < x + w && mouseY < y + h) {
        return(true);
    }
    else {
        return(false);
    }
};

var generateSaveCode = function() {
    load2 = load + 200;
    for(the = load; the < world.blocks.length && load2 - load > 0; the ++) {
        printableSaveCode.push('"' + world.blocks[the] + '"');
        printableSaveCode2.push(world.blockTypes[the]);
    }
    if(the >= world.blocks.length) {
        println("var world = {seed: " + worldSeed + ",treeSeed: " + treeSeed + ",blocks: [" + printableSaveCode + "],blockTypes: [" + printableSaveCode2 + "],start: {x: " + round(p.x) + ",y:" + round(p.y) + ",z:" + round(p.z) + ",rx:" + (round(p.rx * 100) / 100) + ",ry:" + (round(p.ry * 100) / 100) + "},};");
        loadSaveCode = false;
    }
};

var splashText = [
    "No easter eggs", "By ScusX!", "!sdrawkcaB", "var fun = true;", "Hey, you!", "Can render 4 blocks!", "Updates incoming", "No hidden fees!", "Hippopotamus!", "Gotta catch them all!", "Not greyscale", "9 + 10 = 21", "Someday...", "*SIGH*", "parseInt()", "get(rect());", "qwertyuiopasdfghjklzxcvbnm", "Nope.", "Sometimes, having a giant monitor is really helpful.", "igpay atinlay", "Five more minutes?", "Also try GameChiefCraft", "Also try Ultimate Platformer", "What's the opposite of right? Wrong!", "Feeling snackish? I know the feeling.", "Hey look! It's invisible!", "...", "Never trust semicolon closing parenthesis", ":D", ":P", "LG logo is pacman!", "Don't mine bedrock", "Cross-platform, if you build the platform", "Better than legos, not legolas"];

var splashSelect = floor(random(0, splashText.length));
textSize(12);
var textLength = textWidth(splashText[splashSelect]);

mouseClicked = function() {};
var runMouseClicked = function() {
    if(screen === "play") {
        if(mouseButton === LEFT) {
            if(Key.num[17]) {
                place = true;
            }
            else {
                changeWorldBlock(0);
            }
        }
        if(mouseButton === RIGHT && holding !== 0 && holding !== undefined) {
            place = true;
        }
    }
    else if(screen === "menu") {
        if(subScreen === "main") {
            if(button(width / 2 - 50, height / 2 - 40, 100, 40)) {
                screen = "play";
            }
            if(button(width / 2 - 150, height / 2 + 25, 300, 50)) {
                subScreen = "options";
            }
        }
        else if(subScreen === "options") {
            if(button(width / 2 - 150, 265, 300, 50)) {
                subScreen = "main";
            }
            if(button(0, 125, 50, 50)) {
                if(renderDistance > 3) {
                    renderDistance --;
                }
            }
            if(button(width - 50, 125, 50, 50)) {
                renderDistance ++;
            }
            if(button(width / 2 - 150, 195, 300, 50)) {
                if(blockOutlines) {
                    blockOutlines = false;
                }
                else {
                    blockOutlines = true;
                }
            }
        }
    }
    else if(screen === "pause") {
        if(subScreen === "main") {
            if(button(width / 2 - 150, 125, 300, 50)) {
                screen = "play";
            }
            if(button(width / 2 - 150, 265, 300, 50)) {
                textSize(12);
                splashSelect = floor(random(0, splashText.length));
                textLength = textWidth(splashText[splashSelect]);
                loadSaveCode = true;
                load = 0;
                printableSaveCode = [];
                screen = "menu";
            }
            if(button(width / 2 - 150, 195, 300, 50)) {
                subScreen = "options";
            }
        }
        else if(subScreen === "options") {
            if(button(width / 2 - 150, 265, 300, 50)) {
                subScreen = "main";
            }
            if(button(0, 125, 50, 50)) {
                if(renderDistance > 3) {
                    renderDistance --;
                }
            }
            if(button(width - 50, 125, 50, 50)) {
                renderDistance ++;
            }
            if(button(width / 2 - 150, 195, 300, 50)) {
                if(blockOutlines) {
                    blockOutlines = false;
                }
                else {
                    blockOutlines = true;
                }
            }
        }
    }
};

var to160 = function(val) {
    return(val * 160);
};

var displaySplashText = function(x, y, r, w, n) {
    if(n !== undefined) {
        textSize(12);
        textLength = textWidth(splashText[n]);
    }
    if(w / textLength * 40 > 45) {
        textSize(45);
    }
    else {
        textSize(w / textLength * 40);
    }
    textAlign(CENTER, CENTER);
    pushMatrix();
    translate(x, y);
    rotate(r);
    if(n === undefined) {
        text(splashText[splashSelect], 0, 0);
    }
    else {
        text(splashText[n], 0, 0);
    }
    popMatrix();
};

//background for menus
g.pushMatrix();
g.background(blockIds.background);
g.camera(0, 0, 0, 0, 0, 1, 0, 1, 0);
g.rotateX(HALF_PI / 6);
g.rotateY(-HALF_PI / 2.5);
block2(to160(1), to160(1), to160(5), 1);
block2(to160(2), to160(1), to160(5), 1);
block2(to160(3), to160(2), to160(4), 1);
block2(to160(3), to160(2), to160(5), 1);
block2(to160(2), to160(2), to160(4), 1);
block2(to160(1), to160(2), to160(4), 1);
block2(to160(0), to160(3), to160(4), 1);
block2(to160(1), to160(3), to160(4), 2);
block2(to160(1), to160(4), to160(3), 1);
block2(to160(2), to160(3), to160(3), 1);
block2(to160(3), to160(2), to160(3), 1);
block2(to160(3), to160(3), to160(2), 1);
block2(to160(5), to160(3), to160(2), 1);
block2(to160(4), to160(4), to160(1), 1);
block2(to160(4), to160(3), to160(2), 1);
block2(to160(0), to160(2), to160(5), 1);
block2(to160(4), to160(2), to160(3), 1);
block2(to160(4), to160(2), to160(4), 1);
block2(to160(5), to160(3), to160(3), 1);
g.popMatrix();
image(g, 0, 0, width, height);

var backgroundImage = get(0, 0, width, height);

draw = function() {
    if(mouseIsPressed) {
        if(mhp) {
            mp = false;
        }
        else {
            mhp = true;
            mp = true;
        }
    }
    else {
        mhp = false;
        mp = false;
    }
    if(screen === "menu") {
        cursor(CROSS);
        strokeWeight(1);
        background(168, 223, 240);
        image(backgroundImage, 0, 0);
        fill(255, 255, 255, 100);
        rect(-1, -1, width + 2, height + 2);
        
        if(subScreen === "main") {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(92, 92, 92);
            rect(width / 2 - 150, height / 2 - 45, 300, 50);
            rect(width / 2 - 150, height / 2 + 25, 300, 50);
            fill(0, 0, 0);
            textSize(75);
            textAlign(CENTER, TOP);
            text("Scuscraft", width / 2, 10);
            fill(51, 51, 51);
            displaySplashText(width / 2, 115, 0, 100);
            fill(0, 0, 0);
            textSize(35);
            textAlign(CENTER, CENTER);
            text("Play", width / 2, height / 2 - 20);
            text("Options", width / 2, height / 2 + 50);
            textSize(20);
            textAlign(RIGHT, BOTTOM);
            text("Version " + version, width - 10, height - 10);
        }
        else if(subScreen === "options") {
            fill(0, 0, 0);
            textSize(75);
            textAlign(CENTER, TOP);
            text("Scuscraft", width / 2, 10);
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(92, 92, 92);
            rect(width / 2 - 150, 125, 300, 50);
            rect(width / 2 - 150, 195, 300, 50);
            rect(width / 2 - 150, 265, 300, 50);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            textSize(30);
            text("Render Distance: " + renderDistance, width / 2, 150);
            text("Block Outlines: " + blockOutlines, width / 2, 220);
            strokeWeight(7);
            stroke(0, 0, 0);
            line(10, 150, 40, 150);
            line(width - 10, 150, width - 40, 150);
            line(width - 25, 135, width - 25, 165);
            textSize(35);
            textAlign(CENTER, CENTER);
            text("Back", width / 2, 290);
        }
    }
    else if(screen === "play") {
        cursor("none");
        pP.x = p.x;
        pP.y = p.y;
        pP.z = p.z;
        background(255, 255, 255);
        
        controls();
        runGravity();
        defineWorld();
        
        image(hitBox.render, 0, 0, width, height);
        hitBox.color = get(width / 2, height / 2);
        if(place && hitBox.pos !== undefined) {
            newWorldBlock();
        }
        if(hitBox.color !== color(0, 0, 0)) {
            hitBox.block = hitBox.colors.indexOf(hitBox.color);
            hitBox.pos = hitBox.world[hitBox.block];
        }
        else {
            hitBox.pos = undefined;
        }
        
        image(g, 0, 0, width, height);
        
        //image(hitBox.render, 10, 10, 50, 50);
        
        if(Key.newNum[27]) {
            screen = "pause";
            subScreen = "main";
            pauseIMG = get(0, 0, width, height);
        }
        
        stroke(97, 97, 97, 200);
        strokeWeight(3);
        line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
        line(width / 2, height / 2 - 10, width / 2, height / 2 + 10);
        
        fill(255, 255, 255);
        textAlign(RIGHT, TOP);
        textSize(12);
        text(p2.x + ", " + p2.y + ", " + p2.z + ", " + holding, width - 10, 10);
        
        //Inventory
        
        
        //Hotbar
        for(var i = 0; i < inventory.hotbar.length; i ++) {
            noFill();
            stroke(0, 0, 0);
            strokeWeight(2);
            rect(width / 2 - (inventory.hotbar.length / 2 * inventory.size) + i * inventory.size, height - inventory.size * 2, inventory.size, inventory.size);
            if(blockImgs[inventory.hotbar[i]] !== undefined) {
                strokeWeight(1);
                image(blockImgs[inventory.hotbar[i]], width / 2 - (inventory.hotbar.length / 2 * inventory.size) + i * inventory.size + inventory.size / 6, height - inventory.size * 2 + inventory.size / 6, inventory.size / 6 * 4, inventory.size / 6 * 4);
                rect(width / 2 - (inventory.hotbar.length / 2 * inventory.size) + i * inventory.size + inventory.size / 6, height - inventory.size * 2 + inventory.size / 6, inventory.size / 6 * 4, inventory.size / 6 * 4);
            }
        }
        
        strokeWeight(4);
        stroke(255, 255, 255);
        rect(width / 2 - (inventory.hotbar.length / 2 * inventory.size) + inventory.hotbarSlot * inventory.size, height - inventory.size * 2, inventory.size, inventory.size);
        
        if(Key.newNum.indexOf(true, 49) <= 57 && Key.newNum.indexOf(true, 49) >= 49) {
            inventory.hotbarSlot = Key.newNum.indexOf(true, 49) - 49;
        }
        
        holding = inventory.hotbar[inventory.hotbarSlot];
        
        place = false;
    }
    else if(screen === "pause") {
        cursor(CROSS);
        strokeWeight(1);
        image(pauseIMG, 0, 0, width, height);
        
        fill(0, 0, 0, 100);
        rect(-2, -2, width + 4, height + 4);
        
        textSize(60);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text("Paused", width / 2, 40);
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(92, 92, 92);
        if(subScreen === "main") {
            rect(width / 2 - 150, 125, 300, 50);
            rect(width / 2 - 150, 195, 300, 50);
            rect(width / 2 - 150, 265, 300, 50);
            fill(0, 0, 0);
            textSize(30);
            text("Return to Game", width / 2, 150);
            text("Options", width / 2, 220);
            text("Save and Exit", width / 2, 290);
        }
        else if(subScreen === "options") {
            rect(width / 2 - 150, 125, 300, 50);
            rect(width / 2 - 150, 195, 300, 50);
            rect(width / 2 - 150, 265, 300, 50);
            fill(0, 0, 0);
            textSize(30);
            text("Render Distance: " + renderDistance, width / 2, 150);
            text("Block Outlines: " + blockOutlines, width / 2, 220);
            strokeWeight(7);
            stroke(0, 0, 0);
            line(10, 150, 40, 150);
            line(width - 10, 150, width - 40, 150);
            line(width - 25, 135, width - 25, 165);
            textSize(35);
            textAlign(CENTER, CENTER);
            text("", width / 2, 220);
            text("Back", width / 2, 290);
        }
        strokeWeight(1);
        if(Key.newNum[27]) {
            screen = "play";
            subScreen = "main";
        }
        strokeWeight(1);
    }
    Key.newNum = [];
    if(loadSaveCode) {
        generateSaveCode();
    }
    if(mp) {
        runMouseClicked();
    }
        if(version === "Alpha 0.0") {
            background(0, 0, 0);
        }
};

//Under 1200 lines of code

























//There is no easter egg. :D





