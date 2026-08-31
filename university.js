/* =========================================================
   NAGRIX UNIVERSITY RESEARCH PORTAL
   Complete Frontend JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
========================================================= */

const STORAGE_KEY = "NAGRIX_UNIVERSITY_DATA";

const defaultData = {
    university: {
        name: "ABC Institute of Technology",
        code: "AIT",
        partnerStatus: "Research Partner"
    },

    selectedProblem: {
        id: "NGRX-2026-001245",
        title: "Urban Waterlogging",
        category: "water",
        location: "XYZ Municipal Zone",
        department: "Municipal Engineering",
        priority: "HIGH",
        complaints: 47,
        evidence: 18,
        verifiedBy: "Municipal Engineering Officer"
    },

    problems: [
        {
            id: "NGRX-2026-001245",
            title: "Urban Waterlogging",
            category: "water",
            location: "XYZ Municipal Zone",
            department: "Municipal Engineering",
            priority: "HIGH",
            complaints: 47,
            evidence: 18,
            verified: true
        },
        {
            id: "NGRX-2026-001198",
            title: "Smart Waste Monitoring",
            category: "waste",
            location: "Central Ward",
            department: "Sanitation Department",
            priority: "MEDIUM",
            complaints: 61,
            evidence: 23,
            verified: true
        },
        {
            id: "NGRX-2026-001176",
            title: "Smart Street Light Failure Detection",
            category: "electricity",
            location: "Sector 14",
            department: "Electrical Department",
            priority: "MEDIUM",
            complaints: 29,
            evidence: 12,
            verified: true
        }
    ],

    projects: [
        {
            id: "PRJ-001",
            problemId: "NGRX-2026-001245",
            title: "Smart Drainage Monitoring",
            department: "Civil Engineering",
            status: "ACTIVE RESEARCH",
            progress: 68,
            description:
                "Development of IoT-based water-level monitoring for recurring urban waterlogging."
        },
        {
            id: "PRJ-002",
            problemId: "NGRX-2026-001198",
            title: "AI Waste Collection Predictor",
            department: "Computer Science & AI",
            status: "PROTOTYPE",
            progress: 82,
            description:
                "Predicting garbage overflow and optimizing municipal collection routes."
        }
    ],

    researchers: [
        {
            initials: "DR",
            name: "Dr. Research Lead",
            role: "Principal Investigator",
            department: "Civil Engineering"
        },
        {
            initials: "RS",
            name: "Research Scholar",
            role: "Project Researcher",
            department: "Smart Cities"
        },
        {
            initials: "AI",
            name: "AI Research Student",
            role: "Data & AI Research",
            department: "Artificial Intelligence"
        },
        {
            initials: "IO",
            name: "IoT Student",
            role: "Hardware Research",
            department: "IoT Systems"
        }
    ],

    proposals: [],

    pilot: {
        status: "PILOT IN PREPARATION",
        approvalRequested: false,
        officerContacted: false
    },

    notifications: [
        {
            id: 1,
            title: "New civic research problem",
            message: "Urban Waterlogging has been matched with your university.",
            read: false
        },
        {
            id: 2,
            title: "Officer collaboration",
            message: "Municipal Engineering Officer is available.",
            read: false
        },
        {
            id: 3,
            title: "Research opportunity",
            message: "Smart Waste Monitoring is available for research.",
            read: false
        },
        {
            id: 4,
            title: "Pilot update",
            message: "Smart Drainage Monitoring prototype is ready.",
            read: false
        }
    ]
};

let appData = loadData();

let currentProblemId = appData.selectedProblem.id;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeSearch();

    initializeProposalForm();

    initializeKeyboardShortcuts();

    updateDashboard();

    updateNotificationCount();

    renderDynamicProjects();

    renderDynamicResearchers();

    restoreActiveSection();

    console.log("NAGRIX University Research Portal initialized.");

});


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadData() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return structuredCloneSafe(defaultData);
        }

        const parsed = JSON.parse(saved);

        return mergeData(
            structuredCloneSafe(defaultData),
            parsed
        );

    } catch (error) {

        console.error("Storage load error:", error);

        return structuredCloneSafe(defaultData);
    }
}


