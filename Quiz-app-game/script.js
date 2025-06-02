const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Harry Potter'?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "Mark Twain", "Agatha Christie"],
    answer: "J.K. Rowling"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "HyperText Markup Language",
      "Hyper Transfer Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which tag is used to link an external CSS file in HTML?",
    options: ["<script>", "<style>", "<link>", "<css>"],
    answer: "<link>"
  },
  {
    question: "Which property is used to change the text color in CSS?",
    options: ["font-color", "text-color", "color", "style"],
    answer: "color"
  },
  {
    question: "What does DOM stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Display Output Model",
      "Data Object Method",
      "Dynamic Option Module"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which HTML tag is used to create a button?",
    options: ["<input>", "<a>", "<button>", "<form>"],
    answer: "<button>"
  },

  // General Knowledge Questions
  {
    question: "Who is the current CEO of Tesla (as of 2025)?",
    options: ["Elon Musk", "Sundar Pichai", "Jeff Bezos", "Tim Cook"],
    answer: "Elon Musk"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile"
  },
  {
    question: "Which planet is known as the 'Morning Star'?",
    options: ["Mars", "Venus", "Mercury", "Saturn"],
    answer: "Venus"
  },
  {
    question: "Who wrote the national anthem of India?",
    options: [
      "Rabindranath Tagore",
      "Bankim Chandra Chattopadhyay",
      "Mahatma Gandhi",
      "Subhash Chandra Bose"
    ],
    answer: "Rabindranath Tagore"
  },
  {
    question: "Which year did India gain independence?",
    options: ["1945", "1947", "1950", "1948"],
    answer: "1947"
  }
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    scoreBox.textContent = `Score: ${score}`;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

nextBtn.onclick = () => {
  if (currentQuestion < quizData.length) {
    loadQuestion();
  }
};

loadQuestion();
