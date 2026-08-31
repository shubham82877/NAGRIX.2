/* ============================================================
   NAGRIX RISE
   Research, Innovation & Solution Ecosystem

   Firebase Authentication
   Firestore Database
============================================================ */


/* ============================================================
   FIREBASE IMPORTS
============================================================ */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* ============================================================
   FIREBASE CONFIG
   IMPORTANT:
   Replace these values with YOUR Firebase Web App config.
============================================================ */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* ============================================================
   INITIALIZE
============================================================ */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* ============================================================
   GLOBAL STATE
============================================================ */

let currentUser = null;

let currentProfile = null;

let loginType = "company";


/* ============================================================
   LOGIN TYPE
============================================================ */

window.selectLoginType = function(type) {

    loginType = type;

    document
        .getElementById("companyTab")
        .classList
        .toggle(
            "active",
            type === "company"
        );

    document
        .getElementById("universityTab")
        .classList
        .toggle(
            "active",
            type === "university"
        );
};


/* ============================================================
   LOGIN
============================================================ */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            showLoginMessage(
                "Signing in...",
                "info"
            );

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            } catch(error) {

                console.error(error);

                showLoginMessage(
                    firebaseError(error),
                    "error"
                );
            }

        }
    );


/* ============================================================
   REGISTER
============================================================ */

window.showRegister = function() {

    document
        .getElementById("registerModal")
        .classList
        .remove("hidden");

};


window.closeRegister = function() {

    document
        .getElementById("registerModal")
        .classList
        .add("hidden");

};


document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const type =
                document
                    .getElementById("registerType")
                    .value;

            const organization =
                document
                    .getElementById("organizationName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            showRegisterMessage(
                "Creating account...",
                "info"
            );

            try {

                const credential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                const user =
                    credential.user;


                /*
                    Store organization profile.

                    Password is NEVER stored here.
                    Firebase Authentication manages it.
                */

                await setDoc(
                    doc(
                        db,
                        "riseUsers",
                        user.uid
                    ),
                    {

                        uid: user.uid,

                        organizationName:
                            organization,

                        email: email,

                        role: type,

                        verified: false,

                        createdAt:
                            serverTimestamp()

                    }
                );


                showRegisterMessage(
                    "Account created successfully.",
                    "success"
                );


                setTimeout(
                    closeRegister,
                    1000
                );

            } catch(error) {

                console.error(error);

                showRegisterMessage(
                    firebaseError(error),
                    "error"
                );

            }

        }
    );


/* ============================================================
   AUTH STATE
============================================================ */

onAuthStateChanged(
    auth,
    async function(user) {

        if (!user) {

            currentUser = null;

            document
                .getElementById("loginScreen")
                .classList
                .remove("hidden");

            document
                .getElementById("riseApp")
                .classList
                .add("hidden");

            return;
        }


        currentUser = user;


        try {

            const profileRef =
                doc(
                    db,
                    "riseUsers",
                    user.uid
                );

            const profileSnap =
                await getDoc(profileRef);


            if (!profileSnap.exists()) {

                alert(
                    "RISE profile not found."
                );

                await signOut(auth);

                return;
            }


            currentProfile =
                profileSnap.data();


            initializeRiseUI();

            await loadDashboardData();

            await loadIdeas();

            await loadResearchRequests();

            await loadProjects();

        } catch(error) {

            console.error(
                "Profile loading error:",
                error
            );

            alert(
                "Unable to load RISE profile."
            );

        }

    }
);


/* ============================================================
   INITIALIZE UI
============================================================ */

