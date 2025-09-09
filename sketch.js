let polys = [];
let data;
let countries = [];
let cities;
let numCities = 20;
let t = 0;
let centers = [];
let centers2 = [];
var an1 = 20;
var an2 = 52;
var disp = 390;

let scl = 30;
let xvec, yvec;
let noiseInc = 0.1;
let time = 0;
let particles = [];
let numParticles = 300;
let flowfield;
let timeSteps = 2000;

let worldLayer;

let dataReady = false;

function preload() {}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSubarray(arr, size) {
    let shuffled = arr.slice(0),
        i = arr.length,
        temp,
        index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function setup() {
    createCanvas(180 * 3 * 2.5, 90 * 4 * 2.5);
    worldLayer = createGraphics(width, height);
    worldLayer2 = createGraphics(width, height);

    data = loadJSON('clean_countries.json', () => {
        countries = Object.keys(data);

        for (let country of countries) {
            poly = data[country];
            if (country != 'ATA') {
                let new_coords = poly.map(coords => {
                    let [lng, lat] = coords;
                    // not mapping 0 | width height | 0 in order to properly center the world
                    return [map(lng, -180, 180, -100, width*0.8), map(lat, -90, 90, height / 2 + 100, 0)];
                });
                polys.push([country, new_coords]);
                let center = new_coords.reduce(
                    (acc, curr) => {
                        let [acc_x, acc_y] = acc;
                        let [x, y] = curr;
                        return [acc_x + x, acc_y + y];
                    },
                    [0, 0]
                );
                var tx = Math.cos((Math.PI / 180) * an1);
                var ty = Math.sin((Math.PI / 180) * an2);
                var cx = center[0] / new_coords.length;
                var cy = center[1] / new_coords.length;
                center = createVector(cx * tx + cy * ty, cy);
                centerb = createVector(cx * tx + cy * ty, cy + disp);
                // center = createVector(center[0] / new_coords.length, center[1] / new_coords.length);
                centers.push(center);
                centers2.push(centerb);
            }
        }

        cities = getRandomSubarray(centers, numCities);
        cities2 = getRandomSubarray(centers2, numCities);

        // Generate background map
        worldLayer.clear();
        worldLayer.stroke(255, 80);
        worldLayer.strokeWeight(0.5);
        worldLayer.fill(70,70,70,250);
        for (let el of polys) {
            let [_, poly] = el;
            worldLayer.beginShape();
            for (let coord of poly) {
                let [x, y] = coord;
                var tx = Math.cos((Math.PI / 180) * an1);
                var ty = Math.sin((Math.PI / 180) * an2);
                worldLayer.vertex(x * tx + y * ty, y);
            }
            var vari = randomIntFromInterval(0,255);
            worldLayer.fill(70,70,90,vari);
            worldLayer.endShape(CLOSE);
        }
        worldLayer2.clear();
        worldLayer2.stroke(255, 80);
        worldLayer2.strokeWeight(0.5);
        worldLayer2.fill(200);
        for (let el of polys) {
            let [_, poly] = el;
            worldLayer2.beginShape();
            for (let coord of poly) {
                let [x, y] = coord;
                var tx = Math.cos((Math.PI / 180) * an1);
                var ty = Math.sin((Math.PI / 180) * an2);
                worldLayer2.vertex(x * tx + y * ty, y + disp);
            }
            var vari2 = randomIntFromInterval(0,255);
            // worldLayer2.fill(220,200,200,vari2);
            worldLayer2.fill(90,70,70,vari2);
            worldLayer2.endShape(CLOSE);
        }
        dataReady = true;
        for (let i = 0; i < numParticles; i++) {
            particles[i] = new Particle();
            // particles[i].show(0,46,98);
        }
    });
    FlowField();
}

function setTargets() {
    cities = getRandomSubarray(centers, numCities);
    for (let particle of particles) {
        particle.target = int(random() * cities.length);
        particle.destination = cities[particle.target];
    }
}

function draw() {
    if (dataReady) {
        clear();
        image(worldLayer2, 0, 0);
        image(worldLayer, 0, 0);

        // fill(216,17,89);
        // fill(0,46,98);
        noStroke();

        for (let k = 0; k < particles.length; k++) {
            particles[k].show(216,17,89);
            particles[k].seek();
            particles[k].update();
            particles[k].edge();
            particles[k].follow();
        }

        FlowField();
        if (t > timeSteps) {
            setTargets();
            t = 0;
        } else {
            t += 1;
        }

    }
}

function FlowField() {
    xvec = floor((windowWidth + 50) / scl);
    yvec = floor((windowHeight + 50) / scl);
    flowfield = new Array(xvec * yvec);

    let yNoise = 0;
    for (let y = 0; y < yvec; y++) {
        let xNoise = 0;
        for (let x = 0; x < xvec; x++) {
            let vecDirect = noise(xNoise, yNoise, time) * 2 * TWO_PI;
            let dir = p5.Vector.fromAngle(vecDirect);
            let index = x + y * xvec;
            flowfield[index] = dir;
            xNoise += noiseInc;
            dir.setMag(3);
        }
        yNoise += noiseInc;
        time += 0.0001;
    }
}
class Particle {
    constructor() {
        var city_array = [cities, cities2];
        var dst = city_array[Math.floor(Math.random() * city_array.length)];
        // var cent_array = [centers, centers2];
        // var st = cent_array[Math.floor(Math.random() * cent_array.length)];
        let start = random(centers);
        // let start = random(st);
        this.pos = createVector(start.x, start.y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.r = 2.0;
        this.maxSpeed = random(3, 3.5);

        this.seekForce = 4;
        this.fieldForce = 2;
        this.target = int(random() * cities.length);
        // this.destination = cities[this.target];
        this.destination = dst[this.target];
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(this.maxSpeed);
    }

    follow() {
        // follow flowfield vectors
        let x = constrain(floor(this.pos.x / scl), 0, xvec);
        let y = constrain(floor(this.pos.y / scl), 0, yvec);
        let index = x + y * xvec;
        let force = flowfield[index];
        // TODO: Find out why it is undefined sometimes
        if (force != undefined) {
            force.setMag(this.fieldForce);
            this.applyForce(force);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show(r,g,b) {
        fill(r,g,b);
        // fill(216,17,89);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 4);

        // show trajectory to target
        // stroke(100, 200, 100, 70);
        // strokeWeight(1);
        // line(this.pos.x, this.pos.y, this.destination.x, this.destination.y);
    }

    edge() {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }

    seek() {
        let desired = p5.Vector.sub(this.destination, this.pos);
        desired.setMag(this.maxSpeed);

        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.seekForce);

        this.applyForce(steering);

        if (this.pos.dist(this.destination) < 5) {
            this.target = (this.target + 1) % cities.length;
            var city_array = [cities, cities2];
            var updown = Math.floor(Math.random() * city_array.length)
            var dst = city_array[updown];
            // this.destination = cities[this.target];
            this.destination = dst[this.target];
            // if (updown == 1){
            //     this.show(216,17,89);
            // } else {
            //     this.show(250,250,250);
            // }
        }
    }
}
