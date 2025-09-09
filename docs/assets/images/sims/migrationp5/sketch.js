let polys = [];
let data;
let countries = [];
let originPoints = [];
let destinationPoints = [];
let numOrigins = 8;
let numDestinations = 12;
let t = 0;
let centers = [];
let countryPolygons = [];

let scl = 25;
let xvec, yvec;
let noiseInc = 0.08;
let time = 0;
let particles = [];
let numParticles = 200;
let flowfield;
let timeSteps = 1500; // Change destinations more frequently

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

function randomIntFromInterval(min, max) {
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

function generatePointsInCountry(coords, numPoints = 3) {
    let points = [];
    let bounds = getBounds(coords);
    let attempts = 0;

    while (points.length < numPoints && attempts < 100) {
        let x = random(bounds.minX, bounds.maxX);
        let y = random(bounds.minY, bounds.maxY);

        if (isPointInPolygon(x, y, coords)) {
            points.push(createVector(x, y));
        }
        attempts++;
    }

    // If we couldn't find enough points inside, add some near the centroid
    if (points.length === 0) {
        let centroid = getCentroid(coords);
        points.push(centroid);
    }

    return points;
}

function getBounds(coords) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let coord of coords) {
        let [x, y] = coord;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    return {minX, maxX, minY, maxY};
}

function getCentroid(coords) {
    let sum = coords.reduce((acc, curr) => {
        let [x, y] = curr;
        return [acc[0] + x, acc[1] + y];
    }, [0, 0]);
    return createVector(sum[0] / coords.length, sum[1] / coords.length);
}

function isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let [xi, yi] = polygon[i];
        let [xj, yj] = polygon[j];

        if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }
    return inside;
}

function setup() {
    // Smaller canvas size
    createCanvas(600, 400);
    worldLayer = createGraphics(width, height);

    data = loadJSON('clean_countries.json', () => {
        countries = Object.keys(data);
        let allCountryPoints = [];

        for (let country of countries) {
            poly = data[country];
            if (country != 'ATA') { // Skip Antarctica
                let new_coords = poly.map(coords => {
                    let [lng, lat] = coords;
                    // Simple mapping without rotation
                    return [map(lng, -150, 180, 10, width - 10), map(lat, -90, 90, height - 10, 20)];
                });
                polys.push([country, new_coords]);
                countryPolygons.push({country: country, coords: new_coords});

                // Generate multiple points within each country
                let countryPoints = generatePointsInCountry(new_coords, 2);
                for (let point of countryPoints) {
                    allCountryPoints.push({point: point, country: country, coords: new_coords});
                }

                // Still keep centroids for reference
                let centroid = getCentroid(new_coords);
                centers.push(centroid);
            }
        }

        // Select specific regions as origins (conflict zones) and destinations (safe countries)
        selectOriginsAndDestinations(allCountryPoints);

        // Generate single world map
        worldLayer.clear();
        worldLayer.stroke(220, 220, 220, 100);
        worldLayer.strokeWeight(0.8);

        for (let el of polys) {
            let [countryCode, poly] = el;
            worldLayer.beginShape();
            for (let coord of poly) {
                let [x, y] = coord;
                worldLayer.vertex(x, y);
            }

            // Color coding: origins (red), destinations (green), neutral (blue-gray)
            let fillAlpha = randomIntFromInterval(40, 80);
            let isOrigin = originPoints.some(p => p.country === countryCode);
            let isDestination = destinationPoints.some(p => p.country === countryCode);

            if (isOrigin) {
                worldLayer.fill(140, 60, 60, fillAlpha); // Reddish for origin countries
            } else if (isDestination) {
                worldLayer.fill(60, 120, 80, fillAlpha); // Greenish for destination countries
            } else {
                worldLayer.fill(80, 90, 110, fillAlpha); // Neutral blue-gray
            }
            worldLayer.endShape(CLOSE);
        }

        dataReady = true;

        // Initialize particles (asylum seekers)
        for (let i = 0; i < numParticles; i++) {
            particles[i] = new AsylumSeeker();
        }

        FlowField();
    });
}