function initializeRiseUI() {

    document
        .getElementById("loginScreen")
        .classList
        .add("hidden");

    document
        .getElementById("riseApp")
        .classList
        .remove("hidden");


    const organization =
        currentProfile.organizationName ||
        "Organization";


    const role =
        currentProfile.role ||
        "company";


    document
        .getElementById("navOrganization")
        .textContent =
            organization;


    document
        .getElementById("welcomeTitle")
        .textContent =
            `Welcome, ${organization}`;


    document
        .getElementById("profileOrganization")
        .textContent =
            organization;


    document
        .getElementById("profileEmail")
        .textContent =
            currentProfile.email ||
            currentUser.email;


    document
        .getElementById("profileRole")
        .textContent =
            role === "company"
                ? "Company"
                : "University / Research";


    const companyDashboard =
        document.getElementById(
            "companyDashboard"
        );

    const universityDashboard =
        document.getElementById(
            "universityDashboard"
        );


    if (role === "company") {

        companyDashboard
            .classList
            .remove("hidden");

        universityDashboard
            .classList
            .add("hidden");

        document
            .getElementById("submitIdeaMenu")
            .classList
            .remove("hidden");

    } else {

        companyDashboard
            .classList
            .add("hidden");

        universityDashboard
            .classList
            .remove("hidden");

        document
            .getElementById("submitIdeaMenu")
            .classList
            .add("hidden");

    }

}


/* ============================================================
   SECTION NAVIGATION
============================================================ */

window.showSection = function(
    sectionId,
    button
) {

    document
        .querySelectorAll(".app-section")
        .forEach(
            section =>
                section.classList.remove(
                    "active-section"
                )
        );


    const section =
        document.getElementById(
            sectionId
        );


    if (!section) return;


    section.classList.add(
        "active-section"
    );


    document
        .querySelectorAll(".side-item")
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

};


window.showSectionById =
    function(sectionId) {

        const buttons =
            document.querySelectorAll(
                ".side-item"
            );

        buttons.forEach(
            button => {

                if (
                    button.getAttribute(
                        "onclick"
                    )?.includes(
                        sectionId
                    )
                ) {

                    showSection(
                        sectionId,
                        button
                    );

                }

            }
        );

    };


/* ============================================================
   SUBMIT COMPANY IDEA
============================================================ */

document
    .getElementById("ideaForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (
                !currentUser ||
                !currentProfile
            ) {

                return;

            }


            if (
                currentProfile.role !==
                "company"
            ) {

                showIdeaMessage(
                    "Only company accounts can submit ideas.",
                    "error"
                );

                return;

            }


            const title =
                document
                    .getElementById("ideaTitle")
                    .value
                    .trim();

            const domain =
                document
                    .getElementById("ideaDomain")
                    .value;

            const description =
                document
                    .getElementById("ideaDescription")
                    .value
                    .trim();

            const outcome =
                document
                    .getElementById("ideaOutcome")
                    .value
                    .trim();

            const collaborationType =
                document
                    .getElementById(
                        "collaborationType"
                    )
                    .value;

            const visibility =
                document
                    .getElementById(
                        "visibility"
                    )
                    .value;


            const ideaId =
                generateRiseId();


            showIdeaMessage(
                "Submitting your idea...",
                "info"
            );


            try {

                await addDoc(
                    collection(
                        db,
                        "riseIdeas"
                    ),
                    {

                        ideaId: ideaId,

                        title: title,

                        domain: domain,

                        description:
                            description,

                        expectedOutcome:
                            outcome,

                        collaborationType:
                            collaborationType,

                        visibility:
                            visibility,

                        companyId:
                            currentUser.uid,

                        companyName:
                            currentProfile
                                .organizationName,

                        companyEmail:
                            currentUser.email,

                        status:
                            "open",

                        createdAt:
                            serverTimestamp(),

                        updatedAt:
                            serverTimestamp()

                    }
                );


                document
                    .getElementById(
                        "ideaForm"
                    )
                    .reset();


                showIdeaMessage(
                    `Idea submitted successfully. RISE ID: ${ideaId}`,
                    "success"
                );


                await loadIdeas();

                await loadDashboardData();

            } catch(error) {

                console.error(error);

                showIdeaMessage(
                    firebaseError(error),
                    "error"
                );

            }

        }
    );


/* ============================================================
   LOAD IDEAS
============================================================ */

