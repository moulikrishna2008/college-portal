/* =====================================================
   HOD DASHBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showSection("dashboard");

        setupDragDrop(
            "attendanceDropArea",
            "attendanceFile",
            "attendanceFileName"
        );

        setupDragDrop(
            "marksDropArea",
            "marksFile",
            "marksFileName"
        );

        setupMaterialDragDrop();

        setupSearch(
            "studentSearch",
            "studentTableBody"
        );

        setupSearch(
            "requestSearch",
            "requestTableBody"
        );

        setupSearch(
            "materialSearch",
            "materialTableBody"
        );

    }
);



/* =====================================================
   SECTION NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(
        function (section) {

            section.classList.remove(
                "active"
            );

        }
    );


    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    const selectedSection =
        document.getElementById(
            sectionId
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active"
        );

    }


    navItems.forEach(
        function (item) {

            const action =
                item.getAttribute(
                    "onclick"
                );


            if (
                action &&
                action.includes(
                    "'" + sectionId + "'"
                )
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    /* Close mobile menu */

    closeMobileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "mobileOverlay"
        );


    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "mobile-open"
    );


    if (overlay) {

        overlay.classList.toggle(
            "active"
        );

    }

}



function closeMobileMenu() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "mobileOverlay"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmation) {

        window.location.href =
            "../index.html";

    }

}



/* =====================================================
   GENERIC DRAG DROP
===================================================== */

function setupDragDrop(
    dropAreaId,
    fileInputId,
    fileNameId
) {

    const dropArea =
        document.getElementById(
            dropAreaId
        );


    const fileInput =
        document.getElementById(
            fileInputId
        );


    const fileName =
        document.getElementById(
            fileNameId
        );


    if (
        !dropArea ||
        !fileInput
    ) {

        return;

    }


    dropArea.addEventListener(
        "click",
        function () {

            fileInput.click();

        }
    );


    fileInput.addEventListener(
        "change",
        function () {

            if (
                fileInput.files &&
                fileInput.files.length
            ) {

                const file =
                    fileInput.files[0];


                if (
                    isExcelFile(file)
                ) {

                    if (fileName) {

                        fileName.textContent =
                            "Selected file: " +
                            file.name;

                    }

                } else {

                    fileInput.value = "";

                    if (fileName) {

                        fileName.textContent = "";

                    }

                    alert(
                        "Please select an Excel file (.xlsx or .xls)."
                    );

                }

            }

        }
    );


    dropArea.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropArea.classList.add(
                "drag-over"
            );

        }
    );


    dropArea.addEventListener(
        "dragleave",
        function () {

            dropArea.classList.remove(
                "drag-over"
            );

        }
    );


    dropArea.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropArea.classList.remove(
                "drag-over"
            );


            const files =
                event.dataTransfer.files;


            if (
                !files ||
                !files.length
            ) {

                return;

            }


            const file =
                files[0];


            if (
                !isExcelFile(file)
            ) {

                alert(
                    "Please select an Excel file (.xlsx or .xls)."
                );

                return;

            }


            try {

                const dataTransfer =
                    new DataTransfer();

                dataTransfer.items.add(
                    file
                );

                fileInput.files =
                    dataTransfer.files;

            } catch (error) {

                console.log(
                    "Dropped file selected."
                );

            }


            if (fileName) {

                fileName.textContent =
                    "Selected file: " +
                    file.name;

            }

        }
    );

}



/* =====================================================
   EXCEL VALIDATION
===================================================== */

function isExcelFile(file) {

    const name =
        file.name.toLowerCase();


    return (
        name.endsWith(".xlsx") ||
        name.endsWith(".xls")
    );

}



/* =====================================================
   MATERIAL DRAG DROP
===================================================== */

