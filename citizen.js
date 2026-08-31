/* =====================================================
   NAGRIX CITIZEN PORTAL
   Frontend Demo Logic
===================================================== */


/* ================= GLOBAL STATE ================= */

let selectedProblem = null;
let selectedDepartment = null;
let selectedPriority = null;

let cameraStream = null;
let capturedPhoto = null;

let map = null;
let userMarker = null;

let currentLocation = {
    latitude: null,
    longitude: null,
    accuracy: null,
    address: ""
};

let complaints = JSON.parse(
    localStorage.getItem("nagrixComplaints") || "[]"
);


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeMap();

        const description =
            document.getElementById("description");

        description.addEventListener(
            "input",
            updateCharacterCount
        );

        document
            .getElementById("messageBtn")
            .addEventListener(
                "click",
                toggleMessagePanel
            );
    }
);


/* ================= MAP ================= */

function initializeMap() {

    map = L.map("map").setView(
        [28.4595, 77.0266],
        12
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);
}


/* ================= PROBLEM ================= */

function selectProblem(button) {

    document
        .querySelectorAll(".problem-card")
        .forEach(card => {
            card.classList.remove("selected");
        });

    button.classList.add("selected");

    selectedProblem =
        button.dataset.problem;

    selectedDepartment =
        button.dataset.department;

    selectedPriority =
        button.dataset.priority;

    document
        .getElementById("selectedProblem")
        .value = selectedProblem;

    document
        .getElementById("aiProblem")
        .textContent = selectedProblem;

    document
        .getElementById("department")
        .textContent =
        selectedDepartment;

    document
        .getElementById("priority")
        .textContent =
        selectedPriority;

    const priority =
        document.getElementById("priority");

    priority.style.color =
        selectedPriority === "High"
            ? "#ff6478"
            : selectedPriority === "Medium"
                ? "#ffb300"
                : "#00e676";

    showToast(
        `${selectedProblem} selected`
    );
}


/* ================= AI ANALYSIS ================= */

function analyzeProblem() {

    if (!selectedProblem) {

        showToast(
            "Please select a problem first."
        );

        return;
    }

    const department =
        document.getElementById("department");

    department.textContent =
        "AI analyzing...";

    setTimeout(() => {

        department.textContent =
            selectedDepartment;

        showToast(
            `AI routed issue to ${selectedDepartment}`
        );

    }, 900);
}


/* ================= DESCRIPTION ================= */

function updateCharacterCount() {

    const value =
        document.getElementById(
            "description"
        ).value;

    document.getElementById(
        "charCount"
    ).textContent =
        value.length;
}


/* ================= CAMERA ================= */

async function startCamera() {

    try {

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            showToast(
                "Camera API is not supported by this browser."
            );

            return;
        }

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: {
                        ideal: "environment"
                    },
                    width: {
                        ideal: 1280
                    },
                    height: {
                        ideal: 720
                    }
                },
                audio: false
            });

        const video =
            document.getElementById(
                "cameraVideo"
            );

        video.srcObject =
            cameraStream;

        video.style.display =
            "block";

        document
            .getElementById(
                "cameraPlaceholder"
            )
            .style.display =
            "none";

        document
            .getElementById(
                "captureBtn"
            )
            .disabled = false;

        showToast(
            "Camera started. Capture the problem photo."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "Camera permission was denied or unavailable."
        );
    }
}


function capturePhoto() {

    const video =
        document.getElementById(
            "cameraVideo"
        );

    const canvas =
        document.getElementById(
            "photoCanvas"
        );

    if (!cameraStream) {

        showToast(
            "Start the camera first."
        );

        return;
    }

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

    capturedPhoto =
        canvas.toDataURL(
            "image/jpeg",
            .85
        );

    document
        .getElementById(
            "photoPreview"
        )
        .innerHTML = `
            <img
                src="${capturedPhoto}"
                alt="Citizen captured evidence"
            >
        `;

    showToast(
        "Evidence photo captured successfully."
    );
}


function retakePhoto() {

    capturedPhoto = null;

    document
        .getElementById(
            "photoPreview"
        )
        .innerHTML = "";

    startCamera();
}


/* ================= GPS ================= */

function getLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Geolocation is not supported."
        );

        return;
    }

    const status =
        document.getElementById(
            "gpsStatus"
        );

    status.textContent =
        "LOCATING...";

    navigator.geolocation.getCurrentPosition(

        async position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const accuracy =
                position.coords.accuracy;

            currentLocation.latitude =
                latitude;

            currentLocation.longitude =
                longitude;

            currentLocation.accuracy =
                accuracy;

            document.getElementById(
                "latitude"
            ).textContent =
                latitude.toFixed(6);

            document.getElementById(
                "longitude"
            ).textContent =
                longitude.toFixed(6);

            document.getElementById(
                "accuracy"
            ).textContent =
                `${Math.round(accuracy)} m`;

            status.textContent =
                "GPS ACTIVE";

            status.classList.add(
                "active"
            );

            updateMapLocation(
                latitude,
                longitude
            );

            await reverseGeocode(
                latitude,
                longitude
            );

        },

        error => {

            console.error(error);

            status.textContent =
                "GPS ERROR";

            showToast(
                getLocationError(error)
            );
        },

        {
            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0
        }
    );
}