function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appData)
        );

    } catch (error) {

        console.error("Storage save error:", error);
    }
}


function structuredCloneSafe(object) {

    return JSON.parse(JSON.stringify(object));
}


function mergeData(defaultObject, savedObject) {

    if (!savedObject || typeof savedObject !== "object") {
        return defaultObject;
    }

    Object.keys(savedObject).forEach(key => {

        if (
            savedObject[key] &&
            typeof savedObject[key] === "object" &&
            !Array.isArray(savedObject[key]) &&
            defaultObject[key] &&
            typeof defaultObject[key] === "object"
        ) {

            defaultObject[key] = mergeData(
                defaultObject[key],
                savedObject[key]
            );

        } else {

            defaultObject[key] = savedObject[key];

        }

    });

    return defaultObject;
}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section = item.dataset.section;

            showSection(section);

        });

    });
}


function showSection(sectionId) {

    const sections = document.querySelectorAll(".content-section");

    sections.forEach(section => {

        section.classList.remove("active-section");

    });


    const target = document.getElementById(sectionId);

    if (!target) {

        console.warn(
            `Section "${sectionId}" does not exist.`
        );

        return;
    }


    target.classList.add("active-section");


    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.section === sectionId) {
            item.classList.add("active");
        }

    });


    updatePageTitle(sectionId);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    localStorage.setItem(
        "NAGRIX_ACTIVE_UNIVERSITY_SECTION",
        sectionId
    );

}


function restoreActiveSection() {

    const savedSection =
        localStorage.getItem(
            "NAGRIX_ACTIVE_UNIVERSITY_SECTION"
        );

    if (
        savedSection &&
        document.getElementById(savedSection)
    ) {

        showSection(savedSection);

    } else {

        showSection("overview");

    }
}


function updatePageTitle(sectionId) {

    const title = document.getElementById("pageTitle");

    if (!title) return;


    const titles = {

        overview:
            "University Research Command Center",

        problems:
            "Verified Civic Problems",

        matching:
            "AI University Matching",

        projects:
            "Research Projects",

        team:
            "Research Team",

        proposals:
            "Research Proposals",

        pilot:
            "Pilot Testing",

        results:
            "Research Results",

        collaboration:
            "Officer ↔ University Collaboration"

    };


    title.textContent =
        titles[sectionId] ||
        "University Research Command Center";
}


/* =========================================================
   SEARCH & FILTER
========================================================= */

function initializeSearch() {

    const category =
        document.getElementById("problemCategory");

    if (category) {

        category.addEventListener(
            "change",
            searchProblems
        );

    }
}


function searchProblems() {

    const searchInput =
        document.getElementById("problemSearch");

    const categoryInput =
        document.getElementById("problemCategory");


    const searchTerm =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const category =
        categoryInput
            ? categoryInput.value
            : "all";


    const cards =
        document.querySelectorAll(
            ".research-card"
        );


    let visibleCount = 0;


    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        const cardCategory =
            card.dataset.category;


        const matchesSearch =
            text.includes(searchTerm);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    showSearchResultMessage(
        visibleCount
    );
}


function showSearchResultMessage(count) {

    let message =
        document.getElementById(
            "problemSearchResult"
        );


    if (!message) {

        message = document.createElement("p");

        message.id =
            "problemSearchResult";

        message.className =
            "muted";

        const container =
            document.querySelector(
                ".filter-bar"
            );

        if (container) {
            container.appendChild(message);
        }
    }


    message.textContent =
        `${count} verified civic problem${count !== 1 ? "s" : ""} found.`;
}


/* =========================================================
   REFRESH PROBLEMS
========================================================= */

