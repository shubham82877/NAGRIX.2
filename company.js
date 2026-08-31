/* =========================================================
   NAGRIX COMPANY INNOVATION PORTAL
   company.js
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL DATA
========================================================= */

const NAGRIX_COMPANY = {
    companyName: "ABC Innovation Industries",
    portalName: "NAGRIX Company Innovation Hub",
    status: "ACTIVE"
};


/* =========================================================
   INNOVATION CHALLENGES
========================================================= */

let innovationChallenges = [
    {
        id: "NIC-2026-001",
        title: "Smart Urban Water Management",
        category: "Water & Infrastructure",
        priority: "HIGH",

        problemId: "NGRX-2026-001245",

        problem:
            "Repeated urban waterlogging is affecting roads, public movement and local infrastructure.",

        research:
            "University Civil Engineering and IoT researchers are studying water flow, drainage capacity and real-time monitoring.",

        university:
            "ABC Institute of Technology",

        department:
            "Civil Engineering + IoT",

        researchStatus:
            "Research Completed",

        solution:
            "IoT-based Smart Drainage Monitoring System",

        developmentStatus:
            "Prototype Development",

        pilotStatus:
            "Pilot Preparation",

        impactStatus:
            "Impact Analysis Pending",

        progress: 72,

        estimatedBudget:
            480000,

        expectedCitizens:
            8400,

        createdAt:
            "2026-08-20"
    },

    {
        id: "NIC-2026-002",
        title: "AI Smart Waste Collection",
        category: "Waste Management",
        priority: "MEDIUM",

        problemId: "NGRX-2026-001198",

        problem:
            "Garbage bins frequently overflow because collection schedules do not match actual waste generation.",

        research:
            "University AI and IoT researchers are developing predictive waste-level monitoring.",

        university:
            "ABC Institute of Technology",

        department:
            "Computer Science & AI",

        researchStatus:
            "Research Active",

        solution:
            "AI Waste Overflow Prediction System",

        developmentStatus:
            "Prototype Ready",

        pilotStatus:
            "Pilot Approval Pending",

        impactStatus:
            "Baseline Data Collected",

        progress: 82,

        estimatedBudget:
            350000,

        expectedCitizens:
            6100,

        createdAt:
            "2026-08-21"
    },

    {
        id: "NIC-2026-003",
        title: "Smart Street Light Failure Detection",
        category: "Smart City",
        priority: "MEDIUM",

        problemId: "NGRX-2026-001176",

        problem:
            "Repeated street-light failures are creating safety and visibility problems.",

        research:
            "Electrical Engineering researchers are studying automated fault detection and predictive maintenance.",

        university:
            "ABC Institute of Technology",

        department:
            "Electrical Engineering",

        researchStatus:
            "Research Proposal",

        solution:
            "AI + IoT Street Light Monitoring Network",

        developmentStatus:
            "Not Started",

        pilotStatus:
            "Not Started",

        impactStatus:
            "Not Started",

        progress: 35,

        estimatedBudget:
            275000,

        expectedCitizens:
            3200,

        createdAt:
            "2026-08-22"
    }
];


/* =========================================================
   RESEARCH PROJECTS
========================================================= */

let researchProjects = [
    {
        id: "RP-001",

        challengeId:
            "NIC-2026-001",

        title:
            "Smart Drainage Monitoring System",

        university:
            "ABC Institute of Technology",

        department:
            "Civil Engineering + IoT",

        principalResearcher:
            "Dr. Research Lead",

        stage:
            "Prototype Development",

        progress:
            68,

        researchFindings:
            "Water accumulation is strongly correlated with drainage capacity and rainfall intensity.",

        proposedTechnology:
            "IoT water-level sensors + cloud analytics + AI alerts",

        prototype:
            "IoT drainage monitoring prototype",

        fieldReady:
            false,

        officerApproval:
            false,

        pilotApproved:
            false,

        impactMeasured:
            false
    },

    {
        id: "RP-002",

        challengeId:
            "NIC-2026-002",

        title:
            "AI Waste Collection Predictor",

        university:
            "ABC Institute of Technology",

        department:
            "Computer Science & AI",

        principalResearcher:
            "AI Research Team",

        stage:
            "Prototype",

        progress:
            82,

        researchFindings:
            "Waste overflow can be predicted using historical collection and bin-level data.",

        proposedTechnology:
            "AI prediction model + IoT bin sensors",

        prototype:
            "AI prediction dashboard",

        fieldReady:
            true,

        officerApproval:
            false,

        pilotApproved:
            false,

        impactMeasured:
            false
    }
];


