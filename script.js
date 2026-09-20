/* =========================================
   LOGIN ELEMENTS
========================================= */

const loginForm = document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordToggle.textContent = "🙈";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            passwordToggle.textContent = "👁";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    });
}


/* =========================================
   LOGIN FORM
========================================= */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const userId =
            document.getElementById("userId").value.trim();

        const password =
            passwordInput.value;


        /* ================================
           HOD
        ================================= */

        if (
            userId === "HOD001" &&
            password === "hod123"
        ) {

            loginSuccess(
                "admin/admin-dashboard.html"
            );

            return;
        }


        /* ================================
           TEACHER
        ================================= */

        if (
            userId === "TCH001" &&
            password === "teacher123"
        ) {

            loginSuccess(
                "teacher/teacher-dashboard.html"
            );

            return;
        }


        /* ================================
           STUDENT
        ================================= */

        if (
            userId === "23CSE001" &&
            password === "student123"
        ) {

            loginSuccess(
                "student/student-dashboard.html"
            );

            return;
        }


        /* ================================
           INVALID
        ================================= */

        showLoginMessage(
            "Invalid User ID or Password.",
            false
        );

    });
}


/* =========================================
   LOGIN SUCCESS
========================================= */

function loginSuccess(destination) {

    showLoginMessage(
        "Login successful!",
        true
    );

    setTimeout(function () {

        window.location.href = destination;

    }, 500);
}


/* =========================================
   LOGIN MESSAGE
========================================= */

function showLoginMessage(message, success) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = message;

    loginMessage.style.color =
        success
            ? "#86efac"
            : "#fca5a5";
}


/* =========================================
   STUDENT REGISTRATION
========================================= */

function openRegister() {

    window.location.href =
        "register.html";
}