let verifiedEmail = false;


/* =========================================
   STEP 1 - SEND OTP
========================================= */

function sendOTP() {

    const email =
        document.getElementById("collegeEmail")
        .value
        .trim();

    const message =
        document.getElementById("registerMessage");


    // Check email

    if (email === "") {

        message.textContent =
            "Please enter your college email.";

        message.style.color = "red";

        return;
    }


    // Basic email format check

    if (!email.includes("@")) {

        message.textContent =
            "Please enter a valid email address.";

        message.style.color = "red";

        return;
    }


    /*
    -----------------------------------------
    TEMPORARY DEMO OTP
    -----------------------------------------

    For now, the OTP is:

    123456

    In the final project, FastAPI will:
    1. Generate a real OTP
    2. Send it to the student's college email
    3. Verify the OTP
    -----------------------------------------
    */


    alert("Demo OTP: 123456");


    // Hide email step

    document.getElementById("emailStep")
        .style.display = "none";


    // Show OTP step

    document.getElementById("otpStep")
        .style.display = "block";


    message.textContent =
        "OTP has been sent to your college email.";

    message.style.color = "green";
}



/* =========================================
   STEP 2 - VERIFY OTP
========================================= */

function verifyOTP() {

    const otp =
        document.getElementById("otp")
        .value
        .trim();

    const message =
        document.getElementById("registerMessage");


    // Check OTP

    if (otp === "") {

        message.textContent =
            "Please enter the OTP.";

        message.style.color = "red";

        return;
    }


    // Temporary OTP verification

    if (otp !== "123456") {

        message.textContent =
            "Invalid OTP. Please try again.";

        message.style.color = "red";

        return;
    }


    // Email successfully verified

    verifiedEmail = true;


    message.textContent =
        "Email verified successfully.";

    message.style.color = "green";


    // Hide OTP step

    document.getElementById("otpStep")
        .style.display = "none";


    // Show student details

    document.getElementById("detailsStep")
        .style.display = "block";
}



/* =========================================
   STEP 3 - SUBMIT STUDENT REGISTRATION
========================================= */

function submitRegistration() {

    const message =
        document.getElementById("registerMessage");


    // Make sure email was verified

    if (!verifiedEmail) {

        message.textContent =
            "Please verify your college email first.";

        message.style.color = "red";

        return;
    }


    // Get student details

    const registrationId =
        document.getElementById("registrationId")
        .value
        .trim();


    const password =
        document.getElementById("password")
        .value;


    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;


    const branch =
        document.getElementById("branch")
        .value;


    const year =
        document.getElementById("year")
        .value;



    // Check all fields

    if (
        registrationId === "" ||
        password === "" ||
        confirmPassword === "" ||
        branch === "" ||
        year === ""
    ) {

        message.textContent =
            "Please fill in all the fields.";

        message.style.color = "red";

        return;
    }



    // Check password length

    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        message.style.color = "red";

        return;
    }



    // Check passwords

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.style.color = "red";

        return;
    }



    /*
    -----------------------------------------
    TEMPORARY REGISTRATION
    -----------------------------------------

    At this stage we are only testing
    the frontend.

    Later this information will be sent
    to the FastAPI backend.

    The backend will create:

    status = PENDING

    The student will NOT be able to login
    until the HOD approves the request.
    -----------------------------------------
    */


    message.textContent =
        "Registration submitted successfully. Waiting for HOD approval.";

    message.style.color = "green";


    // Disable submit button

    const submitButton =
        document.querySelector(
            "#detailsStep .main-btn"
        );

    submitButton.disabled = true;

    submitButton.textContent =
        "REGISTRATION SUBMITTED";


    /*
    Return to login after a short delay.

    This is only for frontend testing.
    */

    setTimeout(function() {

        window.location.href = "index.html";

    }, 3000);
}



/* =========================================
   BACK TO LOGIN
========================================= */

function goToLogin() {

    window.location.href = "index.html";

}