/* =========================================================
   PILOT PROJECTS
========================================================= */

let pilotProjects = [
    {
        id: "PILOT-001",

        challengeId:
            "NIC-2026-001",

        project:
            "Smart Drainage Monitoring System",

        location:
            "XYZ Municipal Zone",

        university:
            "ABC Institute of Technology",

        company:
            "ABC Innovation Industries",

        officer:
            "Municipal Engineering Officer",

        status:
            "PREPARATION",

        startDate:
            null,

        endDate:
            null,

        citizens:
            8400,

        baselineProblemRate:
            100,

        currentProblemRate:
            28,

        costBefore:
            600000,

        costAfter:
            420000,

        officerVerified:
            false
    }
];


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function showMessage(message, type = "success") {

    let box = getElement("companyToast");

    if (!box) {

        box = document.createElement("div");

        box.id = "companyToast";

        box.className = "company-toast";

        document.body.appendChild(box);
    }

    box.textContent = message;

    box.className = `company-toast ${type}`;

    box.classList.add("show");

    setTimeout(() => {
        box.classList.remove("show");
    }, 3500);
}


function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}


function generateId(prefix) {

    const number =
        Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${new Date().getFullYear()}-${number}`;
}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".content-section");

    const navItems =
        document.querySelectorAll(".nav-item");

    sections.forEach(section => {

        section.classList.remove("active-section");

    });

    navItems.forEach(item => {

        item.classList.remove("active");

    });


    const target =
        getElement(sectionId);

    if (target) {

        target.classList.add("active-section");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    const activeNav =
        document.querySelector(
            `.nav-item[data-section="${sectionId}"]`
        );

    if (activeNav) {

        activeNav.classList.add("active");
    }


    updatePageTitle(sectionId);
}


function updatePageTitle(sectionId) {

    const title =
        getElement("pageTitle");

    if (!title) return;


    const titles = {

        overview:
            "Company Innovation Command Center",

        challenges:
            "Innovation Challenges",

        research:
            "University Research Collaboration",

        development:
            "Solution Development",

        projects:
            "Real-Life Innovation Projects",

        pilot:
            "Pilot Project Management",

        impact:
            "Impact Analysis",

        deployment:
            "Solution Deployment",

        collaboration:
            "University Collaboration",

        analytics:
            "Innovation Analytics"
    };


    title.textContent =
        titles[sectionId] ||
        "NAGRIX Company Innovation Hub";
}


/* =========================================================
   NAVIGATION INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            if (section) {

                showSection(section);
            }

        });

    });


    initializeCompanyPortal();

});


function initializeCompanyPortal() {

    updateDashboardStats();

    renderChallenges();

    renderResearchProjects();

    renderPilotProjects();

    renderImpactAnalysis();

    renderUniversityCollaboration();

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboardStats() {

    const challengeCount =
        innovationChallenges.length;

    const researchCount =
        researchProjects.length;

    const pilotCount =
        pilotProjects.length;


    const deployed =
        innovationChallenges.filter(
            item =>
                item.developmentStatus ===
                "Deployed"
        ).length;


    setText(
        "challengeCount",
        challengeCount
    );

    setText(
        "researchCount",
        researchCount
    );

    setText(
        "pilotCount",
        pilotCount
    );

    setText(
        "deploymentCount",
        deployed
    );
}


function setText(id, value) {

    const element =
        getElement(id);

    if (element) {

        element.textContent = value;
    }
}


/* =========================================================
   CHALLENGE RENDERING
========================================================= */

function renderChallenges() {

    const container =
        getElement("challengeList");

    if (!container) return;


    container.innerHTML = "";


    innovationChallenges.forEach(challenge => {

        const card =
            document.createElement("article");

        card.className =
            "innovation-card";


        card.innerHTML = `

            <div class="card-top">

                <span class="challenge-id">
                    ${challenge.id}
                </span>

                <span class="status ${challenge.priority.toLowerCase()}">
                    ${challenge.priority}
                </span>

            </div>


            <h2>
                ${challenge.title}
            </h2>


            <p>
                ${challenge.problem}
            </p>


            <div class="innovation-meta">

                <span>
                    🎫 ${challenge.problemId}
                </span>

                <span>
                    🎓 ${challenge.university}
                </span>

                <span>
                    🔬 ${challenge.department}
                </span>

            </div>


            <div class="challenge-progress">

                <div class="progress-header">

                    <span>
                        Innovation Progress
                    </span>

                    <strong>
                        ${challenge.progress}%
                    </strong>

                </div>

                <div class="progress">
                    <div style="width:${challenge.progress}%"></div>
                </div>

            </div>


            <button
                class="primary-btn"
                onclick="openChallenge('${challenge.id}')"
            >
                View Innovation Challenge →
            </button>
        `;


        container.appendChild(card);
    });
}


/* =========================================================
   OPEN CHALLENGE
========================================================= */

function openChallenge(challengeId) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) {

        showMessage(
            "Innovation challenge not found.",
            "error"
        );

        return;
    }


    const modal =
        getElement("challengeModal");


    if (!modal) {

        showMessage(
            `${challenge.title} selected.`
        );

        return;
    }


    setText(
        "modalChallengeId",
        challenge.id
    );

    setText(
        "modalChallengeTitle",
        challenge.title
    );

    setText(
        "modalChallengeProblem",
        challenge.problem
    );

    setText(
        "modalChallengeUniversity",
        challenge.university
    );

    setText(
        "modalChallengeDepartment",
        challenge.department
    );

    setText(
        "modalChallengeSolution",
        challenge.solution
    );


    modal.classList.remove("hidden");
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeChallengeModal() {

    const modal =
        getElement("challengeModal");

    if (modal) {

        modal.classList.add("hidden");
    }
}


/* =========================================================
   CREATE INNOVATION CHALLENGE
========================================================= */

function createInnovationChallenge() {

    const title =
        prompt(
            "Enter Innovation Challenge Title:"
        );


    if (!title) return;


    const category =
        prompt(
            "Enter Challenge Category:"
        ) ||
        "Smart City";


    const problem =
        prompt(
            "Describe the real-world problem:"
        );


    if (!problem) return;


    const newChallenge = {

        id: generateId("NIC"),

        title,

        category,

        priority: "MEDIUM",

        problemId:
            generateId("NGRX"),

        problem,

        research:
            "Awaiting university research assignment.",

        university:
            "Pending AI Matching",

        department:
            "Pending",

        researchStatus:
            "Awaiting Research",

        solution:
            "Solution not yet developed",

        developmentStatus:
            "Not Started",

        pilotStatus:
            "Not Started",

        impactStatus:
            "Not Started",

        progress:
            5,

        estimatedBudget:
            0,

        expectedCitizens:
            0,

        createdAt:
            new Date().toISOString()
    };


    innovationChallenges.push(
        newChallenge
    );


    renderChallenges();

    updateDashboardStats();


    showMessage(
        `Innovation Challenge ${newChallenge.id} created successfully.`
    );
}


/* =========================================================
   UNIVERSITY AI MATCHING
========================================================= */

function runUniversityMatching(
    challengeId
) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) return;


    showMessage(
        "NAGRIX AI is analyzing university capabilities..."
    );


    setTimeout(() => {

        challenge.university =
            "ABC Institute of Technology";

        challenge.department =
            determineResearchDepartment(
                challenge.category,
                challenge.title
            );

        challenge.researchStatus =
            "University Matched";

        challenge.progress =
            Math.max(
                challenge.progress,
                20
            );


        renderChallenges();


        showMessage(
            `University matched: ${challenge.university} — ${challenge.department}`
        );


        renderUniversityCollaboration();

    }, 1500);
}


function determineResearchDepartment(
    category,
    title
) {

    const text =
        `${category} ${title}`.toLowerCase();


    if (
        text.includes("water") ||
        text.includes("drainage")
    ) {

        return "Civil Engineering + IoT";
    }


    if (
        text.includes("waste")
    ) {

        return "Computer Science & AI";
    }


    if (
        text.includes("light") ||
        text.includes("electric")
    ) {

        return "Electrical Engineering";
    }


    if (
        text.includes("environment")
    ) {

        return "Environmental Engineering";
    }


    return "Computer Science & AI";
}


/* =========================================================
   ACCEPT UNIVERSITY RESEARCH
========================================================= */

function acceptUniversityResearch(
    challengeId
) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) return;


    if (
        challenge.university ===
        "Pending AI Matching"
    ) {

        showMessage(
            "Please run AI University Matching first.",
            "error"
        );

        return;
    }


    challenge.researchStatus =
        "Research Accepted";


    challenge.progress =
        Math.max(
            challenge.progress,
            30
        );


    renderChallenges();


    showMessage(
        "University research collaboration accepted."
    );


    renderUniversityCollaboration();
}


/* =========================================================
   RESEARCH FINDINGS
========================================================= */

function submitResearchFindings(
    projectId
) {

    const project =
        researchProjects.find(
            item =>
                item.id === projectId
        );


    if (!project) return;


    const findings =
        prompt(
            "Enter university research findings:"
        );


    if (!findings) return;


    project.researchFindings =
        findings;


    project.stage =
        "Research Completed";


    project.progress =
        Math.max(
            project.progress,
            45
        );


    const challenge =
        innovationChallenges.find(
            item =>
                item.id === project.challengeId
        );


    if (challenge) {

        challenge.researchStatus =
            "Research Completed";

        challenge.progress =
            Math.max(
                challenge.progress,
                45
            );
    }


    renderResearchProjects();

    renderChallenges();


    showMessage(
        "University research findings submitted."
    );
}


/* =========================================================
   RESEARCH PROJECT RENDERING
========================================================= */

function renderResearchProjects() {

    const container =
        getElement("researchProjectList");


    if (!container) return;


    container.innerHTML = "";


    researchProjects.forEach(project => {

        const card =
            document.createElement("div");

        card.className =
            "research-project-card";


        card.innerHTML = `

            <span class="research-status">
                ${project.stage}
            </span>


            <h2>
                ${project.title}
            </h2>


            <p>
                ${project.researchFindings}
            </p>


            <div class="project-meta">

                <span>
                    🎓 ${project.university}
                </span>

                <span>
                    🔬 ${project.department}
                </span>

                <span>
                    👨‍🔬 ${project.principalResearcher}
                </span>

            </div>


            <div class="progress-header">

                <span>
                    Research → Development
                </span>

                <strong>
                    ${project.progress}%
                </strong>

            </div>


            <div class="progress">

                <div
                    style="width:${project.progress}%"
                ></div>

            </div>


            <div class="project-actions">

                <button
                    class="secondary-btn"
                    onclick="submitResearchFindings('${project.id}')"
                >
                    Research Findings
                </button>

                <button
                    class="primary-btn"
                    onclick="startSolutionDevelopment('${project.id}')"
                >
                    Develop Solution →
                </button>

            </div>
        `;


        container.appendChild(card);
    });
}


/* =========================================================
   SOLUTION DEVELOPMENT
========================================================= */

function startSolutionDevelopment(
    projectId
) {

    const project =
        researchProjects.find(
            item =>
                item.id === projectId
        );


    if (!project) return;


    if (
        project.stage ===
        "Research Proposal"
    ) {

        showMessage(
            "University research must be completed before development.",
            "error"
        );

        return;
    }


    project.stage =
        "Solution Development";


    project.progress =
        Math.max(
            project.progress,
            55
        );


    project.proposedTechnology =
        project.proposedTechnology ||
        "AI + IoT civic technology";


    const challenge =
        innovationChallenges.find(
            item =>
                item.id === project.challengeId
        );


    if (challenge) {

        challenge.developmentStatus =
            "Solution Development";

        challenge.solution =
            project.title;

        challenge.progress =
            Math.max(
                challenge.progress,
                55
            );
    }


    renderResearchProjects();

    renderChallenges();


    showMessage(
        "Real-life solution development phase started."
    );
}


/* =========================================================
   CREATE REAL-LIFE PROJECT
========================================================= */

function createRealLifeProject(
    projectId
) {

    const project =
        researchProjects.find(
            item =>
                item.id === projectId
        );


    if (!project) return;


    if (
        project.progress < 55
    ) {

        showMessage(
            "Solution development must begin before creating a real-life project.",
            "error"
        );

        return;
    }


    const location =
        prompt(
            "Enter real-life project location:"
        );


    if (!location) return;


    const pilot = {

        id:
            generateId("PILOT"),

        challengeId:
            project.challengeId,

        project:
            project.title,

        location,

        university:
            project.university,

        company:
            NAGRIX_COMPANY.companyName,

        officer:
            "Assigned Municipal Officer",

        status:
            "PREPARATION",

        startDate:
            null,

        endDate:
            null,

        citizens:
            0,

        baselineProblemRate:
            100,

        currentProblemRate:
            100,

        costBefore:
            0,

        costAfter:
            0,

        officerVerified:
            false
    };


    pilotProjects.push(pilot);


    project.fieldReady =
        true;


    project.stage =
        "Field Pilot Preparation";


    project.progress =
        Math.max(
            project.progress,
            70
        );


    renderPilotProjects();


    showMessage(
        `Real-life project ${pilot.id} created.`
    );


    showSection("pilot");
}


/* =========================================================
   PILOT PROJECT RENDERING
========================================================= */

function renderPilotProjects() {

    const container =
        getElement("pilotProjectList");


    if (!container) return;


    container.innerHTML = "";


    pilotProjects.forEach(pilot => {

        const card =
            document.createElement("div");

        card.className =
            "pilot-project-card";


        card.innerHTML = `

            <div class="card-top">

                <span class="challenge-id">
                    ${pilot.id}
                </span>

                <span class="status">
                    ${pilot.status}
                </span>

            </div>


            <h2>
                ${pilot.project}
            </h2>


            <p>
                📍 ${pilot.location}
            </p>


            <div class="pilot-meta">

                <span>
                    🎓 ${pilot.university}
                </span>

                <span>
                    🏢 ${pilot.company}
                </span>

                <span>
                    👮 ${pilot.officer}
                </span>

            </div>


            <div class="pilot-checklist">

                <div class="${pilot.status !== "PREPARATION" ? "done" : ""}">
                    ✓ Research
                </div>

                <div class="${pilot.fieldReady ? "done" : ""}">
                    ✓ Prototype
                </div>

                <div class="${pilot.startDate ? "done" : ""}">
                    ✓ Field Pilot
                </div>

                <div class="${pilot.officerVerified ? "done" : ""}">
                    ✓ Officer Verification
                </div>

            </div>


            <div class="project-actions">

                <button
                    class="primary-btn"
                    onclick="startPilot('${pilot.id}')"
                >
                    🚀 Start Pilot
                </button>

                <button
                    class="secondary-btn"
                    onclick="verifyPilot('${pilot.id}')"
                >
                    👮 Officer Verify
                </button>

            </div>
        `;


        container.appendChild(card);
    });
}


/* =========================================================
   START PILOT
========================================================= */

function startPilot(pilotId) {

    const pilot =
        pilotProjects.find(
            item =>
                item.id === pilotId
        );


    if (!pilot) return;


    if (!pilot.fieldReady) {

        showMessage(
            "Prototype must be field-ready before pilot testing.",
            "error"
        );

        return;
    }


    pilot.status =
        "ACTIVE PILOT";


    pilot.startDate =
        new Date().toISOString();


    const challenge =
        innovationChallenges.find(
            item =>
                item.id === pilot.challengeId
        );


    if (challenge) {

        challenge.pilotStatus =
            "Pilot Active";

        challenge.progress =
            Math.max(
                challenge.progress,
                80
            );
    }


    renderPilotProjects();

    renderChallenges();


    showMessage(
        `Pilot ${pilot.id} has started successfully.`
    );
}


/* =========================================================
   OFFICER VERIFICATION
========================================================= */

function verifyPilot(pilotId) {

    const pilot =
        pilotProjects.find(
            item =>
                item.id === pilotId
        );


    if (!pilot) return;


    if (!pilot.startDate) {

        showMessage(
            "Pilot must be started before officer verification.",
            "error"
        );

        return;
    }


    const confirmVerification =
        confirm(
            "Has the ground officer verified the pilot performance?"
        );


    if (!confirmVerification) {

        return;
    }


    pilot.officerVerified =
        true;


    pilot.status =
        "FIELD VERIFIED";


    pilot.endDate =
        new Date().toISOString();


    const challenge =
        innovationChallenges.find(
            item =>
                item.id === pilot.challengeId
        );


    if (challenge) {

        challenge.pilotStatus =
            "Field Pilot Verified";

        challenge.progress =
            Math.max(
                challenge.progress,
                90
            );
    }


    renderPilotProjects();

    renderChallenges();


    showMessage(
        "Officer verification recorded successfully."
    );
}


/* =========================================================
   IMPACT ANALYSIS
========================================================= */

function calculateImpact(
    pilot
) {

    if (
        pilot.baselineProblemRate === 0
    ) {

        return 0;
    }


    return Math.round(
        (
            (
                pilot.baselineProblemRate -
                pilot.currentProblemRate
            )
            /
            pilot.baselineProblemRate
        )
        * 100
    );
}


function calculateCostSaving(
    pilot
) {

    if (
        !pilot.costBefore
    ) {

        return 0;
    }


    return Math.max(
        0,
        pilot.costBefore -
        pilot.costAfter
    );
}


function renderImpactAnalysis() {

    const container =
        getElement("impactProjectList");


    if (!container) return;


    container.innerHTML = "";


    pilotProjects.forEach(pilot => {

        const impact =
            calculateImpact(pilot);


        const saving =
            calculateCostSaving(pilot);


        const card =
            document.createElement("div");

        card.className =
            "impact-card";


        card.innerHTML = `

            <h2>
                ${pilot.project}
            </h2>


            <p>
                ${pilot.location}
            </p>


            <div class="impact-grid">

                <div>

                    <span>
                        Problem Reduction
                    </span>

                    <strong>
                        ${impact}%
                    </strong>

                </div>


                <div>

                    <span>
                        Cost Saving
                    </span>

                    <strong>
                        ${formatCurrency(saving)}
                    </strong>

                </div>


                <div>

                    <span>
                        Citizens
                    </span>

                    <strong>
                        ${pilot.citizens || 0}
                    </strong>

                </div>

            </div>


            <button
                class="primary-btn"
                onclick="collectImpactData('${pilot.id}')"
            >
                📊 Update Impact Data
            </button>

        `;


        container.appendChild(card);
    });
}


/* =========================================================
   COLLECT IMPACT DATA
========================================================= */

function collectImpactData(pilotId) {

    const pilot =
        pilotProjects.find(
            item =>
                item.id === pilotId
        );


    if (!pilot) return;


    const currentRate =
        prompt(
            "Current problem rate (%):",
            pilot.currentProblemRate
        );


    if (
        currentRate === null
    ) return;


    const citizens =
        prompt(
            "Citizens benefited:",
            pilot.citizens
        );


    if (
        citizens === null
    ) return;


    const costBefore =
        prompt(
            "Cost before solution (₹):",
            pilot.costBefore
        );


    const costAfter =
        prompt(
            "Cost after solution (₹):",
            pilot.costAfter
        );


    pilot.currentProblemRate =
        Number(currentRate);


    pilot.citizens =
        Number(citizens);


    pilot.costBefore =
        Number(costBefore);


    pilot.costAfter =
        Number(costAfter);


    pilot.impactMeasured =
        true;


    const challenge =
        innovationChallenges.find(
            item =>
                item.id === pilot.challengeId
        );


    if (challenge) {

        challenge.impactStatus =
            "Impact Analysis Completed";

        challenge.progress =
            100;
    }


    renderImpactAnalysis();

    renderChallenges();


    showMessage(
        "Impact analysis updated successfully."
    );
}


/* =========================================================
   UNIVERSITY COLLABORATION
========================================================= */

function renderUniversityCollaboration() {

    const container =
        getElement(
            "universityCollaborationList"
        );


    if (!container) return;


    container.innerHTML = "";


    innovationChallenges.forEach(
        challenge => {

            const card =
                document.createElement("div");

            card.className =
                "collaboration-card";


            card.innerHTML = `

                <div class="collaboration-header">

                    <span>
                        🎓 UNIVERSITY COLLABORATION
                    </span>

                    <strong>
                        ${challenge.researchStatus}
                    </strong>

                </div>


                <h2>
                    ${challenge.title}
                </h2>


                <div class="collaboration-details">

                    <div>

                        <span>
                            Civic Problem
                        </span>

                        <strong>
                            ${challenge.problem}
                        </strong>

                    </div>


                    <div>

                        <span>
                            University
                        </span>

                        <strong>
                            ${challenge.university}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Research Department
                        </span>

                        <strong>
                            ${challenge.department}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Research
                        </span>

                        <strong>
                            ${challenge.research}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Proposed Solution
                        </span>

                        <strong>
                            ${challenge.solution}
                        </strong>

                    </div>

                </div>


                <button
                    class="primary-btn"
                    onclick="acceptUniversityResearch('${challenge.id}')"
                >
                    🤝 Accept Collaboration
                </button>

            `;


            container.appendChild(card);
        }
    );
}


/* =========================================================
   COMPANY → UNIVERSITY RESEARCH REQUEST
========================================================= */

function sendResearchRequest(
    challengeId
) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) return;


    if (
        challenge.university ===
        "Pending AI Matching"
    ) {

        runUniversityMatching(
            challengeId
        );

        return;
    }


    challenge.researchStatus =
        "Research Request Sent";


    showMessage(
        `Research request sent to ${challenge.university}.`
    );


    renderChallenges();

    renderUniversityCollaboration();
}


/* =========================================================
   SOLUTION APPROVAL
========================================================= */

function approveSolution(
    projectId
) {

    const project =
        researchProjects.find(
            item =>
                item.id === projectId
        );


    if (!project) return;


    const approval =
        confirm(
            `Approve "${project.title}" for real-life development?`
        );


    if (!approval) return;


    project.stage =
        "Approved for Real-Life Development";


    project.progress =
        Math.max(
            project.progress,
            65
        );


    showMessage(
        "Solution approved for real-life development."
    );


    renderResearchProjects();
}


/* =========================================================
   DEPLOYMENT
========================================================= */

function deploySolution(
    challengeId
) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) return;


    const pilot =
        pilotProjects.find(
            item =>
                item.challengeId === challengeId
        );


    if (
        !pilot ||
        !pilot.officerVerified
    ) {

        showMessage(
            "Officer verification is required before deployment.",
            "error"
        );

        return;
    }


    if (
        !pilot.impactMeasured
    ) {

        showMessage(
            "Impact analysis is required before deployment.",
            "error"
        );

        return;
    }


    challenge.developmentStatus =
        "Deployed";


    challenge.pilotStatus =
        "Pilot Successfully Completed";


    challenge.impactStatus =
        "Impact Verified";


    challenge.progress =
        100;


    showMessage(
        `${challenge.title} is approved for civic deployment.`
    );


    renderChallenges();

    updateDashboardStats();
}


/* =========================================================
   ANALYTICS
========================================================= */

function getInnovationAnalytics() {

    const total =
        innovationChallenges.length;


    const researchCompleted =
        innovationChallenges.filter(
            item =>
                item.researchStatus ===
                "Research Completed"
        ).length;


    const activePilots =
        pilotProjects.filter(
            item =>
                item.status ===
                "ACTIVE PILOT"
        ).length;


    const verifiedPilots =
        pilotProjects.filter(
            item =>
                item.officerVerified
        ).length;


    const deployed =
        innovationChallenges.filter(
            item =>
                item.developmentStatus ===
                "Deployed"
        ).length;


    return {

        total,

        researchCompleted,

        activePilots,

        verifiedPilots,

        deployed
    };
}


function showAnalytics() {

    const data =
        getInnovationAnalytics();


    const message = `

NAGRIX INNOVATION ANALYTICS

Innovation Challenges:
${data.total}

Research Completed:
${data.researchCompleted}

Active Pilots:
${data.activePilots}

Officer Verified Pilots:
${data.verifiedPilots}

Deployed Solutions:
${data.deployed}
`;


    alert(message);
}


/* =========================================================
   SEARCH CHALLENGES
========================================================= */

function searchInnovationChallenges() {

    const input =
        getElement("challengeSearch");


    const filter =
        input
            ? input.value.toLowerCase()
            : "";


    const cards =
        document.querySelectorAll(
            ".innovation-card"
        );


    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();


        card.style.display =
            text.includes(filter)
                ? ""
                : "none";
    });
}


/* =========================================================
   FILTER BY CATEGORY
========================================================= */

function filterInnovationChallenges() {

    const select =
        getElement("challengeCategory");


    if (!select) return;


    const category =
        select.value;


    const cards =
        document.querySelectorAll(
            ".innovation-card"
        );


    cards.forEach(card => {

        if (
            category === "all"
        ) {

            card.style.display = "";

            return;
        }


        const challengeId =
            card
                .querySelector(
                    ".challenge-id"
                )
                ?.textContent;


        const challenge =
            innovationChallenges.find(
                item =>
                    item.id ===
                    challengeId
            );


        if (!challenge) return;


        card.style.display =
            challenge.category ===
            category
                ? ""
                : "none";
    });
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function showCompanyNotifications() {

    const notifications = [

        "New civic challenge received from NAGRIX Officer.",

        "University research proposal is ready for review.",

        "Pilot approval request received.",

        "Impact analysis data requires update."
    ];


    alert(
        "NAGRIX Notifications\n\n" +
        notifications
            .map(
                (item, index) =>
                    `${index + 1}. ${item}`
            )
            .join("\n")
    );
}


/* =========================================================
   OFFICER CONTACT
========================================================= */

function contactOfficer() {

    const message =
        prompt(
            "Enter message for NAGRIX Officer:"
        );


    if (!message) return;


    showMessage(
        "Message sent to assigned officer."
    );
}


/* =========================================================
   UNIVERSITY CONTACT
========================================================= */

function contactUniversity() {

    const message =
        prompt(
            "Enter message for university research team:"
        );


    if (!message) return;


    showMessage(
        "Message sent to university research team."
    );
}


/* =========================================================
   EXPORT INNOVATION REPORT
========================================================= */

function generateInnovationReport(
    challengeId
) {

    const challenge =
        innovationChallenges.find(
            item =>
                item.id === challengeId
        );


    if (!challenge) return;


    const pilot =
        pilotProjects.find(
            item =>
                item.challengeId ===
                challengeId
        );


    const impact =
        pilot
            ? calculateImpact(pilot)
            : 0;


    const saving =
        pilot
            ? calculateCostSaving(pilot)
            : 0;


    const report = `

NAGRIX INNOVATION REPORT
========================

Challenge:
${challenge.title}

Challenge ID:
${challenge.id}

Civic Problem:
${challenge.problem}

Problem ID:
${challenge.problemId}

University:
${challenge.university}

Research Department:
${challenge.department}

Research Status:
${challenge.researchStatus}

Solution:
${challenge.solution}

Development Status:
${challenge.developmentStatus}

Pilot Status:
${challenge.pilotStatus}

Impact Status:
${challenge.impactStatus}

Problem Reduction:
${impact}%

Cost Saving:
${formatCurrency(saving)}

Citizens Benefited:
${pilot ? pilot.citizens : 0}

Generated:
${new Date().toLocaleString("en-IN")}
`;


    const blob =
        new Blob(
            [report],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        `${challenge.id}-Innovation-Report.txt`;


    link.click();


    URL.revokeObjectURL(url);


    showMessage(
        "Innovation report generated."
    );
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutCompany() {

    const confirmLogout =
        confirm(
            "Logout from NAGRIX Company Innovation Portal?"
        );


    if (!confirmLogout) return;


    sessionStorage.removeItem(
        "nagrixCompanySession"
    );


    window.location.href =
        "index.html";
}


/* =========================================================
   GLOBAL FUNCTION EXPORT
   Needed for inline onclick=""
========================================================= */

window.showSection =
    showSection;

window.openChallenge =
    openChallenge;

window.closeChallengeModal =
    closeChallengeModal;

window.createInnovationChallenge =
    createInnovationChallenge;

window.runUniversityMatching =
    runUniversityMatching;

window.acceptUniversityResearch =
    acceptUniversityResearch;

window.sendResearchRequest =
    sendResearchRequest;

window.submitResearchFindings =
    submitResearchFindings;

window.startSolutionDevelopment =
    startSolutionDevelopment;

window.createRealLifeProject =
    createRealLifeProject;

window.startPilot =
    startPilot;

window.verifyPilot =
    verifyPilot;

window.collectImpactData =
    collectImpactData;

window.deploySolution =
    deploySolution;

window.approveSolution =
    approveSolution;

window.showAnalytics =
    showAnalytics;

window.searchInnovationChallenges =
    searchInnovationChallenges;

window.filterInnovationChallenges =
    filterInnovationChallenges;

window.showCompanyNotifications =
    showCompanyNotifications;

window.contactOfficer =
    contactOfficer;

window.contactUniversity =
    contactUniversity;

window.generateInnovationReport =
    generateInnovationReport;

window.logoutCompany =
    logoutCompany;


/* =========================================================
   END NAGRIX COMPANY INNOVATION PORTAL
========================================================= */