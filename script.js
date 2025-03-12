let correctCaptchaAnswer; // Store the CAPTCHA answer securely

document.addEventListener("DOMContentLoaded", function () {
    loadHeaderFooter();
    generateCaptcha();
    loadDarkMode();

    // Attach event listener to the form
    document.querySelector("form").addEventListener("submit", function (event) {
        if (!validateCaptcha()) {
            event.preventDefault(); // Stop form submission if CAPTCHA is wrong
        }
    });
});

// Load header and footer dynamically
function loadHeaderFooter() {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        });
}

// Dark mode functions
function toggleDarkMode() {
    let body = document.body;
    body.classList.toggle("dark-mode");

    localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
}

function loadDarkMode() {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}

// Accessibility improvement for external links
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("aria-label", link.textContent + " (opens in a new tab)");
        let span = document.createElement("span");
        span.textContent = " (opens in a new tab)";
        span.classList.add("sr-only"); 
        link.appendChild(span);
    });
});

// Generate CAPTCHA
function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operations = ["+", "-", "*"];
    let operation = operations[Math.floor(Math.random() * operations.length)];
    let question, ariaLabel;

    switch (operation) {
        case "+":
            question = `${num1} + ${num2}`;
            ariaLabel = `${num1} plus ${num2}`;
            correctCaptchaAnswer = num1 + num2;
            break;
        case "-":
            question = `${num1} - ${num2}`;
            ariaLabel = `${num1} minus ${num2}`;
            correctCaptchaAnswer = num1 - num2;
            break;
        case "*":
            question = `${num1} * ${num2}`;
            ariaLabel = `${num1} times ${num2}`;
            correctCaptchaAnswer = num1 * num2;
            break;
    }

    document.getElementById("captcha-question").textContent = question;
    document.getElementById("captcha-question").setAttribute("aria-label", ariaLabel);
}

// Validate CAPTCHA before form submission
function validateCaptcha() {
    let userAnswer = document.getElementById("captcha").value.trim();

    if (userAnswer === "" || isNaN(userAnswer) || parseInt(userAnswer) !== correctCaptchaAnswer) {
        alert("Incorrect CAPTCHA. Please try again.");
        generateCaptcha(); // Generate a new CAPTCHA on failure
        return false;
    }

    // Show confirmation message if needed
    document.getElementById("confirmation-message").style.display = "block";

    return true; // Allows form submission
}