function selectOriginsAndDestinations(allPoints) {
    // Shuffle and select random countries as origins and destinations
    let shuffledPoints = getRandomSubarray(allPoints, allPoints.length);

    // Group points by country
    let pointsByCountry = {};
    for (let pointData of shuffledPoints) {
        if (!pointsByCountry[pointData.country]) {
            pointsByCountry[pointData.country] = [];
        }
        pointsByCountry[pointData.country].push(pointData);
    }

    let countryNames = Object.keys(pointsByCountry);
    let shuffledCountries = getRandomSubarray(countryNames, countryNames.length);

    // Select origin countries (simulate conflict zones)
    originPoints = [];
    for (let i = 0; i < numOrigins && i < shuffledCountries.length; i++) {
        let country = shuffledCountries[i];
        originPoints = originPoints.concat(pointsByCountry[country]);
    }

    // Select destination countries (simulate safe havens)
    destinationPoints = [];
    for (let i = numOrigins; i < numOrigins + numDestinations && i < shuffledCountries.length; i++) {
        let country = shuffledCountries[i];
        destinationPoints = destinationPoints.concat(pointsByCountry[country]);
    }

    console.log(`Selected ${originPoints.length} origin points and ${destinationPoints.length} destination points`);
}

function updateMigrationPatterns() {
    // Get all available points again
    let allCountryPoints = [];
    for (let countryData of countryPolygons) {
        let countryPoints = generatePointsInCountry(countryData.coords, 2);
        for (let point of countryPoints) {
            allCountryPoints.push({point: point, country: countryData.country, coords: countryData.coords});
        }
    }

    // Select new origins and destinations
    selectOriginsAndDestinations(allCountryPoints);

    // Update world map colors
    updateWorldMapColors();

    // Assign new destinations to existing particles
    for (let particle of particles) {
        if (destinationPoints.length > 0) {
            particle.target = int(random() * destinationPoints.length);
            particle.destination = destinationPoints[particle.target].point;
        }
    }
}

function updateWorldMapColors() {
    worldLayer.clear();
    worldLayer.stroke(220, 220, 220, 100);
    worldLayer.strokeWeight(0.8);

    for (let el of polys) {
        let [countryCode, poly] = el;
        worldLayer.beginShape();
        for (let coord of poly) {
            let [x, y] = coord;
            worldLayer.vertex(x, y);
        }

        // Color coding: origins (red), destinations (green), neutral (blue-gray)
        let fillAlpha = randomIntFromInterval(40, 80);
        let isOrigin = originPoints.some(p => p.country === countryCode);
        let isDestination = destinationPoints.some(p => p.country === countryCode);

        if (isOrigin) {
            worldLayer.fill(140, 60, 60, fillAlpha); // Reddish for origin countries
        } else if (isDestination) {
            worldLayer.fill(60, 120, 80, fillAlpha); // Greenish for destination countries
        } else {
            worldLayer.fill(80, 90, 110, fillAlpha); // Neutral blue-gray
        }
        worldLayer.endShape(CLOSE);
    }
}

function draw() {
    if (dataReady) {
        background(25, 30, 40);
        image(worldLayer, 0, 0);

        noStroke();

        // Draw asylum seekers
        for (let k = 0; k < particles.length; k++) {
            particles[k].show();
            particles[k].seek();
            particles[k].update();
            particles[k].edge();
            particles[k].follow();
        }

        FlowField();

        // Change migration patterns periodically
        if (t > timeSteps) {
            updateMigrationPatterns();
            t = 0;
        } else {
            t += 1;
        }

        // Add title and info
        fill(255, 200);
        textAlign(CENTER);
        textSize(16);
        text("Asylum Seekers", width/2, 30);

        textSize(10);
        fill(255, 150);
        text("Red: Origin regions | Green: Destination regions | Migration patterns update every " + Math.floor(timeSteps/60) + " seconds", width/2, height - 15);

        // Show current step
        fill(255, 100);
        textAlign(LEFT);
        text("Pattern cycle: " + Math.floor((t/timeSteps)*100) + "%", 10, height - 15);
    }
}

