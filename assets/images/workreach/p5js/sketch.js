const statesData = [
  { name: "Aguascalientes", pop: 1.4, lat: 22.00, lon: -102.30, eci: 0.8, informality: 40 },
  { name: "Baja California", pop: 3.7, lat: 30.50, lon: -115.50, eci: 0.5, informality: 35 },
  { name: "Baja California Sur", pop: 0.8, lat: 26.00, lon: -112.00, eci: -0.2, informality: 50 },
  { name: "Campeche", pop: 1.0, lat: 19.00, lon: -90.50, eci: -0.9, informality: 65 },
  { name: "Chiapas", pop: 5.5, lat: 16.50, lon: -92.50, eci: -1.2, informality: 70 },
  { name: "Chihuahua", pop: 3.8, lat: 28.50, lon: -106.00, eci: 0.6, informality: 40 },
  { name: "Coahuila", pop: 3.1, lat: 27.00, lon: -102.00, eci: 0.9, informality: 38 },
  { name: "Colima", pop: 0.8, lat: 19.15, lon: -103.90, eci: -0.1, informality: 55 },
  { name: "Mexico City", pop: 9.2, lat: 19.43, lon: -99.13, eci: 1.5, informality: 30 },
  { name: "Durango", pop: 1.8, lat: 24.50, lon: -104.50, eci: 0.1, informality: 52 },
  { name: "Guanajuato", pop: 6.2, lat: 21.00, lon: -101.00, eci: 0.7, informality: 45 },
  { name: "Guerrero", pop: 3.5, lat: 17.70, lon: -99.50, eci: -1.0, informality: 68 },
  { name: "Hidalgo", pop: 3.1, lat: 20.50, lon: -99.00, eci: 0.0, informality: 58 },
  { name: "Jalisco", pop: 8.3, lat: 20.50, lon: -103.75, eci: 1.0, informality: 42 },
  { name: "México State", pop: 17.0, lat: 19.35, lon: -99.55, eci: 1.2, informality: 40 },
  { name: "Michoacán", pop: 4.7, lat: 19.25, lon: -101.75, eci: -0.3, informality: 60 },
  { name: "Morelos", pop: 2.0, lat: 18.75, lon: -99.00, eci: 0.2, informality: 50 },
  { name: "Nayarit", pop: 1.2, lat: 22.00, lon: -105.00, eci: -0.5, informality: 62 },
  { name: "Nuevo León", pop: 5.8, lat: 25.50, lon: -100.00, eci: 1.3, informality: 32 },
  { name: "Oaxaca", pop: 4.1, lat: 17.00, lon: -96.50, eci: -1.1, informality: 72 },
  { name: "Puebla", pop: 6.6, lat: 19.00, lon: -98.00, eci: 0.4, informality: 55 },
  { name: "Querétaro", pop: 2.4, lat: 20.75, lon: -100.00, eci: 1.1, informality: 37 },
  { name: "Quintana Roo", pop: 1.9, lat: 19.75, lon: -88.00, eci: -0.4, informality: 48 },
  { name: "San Luis Potosí", pop: 2.8, lat: 22.50, lon: -100.50, eci: 0.3, informality: 50 },
  { name: "Sinaloa", pop: 3.0, lat: 25.00, lon: -107.50, eci: 0.0, informality: 53 },
  { name: "Sonora", pop: 3.0, lat: 29.50, lon: -110.00, eci: 0.4, informality: 43 },
  { name: "Tabasco", pop: 2.4, lat: 18.00, lon: -93.00, eci: -0.8, informality: 67 },
  { name: "Tamaulipas", pop: 3.5, lat: 24.00, lon: -98.50, eci: 0.2, informality: 47 },
  { name: "Tlaxcala", pop: 1.4, lat: 19.35, lon: -98.10, eci: -0.2, informality: 59 },
  { name: "Veracruz", pop: 8.1, lat: 19.50, lon: -96.75, eci: -0.6, informality: 63 },
  { name: "Yucatán", pop: 2.3, lat: 20.75, lon: -89.00, eci: -0.7, informality: 57 },
  { name: "Zacatecas", pop: 1.6, lat: 23.50, lon: -103.00, eci: -0.1, informality: 56 }
];

let locations = [];
let particles = [];

const minLat = 14.5; const maxLat = 32.8;
const minLon = -118.5; const maxLon = -86.5;

let betaDistSlider, betaEciSlider, betaInfoSlider, thresholdSlider, kTransitionSlider;
let transitionCheckbox, showNamesCheckbox;