function refreshProblems() {

    const button =
        event?.currentTarget;


    if (button) {

        button.disabled = true;

        button.textContent =
            "⟳ Refreshing...";

    }


    setTimeout(() => {

        renderProblemCards();

        if (button) {

            button.disabled = false;

            button.textContent =
                "↻ Refresh";

        }


        showToast(
            "Civic problem database refreshed.",
            "success"
        );

    }, 700);
}


/* =========================================================
   DYNAMIC PROBLEM CARDS
========================================================= */

function renderProblemCards() {

    const container =
        document.querySelector(
            ".problem-cards"
        );


    if (!container) return;


    container.innerHTML =
        appData.problems
            .map(problem => {

                return `
                <article
                    class="research-card"
                    data-category="${escapeHTML(problem.category)}"
                >

                    <div class="card-top">

                        <span class="problem-number">
                            ${escapeHTML(problem.id)}
                        </span>

                        <span class="status ${problem.priority.toLowerCase()}">
                            ${escapeHTML(problem.priority)} PRIORITY
                        </span>

                    </div>

                    <h2>
                        ${escapeHTML(problem.title)}
                    </h2>

                    <p>
                        Verified civic problem available
                        for university research.
                    </p>

                    <div class="problem-meta">

                        <span>
                            📍 ${escapeHTML(problem.location)}
                        </span>

                        <span>
                            🏢 ${escapeHTML(problem.department)}
                        </span>

                        <span>
                            👮 Officer Verified
                        </span>

                    </div>

                    <div class="evidence-row">

                        <span>
                            📷 ${problem.evidence} Evidence Photos
                        </span>

                        <span>
                            📊 ${problem.complaints} Related Complaints
                        </span>

                    </div>

                    <button
                        class="primary-btn"
                        onclick="viewProblem('${escapeHTML(problem.id)}')"
                    >
                        View Research Opportunity →
                    </button>

                </article>
                `;

            })
            .join("");

}


/* =========================================================
   VIEW PROBLEM MODAL
========================================================= */

function viewProblem(problemId) {

    currentProblemId = problemId;


    const problem =
        appData.problems.find(
            item => item.id === problemId
        );


    if (!problem) {

        showToast(
            "Problem not found.",
            "error"
        );

        return;
    }


    const title =
        document.getElementById(
            "modalProblemTitle"
        );

    const id =
        document.getElementById(
            "modalProblemId"
        );


    if (title) {
        title.textContent =
            problem.title;
    }


    if (id) {
        id.textContent =
            problem.id;
    }


    const modal =
        document.getElementById(
            "problemModal"
        );


    if (!modal) return;


    modal.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );
}


function closeProblemModal() {

    const modal =
        document.getElementById(
            "problemModal"
        );


    if (modal) {

        modal.classList.add("hidden");

    }


    document.body.classList.remove(
        "modal-open"
    );
}


document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "problemModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeProblemModal();

        }

    }
);


/* =========================================================
   SELECT PROBLEM FOR RESEARCH
========================================================= */

function selectProblemForResearch() {

    const problem =
        appData.problems.find(
            item => item.id === currentProblemId
        );


    if (!problem) return;


    appData.selectedProblem =
        structuredCloneSafe(problem);


    saveData();

    closeProblemModal();

    showSection("matching");

    updateMatchingProblem();

    showToast(
        `${problem.title} selected for AI research matching.`,
        "success"
    );
}


function updateMatchingProblem() {

    const problem =
        appData.selectedProblem;


    const selectedProblem =
        document.querySelector(
            ".selected-problem"
        );


    if (!selectedProblem) return;


    selectedProblem.innerHTML = `
        <div class="large-icon">
            ${getProblemIcon(problem.category)}
        </div>

        <h2>
            ${escapeHTML(problem.title)}
        </h2>

        <p>
            ${escapeHTML(problem.location)}
        </p>

        <small>
            Problem ID: ${escapeHTML(problem.id)}
        </small>
    `;
}


/* =========================================================
   AI MATCHING
========================================================= */

