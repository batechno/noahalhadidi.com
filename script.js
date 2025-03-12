document.addEventListener("DOMContentLoaded", function () {
    loadHeaderFooter();
    loadDarkMode();

    // Accessibility improvement for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("aria-label", link.textContent + " (opens in a new tab)");
        let span = document.createElement("span");
        span.textContent = " (opens in a new tab)";
        span.classList.add("sr-only"); 
        link.appendChild(span);
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
