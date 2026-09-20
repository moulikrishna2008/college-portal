/* =====================================================
   TEACHER DASHBOARD
===================================================== */


/* =====================================================
   CURRENT LOGGED-IN TEACHER
===================================================== */

const CURRENT_TEACHER_ID = "TCH001";
const CURRENT_TEACHER_NAME = "Demo Teacher";


/* =====================================================
   DEMO MATERIAL DATA
===================================================== */

let materials = [

    {
        id: 1,
        title: "DBMS Unit 1 Notes",
        branch: "CSE",
        year: "3rd Year",
        type: "Notes",
        uploadedBy: "Demo Teacher",
        teacherId: "TCH001"
    },

    {
        id: 2,
        title: "Digital Electronics Notes",
        branch: "ECE",
        year: "2nd Year",
        type: "Notes",
        uploadedBy: "Rahul Kumar",
        teacherId: "TCH002"
    },

    {
        id: 3,
        title: "Python Programming",
        branch: "CSE",
        year: "2nd Year",
        type: "PPT",
        uploadedBy: "Demo Teacher",
        teacherId: "TCH001"
    },

    {
        id: 4,
        title: "Engineering Mathematics",
        branch: "EEE",
        year: "1st Year",
        type: "Question Paper",
        uploadedBy: "Priya Sharma",
        teacherId: "TCH003"
    },

    {
        id: 5,
        title: "Computer Networks Unit 1",
        branch: "CSE",
        year: "3rd Year",
        type: "Reference",
        uploadedBy: "Suresh Kumar",
        teacherId: "TCH004"
    },

    {
        id: 6,
        title: "Operating Systems Notes",
        branch: "CSE",
        year: "3rd Year",
        type: "Notes",
        uploadedBy: "Demo Teacher",
        teacherId: "TCH001"
    }

];


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showSection("dashboard");

        setupMaterialUpload();

        setupMaterialDropArea();

        setupAllMaterialFilters();

        setupMyMaterialSearch();

        renderAllMaterials();

        renderMyMaterials();

        updateDashboardStats();

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


    /* Close mobile sidebar after selecting a section */

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


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

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
   MATERIAL UPLOAD SETUP
===================================================== */

function setupMaterialUpload() {

    const form =
        document.getElementById(
            "materialForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            uploadMaterial();

        }
    );

}


/* =====================================================
   UPLOAD MATERIAL
===================================================== */

function uploadMaterial() {

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


    const fileInput =
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
        !fileInput.files ||
        fileInput.files.length === 0
    ) {

        showMessage(
            message,
            "Please select a material file.",
            "error"
        );

        return;

    }


    const file =
        fileInput.files[0];


    if (!isValidMaterialFile(file)) {

        showMessage(
            message,
            "Please select a valid material file.",
            "error"
        );

        return;

    }


    const newMaterial = {

        id: Date.now(),

        title: title,

        branch: branch,

        year: year,

        type: type,

        uploadedBy:
            CURRENT_TEACHER_NAME,

        teacherId:
            CURRENT_TEACHER_ID

    };


    materials.unshift(
        newMaterial
    );


    showMessage(
        message,
        "Material uploaded successfully!",
        "success"
    );


    renderAllMaterials();

    renderMyMaterials();

    updateDashboardStats();


    setTimeout(
        function () {

            clearMaterialForm();

        },
        800
    );

}


/* =====================================================
   CLEAR UPLOAD FORM
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
   DRAG & DROP
===================================================== */

function setupMaterialDropArea() {

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

                const file =
                    fileInput.files[0];


                if (
                    !isValidMaterialFile(
                        file
                    )
                ) {

                    alert(
                        "Please select a valid material file."
                    );

                    fileInput.value = "";

                    if (fileName) {
                        fileName.textContent = "";
                    }

                    return;

                }


                showSelectedFile(
                    file,
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
                !isValidMaterialFile(
                    file
                )
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
                    "Browser does not allow assigning dropped files."
                );

            }


            showSelectedFile(
                file,
                fileName
            );

        }
    );

}