function runAIMatching() {

    const button =
        event?.currentTarget;


    if (button) {

        button.disabled = true;

        button.textContent =
            "🤖 AI Analyzing...";

    }


    showToast(
        "NAGRIX AI is analyzing problem requirements...",
        "info"
    );


    setTimeout(() => {

        const result =
            calculateUniversityMatch(
                appData.selectedProblem
            );


        updateMatchingResults(result);


        if (button) {

            button.disabled = false;

            button.textContent =
                "✓ AI Matching Complete";

        }


        addNotification(
            "AI Matching Completed",
            `Best research match: ${result.university} (${result.score}%).`
        );


        showToast(
            `AI found a ${result.score}% university compatibility.`,
            "success"
        );

    }, 1400);
}


function calculateUniversityMatch(problem) {

    const category =
        problem.category;


    const matchingMap = {

        water: {
            university:
                "ABC Institute of Technology",
            department:
                "Civil Engineering",
            score: 94,
            areas: [
                ["🏗️", "Civil Engineering", 96],
                ["🌱", "Environmental Engineering", 93],
                ["🏙️", "Urban Planning", 88],
                ["📡", "IoT & Smart Systems", 82]
            ]
        },

        waste: {
            university:
                "ABC Institute of Technology",
            department:
                "Computer Science & AI",
            score: 91,
            areas: [
                ["🤖", "Computer Science & AI", 95],
                ["📡", "IoT & Smart Systems", 92],
                ["🌱", "Environmental Engineering", 87],
                ["🏙️", "Urban Planning", 81]
            ]
        },

        electricity: {
            university:
                "ABC Institute of Technology",
            department:
                "Electrical Engineering",
            score: 89,
            areas: [
                ["⚡", "Electrical Engineering", 96],
                ["📡", "IoT & Smart Systems", 91],
                ["🤖", "Computer Science & AI", 86],
                ["🏙️", "Urban Planning", 76]
            ]
        },

        roads: {
            university:
                "ABC Institute of Technology",
            department:
                "Civil Engineering",
            score: 92,
            areas: [
                ["🏗️", "Civil Engineering", 95],
                ["🏙️", "Urban Planning", 91],
                ["🤖", "Computer Science & AI", 78],
                ["🌱", "Environmental Engineering", 73]
            ]
        },

        environment: {
            university:
                "ABC Institute of Technology",
            department:
                "Environmental Engineering",
            score: 93,
            areas: [
                ["🌱", "Environmental Engineering", 97],
                ["🏗️", "Civil Engineering", 88],
                ["🏙️", "Urban Planning", 86],
                ["🤖", "Computer Science & AI", 79]
            ]
        }

    };


    return (
        matchingMap[category] ||
        matchingMap.water
    );
}


function updateMatchingResults(result) {

    const matchItems =
        document.querySelectorAll(
            ".match-item"
        );


    result.areas.forEach(
        (area, index) => {

            if (!matchItems[index]) return;


            const item =
                matchItems[index];


            const icon =
                item.querySelector(
                    "span"
                );

            const strong =
                item.querySelector(
                    "strong"
                );

            const small =
                item.querySelector(
                    "small"
                );

            const score =
                item.querySelector(
                    "b"
                );


            if (icon) {
                icon.textContent =
                    area[0];
            }


            if (strong) {
                strong.textContent =
                    area[1];
            }


            if (small) {
                small.textContent =
                    `${area[2]}% compatibility`;
            }


            if (score) {
                score.textContent =
                    `${area[2]}%`;
            }

        }
    );


    const university =
        document.querySelector(
            ".university-result h2"
        );


    const department =
        document.querySelector(
            ".university-result p"
        );


    const matchScore =
        document.querySelector(
            ".match-score strong"
        );


    if (university) {
        university.textContent =
            result.university;
    }


    if (department) {
        department.textContent =
            `Department of ${result.department}`;
    }


    if (matchScore) {
        matchScore.textContent =
            `${result.score}%`;
    }

}