let selectedState = null;
let selectedStateEciSlider, selectedStateInfoSlider;
let selectedStateLabel, selectedStateEciLabel, selectedStateInfoLabel;

let canvasWidth, canvasHeight;
const padding = 70;

let bgColor, stateColor, particleColorStart, particleColorEnd, flowLineColor, textColor, highlightColor;

function computeTransitionWeight(distance, threshold, k) {
  if (threshold === null || threshold === undefined) return 1.0;
  return 1 / (1 + Math.exp(-k * (distance - threshold)));
}

function predictFlowsWithUtilityModel(locs, params) {
  const N = locs.length;
  let utilityMatrix = Array(N).fill(null).map(() => Array(N).fill(0));
  let distanceMatrix = Array(N).fill(null).map(() => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) { distanceMatrix[i][j] = 0; continue; }
      distanceMatrix[i][j] = dist(locs[i].x, locs[i].y, locs[j].x, locs[j].y);
      if (distanceMatrix[i][j] < 1) distanceMatrix[i][j] = 1;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const dist_ij = distanceMatrix[i][j];
      const eci_j = locs[j].eci;
      const informality_i = locs[i].informality / 100.0;

      let util_ij;
      if (params.transition && params.threshold !== null) {
        const tw = computeTransitionWeight(dist_ij, params.threshold, params.k_transition);
        util_ij = params.beta_distance * dist_ij +
                    tw * (params.beta_eci * eci_j) +
                    tw * (params.beta_informality * informality_i);
      } else {
        util_ij = params.beta_distance * dist_ij +
                    params.beta_eci * eci_j +
                    params.beta_informality * informality_i;
      }
      utilityMatrix[i][j] = util_ij;
    }
  }

  let probMatrixP = Array(N).fill(null).map(() => Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    let maxU_row = -Infinity;
    for (let j = 0; j < N; j++) {
      if (utilityMatrix[i][j] > maxU_row) maxU_row = utilityMatrix[i][j];
    }

    let expU_row_sum = 0;
    let expU_values = Array(N).fill(0);
    for (let j = 0; j < N; j++) {
      expU_values[j] = Math.exp(utilityMatrix[i][j] - maxU_row);
      expU_row_sum += expU_values[j];
    }

    if (expU_row_sum === 0) {
        for (let j = 0; j < N; j++) probMatrixP[i][j] = 0;
    } else {
        for (let j = 0; j < N; j++) probMatrixP[i][j] = expU_values[j] / expU_row_sum;
    }
  }

  for (let i = 0; i < N; i++) probMatrixP[i][i] = 0;

  for (let i = 0; i < N; i++) {
    let rowSumP = 0;
    for (let j = 0; j < N; j++) rowSumP += probMatrixP[i][j];
    if (rowSumP > 1e-10) {
      for (let j = 0; j < N; j++) probMatrixP[i][j] /= rowSumP;
    } else {
        for (let j = 0; j < N; j++) probMatrixP[i][j] = 0;
    }
  }

  let predictedFlows = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      let flowValue = probMatrixP[i][j] * locs[i].pop;
      predictedFlows.push({ from: locs[i], to: locs[j], value: flowValue });
    }
  }
  return predictedFlows;
}


