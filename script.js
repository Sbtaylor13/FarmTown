// Define the plant growth stages and initial state
const stages = ['plot.png', 'small-plant.png', 'medium-plant.png', 'full-plant.png'];
let currentState = 0;
let money = 0;
let water = 101;
let clicks = -1;
var clickAdder = 1;
let moneyAdder = 1;
let wateringTimer;

// Get the plot element
const plot = document.getElementById('plot');
const htmlMoney = document.getElementById('money');
const htmlClicks = document.getElementById('clicks');
const htmlWater = document.getElementById('water');

const tutorialBlock = document.getElementById("tutorial");
const tutorialText = document.getElementById("tut-text");

// Function to update the plot's image
function updatePlot() {
    if (water > 0) {
        currentState = (currentState + 1) % stages.length;
        if (currentState == 0) {
            money = money + moneyAdder;
            triggerOutwardTransition();
            if (tutorialBlock && tutorialText) {
                tutorialBlock.remove();
                tutorialText.remove();
            }
        }
        water--;
        clicks = clicks + clickAdder;
        htmlClicks.textContent = clicks;
        htmlMoney.textContent = "Gold: " + money;
        plot.style.backgroundImage = `url(${stages[currentState]})`;
    }
    updateWaterLevel();
}

function updateWaterLevel() {
    let waterLevel = document.getElementById('water-level');
    let waterPercentage = water * 3.2;
    waterLevel.style.height = `${waterPercentage}px`;
}

function addWaterAutomatically() {
    if (water < 100) {
        water++;
    }
    updateWaterLevel();
}

function triggerOutwardTransition() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const spinImage = document.createElement('div');
        spinImage.className = 'spin-image';
        spinImage.style.transform = `translate(-50%, -50%) translate(0, 0) rotate(${i * 90}deg)`; // Rotate each image by 90 degrees
        container.appendChild(spinImage);
        spinImage.offsetHeight;
        spinImage.style.transform = `translate(-50%, -50%) translate(${Math.cos((i * Math.PI) / Math.random(0,1)) * 400}px, ${Math.sin((i * Math.PI) / Math.random(0,1)) * 500}px) rotate(360deg)`;
        spinImage.style.opacity = 0;
    }
}
plot.addEventListener('click', function() {
    updatePlot();
    clearInterval(wateringTimer);
    wateringTimer = setInterval(addWaterAutomatically, 1000);
    if (water != 0) {
        clickPlus();
    }

});

function clickPlus() {
    var textElement = document.createElement('div');
    textElement.className = 'click-visual';
    textElement.innerHTML = '<p>+' + clickAdder + '</p>';
    document.body.appendChild(textElement);
    textElement.style.opacity = '0';
    textElement.style.fontSize = '30px';
    textElement.style.fontFamily = 'Helvetica';
    textElement.style.color = '#efd4c1';
    textElement.style.position = 'absolute';
    textElement.style.top = '43%';
    textElement.style.left = '29.5%';
    textElement.style.animation = 'fadeOutUp .75s ease-out';
    setTimeout(function() {
        textElement.style.animation = 'fadeInDown .75s ease-out';
        textElement.parentNode.removeChild(textElement);
    }, 1000);
}

updatePlot();
wateringTimer = setInterval(addWaterAutomatically, 1000);

function wiggleElement(element) {
    if (currentState == 3) {
        element.classList.add('wiggle');
        setTimeout(() => {
            element.classList.remove('wiggle');
        }, 400);
    }
}

function clicked(event) {
    const clickedImage = event.target;
    if (clickedImage.classList.contains('clickable')) {
        if (clickedImage.alt === 'x2clicks') {
            if (money >= 20) {
                clickAdder = clickAdder + clickAdder;
                money -= 20;
                htmlMoney.textContent = "Gold: " + money;
            }
        } else if (clickedImage.alt === 'x2money') {
            if (money >= 30) {
                moneyAdder = moneyAdder + moneyAdder;
                money -= 30;
                htmlMoney.textContent = "Gold: " + money;
            }
        } else if (clickedImage.alt === 'fillwater') {
            if (money >= 20) {
                water = 100;
                money -= 20;
                htmlMoney.textContent = "Gold: " + money;
            }
        } else if (clickedImage.alt === 'plot') {
            console.log(`throw it backd`);
            updatePlot();
            clearInterval(wateringTimer);
            wateringTimer = setInterval(addWaterAutomatically, 1000);
            clickPlus();
        }

    }
}