/* =========================================================
   ACCEPT RESEARCH PROJECT
========================================================= */

function acceptResearchProject() {

    const problem =
        appData.selectedProblem;


    if (!problem) {

        showToast(
            "Please select a problem first.",
            "error"
        );

        return;
    }


    const existing =
        appData.projects.find(
            project =>
                project.problemId === problem.id
        );


    if (existing) {

        showToast(
            "Research project already exists for this problem.",
            "info"
        );

        showSection("projects");

        return;
    }


    const project = {

        id:
            generateProjectId(),

        problemId:
            problem.id,

        title:
            generateResearchTitle(problem),

        department:
            getDepartmentForProblem(
                problem.category
            ),

        status:
            "ACTIVE RESEARCH",

        progress:
            5,

        description:
            `University research project for solving ${problem.title}.`

    };


    appData.projects.push(project);


    saveData();


    renderDynamicProjects();

    updateDashboard();


    addNotification(
        "Research Project Accepted",
        `${project.title} has been created.`
    );


    showToast(
        "Research project accepted successfully.",
        "success"
    );


    showSection("projects");
}


function generateProjectId() {

    const number =
        appData.projects.length + 1;

    return `PRJ-${String(number).padStart(3, "0")}`;
}


function generateResearchTitle(problem) {

    const titles = {

        water:
            "Smart Water & Drainage Monitoring Research",

        waste:
            "AI Waste Collection Optimization Research",

        electricity:
            "Smart Street Light Monitoring Research",

        roads:
            "Intelligent Road Condition Monitoring Research",

        environment:
            "Smart Environmental Monitoring Research"

    };


    return (
        titles[problem.category] ||
        `Research Project - ${problem.title}`
    );
}


function getDepartmentForProblem(category) {

    const map = {

        water:
            "Civil Engineering",

        waste:
            "Computer Science & AI",

        electricity:
            "Electrical Engineering",

        roads:
            "Civil Engineering",

        environment:
            "Environmental Engineering"

    };


    return (
        map[category] ||
        "Interdisciplinary Research"
    );
}


/* =========================================================
   PROJECTS
========================================================= */

function renderDynamicProjects() {

    const container =
        document.querySelector(
            ".project-grid"
        );


    if (!container) return;


    container.innerHTML =
        appData.projects.map(
            project => {

                return `
                <div class="project-card">

                    <span class="research-status">
                        ${escapeHTML(project.status)}
                    </span>

                    <h2>
                        ${escapeHTML(project.title)}
                    </h2>

                    <p>
                        ${escapeHTML(project.description)}
                    </p>

                    <div class="project-info">

                        <span>
                            ${escapeHTML(project.problemId)}
                        </span>

                        <span>
                            ${project.progress}% Complete
                        </span>

                    </div>

                    <div class="progress">

                        <div
                            style="width:${project.progress}%"
                        ></div>

                    </div>

                    <button
                        class="secondary-btn full"
                        onclick="openProjectDetails('${escapeHTML(project.id)}')"
                    >
                        Open Research Project
                    </button>

                </div>
                `;

            }
        ).join("");
}


function openProjectDetails(projectId) {

    if (typeof projectId !== "string") {

        projectId =
            appData.projects[0]?.id;

    }


    const project =
        appData.projects.find(
            item => item.id === projectId
        );


    if (!project) {

        showToast(
            "Research project not found.",
            "error"
        );

        return;
    }


    const message = `
Research Project

Project ID:
${project.id}

Problem:
${project.problemId}

Title:
${project.title}

Department:
${project.department}

Status:
${project.status}

Progress:
${project.progress}%

Description:
${project.description}
`;


    alert(message);
}