async function loadIdeas() {

    const container =
        document.getElementById(
            "ideasContainer"
        );


    container.innerHTML =
        `<div class="empty-state">
            Loading challenges...
        </div>`;


    try {

        const ideasQuery =
            query(
                collection(
                    db,
                    "riseIdeas"
                ),
                orderBy(
                    "createdAt",
                    "desc"
                )
            );


        const snapshot =
            await getDocs(
                ideasQuery
            );


        if (snapshot.empty) {

            container.innerHTML =
                `<div class="empty-state">
                    No research challenges available yet.
                </div>`;

            return;

        }


        container.innerHTML = "";


        snapshot.forEach(
            ideaDoc => {

                const idea =
                    ideaDoc.data();


                /*
                    Company sees its own ideas.

                    University sees only:
                    - verified/publicly accessible ideas
                    - or ideas marked for researchers.
                */

                if (
                    currentProfile.role ===
                    "company" &&
                    idea.companyId !==
                    currentUser.uid
                ) {

                    return;

                }


                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "idea-card";


                card.innerHTML = `

                    <div class="idea-top">

                        <span class="idea-id">
                            ${escapeHtml(
                                idea.ideaId ||
                                "RISE"
                            )}
                        </span>

                        <span class="status-badge">
                            ${escapeHtml(
                                idea.status ||
                                "open"
                            )}
                        </span>

                    </div>


                    <h3>
                        ${escapeHtml(
                            idea.title
                        )}
                    </h3>


                    <span class="domain-badge">
                        ${escapeHtml(
                            idea.domain
                        )}
                    </span>


                    <p>
                        ${escapeHtml(
                            idea.description
                        )}
                    </p>


                    <div class="idea-company">

                        🏢
                        ${escapeHtml(
                            idea.companyName
                        )}

                    </div>

                `;


                if (
                    currentProfile.role ===
                    "university" &&
                    idea.companyId !==
                    currentUser.uid
                ) {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.textContent =
                        "🎓 Request Research Collaboration";

                    button.onclick =
                        () =>
                            requestResearch(
                                ideaDoc.id,
                                idea
                            );

                    card.appendChild(
                        button
                    );

                }


                container.appendChild(
                    card
                );

            }
        );


    } catch(error) {

        console.error(error);

        container.innerHTML =
            `<div class="empty-state">
                Unable to load ideas.
            </div>`;

    }

}


/* ============================================================
   UNIVERSITY RESEARCH REQUEST
============================================================ */

async function requestResearch(
    ideaDocumentId,
    idea
) {

    if (
        currentProfile.role !==
        "university"
    ) {

        alert(
            "Only university accounts can request research collaboration."
        );

        return;

    }


    const proposal =
        prompt(
            "Enter your research proposal / approach:"
        );


    if (
        !proposal ||
        proposal.trim().length < 10
    ) {

        alert(
            "Please enter a meaningful research proposal."
        );

        return;

    }


    try {

        await addDoc(
            collection(
                db,
                "riseResearchRequests"
            ),
            {

                ideaDocumentId:
                    ideaDocumentId,

                ideaId:
                    idea.ideaId,

                ideaTitle:
                    idea.title,

                companyId:
                    idea.companyId,

                companyName:
                    idea.companyName,

                universityId:
                    currentUser.uid,

                universityName:
                    currentProfile
                        .organizationName,

                universityEmail:
                    currentUser.email,

                proposal:
                    proposal.trim(),

                status:
                    "pending",

                createdAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp()

            }
        );


        alert(
            "Research collaboration request submitted."
        );


        await loadResearchRequests();

        await loadDashboardData();

    } catch(error) {

        console.error(error);

        alert(
            firebaseError(error)
        );

    }

}


/* ============================================================
   LOAD RESEARCH REQUESTS
============================================================ */

