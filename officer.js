/* =========================================
   NAGRIX OFFICER COMMAND CENTER
========================================= */


/* DEMO OFFICER */

const officerAccount = {
    username: "officer001",
    password: "nagrix123",

    name: "Officer Raj",
    id: "NGRX-OFF-001",
    department: "Municipal Corporation",
    area: "Delhi Central Zone"
};


/* SAMPLE CITIZEN COMPLAINT DATA */

let complaints = [

    {
        id: "NGRX-2026-001245",

        citizen: "Citizen #1024",

        problem: "Road Damage",

        department: "Public Works Department",

        priority: "High",

        status: "Pending",

        address:
            "Main Road, Central Delhi",

        latitude: 28.6139,
        longitude: 77.2090,

        description:
            "Large pothole causing traffic problems.",

        citizenPhoto:
            "Citizen camera evidence",

        resolutionPhoto: null
    },


    {
        id: "NGRX-2026-001246",

        citizen: "Citizen #1028",

        problem: "Street Light Not Working",

        department: "Electrical Department",

        priority: "Medium",

        status: "In Progress",

        address:
            "Sector 12, Delhi",

        latitude: 28.6200,
        longitude: 77.2150,

        description:
            "Street light has not been working for several days.",

        citizenPhoto:
            "Citizen camera evidence",

        resolutionPhoto: null
    },


    {
        id: "NGRX-2026-001247",

        citizen: "Citizen #1031",

        problem: "Garbage Collection",

        department: "Sanitation Department",

        priority: "High",

        status: "Resolved",

        address:
            "Market Road, Delhi",

        latitude: 28.6250,
        longitude: 77.2200,

        description:
            "Garbage has not been collected for three days.",

        citizenPhoto:
            "Citizen camera evidence",

        resolutionPhoto:
            "resolution-photo.jpg"
    }

];


/* =========================================
   LOGIN
========================================= */

document
    .getElementById("officerLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        if (
            username === officerAccount.username &&
            password === officerAccount.password
        ) {

            document
                .getElementById("loginScreen")
                .classList.add("hidden");

            document
                .getElementById("dashboard")
                .classList.remove("hidden");

            initializeDashboard();

        } else {

            alert(
                "Invalid officer username or password."
            );

        }

    });


/* =========================================
   INITIALIZE DASHBOARD
========================================= */

function initializeDashboard() {

    document.getElementById(
        "topOfficerName"
    ).textContent = officerAccount.name;

    document.getElementById(
        "profileName"
    ).textContent = officerAccount.name;

    document.getElementById(
        "currentDate"
    ).textContent =
        new Date().toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    renderComplaints();

    renderRecentComplaints();

    createCharts();

}


/* =========================================
   NAVIGATION
========================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                openSection(
                    this.dataset.section
                );

            }
        );

    });


document
    .querySelectorAll("[data-section]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                if (
                    this.dataset.section
                ) {

                    openSection(
                        this.dataset.section
                    );

                }

            }
        );

    });


function openSection(sectionId) {

    document
        .querySelectorAll(".content-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

            if (
                button.dataset.section ===
                sectionId
            ) {

                button.classList.add(
                    "active"
                );

            }

        });

}


/* =========================================
   RENDER COMPLAINTS
========================================= */

function renderComplaints(
    filtered = complaints
) {

    const container =
        document.getElementById(
            "complaintList"
        );

    container.innerHTML = "";


    filtered.forEach(complaint => {

        const card =
            document.createElement("div");

        card.className =
            "complaint-card";


        let statusClass =
            "pending";

        if (
            complaint.status ===
            "In Progress"
        ) {

            statusClass =
                "progress-status";

        }

        if (
            complaint.status ===
            "Resolved"
        ) {

            statusClass =
                "resolved";

        }


        card.innerHTML = `

            <div class="complaint-top">

                <strong>
                    ${complaint.id}
                </strong>

                <span class="badge ${statusClass}">
                    ${complaint.status}
                </span>

            </div>

            <h3>
                ${complaint.problem}
            </h3>

            <p>
                👤 ${complaint.citizen}
            </p>

            <p>
                🏢 ${complaint.department}
            </p>

            <p>
                📍 ${complaint.address}
            </p>

            <p>
                🚨 Priority:
                <strong>
                    ${complaint.priority}
                </strong>
            </p>

            <button
                class="open-btn"
                onclick="
                    openComplaint(
                        '${complaint.id}'
                    )
                "
            >
                View Complaint
            </button>

        `;

        container.appendChild(card);

    });

}


/* =========================================
   RECENT COMPLAINTS
========================================= */

function renderRecentComplaints() {

    const container =
        document.getElementById(
            "recentComplaints"
        );

    container.innerHTML = "";


    complaints
        .slice(0, 3)
        .forEach(complaint => {

            const row =
                document.createElement("div");

            row.style.padding =
                "15px 0";

            row.style.borderBottom =
                "1px solid #e2e8f0";


            row.innerHTML = `

                <strong>
                    ${complaint.id}
                </strong>

                <br>

                <span>
                    ${complaint.problem}
                </span>

                <br>

                <small>
                    📍 ${complaint.address}
                </small>

                <button
                    class="open-btn"
                    onclick="
                        openComplaint(
                            '${complaint.id}'
                        )
                    "
                >
                    Open
                </button>

            `;


            container.appendChild(row);

        });

}


/* =========================================
   OPEN COMPLAINT
========================================= */

let selectedComplaint = null;