function setupMaterialDragDrop() {

    const dropArea =
        document.getElementById(
            "materialDropArea"
        );


    const fileInput =
        document.getElementById(
            "materialFile"
        );


    const fileName =
        document.getElementById(
            "materialFileName"
        );


    if (
        !dropArea ||
        !fileInput
    ) {

        return;

    }


    dropArea.addEventListener(
        "click",
        function () {

            fileInput.click();

        }
    );


    fileInput.addEventListener(
        "change",
        function () {

            if (
                fileInput.files &&
                fileInput.files.length
            ) {

                showMaterialFile(
                    fileInput.files[0],
                    fileName
                );

            }

        }
    );


    dropArea.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropArea.classList.add(
                "drag-over"
            );

        }
    );


    dropArea.addEventListener(
        "dragleave",
        function () {

            dropArea.classList.remove(
                "drag-over"
            );

        }
    );


    dropArea.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropArea.classList.remove(
                "drag-over"
            );


            const files =
                event.dataTransfer.files;


            if (
                !files ||
                !files.length
            ) {

                return;

            }


            const file =
                files[0];


            if (
                !isValidMaterialFile(file)
            ) {

                alert(
                    "Please select a valid material file."
                );

                return;

            }


            try {

                const dataTransfer =
                    new DataTransfer();

                dataTransfer.items.add(
                    file
                );

                fileInput.files =
                    dataTransfer.files;

            } catch (error) {

                console.log(
                    "Dropped material file selected."
                );

            }


            showMaterialFile(
                file,
                fileName
            );

        }
    );

}



/* =====================================================
   MATERIAL FILE VALIDATION
===================================================== */

function isValidMaterialFile(file) {

    const allowed =
        [
            ".pdf",
            ".doc",
            ".docx",
            ".ppt",
            ".pptx",
            ".xls",
            ".xlsx"
        ];


    const fileName =
        file.name.toLowerCase();


    return allowed.some(
        function (extension) {

            return fileName.endsWith(
                extension
            );

        }
    );

}



/* =====================================================
   SHOW MATERIAL FILE
===================================================== */

function showMaterialFile(
    file,
    element
) {

    if (!element) {
        return;
    }


    element.textContent =
        "Selected file: " +
        file.name;

}



/* =====================================================
   UPLOAD ATTENDANCE
===================================================== */

function uploadAttendance() {

    const file =
        document.getElementById(
            "attendanceFile"
        );


    const message =
        document.getElementById(
            "attendanceMessage"
        );


    if (
        !file ||
        !file.files ||
        !file.files.length
    ) {

        showMessage(
            message,
            "Please select an attendance Excel file.",
            "error"
        );

        return;

    }


    showMessage(
        message,
        "Attendance file uploaded successfully! Demo processing completed.",
        "success"
    );

}



/* =====================================================
   CLEAR ATTENDANCE
===================================================== */

function clearAttendance() {

    const file =
        document.getElementById(
            "attendanceFile"
        );


    const name =
        document.getElementById(
            "attendanceFileName"
        );


    const message =
        document.getElementById(
            "attendanceMessage"
        );


    if (file) {

        file.value = "";

    }


    if (name) {

        name.textContent = "";

    }


    if (message) {

        message.textContent = "";

    }

}



/* =====================================================
   UPLOAD MARKS
===================================================== */

function uploadMarks() {

    const file =
        document.getElementById(
            "marksFile"
        );


    const message =
        document.getElementById(
            "marksMessage"
        );


    if (
        !file ||
        !file.files ||
        !file.files.length
    ) {

        showMessage(
            message,
            "Please select a mid marks Excel file.",
            "error"
        );

        return;

    }


    showMessage(
        message,
        "Mid marks file uploaded successfully! Demo processing completed.",
        "success"
    );

}



/* =====================================================
   CLEAR MARKS
===================================================== */

function clearMarks() {

    const file =
        document.getElementById(
            "marksFile"
        );


    const name =
        document.getElementById(
            "marksFileName"
        );


    const message =
        document.getElementById(
            "marksMessage"
        );


    if (file) {

        file.value = "";

    }


    if (name) {

        name.textContent = "";

    }


    if (message) {

        message.textContent = "";

    }

}



/* =====================================================
   TEACHER FORM
===================================================== */

const teacherForm =
    document.getElementById(
        "teacherForm"
    );


if (teacherForm) {

    teacherForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const password =
                document.getElementById(
                    "teacherPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "teacherConfirmPassword"
                ).value;


            const message =
                document.getElementById(
                    "teacherMessage"
                );


            if (
                password !==
                confirmPassword
            ) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            showMessage(
                message,
                "Teacher account created successfully! Demo mode.",
                "success"
            );


            setTimeout(
                clearTeacherForm,
                700
            );

        }
    );

}



/* =====================================================
   CLEAR TEACHER
===================================================== */

function clearTeacherForm() {

    const form =
        document.getElementById(
            "teacherForm"
        );


    const message =
        document.getElementById(
            "teacherMessage"
        );


    if (form) {

        form.reset();

    }


    if (message) {

        message.textContent = "";

    }

}



