const topRow = document.querySelector('.top-row');
const bottomNumberEl = document.querySelector('.bottom-number');
const operatorEl = document.querySelector('.operator');
const input = document.getElementById('answer');
const message = document.getElementById('message');
const opButtons = document.querySelectorAll('.op-btn');
const levelButtons = document.querySelectorAll('.level-btn');

let currentAnswer = 0;
let currentLevel = 'medium';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSelectedOperations() {
    const selected = [];
    opButtons.forEach(btn => {
        if (btn.classList.contains('selected')) {
            selected.push(btn.getAttribute('data-op'));
        }
    });
    return selected;
}

function generateQuestion() {
    const selectedOps = getSelectedOperations();
    if (selectedOps.length === 0) selectedOps.push('+');

    const op = selectedOps[getRandomInt(0, selectedOps.length - 1)];
    let num1, num2;

    const ranges = {
        easy: { add: 10, sub: 10, mult: 5, div: 5 },
        medium: { add: 100, sub: 100, mult: 12, div: 12 },
        hard: { add: 1000, sub: 1000, mult: 20, div: 20 }
    };

    const r = ranges[currentLevel];

    switch (op) {
        case '+':
            num1 = getRandomInt(1, r.add);
            num2 = getRandomInt(1, r.add);
            currentAnswer = num1 + num2;
            break;
        case '-':
            num1 = getRandomInt(1, r.sub);
            num2 = getRandomInt(1, num1);
            currentAnswer = num1 - num2;
            break;
        case '×':
            num1 = getRandomInt(1, r.mult);
            num2 = getRandomInt(1, r.mult);
            currentAnswer = num1 * num2;
            break;
        case '÷':
            num2 = getRandomInt(2, r.div);
            currentAnswer = getRandomInt(1, r.div);
            num1 = currentAnswer * num2;
            break;
    }

    topRow.textContent = num1;
    bottomNumberEl.textContent = num2;
    operatorEl.textContent = op;

    input.value = '';
    input.focus();
    message.textContent = '';
}

function checkAnswer() {
    const userAnswer = input.value;
    if (userAnswer === '') return;

    const isCorrect = parseFloat(userAnswer) === currentAnswer;

    if (isCorrect) {
        message.textContent = 'Correct!';
        message.className = 'correct';
    } else {
        message.textContent = 'Wrong!';
        message.className = 'wrong';
    }

    setTimeout(generateQuestion, 500);
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedCount = getSelectedOperations().length;
        if (btn.classList.contains('selected') && selectedCount === 1) return;
        btn.classList.toggle('selected');
        generateQuestion();
    });
});

levelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        levelButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentLevel = btn.getAttribute('data-level');
        generateQuestion();
    });
});

generateQuestion();