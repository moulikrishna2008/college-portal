const loginForm = document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const userId =
        document.getElementById("userId")
        .value
        .trim();


    const password =
        document.getElementById("password")
        .value;


    /*
    -----------------------------------------
    TEMPORARY TEST ACCOUNTS
    -----------------------------------------

    HOD
    User ID: HOD001
    Password: hod123

    TEACHER
    User ID: TCH001
    Password: teacher123

    STUDENT
    User ID: 23CSE001
    Password: student123

    These are only for testing the frontend.
    Later the FastAPI backend will handle
    real accounts and passwords.
    -----------------------------------------
    */


    // HOD LOGIN

    if (
        userId === "HOD001" &&
        password === "hod123"
    ) {

        loginMessage.textContent =
            "HOD login successful!";

        loginMessage.style.color = "green";


        setTimeout(function() {

            window.location.href =
                "admin/admin-dashboard.html";

        }, 700);

    }


    // TEACHER LOGIN

    else if (
        userId === "TCH001" &&
        password === "teacher123"
    ) {

        loginMessage.textContent =
            "Teacher login successful!";

        loginMessage.style.color = "green";


        setTimeout(function() {

            window.location.href =
                "teacher/teacher-dashboard.html";

        }, 700);

    }


    // STUDENT LOGIN

    else if (
        userId === "23CSE001" &&
        password === "student123"
    ) {

        loginMessage.textContent =
            "Student login successful!";

        loginMessage.style.color = "green";


        setTimeout(function() {

            window.location.href =
                "student/student-dashboard.html";

        }, 700);

    }


    // INVALID LOGIN

    else {

        loginMessage.textContent =
            "Invalid User ID or Password.";

        loginMessage.style.color = "red";

    }

});


// OPEN STUDENT REGISTRATION

function openRegister() {

    window.location.href =
        "register.html";

}