function FlowField() {
    xvec = floor((width + 50) / scl);
    yvec = floor((height + 50) / scl);
    flowfield = new Array(xvec * yvec);

    let yNoise = 0;
    for (let y = 0; y < yvec; y++) {
        let xNoise = 0;
        for (let x = 0; x < xvec; x++) {
            let vecDirect = noise(xNoise, yNoise, time) * TWO_PI;
            let dir = p5.Vector.fromAngle(vecDirect);
            let index = x + y * xvec;
            flowfield[index] = dir;
            xNoise += noiseInc;
            dir.setMag(1.5); // Gentler flow field
        }
        yNoise += noiseInc;
        time += 0.0002;
    }
}

class AsylumSeeker {
    constructor() {
        // Start from a random origin point
        if (originPoints.length > 0) {
            let start = random(originPoints);
            this.pos = createVector(start.point.x, start.point.y);
        } else {
            let start = random(centers);
            this.pos = createVector(start.x, start.y);
        }

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.r = 1.5;
        this.maxSpeed = random(1.5, 2.5);

        this.seekForce = 3;
        this.fieldForce = 1;

        // Set initial destination
        if (destinationPoints.length > 0) {
            this.target = int(random() * destinationPoints.length);
            this.destination = destinationPoints[this.target].point;
        } else {
            this.target = int(random() * centers.length);
            this.destination = centers[this.target];
        }

        // Different journey types
        this.journeyType = random(['urgent', 'planned', 'family']);
        this.trailLength = [];
        this.maxTrailLength = 15;
    }

    update() {
        // Store position for trail
        this.trailLength.push(createVector(this.pos.x, this.pos.y));
        if (this.trailLength.length > this.maxTrailLength) {
            this.trailLength.shift();
        }

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(this.maxSpeed);
    }

    follow() {
        let x = constrain(floor(this.pos.x / scl), 0, xvec - 1);
        let y = constrain(floor(this.pos.y / scl), 0, yvec - 1);
        let index = x + y * xvec;
        let force = flowfield[index];

        if (force != undefined) {
            force.setMag(this.fieldForce);
            this.applyForce(force);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        // Draw trail
        for (let i = 0; i < this.trailLength.length - 1; i++) {
            let alpha = map(i, 0, this.trailLength.length - 1, 0, 80);
            stroke(255, 180, 100, alpha);
            strokeWeight(0.8);
            if (this.trailLength[i] && this.trailLength[i + 1]) {
                line(this.trailLength[i].x, this.trailLength[i].y,
                     this.trailLength[i + 1].x, this.trailLength[i + 1].y);
            }
        }

        // Draw asylum seeker
        noStroke();
        if (this.journeyType === 'urgent') {
            fill(255, 120, 120, 180); // Red for urgent journeys
        } else if (this.journeyType === 'planned') {
            fill(120, 180, 255, 180); // Blue for planned journeys
        } else {
            fill(180, 255, 120, 180); // Green for family reunification
        }

        ellipse(this.pos.x, this.pos.y, 3);
    }

    edge() {
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y > height) this.pos.y = 0;
    }

    seek() {
        let desired = p5.Vector.sub(this.destination, this.pos);
        desired.setMag(this.maxSpeed);

        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.seekForce);

        this.applyForce(steering);

        // When reaching destination, choose new target or restart from origin
        if (this.pos.dist(this.destination) < 8) {
            if (random() < 0.3 && originPoints.length > 0) {
                // Sometimes restart journey from a new origin
                let newOrigin = random(originPoints);
                this.pos = createVector(newOrigin.point.x, newOrigin.point.y);
                this.trailLength = [];
            }

            // Choose new destination
            if (destinationPoints.length > 0) {
                this.target = (this.target + 1) % destinationPoints.length;
                this.destination = destinationPoints[this.target].point;
            } else if (centers.length > 0) {
                this.target = (this.target + 1) % centers.length;
                this.destination = centers[this.target];
            }
        }
    }
}
