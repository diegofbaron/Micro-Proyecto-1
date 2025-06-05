// Preguntas
const questions = [
    {
        question: "¿Qué compañía desarrolló la serie de juegos 'The Legend of Zelda'?",
        options: ["Sony", "Nintendo", "Microsoft", "Sega"],
        answer: 1
    },
    {
        question: "¿Cuál es el nombre del fontanero más famoso de los videojuegos?",
        options: ["Sonic", "Mario", "Luigi", "Donkey Kong"],
        answer: 1
    },
    {
        question: "¿En qué año se lanzó 'Pokémon Rojo' y 'Pokémon Azul'?",
        options: ["1990", "1996", "2001", "1985"],
        answer: 1
    },
    {
        question: "¿Qué juego popularizó el género 'battle royale'?",
        options: ["Fortnite", "PlayerUnknown's Battlegrounds", "Apex Legends", "Call of Duty: Warzone"],
        answer: 1
    },
    {
        question: "¿Cuál es el nombre del protagonista de 'The Witcher'?",
        options: ["Geralt de Rivia", "Ezio Auditore", "Kratos", "Master Chief"],
        answer: 0
    },
    {
        question: "¿Qué consola es la más vendida de todos los tiempos?",
        options: ["PlayStation 2", "Nintendo DS", "Xbox 360", "Game Boy"],
        answer: 0
    },
    {
        question: "¿En qué juego aparece el personaje 'Cloud Strife'?",
        options: ["Final Fantasy VII", "Kingdom Hearts", "Dragon Quest", "Chrono Trigger"],
        answer: 0
    },
    {
        question: "¿Qué juego tiene como protagonista a 'Kratos'?",
        options: ["God of War", "Devil May Cry", "Dark Souls", "Bayonetta"],
        answer: 0
    },
    {
        question: "¿Cuál fue el primer juego de la serie 'Call of Duty'?",
        options: ["Call of Duty", "Call of Duty 2", "Call of Duty: Modern Warfare", "Call of Duty: World at War"],
        answer: 0
    },
    {
        question: "¿Qué juego introdujo el sistema de 'captura de gimnasios'?",
        options: ["Digimon", "Pokémon", "Yu-Gi-Oh!", "Dragon Quest Monsters"],
        answer: 1
    },
    {
        question: "¿Cuál es el nombre del villano principal en 'The Legend of Zelda: Ocarina of Time'?",
        options: ["Ganondorf", "Bowser", "Sephiroth", "Ganon"],
        answer: 0
    },
    {
        question: "¿Qué juego tiene el récord de más jugadores simultáneos en Steam?",
        options: ["Dota 2", "Counter-Strike 2", "PUBG", "Cyberpunk 2077"],
        answer: 2
    },
    {
        question: "¿En qué año se fundó Nintendo?",
        options: ["1889", "1950", "1977", "1985"],
        answer: 0
    },
    {
        question: "¿Qué personaje es conocido como 'La Princesa del Destello'?",
        options: ["Princess Peach", "Zelda", "Samus Aran", "Lara Croft"],
        answer: 2
    },
    {
        question: "¿Cuál es el nombre del estudio que desarrolló 'Elden Ring'?",
        options: ["FromSoftware", "Bethesda", "CD Projekt Red", "Ubisoft"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300; 
let selectedQuestions = [];
let userAnswers = [];
let username = "";

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
const userForm = document.getElementById("user-form");

document.addEventListener('DOMContentLoaded', function() {
    usernameInput.addEventListener('input', function() {
        startBtn.disabled = this.value.trim() === '';
    });

    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (usernameInput.value.trim() !== '') {
            startQuiz();
        }
    });

    
    loadScores();
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
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionCountDisplay.textContent = `Pregunta ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    nextBtn.classList.add("hidden");
}

function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const options = document.querySelectorAll(".option-btn");
    
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selected: selectedIndex,
        correct: selectedIndex === question.answer
    });
    
    options.forEach(option => {
        option.classList.add("disabled");
        option.disabled = true;
    });
    
    options[question.answer].classList.add("correct");
    if (selectedIndex !== question.answer) {
        options[selectedIndex].classList.add("incorrect");
    } else {
        score++;
    }
    
    nextBtn.classList.remove("hidden");
}

function startTimer() {
    clearInterval(timer); 
    timeLeft = 300;
    updateTimerDisplay();
    
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
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    resultUsername.textContent = username;
    scoreDisplay.textContent = score;
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    percentageDisplay.textContent = percentage;
    
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
    
    saveScore();
}

function saveScore() {
    const scores = JSON.parse(localStorage.getItem("videogameScores")) || [];
    const newScore = {
        name: username,
        score: score,
        date: new Date().toLocaleDateString(),
        percentage: Math.round((score / selectedQuestions.length) * 100)
    };
    
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 5);
    
    localStorage.setItem("videogameScores", JSON.stringify(topScores));
    loadScores();
}

function loadScores() {
    const scores = JSON.parse(localStorage.getItem("videogameScores")) || [];
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
    timeLeft = 300;
    userAnswers = [];
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    selectedQuestions = getRandomQuestions(10);
    currentQuestionIndex = 0;
    score = 0;
    startTimer();
    showQuestion();
}

function returnToMenu() {
    timeLeft = 300;
    userAnswers = [];
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    usernameInput.value = "";
    startBtn.disabled = true;
    loadScores();
}