/* =====================================================
   MATERIAL FORM
===================================================== */

const materialForm =
    document.getElementById(
        "materialForm"
    );


if (materialForm) {

    materialForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "materialTitle"
                ).value.trim();


            const branch =
                document.getElementById(
                    "materialBranch"
                ).value;


            const year =
                document.getElementById(
                    "materialYear"
                ).value;


            const type =
                document.getElementById(
                    "materialType"
                ).value;


            const file =
                document.getElementById(
                    "materialFile"
                );


            const message =
                document.getElementById(
                    "materialMessage"
                );


            if (
                !title ||
                !branch ||
                !year ||
                !type
            ) {

                showMessage(
                    message,
                    "Please fill all material details.",
                    "error"
                );

                return;

            }


            if (
                !file.files ||
                !file.files.length
            ) {

                showMessage(
                    message,
                    "Please select a material file.",
                    "error"
                );

                return;

            }


            showMessage(
                message,
                "Material uploaded successfully! Demo mode.",
                "success"
            );

        }
    );

}



/* =====================================================
   CLEAR MATERIAL
===================================================== */

function clearMaterialForm() {

    const form =
        document.getElementById(
            "materialForm"
        );


    const fileName =
        document.getElementById(
            "materialFileName"
        );


    const message =
        document.getElementById(
            "materialMessage"
        );


    if (form) {

        form.reset();

    }


    if (fileName) {

        fileName.textContent = "";

    }


    if (message) {

        message.textContent = "";

    }

}



/* =====================================================
   SEARCH
===================================================== */

function setupSearch(
    inputId,
    tableBodyId
) {

    const input =
        document.getElementById(
            inputId
        );


    const body =
        document.getElementById(
            tableBodyId
        );


    if (
        !input ||
        !body
    ) {

        return;

    }


    input.addEventListener(
        "input",
        function () {

            const value =
                input.value
                    .toLowerCase()
                    .trim();


            const rows =
                body.querySelectorAll(
                    "tr"
                );


            rows.forEach(
                function (row) {

                    row.style.display =
                        row.textContent
                            .toLowerCase()
                            .includes(value)
                            ? ""
                            : "none";

                }
            );

        }
    );

}



/* =====================================================
   REQUEST ACTIONS
===================================================== */

function approveRequest(button) {

    const row =
        button.closest("tr");


    if (!row) {
        return;
    }


    const status =
        row.querySelector(
            ".status"
        );


    if (status) {

        status.textContent =
            "Approved";

        status.className =
            "status active";

    }


    button.disabled = true;


    const rejectButton =
        row.querySelector(
            ".reject-btn"
        );


    if (rejectButton) {

        rejectButton.disabled = true;

    }

}



function rejectRequest(button) {

    const row =
        button.closest("tr");


    if (!row) {
        return;
    }


    const status =
        row.querySelector(
            ".status"
        );


    if (status) {

        status.textContent =
            "Rejected";

        status.className =
            "status rejected";

    }


    button.disabled = true;


    const approveButton =
        row.querySelector(
            ".approve-btn"
        );


    if (approveButton) {

        approveButton.disabled = true;

    }

}



/* =====================================================
   DEMO ACTIONS
===================================================== */

function viewStudent(button) {

    alert(
        "Demo: Student profile opened."
    );

}


function editStudent(button) {

    alert(
        "Demo: Student edit screen."
    );

}


function resetStudentPassword(button) {

    alert(
        "Demo: Student password reset."
    );

}


function viewTeacher(button) {

    alert(
        "Demo: Teacher profile opened."
    );

}


function editTeacher(button) {

    alert(
        "Demo: Teacher edit screen."
    );

}


function resetTeacherPassword(button) {

    alert(
        "Demo: Teacher password reset."
    );

}


function deleteTeacher(button) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this teacher?"
        );


    if (confirmation) {

        const row =
            button.closest("tr");


        if (row) {

            row.remove();

        }

    }

}


function viewMaterial(button) {

    alert(
        "Demo: Material opened."
    );

}


function deleteMaterial(button) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this material?"
        );


    if (confirmation) {

        const row =
            button.closest("tr");


        if (row) {

            row.remove();

        }

    }

}



/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    if (
        type === "success"
    ) {

        element.style.color =
            "#3c9b6d";

    } else {

        element.style.color =
            "#d05d78";

    }

}