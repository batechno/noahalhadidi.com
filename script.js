document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
    loadDarkMode();
});

function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    let num2 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    let operations = ["+", "-", "*"];
    let operation = operations[Math.floor(Math.random() * operations.length)];
    let question, ariaLabel, answer;

    switch (operation) {
        case "+":
            question = `${num1} + ${num2}`;
            ariaLabel = `${num1} plus ${num2}`;
            answer = num1 + num2;
            break;
        case "-":
            question = `${num1} - ${num2}`;
            ariaLabel = `${num1} minus ${num2}`;
            answer = num1 - num2;
            break;
        case "*":
            question = `${num1} * ${num2}`;
            ariaLabel = `${num1} times ${num2}`;
            answer = num1 * num2;
            break;
    }

    document.getElementById("captcha-question").textContent = question;
    document.getElementById("captcha-question").setAttribute("aria-label", ariaLabel);
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
