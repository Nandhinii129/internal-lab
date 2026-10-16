
function showLogin() {
    document.getElementById("loginBox").hidden = false;
    document.getElementById("registerBox").hidden = true;
    document.getElementById("dashboard").hidden = true;
}

function showRegister() {
    document.getElementById("loginBox").hidden = true;
    document.getElementById("registerBox").hidden = false;
    document.getElementById("dashboard").hidden = true;
}

function register() {
    const name = document.getElementById("newUser").value.trim();
    const pass = document.getElementById("newPass").value;
    const msg = document.getElementById("regMsg");

    if (!name || !pass) {
        msg.textContent = "Please fill in all fields!";
        return;
    }

    if (localStorage.getItem("account_" + name) !== null) {
        msg.textContent = "Username already exists!";
        return;
    }

    localStorage.setItem("account_" + name, pass);

    document.getElementById("username").value = name;
    document.getElementById("password").value = "";
    document.getElementById("msg").textContent =
        "Account created! Please login.";

    showLogin();
}

function login() {
    const name = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;
    const savedPass = localStorage.getItem("account_" + name);

    if (savedPass !== null && savedPass === pass && pass !== "") {
        localStorage.setItem("savedUser", name);
        sessionStorage.setItem("loggedIn", "true");
        showDashboard();
    } else {
        document.getElementById("msg").textContent =
            "Invalid username or password!";
    }
}

function showDashboard() {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const name = localStorage.getItem("savedUser");

    if (loggedIn !== "true" || !name) {
        showLogin();
        return;
    }

    document.getElementById("loginBox").hidden = true;
    document.getElementById("registerBox").hidden = true;
    document.getElementById("dashboard").hidden = false;

    document.getElementById("displayUser").textContent = name;
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    localStorage.removeItem("savedUser");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("msg").textContent = "";

    showLogin();
}

window.onload = showDashboard;
