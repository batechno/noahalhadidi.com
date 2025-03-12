document.addEventListener("DOMContentLoaded", function () {
    loadHeaderFooter();
    loadDarkMode();

    // تحسين إمكانية الوصول للروابط الخارجية
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("aria-label", link.textContent + " (يفتح في علامة تبويب جديدة)");
        let span = document.createElement("span");
        span.textContent = " (يفتح في علامة تبويب جديدة)";
        span.classList.add("sr-only"); 
        link.appendChild(span);
    });
});

// تحميل الرأس والتذييل ديناميكيًا
function loadHeaderFooter() {
    fetch("header-ar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        });

    fetch("footer-ar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        });
}

// وظائف الوضع الليلي
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