class Particle {
  constructor(startX, startY, endX, endY, speedFactor, life) {
    this.pos = createVector(startX, startY);
    this.vel = createVector(endX - startX, endY - startY);
    this.vel.normalize();
    this.vel.mult(random(0.5, 1.5) * speedFactor);
    this.endPos = createVector(endX, endY);
    this.lifespan = life;
    this.originalLifespan = life;
    this.alpha = 255;
    this.size = random(2, 4);
    this.color = lerpColor(particleColorStart, particleColorEnd, random(1));
  }
  update() {
    this.pos.add(this.vel);
    this.lifespan--;
    this.alpha = map(this.lifespan, 0, this.originalLifespan, 0, 200);
    if (p5.Vector.dist(this.pos, this.endPos) < this.vel.mag() * 2) {
      this.lifespan = 0;
    }
  }
  isDead() { return this.lifespan <= 0; }
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

function setup() {
  canvasWidth = min(windowWidth * 0.95, 1200);
  canvasHeight = canvasWidth * 0.60;
   if (canvasHeight > windowHeight * 0.85) {
      canvasHeight = windowHeight * 0.85;
      canvasWidth = canvasHeight / 0.60;
  }
  createCanvas(canvasWidth, canvasHeight);

  bgColor = color(10, 20, 40);
  stateColor = color(200, 220, 255, 180);
  particleColorStart = color(255, 100, 100, 180);
  particleColorEnd = color(255, 200, 100, 180);
  flowLineColor = color(100, 150, 255, 50);
  textColor = color(230, 240, 255);
  highlightColor = color(255, 255, 0);

  initializeLocations();

  let sliderX = 20;
  let sliderY = 20;
  let sliderW = 130;
  let labelOffset = 150;
  let sliderSpacing = 22;
  let currentY = sliderY;

  betaDistSlider = createSlider(-0.1, 0, -0.005, 0.001);
  betaDistSlider.position(sliderX + labelOffset, currentY); betaDistSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;
  betaEciSlider = createSlider(0, 2, 0.85, 0.01);
  betaEciSlider.position(sliderX + labelOffset, currentY); betaEciSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;
  betaInfoSlider = createSlider(-10, 10, -6.5, 0.01);
  betaInfoSlider.position(sliderX + labelOffset, currentY); betaInfoSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;

  let maxCanvasDist = sqrt(width*width + height*height);
  thresholdSlider = createSlider(0, maxCanvasDist / 2, maxCanvasDist / 4, 1);
  thresholdSlider.position(sliderX + labelOffset, currentY); thresholdSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;
  kTransitionSlider = createSlider(0.001, 0.1, 0.06, 0.001);
  kTransitionSlider.position(sliderX + labelOffset, currentY); kTransitionSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;

  transitionCheckbox = createCheckbox('Use Transition Logic', true);
  transitionCheckbox.position(sliderX, currentY); transitionCheckbox.style('color', textColor.toString());
  currentY += sliderSpacing;
  showNamesCheckbox = createCheckbox('Show State Names', false);
  showNamesCheckbox.position(sliderX, currentY); showNamesCheckbox.style('color', textColor.toString());
  currentY += sliderSpacing + 10;

  selectedStateLabel = createP('');
  selectedStateLabel.position(sliderX, currentY);
  selectedStateLabel.style('color', textColor.toString());
  selectedStateLabel.style('font-weight', 'bold');
  currentY += sliderSpacing + 5;

  selectedStateEciLabel = createP('State ECI:');
  selectedStateEciLabel.position(sliderX, currentY);
  selectedStateEciLabel.style('color', textColor.toString());
  selectedStateEciSlider = createSlider(-2, 2, 0, 0.01);
  selectedStateEciSlider.position(sliderX + labelOffset - 30, currentY);
  selectedStateEciSlider.style('width', sliderW+'px');
  currentY += sliderSpacing;

  selectedStateInfoLabel = createP('State Informality (%):');
  selectedStateInfoLabel.position(sliderX, currentY);
  selectedStateInfoLabel.style('color', textColor.toString());
  selectedStateInfoSlider = createSlider(0, 100, 50, 1);
  selectedStateInfoSlider.position(sliderX + labelOffset - 30, currentY);
  selectedStateInfoSlider.style('width', sliderW+'px');

  hideSelectedStateControls();
}

function initializeLocations() {
  locations = [];
  for (let state of statesData) {
    let x = map(state.lon, minLon, maxLon, padding, width - padding);
    let y = map(state.lat, maxLat, minLat, padding, height - padding);
    let popSize = map(state.pop, 0.5, 17.0, 6, 22);
    locations.push({
      ...state,
      x: x, y: y, baseSize: popSize,
      displayName: state.name === "México State" ? "Edo. Mex." : (state.name === "Mexico City" ? "CDMX" : state.name)
    });
  }
}

function draw() {
  background(bgColor);

  if (selectedState && selectedStateEciSlider.elt.style.display !== 'none') {
    let newEci = selectedStateEciSlider.value();
    let newInfo = selectedStateInfoSlider.value();
    let changed_ = false;
    let stateObjToUpdate = locations.find(loc => loc.name === selectedState.name);
    if (stateObjToUpdate) {
        if (stateObjToUpdate.eci !== newEci) {
            stateObjToUpdate.eci = newEci;
            changed_ = true;
        }
        if (stateObjToUpdate.informality !== newInfo) {
            stateObjToUpdate.informality = newInfo;
            changed_ = true;
        }
    }
    selectedStateEciLabel.html('State ECI: ' + newEci.toFixed(2));
    selectedStateInfoLabel.html('State Informality (%): ' + newInfo.toFixed(0));
  }


  let modelParams = {
    beta_distance: betaDistSlider.value(),
    beta_eci: betaEciSlider.value(),
    beta_informality: betaInfoSlider.value(),
    threshold: thresholdSlider.value(),
    k_transition: kTransitionSlider.value(),
    transition: transitionCheckbox.checked()
  };

  displayGlobalSliderValues(modelParams);

  textSize(16);
  textAlign(CENTER, CENTER);
  fill(textColor);
  text("WorkReach Mobility Model\n(Mexico)", width/2, padding/3);

  let calculatedFlows = predictFlowsWithUtilityModel(locations, modelParams);
  let maxFlow = 0;
  for (let flow of calculatedFlows) {
    if (flow.value > maxFlow) maxFlow = flow.value;
  }
  if (maxFlow === 0) maxFlow = 1e-6;

  for (let flow of calculatedFlows) {
    let flowStrength = constrain(map(flow.value, 0, maxFlow, 0, 1), 0, 1);
    if (flowStrength > 0.001) {
        let lineAlpha = map(flowStrength, 0, 1, 5, 70);
        let lineWeight = map(flowStrength, 0, 1, 0.5, 4);
        stroke(red(flowLineColor), green(flowLineColor), blue(flowLineColor), lineAlpha);
        strokeWeight(lineWeight);
        line(flow.from.x, flow.from.y, flow.to.x, flow.to.y);

        let particleEmissionRate = flowStrength * 0.1;
        if (random(1) < particleEmissionRate && particles.length < 800) {
            let particleSpeed = map(flowStrength, 0, 1, 1, 4);
            let d = dist(flow.from.x, flow.from.y, flow.to.x, flow.to.y);
            let particleLifespan = (d / particleSpeed) * 1.2;
            if (particleSpeed > 0 && particleLifespan > 0) {
                 particles.push(new Particle(flow.from.x, flow.from.y, flow.to.x, flow.to.y, particleSpeed, particleLifespan));
            }
        }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); particles[i].display();
    if (particles[i].isDead()) particles.splice(i, 1);
  }

  let MOUSE_HIGHLIGHT_RADIUS = 15;
  let hoveredState = null;

  for (let loc of locations) {
    if (selectedState && selectedState.name === loc.name) {
        stroke(255, 0, 0);
        strokeWeight(3);
        fill(red(stateColor)+30, green(stateColor)+30, blue(stateColor)+30, 230);
    } else {
        noStroke();
        fill(stateColor);
    }
    ellipse(loc.x, loc.y, loc.baseSize, loc.baseSize);

    if (showNamesCheckbox.checked()) {
        fill(textColor); noStroke(); textSize(9); textAlign(CENTER, CENTER);
        text(loc.displayName, loc.x, loc.y - loc.baseSize/2 - 7);
    }
    if (!selectedState || selectedState.name !== loc.name) {
        if (dist(mouseX, mouseY, loc.x, loc.y) < MOUSE_HIGHLIGHT_RADIUS + loc.baseSize / 2) {
            hoveredState = loc;
        }
    }
  }

  if (hoveredState) {
    fill(highlightColor, 180); noStroke();
    ellipse(hoveredState.x, hoveredState.y, hoveredState.baseSize + 6, hoveredState.baseSize + 6);

    fill(highlightColor); textSize(11); textAlign(CENTER, BOTTOM); textStyle(BOLD);
    let infoText = `${hoveredState.name}\nPop: ${hoveredState.pop}M\nECI: ${hoveredState.eci.toFixed(2)}\nInformality: ${hoveredState.informality}%`;
    text(infoText, hoveredState.x, hoveredState.y - hoveredState.baseSize/2 - 15);
    textStyle(NORMAL);

    for (let flow of calculatedFlows) {
        if (flow.from === hoveredState || flow.to === hoveredState) {
            let flowStrength = constrain(map(flow.value, 0, maxFlow, 0, 1), 0, 1);
             if (flowStrength > 0.001) {
                let lineAlpha = map(flowStrength, 0, 1, 60, 200);
                let lineWeight = map(flowStrength, 0, 1, 1, 5);
                stroke(highlightColor, lineAlpha);
                strokeWeight(lineWeight);
                line(flow.from.x, flow.from.y, flow.to.x, flow.to.y);
            }
        }
    }
  }
}

function displayGlobalSliderValues(params) {
  fill(textColor); noStroke(); textSize(11); textAlign(LEFT, CENTER);
  let sliderX = 20; let sliderY = 20;
  let valueTextOffset = betaDistSlider.width + 10 + 150;
  let sliderSpacing = 22; let currentY = sliderY;

  text("β_dist:", sliderX, currentY + betaDistSlider.height / 2);
  text(params.beta_distance.toFixed(3), sliderX + valueTextOffset, currentY + betaDistSlider.height / 2);
  currentY += sliderSpacing;
  text("β_ECI:", sliderX, currentY + betaEciSlider.height / 2);
  text(params.beta_eci.toFixed(2), sliderX + valueTextOffset, currentY + betaEciSlider.height / 2);
  currentY += sliderSpacing;
  text("β_Informality:", sliderX, currentY + betaInfoSlider.height / 2);
  text(params.beta_informality.toFixed(2), sliderX + valueTextOffset, currentY + betaInfoSlider.height / 2);
  currentY += sliderSpacing;
  text("Threshold (dist):", sliderX, currentY + thresholdSlider.height / 2);
  text(params.threshold.toFixed(1), sliderX + valueTextOffset, currentY + thresholdSlider.height / 2);
  currentY += sliderSpacing;
  text("k_transition:", sliderX, currentY + kTransitionSlider.height / 2);
  text(params.k_transition.toFixed(3), sliderX + valueTextOffset, currentY + kTransitionSlider.height / 2);
}

function mousePressed() {
  let stateClicked = false;
  for (let loc of locations) {
    if (dist(mouseX, mouseY, loc.x, loc.y) < loc.baseSize / 1.5 + 5) {
      if (selectedState && selectedState.name === loc.name) {
        selectedState = null;
        hideSelectedStateControls();
      } else {
        selectedState = loc;
        showSelectedStateControls();
      }
      stateClicked = true;
      break;
    }
  }

  if (!stateClicked && selectedState) {
    if (mouseX > 300) {
        selectedState = null;
        hideSelectedStateControls();
    }
  }
}

function showSelectedStateControls() {
  if (!selectedState) return;
  selectedStateLabel.html(`Editing: ${selectedState.displayName}`);
  selectedStateEciSlider.value(selectedState.eci);
  selectedStateInfoSlider.value(selectedState.informality);

  selectedStateLabel.show();
  selectedStateEciLabel.show(); selectedStateEciSlider.show();
  selectedStateInfoLabel.show(); selectedStateInfoSlider.show();
}

function hideSelectedStateControls() {
  selectedStateLabel.html('');
  selectedStateLabel.hide();
  selectedStateEciLabel.hide(); selectedStateEciSlider.hide();
  selectedStateInfoLabel.hide(); selectedStateInfoSlider.hide();
}

function windowResized() {
    canvasWidth = min(windowWidth * 0.95, 1200);
    canvasHeight = canvasWidth * 0.60;
     if (canvasHeight > windowHeight * 0.85) {
      canvasHeight = windowHeight * 0.85;
      canvasWidth = canvasHeight / 0.60;
    }
    resizeCanvas(canvasWidth, canvasHeight);
    initializeLocations();

    let sliderX = 20; let sliderY = 20;
    let sliderW = 130; let labelOffset = 150;
    let sliderSpacing = 22; let currentY = sliderY;

    betaDistSlider.position(sliderX + labelOffset, currentY); currentY += sliderSpacing;
    betaEciSlider.position(sliderX + labelOffset, currentY); currentY += sliderSpacing;
    betaInfoSlider.position(sliderX + labelOffset, currentY); currentY += sliderSpacing;

    let maxCanvasDist = sqrt(width*width + height*height);
    thresholdSlider.remove();
    thresholdSlider = createSlider(0, maxCanvasDist / 2, constrain(thresholdSlider.value(),0,maxCanvasDist/2), 1);
    thresholdSlider.position(sliderX + labelOffset, currentY); thresholdSlider.style('width', sliderW+'px');
    currentY += sliderSpacing;

    kTransitionSlider.position(sliderX + labelOffset, currentY); currentY += sliderSpacing;
    transitionCheckbox.position(sliderX, currentY); currentY += sliderSpacing;
    showNamesCheckbox.position(sliderX, currentY); currentY += sliderSpacing + 10;

    selectedStateLabel.position(sliderX, currentY); currentY += sliderSpacing + 5;
    selectedStateEciLabel.position(sliderX, currentY);
    selectedStateEciSlider.position(sliderX + labelOffset - 30, currentY); currentY += sliderSpacing;
    selectedStateInfoLabel.position(sliderX, currentY);
    selectedStateInfoSlider.position(sliderX + labelOffset - 30, currentY);

}
