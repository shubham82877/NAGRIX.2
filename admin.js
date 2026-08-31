/* =========================================================
   NAGRIX ADMIN COMMAND CENTER
   Complete Frontend Admin System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DEMO ADMIN ACCOUNT
    ===================================================== */

    const ADMIN_USERNAME = "admin001";
    const ADMIN_PASSWORD = "nagrixadmin";


    /* =====================================================
       2. DOM ELEMENTS
    ===================================================== */

    const loginScreen = document.getElementById("loginScreen");
    const dashboard = document.getElementById("dashboard");

    const loginForm = document.getElementById("adminLoginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");


    /* =====================================================
       3. LOGIN
    ===================================================== */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            sessionStorage.setItem(
                "nagrixAdminLoggedIn",
                "true"
            );

            showDashboard();

        } else {

            alert(
                "❌ Invalid Admin Username or Password\n\n" +
                "Demo:\n" +
                "Username: admin001\n" +
                "Password: nagrixadmin"
            );

        }

    });


    /* =====================================================
       4. SHOW DASHBOARD
    ===================================================== */

    function showDashboard() {

        loginScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");

        initializeAdmin();

    }


    /* =====================================================
       5. CHECK SESSION
    ===================================================== */

    const loggedIn =
        sessionStorage.getItem(
            "nagrixAdminLoggedIn"
        );

    if (loggedIn === "true") {

        showDashboard();

    }


    /* =====================================================
       6. LOGOUT
    ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                sessionStorage.removeItem(
                    "nagrixAdminLoggedIn"
                );

                dashboard.classList.add("hidden");
                loginScreen.classList.remove("hidden");

                usernameInput.value = "";
                passwordInput.value = "";

            }
        );

    }


    /* =====================================================
       7. INITIALIZE ADMIN
    ===================================================== */

    window.initializeAdmin = function () {

        setCurrentDate();

        setupNavigation();

        loadOfficers();

        loadComplaints();

        loadDepartments();

        loadUniversities();

        loadCompanies();

        loadResearchProjects();

        updateKPIs();

        createCharts();

        setupForms();

        setupComplaintSearch();

    };


    /* =====================================================
       8. CURRENT DATE
    ===================================================== */

    function setCurrentDate() {

        const dateElement =
            document.getElementById("currentDate");

        if (!dateElement) return;

        const today = new Date();

        dateElement.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    /* =====================================================
       9. SIDEBAR NAVIGATION
    ===================================================== */

    function setupNavigation() {

        const navItems =
            document.querySelectorAll(".nav-item");

        const sections =
            document.querySelectorAll(".content-section");

        navItems.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const sectionID =
                        button.dataset.section;

                    navItems.forEach(item =>
                        item.classList.remove("active")
                    );

                    sections.forEach(section =>
                        section.classList.remove(
                            "active-section"
                        )
                    );

                    button.classList.add("active");

                    const target =
                        document.getElementById(
                            sectionID
                        );

                    if (target) {

                        target.classList.add(
                            "active-section"
                        );

                    }

                }
            );

        });

    }


    /* =====================================================
       10. STORAGE
    ===================================================== */

    function getData(key, fallback = []) {

        try {

            const data =
                localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : fallback;

        } catch (error) {

            console.error(
                "Storage error:",
                error
            );

            return fallback;

        }

    }


    function saveData(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }


    /* =====================================================
       11. DEFAULT OFFICERS
    ===================================================== */

    function loadOfficers() {

        let officers =
            getData("nagrixOfficers");

        if (officers.length === 0) {

            officers = [

                {
                    id: "OFF-001",
                    name: "Rajesh Kumar",
                    username: "rajesh001",
                    password: "officer123",
                    department: "Municipal Corporation",
                    area: "Central Delhi",
                    solved: 142,
                    pending: 18,
                    performance: 89,
                    status: "Active"
                },

                {
                    id: "OFF-002",
                    name: "Amit Sharma",
                    username: "amit001",
                    password: "officer123",
                    department: "Public Works Department",
                    area: "North Delhi",
                    solved: 118,
                    pending: 24,
                    performance: 82,
                    status: "Active"
                },

                {
                    id: "OFF-003",
                    name: "Priya Singh",
                    username: "priya001",
                    password: "officer123",
                    department: "Sanitation Department",
                    area: "South Delhi",
                    solved: 156,
                    pending: 12,
                    performance: 94,
                    status: "Active"
                }

            ];

            saveData(
                "nagrixOfficers",
                officers
            );

        }

        renderOfficers(officers);

    }


    /* =====================================================
       12. RENDER OFFICERS
    ===================================================== */

    function renderOfficers(officers) {

        const table =
            document.getElementById(
                "officerTable"
            );

        if (!table) return;

        table.innerHTML = "";

        officers.forEach(officer => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    <strong>${officer.id}</strong>
                </td>

                <td>
                    ${officer.name}
                </td>

                <td>
                    ${officer.department}
                </td>

                <td>
                    📍 ${officer.area}
                </td>

                <td>
                    <span class="success-text">
                        ${officer.solved}
                    </span>
                </td>

                <td>
                    <span class="warning-text">
                        ${officer.pending}
                    </span>
                </td>

                <td>

                    <div class="mini-progress">

                        <div
                            style="width:${officer.performance}%"
                        ></div>

                    </div>

                    ${officer.performance}%

                </td>

                <td>

                    <span class="status-active">
                        ● ${officer.status}
                    </span>

                </td>

            `;

            table.appendChild(row);

        });

    }


    /* =====================================================
       13. CREATE OFFICER
    ===================================================== */

    window.openOfficerModal = function () {

        document
            .getElementById("officerModal")
            .classList.remove("hidden");

    };


    document
        .getElementById("officerForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const officers =
                    getData("nagrixOfficers");

                const newOfficer = {

                    id:
                        "OFF-" +
                        String(
                            officers.length + 1
                        ).padStart(3, "0"),

                    name:
                        document
                            .getElementById(
                                "newOfficerName"
                            )
                            .value
                            .trim(),

                    username:
                        document
                            .getElementById(
                                "newOfficerUsername"
                            )
                            .value
                            .trim(),

                    password:
                        document
                            .getElementById(
                                "newOfficerPassword"
                            )
                            .value,

                    department:
                        document
                            .getElementById(
                                "newOfficerDepartment"
                            )
                            .value,

                    area:
                        document
                            .getElementById(
                                "newOfficerArea"
                            )
                            .value
                            .trim(),

                    solved: 0,

                    pending: 0,

                    performance: 0,

                    status: "Active"

                };

                officers.push(newOfficer);

                saveData(
                    "nagrixOfficers",
                    officers
                );

                renderOfficers(officers);

                updateKPIs();

                closeModal("officerModal");

                this.reset();

                alert(
                    "✅ Officer created successfully!"
                );

            }
        );


    /* =====================================================
       14. DEFAULT COMPLAINTS
    ===================================================== */

    function loadComplaints() {

        let complaints =
            getData("nagrixComplaints");

        if (complaints.length === 0) {

            complaints = [

                {
                    id: "NGRX-2026-001245",
                    problem: "Road Damage",
                    department: "Public Works Department",
                    location: "Connaught Place, Delhi",
                    officer: "Rajesh Kumar",
                    priority: "High",
                    status: "Resolved"
                },

                {
                    id: "NGRX-2026-001246",
                    problem: "Street Light",
                    department: "Electrical Department",
                    location: "Rohini, Delhi",
                    officer: "Amit Sharma",
                    priority: "Medium",
                    status: "Pending"
                },

                {
                    id: "NGRX-2026-001247",
                    problem: "Garbage",
                    department: "Sanitation Department",
                    location: "Saket, Delhi",
                    officer: "Priya Singh",
                    priority: "High",
                    status: "Resolved"
                },

                {
                    id: "NGRX-2026-001248",
                    problem: "Water Leakage",
                    department: "Water Department",
                    location: "Dwarka, Delhi",
                    officer: "Rajesh Kumar",
                    priority: "Medium",
                    status: "In Progress"
                }

            ];

            saveData(
                "nagrixComplaints",
                complaints
            );

        }

        renderComplaints(complaints);

    }


    /* =====================================================
       15. RENDER COMPLAINTS
    ===================================================== */

    function renderComplaints(complaints) {

        const table =
            document.getElementById(
                "complaintTable"
            );

        if (!table) return;

        table.innerHTML = "";

        complaints.forEach(complaint => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    <strong>
                        ${complaint.id}
                    </strong>
                </td>

                <td>
                    ${complaint.problem}
                </td>

                <td>
                    ${complaint.department}
                </td>

                <td>
                    📍 ${complaint.location}
                </td>

                <td>
                    ${complaint.officer}
                </td>

                <td>
                    ${getPriorityBadge(
                        complaint.priority
                    )}
                </td>

                <td>
                    ${getStatusBadge(
                        complaint.status
                    )}
                </td>

            `;

            table.appendChild(row);

        });

    }


    function getPriorityBadge(priority) {

        return `
            <span class="priority-${priority.toLowerCase()}">
                ${priority}
            </span>
        `;

    }


    function getStatusBadge(status) {

        const className =
            status
                .toLowerCase()
                .replace(/\s+/g, "-");

        return `
            <span class="status-${className}">
                ● ${status}
            </span>
        `;

    }


    /* =====================================================
       16. COMPLAINT SEARCH
    ===================================================== */

    function setupComplaintSearch() {

        const search =
            document.getElementById(
                "complaintSearch"
            );

        if (!search) return;

        search.addEventListener(
            "input",
            function () {

                const keyword =
                    this.value
                        .toLowerCase()
                        .trim();

                const complaints =
                    getData(
                        "nagrixComplaints"
                    );

                const filtered =
                    complaints.filter(
                        complaint =>

                            complaint.id
                                .toLowerCase()
                                .includes(keyword) ||

                            complaint.problem
                                .toLowerCase()
                                .includes(keyword) ||

                            complaint.department
                                .toLowerCase()
                                .includes(keyword) ||

                            complaint.location
                                .toLowerCase()
                                .includes(keyword) ||

                            complaint.officer
                                .toLowerCase()
                                .includes(keyword)

                    );

                renderComplaints(filtered);

            }
        );

    }


    /* =====================================================
       17. DEPARTMENTS
    ===================================================== */

    function loadDepartments() {

        const departments = [

            {
                name: "Municipal Corporation",
                solved: 542,
                total: 610,
                icon: "🏙️"
            },

            {
                name: "Public Works Department",
                solved: 421,
                total: 498,
                icon: "🛣️"
            },

            {
                name: "Electrical Department",
                solved: 312,
                total: 376,
                icon: "💡"
            },

            {
                name: "Sanitation Department",
                solved: 488,
                total: 531,
                icon: "♻️"
            },

            {
                name: "Water Department",
                solved: 271,
                total: 318,
                icon: "💧"
            },

            {
                name: "Transport Department",
                solved: 126,
                total: 153,
                icon: "🚌"
            }

        ];

        const container =
            document.getElementById(
                "departmentCards"
            );

        if (!container) return;

        container.innerHTML = "";

        departments.forEach(department => {

            const percentage =
                Math.round(
                    (
                        department.solved /
                        department.total
                    ) * 100
                );

            container.innerHTML += `

                <div class="department-card">

                    <div class="department-icon">
                        ${department.icon}
                    </div>

                    <h3>
                        ${department.name}
                    </h3>

                    <p>
                        ${department.solved}
                        /
                        ${department.total}
                        issues resolved
                    </p>

                    <div class="progress">

                        <div
                            style="width:${percentage}%"
                        ></div>

                    </div>

                    <strong>
                        ${percentage}% Resolution
                    </strong>

                </div>

            `;

        });

        const performance =
            document.getElementById(
                "departmentPerformance"
            );

        if (!performance) return;

        performance.innerHTML = "";

        departments.forEach(department => {

            const percentage =
                Math.round(
                    (
                        department.solved /
                        department.total
                    ) * 100
                );

            performance.innerHTML += `

                <div class="performance-row">

                    <div>

                        <strong>
                            ${department.name}
                        </strong>

                    </div>

                    <div class="progress">

                        <div
                            style="width:${percentage}%"
                        ></div>

                    </div>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>

            `;

        });

    }


    /* =====================================================
       18. UNIVERSITY SYSTEM
    ===================================================== */

    function loadUniversities() {

        let universities =
            getData("nagrixUniversities");

        if (universities.length === 0) {

            universities = [

                {
                    name: "IIT Delhi",
                    department: "Artificial Intelligence",
                    focus:
                        "AI based civic intelligence and smart city solutions."
                },

                {
                    name: "Delhi University",
                    department: "Environmental Research",
                    focus:
                        "Urban pollution, sanitation and environmental monitoring."
                }

            ];

            saveData(
                "nagrixUniversities",
                universities
            );

        }

        renderUniversities(universities);

    }


    function renderUniversities(universities) {

        const container =
            document.getElementById(
                "universityList"
            );

        if (!container) return;

        container.innerHTML = "";

        universities.forEach(university => {

            container.innerHTML += `

                <div class="partner-card">

                    <div class="partner-icon">
                        🎓
                    </div>

                    <h3>
                        ${university.name}
                    </h3>

                    <strong>
                        ${university.department}
                    </strong>

                    <p>
                        ${university.focus}
                    </p>

                    <span class="partner-status">
                        ● Research Partner
                    </span>

                </div>

            `;

        });

    }


    window.openUniversityModal = function () {

        document
            .getElementById(
                "universityModal"
            )
            .classList.remove("hidden");

    };


    document
        .getElementById("universityForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const universities =
                    getData(
                        "nagrixUniversities"
                    );

                universities.push({

                    name:
                        document
                            .getElementById(
                                "universityName"
                            )
                            .value
                            .trim(),

                    department:
                        document
                            .getElementById(
                                "universityDepartment"
                            )
                            .value
                            .trim(),

                    focus:
                        document
                            .getElementById(
                                "universityFocus"
                            )
                            .value
                            .trim()

                });

                saveData(
                    "nagrixUniversities",
                    universities
                );

                renderUniversities(
                    universities
                );

                closeModal(
                    "universityModal"
                );

                this.reset();

                alert(
                    "🎓 University added successfully!"
                );

            }
        );


    /* =====================================================
       19. COMPANY SYSTEM
    ===================================================== */

    function loadCompanies() {

        let companies =
            getData("nagrixCompanies");

        if (companies.length === 0) {

            companies = [

                {
                    name: "Smart Infrastructure Company",
                    technology: "IoT",
                    capability:
                        "Smart sensors, civic infrastructure and IoT monitoring."
                },

                {
                    name: "AI Solutions Company",
                    technology: "Artificial Intelligence",
                    capability:
                        "AI, computer vision and intelligent automation."
                }

            ];

            saveData(
                "nagrixCompanies",
                companies
            );

        }

        renderCompanies(companies);

    }


    function renderCompanies(companies) {

        const container =
            document.getElementById(
                "companyList"
            );

        if (!container) return;

        container.innerHTML = "";

        companies.forEach(company => {

            container.innerHTML += `

                <div class="partner-card">

                    <div class="partner-icon">
                        🏭
                    </div>

                    <h3>
                        ${company.name}
                    </h3>

                    <strong>
                        ${company.technology}
                    </strong>

                    <p>
                        ${company.capability}
                    </p>

                    <span class="partner-status">
                        ● Development Partner
                    </span>

                </div>

            `;

        });

    }


    window.openCompanyModal = function () {

        document
            .getElementById(
                "companyModal"
            )
            .classList.remove("hidden");

    };


    document
        .getElementById("companyForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const companies =
                    getData(
                        "nagrixCompanies"
                    );

                companies.push({

                    name:
                        document
                            .getElementById(
                                "companyName"
                            )
                            .value
                            .trim(),

                    technology:
                        document
                            .getElementById(
                                "companyTechnology"
                            )
                            .value
                            .trim(),

                    capability:
                        document
                            .getElementById(
                                "companyCapability"
                            )
                            .value
                            .trim()

                });

                saveData(
                    "nagrixCompanies",
                    companies
                );

                renderCompanies(
                    companies
                );

                closeModal(
                    "companyModal"
                );

                this.reset();

                alert(
                    "🏭 Company added successfully!"
                );

            }
        );


    /* =====================================================
       20. RESEARCH HUB
    ===================================================== */

    function loadResearchProjects() {

        let projects =
            getData(
                "nagrixResearchProjects"
            );

        if (projects.length === 0) {

            projects = [

                {
                    problem: "Urban Road Damage",
                    university: "IIT Delhi",
                    company:
                        "Smart Infrastructure Company",
                    objective:
                        "Develop AI and IoT based road monitoring.",
                    stage: "University Research"
                },

                {
                    problem: "Garbage Overflow",
                    university: "Delhi University",
                    company:
                        "AI Solutions Company",
                    objective:
                        "Develop intelligent waste monitoring.",
                    stage: "Company Development"
                }

            ];

            saveData(
                "nagrixResearchProjects",
                projects
            );

        }

        renderResearchProjects(
            projects
        );

    }


    function renderResearchProjects(projects) {

        const container =
            document.getElementById(
                "researchProjects"
            );

        if (!container) return;

        container.innerHTML = "";

        projects.forEach(project => {

            container.innerHTML += `

                <div class="research-card">

                    <div class="research-icon">
                        🔬
                    </div>

                    <h3>
                        ${project.problem}
                    </h3>

                    <p>
                        ${project.objective}
                    </p>

                    <div class="research-meta">

                        <span>
                            🎓 ${project.university}
                        </span>

                        <span>
                            🏭 ${project.company}
                        </span>

                    </div>

                    <div class="research-stage">

                        Current Stage:
                        <strong>
                            ${project.stage}
                        </strong>

                    </div>

                </div>

            `;

        });

    }


    window.openResearchModal = function () {

        document
            .getElementById(
                "researchModal"
            )
            .classList.remove("hidden");

    };


    document
        .getElementById("researchForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const projects =
                    getData(
                        "nagrixResearchProjects"
                    );

                projects.push({

                    problem:
                        document
                            .getElementById(
                                "researchProblem"
                            )
                            .value
                            .trim(),

                    university:
                        document
                            .getElementById(
                                "researchUniversity"
                            )
                            .value,

                    company:
                        document
                            .getElementById(
                                "researchCompany"
                            )
                            .value,

                    objective:
                        document
                            .getElementById(
                                "researchObjective"
                            )
                            .value
                            .trim(),

                    stage:
                        "Citizen Problem"

                });

                saveData(
                    "nagrixResearchProjects",
                    projects
                );

                renderResearchProjects(
                    projects
                );

                closeModal(
                    "researchModal"
                );

                this.reset();

                alert(
                    "🚀 Research project created!"
                );

            }
        );


    /* =====================================================
       21. MODAL CLOSE
    ===================================================== */

    window.closeModal = function (modalID) {

        const modal =
            document.getElementById(
                modalID
            );

        if (modal) {

            modal.classList.add(
                "hidden"
            );

        }

    };


    /* =====================================================
       22. CLICK OUTSIDE MODAL
    ===================================================== */

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        });


    /* =====================================================
       23. KPI UPDATE
    ===================================================== */

    function updateKPIs() {

        const complaints =
            getData(
                "nagrixComplaints"
            );

        const officers =
            getData(
                "nagrixOfficers"
            );

        const total =
            complaints.length;

        const resolved =
            complaints.filter(
                c =>
                    c.status === "Resolved"
            ).length;

        const pending =
            complaints.filter(
                c =>
                    c.status !== "Resolved"
            ).length;


        setText(
            "totalComplaints",
            total
        );

        setText(
            "totalOfficers",
            officers.length
        );

        setText(
            "pendingIssues",
            pending
        );

        setText(
            "resolvedIssues",
            resolved
        );

    }


    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    }


    /* =====================================================
       24. CHARTS
    ===================================================== */

    function createCharts() {

        if (
            typeof Chart === "undefined"
        ) {

            console.error(
                "Chart.js not loaded."
            );

            return;

        }


        createOperationsChart();

        createOfficerPerformanceChart();

        createYearlyChart();

    }


    function createOperationsChart() {

        const canvas =
            document.getElementById(
                "operationsChart"
            );

        if (!canvas) return;

        if (
            window.operationsChartInstance
        ) {

            window.operationsChartInstance.destroy();

        }

        window.operationsChartInstance =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug"
                        ],

                        datasets: [

                            {
                                label:
                                    "Complaints",

                                data: [
                                    280,
                                    315,
                                    290,
                                    350,
                                    372,
                                    410,
                                    385,
                                    420
                                ],

                                tension: 0.4,

                                fill: true

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        plugins: {

                            legend: {
                                display: true
                            }

                        }

                    }

                }
            );

    }


    function createOfficerPerformanceChart() {

        const canvas =
            document.getElementById(
                "officerPerformanceChart"
            );

        if (!canvas) return;

        if (
            window.officerChartInstance
        ) {

            window.officerChartInstance.destroy();

        }

        window.officerChartInstance =
            new Chart(
                canvas,
                {

                    type: "bar",

                    data: {

                        labels: [
                            "Rajesh",
                            "Amit",
                            "Priya",
                            "Vikash",
                            "Neha"
                        ],

                        datasets: [

                            {
                                label:
                                    "Solved",

                                data: [
                                    142,
                                    118,
                                    156,
                                    109,
                                    137
                                ]

                            },

                            {
                                label:
                                    "Not Solved",

                                data: [
                                    18,
                                    24,
                                    12,
                                    31,
                                    19
                                ]

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false

                    }

                }

            );

    }


    function createYearlyChart() {

        const canvas =
            document.getElementById(
                "yearlyChart"
            );

        if (!canvas) return;

        if (
            window.yearlyChartInstance
        ) {

            window.yearlyChartInstance.destroy();

        }

        window.yearlyChartInstance =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: [
                            "2022",
                            "2023",
                            "2024",
                            "2025",
                            "2026"
                        ],

                        datasets: [

                            {
                                label:
                                    "Issues Solved",

                                data: [
                                    820,
                                    1100,
                                    1450,
                                    1890,
                                    2160
                                ],

                                tension: 0.4

                            },

                            {
                                label:
                                    "Issues Pending",

                                data: [
                                    210,
                                    240,
                                    290,
                                    310,
                                    326
                                ],

                                tension: 0.4

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false

                    }

                }

            );

    }


    /* =====================================================
       25. FORM SETUP
    ===================================================== */

    function setupForms() {

        console.log(
            "NAGRIX Admin forms initialized."
        );

    }


});