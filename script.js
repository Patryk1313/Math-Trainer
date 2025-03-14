let correctAnswer = 0;
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
document.getElementById("score").innerText = score;

const buttons = document.querySelectorAll(".operation-btn");
let selectedOperation = "random";

buttons.forEach(button => {
    button.addEventListener("click", function() {
        selectedOperation = this.dataset.op;
        buttons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        newQuestion();
    });
});

function getLevelSettings() {
    const level = document.getElementById("difficulty").value;
    switch (level) {
        case "easy": return { range: 20, operations: ["+", "-"] };
        case "medium": return { range: 100, operations: ["+", "-", "*"] };
        case "hard": return { range: 1000, operations: ["+", "-", "*", "/"] };
        default: return { range: 10, operations: ["+"] };
    }
}

function newQuestion() {
    const { range, operations } = getLevelSettings();
    let num1 = Math.floor(Math.random() * range) + 1;
    let num2 = Math.floor(Math.random() * range) + 1;
    let operator = selectedOperation;

    if (selectedOperation === "random") {
        operator = operations[Math.floor(Math.random() * operations.length)];
    }

    if (operator === "/") {
        num1 = num1 * num2; // Upewnia się, że wynik jest całkowity
    }

    correctAnswer = eval(`${num1} ${operator} ${num2}`);
    document.getElementById("question").innerText = `${num1} ${operator} ${num2} = ?`;
    document.getElementById("result").innerText = "";
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("answer").value);
    
    if (userAnswer === correctAnswer) {
        document.getElementById("result").innerText = "✅ Dobrze!";
        score++;
    } else {
        document.getElementById("result").innerText = `❌ Źle! Poprawna odpowiedź to: ${correctAnswer}`;
    }

    document.getElementById("score").innerText = score;
    localStorage.setItem("score", score);
    document.getElementById("answer").value = "";
    setTimeout(newQuestion, 1500); // Nowe działanie po 1,5 sekundy
}

function addNumber(num) {
    document.getElementById("answer").value += num;
}

function addMinus() {
    let inputField = document.getElementById("answer");
    if (inputField.value === "") {
        inputField.value = "-";
    } else if (!inputField.value.includes("-")) {
        inputField.value = "-" + inputField.value;
    }
}

function deleteLast() {
    let input = document.getElementById("answer").value;
    document.getElementById("answer").value = input.slice(0, -1);
}

function openMultiplicationPage() {
    window.location.href = "multiplication.html";
}

window.onload = newQuestion;
