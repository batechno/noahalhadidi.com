document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
});

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
    return true;
}
