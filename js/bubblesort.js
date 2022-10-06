const inputBox = document.getElementById('input-box');
const homeDiv = document.getElementById('home');
const showArray = document.getElementById('show-array');
const animationBtn = document.getElementById('animation-btn');
var bars = [];

function generateBarsFromArray() {
    const numberString = inputBox.value;

    if (numberString.length == 0) return

    bars = []
    homeDiv.textContent = '';
    inputBox.value = '';

    const numberArray = numberString.split(',').map((number) => parseInt(number));
    showArray.innerHTML = `[${numberArray}]`;

    numberArray.forEach((height) => {
        const div = createDiv(height);
        homeDiv.appendChild(div);
        bars.push(div);
    });
}

function createDiv(height) {
    const div = document.createElement('div');
    div.classList = 'bar';
    div.dataset.value = `${height}`;
    div.style.height = `${height * 2 + 1}px`;

    return div;
}

function removeSortedClass(bars) {
    bars.forEach((div => {
        div.classList.remove('sorted');
    }));
}

async function bubbleSort(bars) {
    removeSortedClass(bars);

    for (let i = 1; i <= bars.length; i++) {
        for (let j = 0; j < bars.length - i; j++) {

            bars[j].classList.add('compare');
            bars[j + 1].classList.add('compare');
            await sleep(500);
            bars[j].classList.remove('compare');
            bars[j + 1].classList.remove('compare');

            if (parseInt(bars[j].dataset.value) > parseInt(bars[j + 1].dataset.value)) {
                bars[j].classList.add('swap');
                bars[j + 1].classList.add('swap');
                await sleep(500);
                bars[j].classList.remove('swap');
                bars[j + 1].classList.remove('swap');

                swap(bars[j], bars[j + 1]);
            }
        }

        bars[bars.length - i].classList.add('sorted');
    }
}

function swap(bar1, bar2) {
    const tempHeight = bar1.style.height;
    const tempValue = bar1.dataset.value;

    bar1.style.height = bar2.style.height;
    bar1.dataset.value = bar2.dataset.value;

    bar2.style.height = tempHeight;
    bar2.dataset.value = tempValue;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

animationBtn.addEventListener('click', () => {
    bubbleSort(bars);
});