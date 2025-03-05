document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
    loadDarkMode();
});

// Function to toggle Dark Mode
function toggleDarkMode() {
    let body = document.body;
    body.classList.toggle("dark-mode");

    // Store the user's preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }
}

// Function to load Dark Mode preference
function loadDarkMode() {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}

// CAPTCHA Generation and Validation
function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    let num2 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    let operations = ["+", "-", "*"];
    let operation = operations[Math.floor(Math.random() * operations.length)];

    let question = `${num1} ${operation} ${num2}`;
    let answer;

    switch (operation) {
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
    }

    document.getElementById("captcha-question").textContent = question;
    document.getElementById("captcha-answer").value = answer; // Store correct answer securely
}

function validateCaptcha() {
    let userAnswer = document.getElementById("captcha").value.trim();
    let correctAnswer = document.getElementById("captcha-answer").value.trim();

    if (userAnswer === "" || isNaN(userAnswer) || parseInt(userAnswer) !== parseInt(correctAnswer)) {
        alert("Incorrect CAPTCHA. Please try again.");
        generateCaptcha(); // Generate a new CAPTCHA on failure
        return false;
    }

    // Show confirmation message
    document.getElementById("confirmation-message").style.display = "block";

    return true; // Form submits successfully
}
