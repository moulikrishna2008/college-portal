/* =====================================================
   STUDENT DASHBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    showSection("dashboard");

    setupMaterialSearch();

    setupMaterialFilters();

});



/* =====================================================
   SECTION NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(function (section) {

        section.classList.remove("active");

    });


    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(
            sectionId
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active"
        );

    }


    navItems.forEach(function (item) {

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

            item.classList.add("active");

        }

    });


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

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        window.location.href =
            "../index.html";

    }

}



/* =====================================================
   MATERIAL SEARCH
===================================================== */

function setupMaterialSearch() {

    const searchInput =
        document.getElementById(
            "materialSearch"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        filterMaterials
    );

}



/* =====================================================
   MATERIAL FILTERS
===================================================== */

function setupMaterialFilters() {

    const branchFilter =
        document.getElementById(
            "branchFilter"
        );


    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    if (branchFilter) {

        branchFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    if (yearFilter) {

        yearFilter.addEventListener(
            "change",
            filterMaterials
        );

    }

}



/* =====================================================
   FILTER MATERIALS
===================================================== */

function filterMaterials() {

    const searchInput =
        document.getElementById(
            "materialSearch"
        );

    const branchFilter =
        document.getElementById(
            "branchFilter"
        );

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const branchValue =
        branchFilter
            ? branchFilter.value
            : "";


    const yearValue =
        yearFilter
            ? yearFilter.value
            : "";


    const rows =
        document.querySelectorAll(
            "#materialTableBody tr"
        );


    rows.forEach(function (row) {

        if (
            row.classList.contains(
                "empty-row"
            )
        ) {
            return;
        }


        const rowText =
            row.textContent.toLowerCase();


        const branchCell =
            row.children[1]
                ? row.children[1]
                    .textContent
                    .trim()
                : "";


        const yearCell =
            row.children[2]
                ? row.children[2]
                    .textContent
                    .trim()
                : "";


        const matchesSearch =
            rowText.includes(
                searchValue
            );


        const matchesBranch =
            !branchValue ||
            branchCell === branchValue;


        const matchesYear =
            !yearValue ||
            yearCell === yearValue;


        row.style.display =
            matchesSearch &&
            matchesBranch &&
            matchesYear
                ? ""
                : "none";

    });

}



/* =====================================================
   DEMO MATERIAL DATA
===================================================== */

function addDemoMaterial(
    title,
    branch,
    year,
    type,
    uploadedBy
) {

    const tableBody =
        document.getElementById(
            "materialTableBody"
        );


    if (!tableBody) {
        return;
    }


    const emptyRow =
        tableBody.querySelector(
            ".empty-row"
        );


    if (emptyRow) {
        emptyRow.remove();
    }


    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td>${title}</td>
        <td>${branch}</td>
        <td>${year}</td>
        <td>${type}</td>
        <td>${uploadedBy}</td>
        <td>
            <button
                type="button"
                class="view-btn"
                onclick="viewMaterial('${title}')">
                View
            </button>
        </td>
    `;


    tableBody.appendChild(row);


    updateMaterialCount();

}



/* =====================================================
   VIEW MATERIAL
===================================================== */

function viewMaterial(title) {

    alert(
        "Demo: Opening material - " +
        title
    );

}



/* =====================================================
   MATERIAL COUNT
===================================================== */

function updateMaterialCount() {

    const rows =
        document.querySelectorAll(
            "#materialTableBody tr:not(.empty-row)"
        );


    const count =
        document.getElementById(
            "totalMaterials"
        );


    if (count) {

        count.textContent =
            rows.length;

    }

}



/* =====================================================
   INITIAL DEMO COUNT
===================================================== */

updateMaterialCount();