// Element references
const ingredientsBtn = document.getElementById('toggleIngredients');
const stepsBtn = document.getElementById('toggleSteps');
const ingredientsList = document.getElementById('ingredients');
const stepsList = document.getElementById('steps');
const startBtn = document.getElementById('startCooking');
const nextBtn = document.getElementById('nextStep');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timer');
const printBtn = document.getElementById('printRecipe');

let currentStep = 0;
let countdown = null;
let totalTime = 45 * 60; // 45 minutes = 2700 seconds
let remaining = totalTime;

// Toggle Ingredients
ingredientsBtn.addEventListener('click', () => {
  ingredientsList.classList.toggle('hidden');
  ingredientsBtn.textContent = ingredientsList.classList.contains('hidden')
    ? 'Show Ingredients'
    : 'Hide Ingredients';
});

// Toggle Steps
stepsBtn.addEventListener('click', () => {
  stepsList.classList.toggle('hidden');
  stepsBtn.textContent = stepsList.classList.contains('hidden')
    ? 'Show Steps'
    : 'Hide Steps';
});

// Start Cooking
startBtn.addEventListener('click', () => {
  const steps = document.querySelectorAll('#steps li');
  steps.forEach(step => step.style.background = '');
  currentStep = 0;
  highlightStep(steps[currentStep]);
  nextBtn.disabled = false;
  startBtn.disabled = true;
  startCountdown();
});

// Next Step
nextBtn.addEventListener('click', () => {
  const steps = document.querySelectorAll('#steps li');
  if (currentStep < steps.length - 1) {
    steps[currentStep].style.background = '';
    currentStep++;
    highlightStep(steps[currentStep]);
    updateProgress((currentStep + 1) / steps.length * 100);
  } else {
    alert('🎉 All steps completed!');
    nextBtn.disabled = true;
    clearInterval(countdown);
  }
});

// Highlight Current Step
function highlightStep(step) {
  step.style.background = '#ffe5e5';
  step.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Progress Bar Update
function updateProgress(percent) {
  progressBar.style.width = percent + '%';
}

// Countdown Timer
function startCountdown() {
  timerDisplay.classList.remove('hidden');
  remaining = totalTime;
  updateTimerDisplay();
  clearInterval(countdown);
  countdown = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "⏱ Time’s Up!";
      return;
    }
    remaining--;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  let min = String(Math.floor(remaining / 60)).padStart(2, '0');
  let sec = String(remaining % 60).padStart(2, '0');
  timerDisplay.textContent = `⏱ ${min}:${sec}`;
}

// Print Function
printBtn.addEventListener('click', () => {
  window.print();
});