/* =====================================================
   VALID MATERIAL FILE
===================================================== */

function isValidMaterialFile(file) {

    const allowedExtensions = [

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


    return allowedExtensions.some(
        function (extension) {

            return fileName.endsWith(
                extension
            );

        }
    );

}


/* =====================================================
   SHOW SELECTED FILE
===================================================== */

function showSelectedFile(
    file,
    fileNameElement
) {

    if (!fileNameElement) {
        return;
    }


    fileNameElement.textContent =
        "Selected file: " +
        file.name;

}


/* =====================================================
   RENDER ALL MATERIALS
===================================================== */

function renderAllMaterials() {

    const body =
        document.getElementById(
            "allMaterialsBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    if (materials.length === 0) {

        body.innerHTML = `
            <tr>
                <td colspan="6"
                    class="empty-row">
                    No materials available
                </td>
            </tr>
        `;

        return;

    }


    materials.forEach(
        function (material) {

            const row =
                document.createElement(
                    "tr"
                );


            row.setAttribute(
                "data-id",
                material.id
            );


            row.innerHTML = `

                <td>
                    ${escapeHTML(material.title)}
                </td>

                <td>
                    ${escapeHTML(material.branch)}
                </td>

                <td>
                    ${escapeHTML(material.year)}
                </td>

                <td>
                    ${escapeHTML(material.type)}
                </td>

                <td>
                    ${escapeHTML(material.uploadedBy)}
                </td>

                <td>

                    <button
                        type="button"
                        class="view-btn"
                        onclick="viewMaterial(${material.id})">
                        View
                    </button>

                </td>

            `;


            body.appendChild(row);

        }
    );


    setupAllMaterialFilters();

}


/* =====================================================
   RENDER MY MATERIALS
===================================================== */

function renderMyMaterials() {

    const body =
        document.getElementById(
            "myMaterialsBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    const myMaterials =
        materials.filter(
            function (material) {

                return (
                    material.teacherId ===
                    CURRENT_TEACHER_ID
                );

            }
        );


    if (myMaterials.length === 0) {

        body.innerHTML = `
            <tr>
                <td colspan="6"
                    class="empty-row">
                    You have not uploaded any materials yet.
                </td>
            </tr>
        `;

        return;

    }


    myMaterials.forEach(
        function (material) {

            const row =
                document.createElement(
                    "tr"
                );


            row.setAttribute(
                "data-id",
                material.id
            );


            row.innerHTML = `

                <td>
                    ${escapeHTML(material.title)}
                </td>

                <td>
                    ${escapeHTML(material.branch)}
                </td>

                <td>
                    ${escapeHTML(material.year)}
                </td>

                <td>
                    ${escapeHTML(material.type)}
                </td>

                <td>
                    ${escapeHTML(material.uploadedBy)}
                </td>

                <td>

                    <button
                        type="button"
                        class="view-btn"
                        onclick="viewMaterial(${material.id})">
                        View
                    </button>

                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteMyMaterial(${material.id})">
                        Delete
                    </button>

                </td>

            `;


            body.appendChild(row);

        }
    );


    setupMyMaterialSearch();

}


/* =====================================================
   DELETE OWN MATERIAL ONLY
===================================================== */

function deleteMyMaterial(materialId) {

    const material =
        materials.find(
            function (item) {

                return item.id === materialId;

            }
        );


    if (!material) {

        alert(
            "Material not found."
        );

        return;

    }


    if (
        material.teacherId !==
        CURRENT_TEACHER_ID
    ) {

        alert(
            "You can delete only the materials uploaded by you."
        );

        return;

    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this material?"
        );


    if (!confirmation) {
        return;
    }


    materials =
        materials.filter(
            function (item) {

                return item.id !== materialId;

            }
        );


    renderAllMaterials();

    renderMyMaterials();

    updateDashboardStats();


    alert(
        "Your material has been deleted successfully."
    );

}


/* =====================================================
   VIEW MATERIAL
===================================================== */

function viewMaterial(materialId) {

    const material =
        materials.find(
            function (item) {

                return item.id === materialId;

            }
        );


    if (!material) {

        alert(
            "Material not found."
        );

        return;

    }


    alert(
        "Demo View\n\n" +

        "Material: " +
        material.title +

        "\nBranch: " +
        material.branch +

        "\nYear: " +
        material.year +

        "\nType: " +
        material.type +

        "\nUploaded By: " +
        material.uploadedBy
    );

}


/* =====================================================
   ALL MATERIAL SEARCH + FILTER
===================================================== */

function setupAllMaterialFilters() {

    const search =
        document.getElementById(
            "allMaterialSearch"
        );


    const branch =
        document.getElementById(
            "allBranchFilter"
        );


    const year =
        document.getElementById(
            "allYearFilter"
        );


    if (
        search &&
        !search.dataset.ready
    ) {

        search.addEventListener(
            "input",
            filterAllMaterials
        );

        search.dataset.ready = "true";

    }


    if (
        branch &&
        !branch.dataset.ready
    ) {

        branch.addEventListener(
            "change",
            filterAllMaterials
        );

        branch.dataset.ready = "true";

    }


    if (
        year &&
        !year.dataset.ready
    ) {

        year.addEventListener(
            "change",
            filterAllMaterials
        );

        year.dataset.ready = "true";

    }


    filterAllMaterials();

}


/* =====================================================
   FILTER ALL MATERIALS
===================================================== */

function filterAllMaterials() {

    const searchElement =
        document.getElementById(
            "allMaterialSearch"
        );


    const branchElement =
        document.getElementById(
            "allBranchFilter"
        );


    const yearElement =
        document.getElementById(
            "allYearFilter"
        );


    const search =
        searchElement
            ? searchElement.value
                .toLowerCase()
                .trim()
            : "";


    const branch =
        branchElement
            ? branchElement.value
            : "";


    const year =
        yearElement
            ? yearElement.value
            : "";


    const rows =
        document.querySelectorAll(
            "#allMaterialsBody tr"
        );


    rows.forEach(
        function (row) {

            if (
                row.querySelector(
                    ".empty-row"
                )
            ) {

                return;

            }


            const rowText =
                row.textContent
                    .toLowerCase();


            const rowBranch =
                row.children[1]
                    ? row.children[1]
                        .textContent
                        .trim()
                    : "";


            const rowYear =
                row.children[2]
                    ? row.children[2]
                        .textContent
                        .trim()
                    : "";


            const searchMatch =
                rowText.includes(
                    search
                );


            const branchMatch =
                !branch ||
                rowBranch === branch;


            const yearMatch =
                !year ||
                rowYear === year;


            row.style.display =
                searchMatch &&
                branchMatch &&
                yearMatch
                    ? ""
                    : "none";

        }
    );

}


/* =====================================================
   MY MATERIAL SEARCH
===================================================== */

function setupMyMaterialSearch() {

    const search =
        document.getElementById(
            "myMaterialSearch"
        );


    if (
        !search ||
        search.dataset.ready
    ) {

        return;

    }


    search.addEventListener(
        "input",
        function () {

            const value =
                search.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#myMaterialsBody tr"
                );


            rows.forEach(
                function (row) {

                    if (
                        row.querySelector(
                            ".empty-row"
                        )
                    ) {

                        return;

                    }


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


    search.dataset.ready = "true";

}


/* =====================================================
   DASHBOARD COUNTS
===================================================== */

function updateDashboardStats() {

    const myCount =
        materials.filter(
            function (material) {

                return (
                    material.teacherId ===
                    CURRENT_TEACHER_ID
                );

            }
        ).length;


    const myUploadCount =
        document.getElementById(
            "myUploadCount"
        );


    const allMaterialCount =
        document.getElementById(
            "allMaterialCount"
        );


    if (myUploadCount) {

        myUploadCount.textContent =
            myCount;

    }


    if (allMaterialCount) {

        allMaterialCount.textContent =
            materials.length;

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


    if (type === "success") {

        element.style.color =
            "#3c9b6d";

    } else {

        element.style.color =
            "#d05d78";

    }

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}