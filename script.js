const questions = [
    { q: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: 0 },
    { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { q: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
    { q: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Homer", "Dickens", "Tolstoy"], answer: 0 },
    { q: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
    { q: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { q: "Which is the fastest land animal?", options: ["Cheetah", "Horse", "Tiger", "Lion"], answer: 0 },
    { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Silver"], answer: 2 },
    { q: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: 1 },
    { q: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 },
    { q: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 1 },
    { q: "Who made this quiz?", options: ["AI", "Human", "Ismail", "Robot"], answer: 2 }
];

let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];
let timer;
let timeLeft = 20;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 1.0);
    currentIndex = 0;
    score = 0;
    resultEl.style.display = "none";
    questionEl.style.display = "block";
    optionsEl.style.display = "block";
    timerEl.style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQ = shuffledQuestions[currentIndex];
    questionEl.textContent = currentQ.q;
    currentQ.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option");
        btn.onclick = () => selectAnswer(btn, i);
        optionsEl.appendChild(btn);
    });
    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 0;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
}

function selectAnswer(button, index) {
    clearInterval(timer);
    const currentQ = shuffledQuestions[currentIndex];
    if (index === currentQ.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        // highlight correct one immediately
        [...optionsEl.children][currentQ.answer].classList.add("correct");
    }
    [...optionsEl.children].forEach(btn => btn.disabled = true);
    nextBtn.style.display = "block";
}

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";
    timerEl.style.display = "none";
    resultEl.style.display = "block";
    resultEl.innerHTML = `<h2>Your Score: ${score} / ${shuffledQuestions.length}</h2>`;
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // auto-show correct answer if not selected
            const currentQ = shuffledQuestions[currentIndex];
            [...optionsEl.children][currentQ.answer].classList.add("correct");
            [...optionsEl.children].forEach(btn => btn.disabled = true);
            nextBtn.style.display = "block";
        }
    }, 1000);
}

startQuiz();