function createResearchProject() {

    const title =
        prompt(
            "Enter new research project title:"
        );


    if (!title || !title.trim()) {

        showToast(
            "Project creation cancelled.",
            "info"
        );

        return;
    }


    const project = {

        id:
            generateProjectId(),

        problemId:
            appData.selectedProblem.id,

        title:
            title.trim(),

        department:
            getDepartmentForProblem(
                appData.selectedProblem.category
            ),

        status:
            "ACTIVE RESEARCH",

        progress:
            0,

        description:
            "New university research project."

    };


    appData.projects.push(project);

    saveData();

    renderDynamicProjects();

    updateDashboard();


    showToast(
        "New research project created.",
        "success"
    );
}


/* =========================================================
   RESEARCH TEAM
========================================================= */

function renderDynamicResearchers() {

    const container =
        document.querySelector(
            ".team-grid"
        );


    if (!container) return;


    container.innerHTML =
        appData.researchers
            .map(researcher => {

                return `
                <div class="team-card">

                    <div class="team-avatar">
                        ${escapeHTML(researcher.initials)}
                    </div>

                    <h3>
                        ${escapeHTML(researcher.name)}
                    </h3>

                    <p>
                        ${escapeHTML(researcher.role)}
                    </p>

                    <span>
                        ${escapeHTML(researcher.department)}
                    </span>

                </div>
                `;

            })
            .join("");
}


function addResearcher() {

    const name =
        prompt(
            "Researcher full name:"
        );


    if (!name || !name.trim()) return;


    const role =
        prompt(
            "Researcher role:"
        ) ||
        "Researcher";


    const department =
        prompt(
            "Research department:"
        ) ||
        "Interdisciplinary Research";


    const initials =
        name
            .trim()
            .split(/\s+/)
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();


    appData.researchers.push({

        initials,

        name:
            name.trim(),

        role:
            role.trim(),

        department:
            department.trim()

    });


    saveData();

    renderDynamicResearchers();

    updateDashboard();


    showToast(
        "Researcher added successfully.",
        "success"
    );
}


/* =========================================================
   RESEARCH PROPOSAL
========================================================= */

function initializeProposalForm() {

    const form =
        document.getElementById(
            "researchProposalForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        submitResearchProposal
    );

}