async function loadResearchRequests() {

    const container =
        document.getElementById(
            "researchContainer"
        );


    container.innerHTML =
        `<div class="empty-state">
            Loading collaboration requests...
        </div>`;


    try {

        let q;


        if (
            currentProfile.role ===
            "company"
        ) {

            q =
                query(
                    collection(
                        db,
                        "riseResearchRequests"
                    ),
                    where(
                        "companyId",
                        "==",
                        currentUser.uid
                    )
                );

        } else {

            q =
                query(
                    collection(
                        db,
                        "riseResearchRequests"
                    ),
                    where(
                        "universityId",
                        "==",
                        currentUser.uid
                    )
                );

        }


        const snapshot =
            await getDocs(q);


        if (snapshot.empty) {

            container.innerHTML =
                `<div class="empty-state">
                    No research requests found.
                </div>`;

            return;

        }


        container.innerHTML = "";


        snapshot.forEach(
            requestDoc => {

                const request =
                    requestDoc.data();


                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "research-card";


                card.innerHTML = `

                    <h3>
                        ${escapeHtml(
                            request.ideaTitle
                        )}
                    </h3>

                    <p>
                        <strong>
                            RISE ID:
                        </strong>
                        ${escapeHtml(
                            request.ideaId
                        )}
                    </p>

                    <p>
                        <strong>
                            Company:
                        </strong>
                        ${escapeHtml(
                            request.companyName
                        )}
                    </p>

                    <p>
                        <strong>
                            University:
                        </strong>
                        ${escapeHtml(
                            request.universityName
                        )}
                    </p>

                    <p>
                        <strong>
                            Proposal:
                        </strong>
                        ${escapeHtml(
                            request.proposal
                        )}
                    </p>

                    <span class="status-badge">
                        ${escapeHtml(
                            request.status
                        )}
                    </span>

                `;


                /*
                    Company can accept/reject
                    university collaboration.
                */

                if (
                    currentProfile.role ===
                    "company" &&
                    request.status ===
                    "pending"
                ) {

                    const actions =
                        document.createElement(
                            "div"
                        );

                    actions.className =
                        "request-actions";


                    const accept =
                        document.createElement(
                            "button"
                        );

                    accept.className =
                        "accept-btn";

                    accept.textContent =
                        "✓ Accept";


                    accept.onclick =
                        () =>
                            updateRequest(
                                requestDoc.id,
                                "accepted"
                            );


                    const reject =
                        document.createElement(
                            "button"
                        );

                    reject.className =
                        "reject-btn";

                    reject.textContent =
                        "✕ Reject";


                    reject.onclick =
                        () =>
                            updateRequest(
                                requestDoc.id,
                                "rejected"
                            );


                    actions.appendChild(
                        accept
                    );

                    actions.appendChild(
                        reject
                    );

                    card.appendChild(
                        actions
                    );

                }


                container.appendChild(
                    card
                );

            }
        );


    } catch(error) {

        console.error(error);

        container.innerHTML =
            `<div class="empty-state">
                Unable to load requests.
            </div>`;

    }

}


/* ============================================================
   UPDATE REQUEST
============================================================ */

async function updateRequest(
    requestId,
    status
) {

    try {

        await updateDoc(
            doc(
                db,
                "riseResearchRequests",
                requestId
            ),
            {

                status: status,

                updatedAt:
                    serverTimestamp()

            }
        );


        alert(
            `Research request ${status}.`
        );


        await loadResearchRequests();

        await loadProjects();

        await loadDashboardData();

    } catch(error) {

        console.error(error);

        alert(
            firebaseError(error)
        );

    }

}


/* ============================================================
   PROJECTS
============================================================ */

async function loadProjects() {

    const columns = [

        "proposedProjects",

        "researchProjects",

        "developmentProjects",

        "completedProjects"

    ];


    columns.forEach(
        id => {

            document
                .getElementById(id)
                .innerHTML = "";

        }
    );


    try {

        const q =
            query(
                collection(
                    db,
                    "riseResearchRequests"
                )
            );


        const snapshot =
            await getDocs(q);


        snapshot.forEach(
            projectDoc => {

                const project =
                    projectDoc.data();


                if (
                    project.status !==
                    "accepted"
                ) {

                    return;

                }


                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "project-item";


                item.innerHTML = `

                    <strong>
                        ${escapeHtml(
                            project.ideaTitle
                        )}
                    </strong>

                    <small>
                        ${escapeHtml(
                            project.companyName
                        )}
                    </small>

                    <small>
                        ${escapeHtml(
                            project.universityName
                        )}
                    </small>

                `;


                document
                    .getElementById(
                        "researchProjects"
                    )
                    .appendChild(
                        item
                    );

            }
        );


    } catch(error) {

        console.error(error);

    }

}