function updateMapLocation(
    latitude,
    longitude
) {

    if (!map) return;

    map.setView(
        [latitude, longitude],
        17
    );

    if (userMarker) {

        userMarker.setLatLng([
            latitude,
            longitude
        ]);

    } else {

        userMarker =
            L.marker([
                latitude,
                longitude
            ]).addTo(map);

    }

    userMarker.bindPopup(
        "<b>Your reported issue location</b>"
    ).openPopup();
}


/* ================= ADDRESS ================= */

async function reverseGeocode(
    latitude,
    longitude
) {

    const address =
        document.getElementById(
            "address"
        );

    address.textContent =
        "Detecting address...";

    try {

        const url =
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        const response =
            await fetch(url, {
                headers: {
                    "Accept":
                        "application/json"
                }
            });

        if (!response.ok) {
            throw new Error(
                "Address lookup failed"
            );
        }

        const data =
            await response.json();

        const detected =
            data.display_name ||
            "Address unavailable";

        currentLocation.address =
            detected;

        address.textContent =
            detected;

        showToast(
            "GPS address detected."
        );

    } catch (error) {

        console.error(error);

        address.textContent =
            "Address could not be detected. GPS coordinates are available.";

        currentLocation.address =
            "Address unavailable";
    }
}


function getLocationError(error) {

    switch (error.code) {

        case 1:
            return "Location permission denied.";

        case 2:
            return "Location unavailable.";

        case 3:
            return "Location request timed out.";

        default:
            return "Unable to detect location.";
    }
}


/* ================= COMPLAINT ID ================= */

function generateComplaintId() {

    const year =
        new Date().getFullYear();

    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

    return `NGRX-${year}-${random}`;
}


/* ================= SUBMIT ================= */

function submitComplaint() {

    if (!selectedProblem) {

        showToast(
            "Please select a civic problem."
        );

        return;
    }

    const description =
        document.getElementById(
            "description"
        ).value.trim();

    if (!description) {

        showToast(
            "Please describe the problem."
        );

        return;
    }

    if (!capturedPhoto) {

        showToast(
            "Camera photo is required."
        );

        return;
    }

    if (
        currentLocation.latitude === null
    ) {

        showToast(
            "Please detect your GPS location."
        );

        return;
    }

    const complaintId =
        generateComplaintId();

    const complaint = {

        id: complaintId,

        problem: selectedProblem,

        description: description,

        department: selectedDepartment,

        priority: selectedPriority,

        photo: capturedPhoto,

        latitude:
            currentLocation.latitude,

        longitude:
            currentLocation.longitude,

        accuracy:
            currentLocation.accuracy,

        address:
            currentLocation.address,

        status: "Submitted",

        createdAt:
            new Date().toISOString(),

        officer: null,

        resolutionPhoto: null
    };


    complaints.push(complaint);

    localStorage.setItem(
        "nagrixComplaints",
        JSON.stringify(complaints)
    );


    document
        .getElementById(
            "complaintIdPreview"
        )
        .textContent =
        complaintId;


    addMessage(
        "Complaint Submitted",
        `Your complaint ${complaintId} has been submitted to ${selectedDepartment}.`
    );


    showToast(
        `Complaint ${complaintId} submitted successfully.`
    );


    setTimeout(() => {

        showSection(
            "trackSection"
        );

        document.getElementById(
            "trackId"
        ).value =
            complaintId;

        trackComplaint();

    }, 1200);
}


/* ================= TRACK ================= */

function trackComplaint() {

    const id =
        document.getElementById(
            "trackId"
        ).value
        .trim()
        .toUpperCase();

    const result =
        document.getElementById(
            "trackResult"
        );

    if (!id) {

        result.innerHTML = `
            <div class="track-card">
                Please enter a complaint ID.
            </div>
        `;

        return;
    }

    const complaint =
        complaints.find(
            item =>
                item.id === id
        );

    if (!complaint) {

        result.innerHTML = `
            <div class="track-card">
                <strong>Complaint not found.</strong>
                <p class="muted">
                    Check your NAGRIX Complaint ID.
                </p>
            </div>
        `;

        return;
    }


    result.innerHTML = `

        <div class="track-card">

            <div class="analysis-row">
                <span>Complaint ID</span>
                <strong>
                    ${complaint.id}
                </strong>
            </div>

            <div class="analysis-row">
                <span>Problem</span>
                <strong>
                    ${complaint.problem}
                </strong>
            </div>

            <div class="analysis-row">
                <span>Department</span>
                <strong>
                    ${complaint.department}
                </strong>
            </div>

            <div class="analysis-row">
                <span>Priority</span>
                <strong>
                    ${complaint.priority}
                </strong>
            </div>

            <div class="analysis-row">
                <span>Status</span>
                <strong class="track-status">
                    ${complaint.status}
                </strong>
            </div>

            <div class="analysis-row">
                <span>Address</span>
                <strong>
                    ${complaint.address || "Unavailable"}
                </strong>
            </div>

        </div>
    `;
}