function submitResearchProposal(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "researchTitle"
        )?.value.trim();


    const department =
        document.getElementById(
            "researchDepartment"
        )?.value;


    const statement =
        document.getElementById(
            "problemStatement"
        )?.value.trim();


    const solution =
        document.getElementById(
            "proposedSolution"
        )?.value.trim();


    const impact =
        document.getElementById(
            "expectedImpact"
        )?.value.trim();


    if (
        !title ||
        !department ||
        !statement ||
        !solution ||
        !impact
    ) {

        showToast(
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    const proposal = {

        id:
            `PROP-${Date.now()}`,

        problemId:
            appData.selectedProblem.id,

        title,

        department,

        statement,

        solution,

        impact,

        status:
            "SUBMITTED",

        submittedAt:
            new Date().toISOString()

    };


    appData.proposals.push(
        proposal
    );


    saveData();


    event.target.reset();


    addNotification(
        "Research Proposal Submitted",
        `Proposal "${title}" has been submitted.`
    );


    showToast(
        "Research proposal submitted successfully.",
        "success"
    );


    showSection("projects");
}


/* =========================================================
   PILOT TESTING
========================================================= */

function requestPilotApproval() {

    if (
        appData.pilot.approvalRequested
    ) {

        showToast(
            "Pilot approval request is already pending.",
            "info"
        );

        return;
    }


    appData.pilot.approvalRequested =
        true;


    appData.pilot.status =
        "APPROVAL REQUESTED";


    saveData();


    addNotification(
        "Pilot Approval Requested",
        "Municipal officer has been notified."
    );


    updatePilotStatus();


    showToast(
        "Pilot approval request sent to officer.",
        "success"
    );
}


function updatePilotStatus() {

    const status =
        document.querySelector(
            "#pilot .section-title .status"
        );


    if (!status) return;


    status.textContent =
        appData.pilot.status;


    status.classList.remove(
        "pending"
    );


    status.classList.add(
        "active"
    );
}


function contactOfficer() {

    appData.pilot.officerContacted =
        true;


    saveData();


    addNotification(
        "Officer Contact Initiated",
        "Municipal Engineering Officer has been contacted."
    );


    showToast(
        "Officer collaboration request sent.",
        "success"
    );


    showSection("collaboration");
}


/* =========================================================
   PUBLISH SOLUTION
========================================================= */

function publishSolution() {

    const confirmed =
        confirm(
            "Publish this verified solution to the NAGRIX Innovation Hub?"
        );


    if (!confirmed) return;


    addNotification(
        "Solution Published",
        "Research solution is now available in the NAGRIX Innovation Hub."
    );


    showToast(
        "Solution published to NAGRIX Innovation Hub.",
        "success"
    );


    updateResultStatus();
}


function updateResultStatus() {

    const outcome =
        document.querySelector(
            ".outcome-box"
        );


    if (!outcome) return;


    const deployment =
        Array.from(
            outcome.querySelectorAll("div")
        ).find(
            div =>
                div.textContent.includes(
                    "Deployment Recommendation"
                )
        );


    if (deployment) {

        const paragraph =
            deployment.querySelector("p");


        if (paragraph) {
            paragraph.textContent =
                "Published to Innovation Hub";
        }

    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const statCards =
        document.querySelectorAll(
            ".stats-grid .stat-card"
        );


    if (statCards.length < 4) return;


    const researchers =
        appData.researchers.length;


    const activeProjects =
        appData.projects.filter(
            project =>
                project.status !== "COMPLETED"
        ).length;


    const pilots =
        appData.projects.filter(
            project =>
                project.progress >= 80
        ).length;


    const values = [

        appData.problems.length,

        activeProjects,

        researchers,

        pilots

    ];


    values.forEach(
        (value, index) => {

            const heading =
                statCards[index]
                    ?.querySelector("h2");


            if (heading) {
                heading.textContent =
                    value;
            }

        }
    );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function updateNotificationCount() {

    const unread =
        appData.notifications.filter(
            notification =>
                !notification.read
        ).length;


    const badge =
        document.querySelector(
            ".notification span"
        );


    if (badge) {

        badge.textContent =
            unread;

        badge.style.display =
            unread > 0
                ? "inline-flex"
                : "none";

    }
}


function addNotification(
    title,
    message
) {

    appData.notifications.unshift({

        id:
            Date.now(),

        title,

        message,

        read:
            false

    });


    saveData();

    updateNotificationCount();
}


function openNotifications() {

    const unread =
        appData.notifications.filter(
            notification =>
                !notification.read
        );


    if (unread.length === 0) {

        showToast(
            "No new notifications.",
            "info"
        );

        return;
    }


    const messages =
        unread
            .slice(0, 5)
            .map(
                notification =>
                    `• ${notification.title}: ${notification.message}`
            )
            .join("\n\n");


    alert(
        `NAGRIX Notifications\n\n${messages}`
    );


    appData.notifications.forEach(
        notification => {
            notification.read = true;
        }
    );


    saveData();

    updateNotificationCount();
}


document.addEventListener(
    "click",
    event => {

        const notification =
            event.target.closest(
                ".notification"
            );


        if (notification) {
            openNotifications();
        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

function logoutUniversity() {

    const confirmed =
        confirm(
            "Are you sure you want to logout from the University Research Portal?"
        );


    if (!confirmed) return;


    sessionStorage.removeItem(
        "NAGRIX_UNIVERSITY_SESSION"
    );


    showToast(
        "University session ended.",
        "info"
    );


    setTimeout(() => {

        /*
         * Change this URL according to
         * your project structure.
         */
        window.location.href =
            "index.html";

    }, 800);
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeProblemModal();

            }

        }
    );

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function getProblemIcon(category) {

    const icons = {

        water: "💧",

        waste: "🗑️",

        electricity: "💡",

        roads: "🛣️",

        environment: "🌱"

    };


    return (
        icons[category] ||
        "🏙️"
    );
}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   TOAST SYSTEM
========================================================= */

function showToast(
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "toastContainer";


        container.style.position =
            "fixed";

        container.style.right =
            "24px";

        container.style.bottom =
            "24px";

        container.style.zIndex =
            "99999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "10px";


        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement("div");


    const icons = {

        success: "✓",

        error: "✕",

        warning: "⚠",

        info: "ℹ"

    };


    toast.textContent =
        `${icons[type] || "ℹ"} ${message}`;


    toast.style.padding =
        "13px 18px";

    toast.style.borderRadius =
        "12px";

    toast.style.background =
        "#111827";

    toast.style.color =
        "#ffffff";

    toast.style.fontSize =
        "14px";

    toast.style.fontWeight =
        "600";

    toast.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";

    toast.style.maxWidth =
        "360px";

    toast.style.animation =
        "nagrixToastIn .25s ease";


    container.appendChild(
        toast
    );


    setTimeout(() => {

        toast.style.opacity =
            "0";

        toast.style.transform =
            "translateY(10px)";

        toast.style.transition =
            "all .25s ease";


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3500);

}


/* =========================================================
   ADD TOAST ANIMATION
========================================================= */

(function injectToastCSS() {

    if (
        document.getElementById(
            "nagrix-toast-css"
        )
    ) return;


    const style =
        document.createElement("style");


    style.id =
        "nagrix-toast-css";


    style.textContent = `

        @keyframes nagrixToastIn {

            from {
                opacity: 0;
                transform:
                    translateY(10px);
            }

            to {
                opacity: 1;
                transform:
                    translateY(0);
            }

        }

        body.modal-open {
            overflow: hidden;
        }

        .notification {
            cursor: pointer;
        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =========================================================
   DEMO DATA RESET
========================================================= */

function resetUniversityDemoData() {

    const confirmed =
        confirm(
            "Reset all NAGRIX University demo data?"
        );


    if (!confirmed) return;


    appData =
        structuredCloneSafe(
            defaultData
        );


    saveData();


    location.reload();
}


/* =========================================================
   EXPORT RESEARCH DATA
========================================================= */

function exportResearchData() {

    const exportData = {

        exportedAt:
            new Date().toISOString(),

        university:
            appData.university,

        selectedProblem:
            appData.selectedProblem,

        problems:
            appData.problems,

        projects:
            appData.projects,

        researchers:
            appData.researchers,

        proposals:
            appData.proposals,

        pilot:
            appData.pilot

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    exportData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        `NAGRIX-University-Research-${Date.now()}.json`;


    document.body.appendChild(
        link
    );


    link.click();

    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Research data exported.",
        "success"
    );
}


/* =========================================================
   DEMO DEVELOPMENT HELPERS
========================================================= */

window.NAGRIXUniversity = {

    data:
        () => appData,

    save:
        saveData,

    reset:
        resetUniversityDemoData,

    export:
        exportResearchData,

    addNotification,

    showSection,

    viewProblem,

    runAIMatching

};


/* =========================================================
   GLOBAL FUNCTION EXPORT
   Required by inline onclick=""
========================================================= */

window.showSection =
    showSection;

window.viewProblem =
    viewProblem;

window.closeProblemModal =
    closeProblemModal;

window.selectProblemForResearch =
    selectProblemForResearch;

window.runAIMatching =
    runAIMatching;

window.acceptResearchProject =
    acceptResearchProject;

window.createResearchProject =
    createResearchProject;

window.openProjectDetails =
    openProjectDetails;

window.addResearcher =
    addResearcher;

window.requestPilotApproval =
    requestPilotApproval;

window.contactOfficer =
    contactOfficer;

window.publishSolution =
    publishSolution;

window.refreshProblems =
    refreshProblems;

window.searchProblems =
    searchProblems;

window.logoutUniversity =
    logoutUniversity;
