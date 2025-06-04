// Banco de preguntas de programación (15 preguntas)
const questions = [
    {
        question: "¿Qué lenguaje de programación se utiliza principalmente para desarrollo web frontend?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: 2
    },
    {
        question: "¿Qué significa HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "¿Cuál de estos NO es un tipo de dato primitivo en JavaScript?",
        options: ["String", "Boolean", "Number", "Array"],
        answer: 3
    },
    {
        question: "¿Qué estructura de control se utiliza para repetir un bloque de código?",
        options: ["if-else", "switch", "for", "try-catch"],
        answer: 2
    },
    {
        question: "¿Qué método se usa para agregar un elemento al final de un array en JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        question: "¿Qué paradigma de programación se centra en objetos y clases?",
        options: [
            "Programación funcional",
            "Programación orientada a objetos",
            "Programación procedural",
            "Programación lógica"
        ],
        answer: 1
    },
    {
        question: "¿Qué es Git?",
        options: [
            "Un lenguaje de programación",
            "Un sistema de control de versiones",
            "Un editor de código",
            "Un framework de JavaScript"
        ],
        answer: 1
    },
    {
        question: "¿Qué etiqueta HTML se usa para enlazar un archivo CSS?",
        options: ["<script>", "<style>", "<link>", "<css>"],
        answer: 2
    },
    {
        question: "¿Qué operador se usa para comparar valor y tipo en JavaScript?",
        options: ["==", "===", "=", "!=="],
        answer: 1
    },
    {
        question: "¿Qué método convierte un objeto a cadena JSON en JavaScript?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.toText()"
        ],
        answer: 1
    },
    {
        question: "¿Qué propiedad CSS se usa para cambiar el color de texto?",
        options: ["text-color", "font-color", "color", "text-style"],
        answer: 2
    },
    {
        question: "¿Qué significa API?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Interface",
            "Automated Programming Interface",
            "Application Process Integration"
        ],
        answer: 0
    },
    {
        question: "¿Qué estructura de datos funciona con el principio LIFO?",
        options: ["Cola", "Lista enlazada", "Pila", "Árbol binario"],
        answer: 2
    },
    {
        question: "¿Qué lenguaje NO se ejecuta en el navegador?",
        options: ["JavaScript", "TypeScript", "Python", "Dart"],
        answer: 2
    },
    {
        question: "¿Qué método selecciona un elemento por su ID en JavaScript?",
        options: [
            "document.querySelector()",
            "document.getElementById()",
            "document.getElementsByClassName()",
            "document.findElement()"
        ],
        answer: 1
    }
];

// Variables globales
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 minutos en segundos
let selectedQuestions = [];
let userAnswers = [];
let username = "";

// Elementos del DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const questionCountDisplay = document.getElementById("question-count");
const resultUsername = document.getElementById("result-username");
const scoreDisplay = document.getElementById("score");
const percentageDisplay = document.getElementById("percentage");
const answersReview = document.getElementById("answers-review");
const newQuizBtn = document.getElementById("new-quiz-btn");
const menuBtn = document.getElementById("menu-btn");
const scoreTableBody = document.getElementById("score-body");

// Event Listeners
usernameInput.addEventListener("input", () => {
    startBtn.disabled = usernameInput.value.trim() === "";
});

document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    startQuiz();
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

newQuizBtn.addEventListener("click", startNewQuiz);
menuBtn.addEventListener("click", returnToMenu);

// Cargar ranking al iniciar
loadScores();

// Funciones
function startQuiz() {
    username = usernameInput.value.trim();
    selectedQuestions = getRandomQuestions(10);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    
    startTimer();
    showQuestion();
}

function getRandomQuestions(count) {
    // Copia del array de preguntas
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Actualizar contador de preguntas
    questionCountDisplay.textContent = `Pregunta ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
    
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = "";
    
    // Crear botones de opciones
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    // Ocultar botón siguiente hasta que se seleccione una respuesta
    nextBtn.classList.add("hidden");
}

function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const options = document.querySelectorAll(".option-btn");
    
    // Guardar respuesta del usuario
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selected: selectedIndex,
        correct: selectedIndex === question.answer
    });
    
    // Deshabilitar todas las opciones
    options.forEach(option => {
        option.classList.add("disabled");
        option.disabled = true;
    });
    
    // Resaltar respuesta correcta e incorrecta
    options[question.answer].classList.add("correct");
    if (selectedIndex !== question.answer) {
        options[selectedIndex].classList.add("incorrect");
    } else {
        score++;
    }
    
    // Mostrar botón siguiente
    nextBtn.classList.remove("hidden");
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function finishQuiz() {
    clearInterval(timer);
    
    // Ocultar quiz y mostrar resultados
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    // Mostrar resultados
    resultUsername.textContent = username;
    scoreDisplay.textContent = score;
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    percentageDisplay.textContent = percentage;
    
    // Mostrar revisión de respuestas
    answersReview.innerHTML = "";
    selectedQuestions.forEach((question, index) => {
        const userAnswer = userAnswers.find(a => a.questionIndex === index);
        const answerItem = document.createElement("div");
        answerItem.classList.add("answer-item");
        
        if (userAnswer.correct) {
            answerItem.classList.add("correct");
            answerItem.innerHTML = `
                <p><strong>Pregunta ${index + 1}:</strong> ${question.question}</p>
                <p>Tu respuesta: <span class="correct-text">${question.options[userAnswer.selected]}</span></p>
            `;
        } else {
            answerItem.classList.add("incorrect");
            answerItem.innerHTML = `
                <p><strong>Pregunta ${index + 1}:</strong> ${question.question}</p>
                <p>Tu respuesta: <span class="incorrect-text">${question.options[userAnswer.selected]}</span></p>
                <p>Respuesta correcta: <span class="correct-text">${question.options[question.answer]}</span></p>
            `;
        }
        
        answersReview.appendChild(answerItem);
    });
    
    // Guardar puntuación
    saveScore();
}

function saveScore() {
    const scores = JSON.parse(localStorage.getItem("programmingScores")) || [];
    const newScore = {
        name: username,
        score: score,
        date: new Date().toLocaleDateString(),
        percentage: Math.round((score / selectedQuestions.length) * 100)
    };
    
    scores.push(newScore);
    // Ordenar por puntaje (mayor a menor)
    scores.sort((a, b) => b.score - a.score);
    // Mantener solo los top 5
    const topScores = scores.slice(0, 5);
    
    localStorage.setItem("programmingScores", JSON.stringify(topScores));
    loadScores();
}

function loadScores() {
    const scores = JSON.parse(localStorage.getItem("programmingScores")) || [];
    scoreTableBody.innerHTML = "";
    
    scores.forEach((score, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.score}</td>
            <td>${score.date}</td>
        `;
        scoreTableBody.appendChild(row);
    });
}

function startNewQuiz() {
    // Resetear variables
    timeLeft = 300;
    userAnswers = [];
    
    // Ocultar resultados y mostrar quiz
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    
    // Seleccionar nuevas preguntas aleatorias
    selectedQuestions = getRandomQuestions(10);
    currentQuestionIndex = 0;
    score = 0;
    
    // Iniciar timer y mostrar primera pregunta
    startTimer();
    showQuestion();
}

function returnToMenu() {
    // Resetear variables
    timeLeft = 300;
    userAnswers = [];
    
    // Ocultar resultados y mostrar menú
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    
    // Limpiar nombre de usuario
    usernameInput.value = "";
    startBtn.disabled = true;
}