function openComplaint(id) {

    selectedComplaint =
        complaints.find(
            complaint =>
                complaint.id === id
        );


    if (!selectedComplaint) {
        return;
    }


    document.getElementById(
        "modalComplaintId"
    ).textContent =
        selectedComplaint.id;


    document.getElementById(
        "modalProblem"
    ).textContent =
        selectedComplaint.problem;


    document.getElementById(
        "modalDepartment"
    ).textContent =
        selectedComplaint.department;


    document.getElementById(
        "modalPriority"
    ).textContent =
        selectedComplaint.priority;


    document.getElementById(
        "modalAddress"
    ).textContent =
        selectedComplaint.address;


    document.getElementById(
        "modalDescription"
    ).textContent =
        selectedComplaint.description;


    document
        .getElementById("complaintModal")
        .classList.remove("hidden");

}


function closeComplaintModal() {

    document
        .getElementById("complaintModal")
        .classList.add("hidden");

}


/* =========================================
   OFFICER CAMERA
========================================= */

let officerStream = null;

async function startOfficerCamera() {

    try {

        officerStream =
            await navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: "environment"
                    },
                    audio: false
                });


        document
            .getElementById(
                "resolutionVideo"
            )
            .srcObject =
            officerStream;

    } catch (error) {

        alert(
            "Camera permission is required to capture resolution evidence."
        );

        console.error(error);

    }

}


/* =========================================
   CAPTURE RESOLUTION PHOTO
========================================= */

function captureResolutionPhoto() {

    if (!officerStream) {

        alert(
            "Please open the camera first."
        );

        return;

    }


    const video =
        document.getElementById(
            "resolutionVideo"
        );

    const canvas =
        document.getElementById(
            "resolutionCanvas"
        );

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;


    const context =
        canvas.getContext("2d");


    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    const photo =
        canvas.toDataURL(
            "image/jpeg",
            0.9
        );


    document.getElementById(
        "resolutionPreview"
    ).src = photo;


    document
        .getElementById(
            "resolutionPreview"
        )
        .classList.remove(
            "hidden"
        );


    if (selectedComplaint) {

        selectedComplaint.resolutionPhoto =
            photo;

    }


    document.getElementById(
        "resolutionMessage"
    ).textContent =
        "✅ Resolution evidence captured successfully.";

}


/* =========================================
   COMPLETE COMPLAINT
========================================= */

function completeComplaint() {

    if (!selectedComplaint) {
        return;
    }


    /*
        IMPORTANT:

        Complaint cannot be completed
        without resolution evidence.
    */

    if (
        !selectedComplaint.resolutionPhoto
    ) {

        document.getElementById(
            "resolutionMessage"
        ).textContent =
            "❌ Complaint cannot be completed. Resolution photo is mandatory.";

        document.getElementById(
            "resolutionMessage"
        ).style.color =
            "#dc2626";

        return;

    }


    selectedComplaint.status =
        "Resolved";


    document.getElementById(
        "resolutionMessage"
    ).textContent =
        "✅ Complaint successfully completed and verified.";

    document.getElementById(
        "resolutionMessage"
    ).style.color =
        "#16a34a";


    renderComplaints();

    renderRecentComplaints();

}


/* =========================================
   KEEP PENDING
========================================= */

function keepPending() {

    if (!selectedComplaint) {
        return;
    }


    selectedComplaint.status =
        "Pending";


    document.getElementById(
        "resolutionMessage"
    ).textContent =
        "⏳ Complaint remains Not Completed.";

    document.getElementById(
        "resolutionMessage"
    ).style.color =
        "#d97706";


    renderComplaints();

    renderRecentComplaints();

}


/* =========================================
   LOCATION
========================================= */

function openComplaintLocation() {

    if (!selectedComplaint) {

        alert(
            "Open a complaint first to view its GPS location."
        );

        return;

    }


    const latitude =
        selectedComplaint.latitude;

    const longitude =
        selectedComplaint.longitude;


    const url =
        `https://www.google.com/maps?q=${latitude},${longitude}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("searchComplaint")
    .addEventListener(
        "input",
        function() {

            const value =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                complaints.filter(
                    complaint =>
                        complaint.id
                            .toLowerCase()
                            .includes(value) ||

                        complaint.problem
                            .toLowerCase()
                            .includes(value) ||

                        complaint.address
                            .toLowerCase()
                            .includes(value)
                );


            renderComplaints(filtered);

        }
    );


/* =========================================
   CHARTS
========================================= */

function createCharts() {

    const monthlyCanvas =
        document.getElementById(
            "monthlyChart"
        );


    new Chart(
        monthlyCanvas,
        {
            type: "bar",

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
                        label: "Issues Solved",

                        data: [
                            12,
                            16,
                            14,
                            20,
                            18,
                            21,
                            17,
                            19
                        ]
                    },

                    {
                        label: "Not Solved",

                        data: [
                            4,
                            3,
                            5,
                            2,
                            4,
                            2,
                            3,
                            2
                        ]
                    }

                ]

            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        }
    );


    const performanceCanvas =
        document.getElementById(
            "performanceChart"
        );


    new Chart(
        performanceCanvas,
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
                        label: "Solved",

                        data: [
                            12,
                            16,
                            14,
                            20,
                            18,
                            21,
                            17,
                            19
                        ],

                        tension: 0.3
                    },

                    {
                        label: "Not Solved",

                        data: [
                            4,
                            3,
                            5,
                            2,
                            4,
                            2,
                            3,
                            2
                        ],

                        tension: 0.3
                    }

                ]

            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        }
    );

}


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            if (
                officerStream
            ) {

                officerStream
                    .getTracks()
                    .forEach(
                        track =>
                            track.stop()
                    );

            }


            document
                .getElementById(
                    "dashboard"
                )
                .classList.add(
                    "hidden"
                );


            document
                .getElementById(
                    "loginScreen"
                )
                .classList.remove(
                    "hidden"
                );

        }
    );