/* ================= SECTION NAVIGATION ================= */

function showSection(
    sectionId,
    clickedButton
) {

    document
        .querySelectorAll(".section-panel")
        .forEach(section => {
            section.classList.add("hidden");
        });

    document
        .getElementById(sectionId)
        .classList.remove("hidden");

    document
        .querySelectorAll(".side-link")
        .forEach(button => {
            button.classList.remove("active");
        });

    if (clickedButton) {
        clickedButton.classList.add(
            "active"
        );
    }

    if (sectionId === "reportSection") {

        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}


/* ================= AI CHAT ================= */

function openAIChat() {

    document
        .getElementById(
            "chatPanel"
        )
        .style.display =
        "block";
}


function sendChat() {

    const input =
        document.getElementById(
            "chatInput"
        );

    const text =
        input.value.trim();

    if (!text) return;

    addChatMessage(
        text,
        "user"
    );

    input.value = "";

    setTimeout(() => {

        const reply =
            getAIResponse(text);

        addChatMessage(
            reply,
            "bot"
        );

    }, 500);
}


function handleChatKey(event) {

    if (event.key === "Enter") {
        sendChat();
    }
}


function addChatMessage(
    message,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );

    const div =
        document.createElement("div");

    div.className =
        type === "user"
            ? "user-message"
            : "bot-message";

    div.textContent =
        message;

    container.appendChild(div);

    container.scrollTop =
        container.scrollHeight;
}


function getAIResponse(text) {

    const lower =
        text.toLowerCase();

    if (
        lower.includes("pothole") ||
        lower.includes("road")
    ) {

        return "For road damage or potholes, NAGRIX recommends the Roads & Infrastructure department. Please select Pothole and capture a clear photo.";

    }

    if (
        lower.includes("garbage") ||
        lower.includes("waste")
    ) {

        return "Garbage and waste overflow complaints are routed to Sanitation. Capture the waste area clearly.";

    }

    if (
        lower.includes("light") ||
        lower.includes("street")
    ) {

        return "Street-light problems are normally routed to the Electrical department.";

    }

    if (
        lower.includes("water") ||
        lower.includes("leak")
    ) {

        return "Water leakage complaints are routed to Water Supply. Please capture the leakage location.";

    }

    if (
        lower.includes("drain") ||
        lower.includes("drainage")
    ) {

        return "Drainage issues are routed to the Drainage department.";

    }

    return "I can help you report a civic issue. Try telling me whether it is a pothole, garbage, street light, water leakage, drainage or another civic problem.";
}


/* ================= AI CALL ================= */

function openCallAssistant() {

    document
        .getElementById(
            "callPanel"
        )
        .style.display =
        "block";
}


function startAICall() {

    const button =
        document.getElementById(
            "callButton"
        );

    const status =
        document.getElementById(
            "callStatus"
        );

    const wave =
        document.querySelector(
            ".voice-wave"
        );

    button.disabled = true;

    button.textContent =
        "🔴 End AI Call";

    status.textContent =
        "NAGRIX AI is listening...";

    wave.classList.add(
        "active"
    );

    setTimeout(() => {

        status.textContent =
            "Tell me your civic problem. I am ready to help.";

    }, 1500);

}


/* ================= MESSAGES ================= */

let messages = [];


function addMessage(
    title,
    body
) {

    messages.unshift({
        title,
        body,
        time:
            new Date().toLocaleTimeString()
    });

    document
        .getElementById(
            "messageCount"
        )
        .textContent =
        messages.length;

    renderMessages();
}


function renderMessages() {

    const list =
        document.getElementById(
            "messagesList"
        );

    if (!messages.length) {

        list.innerHTML = `
            <div class="empty-message">
                No new messages.
            </div>
        `;

        return;
    }

    list.innerHTML =
        messages.map(message => `
            <div class="track-card">

                <strong>
                    ${escapeHTML(message.title)}
                </strong>

                <p class="muted">
                    ${escapeHTML(message.body)}
                </p>

                <small class="muted">
                    ${escapeHTML(message.time)}
                </small>

            </div>
        `).join("");
}


function toggleMessagePanel() {

    const panel =
        document.getElementById(
            "messagePanel"
        );

    panel.style.display =
        panel.style.display === "block"
            ? "none"
            : "block";
}


function closeMessagePanel() {

    document
        .getElementById(
            "messagePanel"
        )
        .style.display =
        "none";
}


function closePanels() {

    document
        .getElementById(
            "chatPanel"
        )
        .style.display =
        "none";

    document
        .getElementById(
            "callPanel"
        )
        .style.display =
        "none";
}


/* ================= UTILITIES ================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function goHome() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => {
                track.stop();
            });
    }

    window.location.href =
        "../index.html";
}