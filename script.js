// Questions
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language is used for web interactivity?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "SQL", correct: false },
            { text: "PHP", correct: false }
        ]
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: [
            { text: "<a>", correct: true },
            { text: "<p>", correct: false },
            { text: "<img>", correct: false },
            { text: "<table>", correct: false }
        ]
    }
];

// Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show Question
function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML =
        (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

// Reset
function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Select Answer
function selectAnswer(e) {

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedBtn.style.background = "green";
    } else {
        selectedBtn.style.background = "red";
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.style.background = "green";
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Show Score
function showScore() {

    resetState();

    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Handle Next
function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }

});

startQuiz();