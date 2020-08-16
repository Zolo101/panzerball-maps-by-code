// works for: version 0
const noise = require("open-simplex-noise");
const jsonfile = require("jsonfile");

const seed = 0;

const noisemaker = noise.makeNoise3D(seed)
const noisezoom = 15

let id = 0
const blocksize = 400

const xnoise = 48;
const ynoise = 48;
const znoise = 48;

const gdensity = .3;
const ldensity = .4;

let map = {
    version: 0,
    items: []
}

function createBlock(name,x,y,z,pitch,yaw,roll,mutation,modifier) {
    let block = {};
    id+=1;
    block.name = name;
    block.id = id;
    block.x = x;
    block.y = y;
    block.z = z;
    block.pitch = pitch;
    block.yaw = yaw;
    block.roll = roll;
    block.mutation = mutation;
    block.modifier = modifier;
    map.items.push(block);
}

for (let x = 0; x < xnoise/noisezoom; x+=1/noisezoom) {
    for (let y = 0; y < ynoise/noisezoom; y+=1/noisezoom) {
        for (let z = 0; z < znoise/noisezoom; z+=1/noisezoom) {
            let lenoise = noisemaker(x,y,z)
            if (lenoise > gdensity && lenoise < ldensity) createBlock(
                "Block",
                Number((blocksize*x*noisezoom).toFixed(1)),
                Number((blocksize*z*noisezoom).toFixed(1)),
                Number((blocksize*y*noisezoom).toFixed(1)),
            )
        }
    }
}

jsonfile.writeFile('result.ballmap', map)
console.log("Completed!\nBlocks created:",id)