/* ============================================================
   DASHBOARD COUNTERS
============================================================ */

async function loadDashboardData() {

    try {

        const ideasSnapshot =
            await getDocs(
                collection(
                    db,
                    "riseIdeas"
                )
            );


        let ideaCount = 0;


        ideasSnapshot.forEach(
            item => {

                const data =
                    item.data();


                if (
                    currentProfile.role ===
                    "company"
                ) {

                    if (
                        data.companyId ===
                        currentUser.uid
                    ) {

                        ideaCount++;

                    }

                } else {

                    if (
                        data.visibility ===
                        "researchers" ||
                        data.visibility ===
                        "public"
                    ) {

                        ideaCount++;

                    }

                }

            }
        );


        document
            .getElementById(
                "totalIdeas"
            )
            .textContent =
                ideaCount;


        const requestsSnapshot =
            await getDocs(
                collection(
                    db,
                    "riseResearchRequests"
                )
            );


        let requestCount = 0;

        let acceptedCount = 0;


        requestsSnapshot.forEach(
            item => {

                const data =
                    item.data();


                if (
                    currentProfile.role ===
                    "company"
                ) {

                    if (
                        data.companyId ===
                        currentUser.uid
                    ) {

                        requestCount++;

                    }

                } else {

                    if (
                        data.universityId ===
                        currentUser.uid
                    ) {

                        requestCount++;

                    }

                }


                if (
                    data.status ===
                    "accepted"
                ) {

                    acceptedCount++;

                }

            }
        );


        document
            .getElementById(
                "researchRequests"
            )
            .textContent =
                requestCount;


        document
            .getElementById(
                "collaborations"
            )
            .textContent =
                acceptedCount;


        document
            .getElementById(
                "activeProjects"
            )
            .textContent =
                acceptedCount;


    } catch(error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


/* ============================================================
   LOGOUT
============================================================ */

window.logout = async function() {

    try {

        await signOut(auth);

    } catch(error) {

        console.error(error);

    }

};


/* ============================================================
   RISE ID GENERATOR
============================================================ */

function generateRiseId() {

    const year =
        new Date()
            .getFullYear();

    const random =
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    return `RISE-${year}-${random}`;

}


/* ============================================================
   SECURITY / HTML ESCAPE
============================================================ */

function escapeHtml(value) {

    if (
        value === undefined ||
        value === null
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


/* ============================================================
   ERROR HANDLER
============================================================ */

function firebaseError(error) {

    const code =
        error?.code || "";


    switch(code) {

        case "auth/email-already-in-use":

            return "This email is already registered.";

        case "auth/invalid-email":

            return "Invalid email address.";

        case "auth/weak-password":

            return "Password must contain at least 6 characters.";

        case "auth/invalid-credential":

        case "auth/wrong-password":

        case "auth/user-not-found":

            return "Invalid email or password.";

        case "permission-denied":

            return "You do not have permission to perform this action.";

        default:

            return error?.message ||
                "Something went wrong.";

    }

}


/* ============================================================
   MESSAGES
============================================================ */

function showLoginMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "loginMessage"
        );

    element.textContent =
        message;

    element.style.color =
        messageColor(type);

}


function showRegisterMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "registerMessage"
        );

    element.textContent =
        message;

    element.style.color =
        messageColor(type);

}
import {
    auth,
    db
} from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("NAGRIX RISE Firebase Ready");


function showIdeaMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "ideaMessage"
        );

    element.textContent =
        message;

    element.style.color =
        messageColor(type);

}


function messageColor(type) {

    if (type === "success") {

        return "#29d391";

    }

    if (type === "error") {

        return "#ff6878";

    }

    return "#9caec7";

}