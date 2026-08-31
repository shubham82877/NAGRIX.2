// ============================================================
// NAGRIX FIREBASE CONFIGURATION
// ============================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    onSnapshot
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyAjObQQNp45tysNNPJebrNfNtYewfidgS4",
    authDomain: "nagrix-a4773.firebaseapp.com",
    projectId: "nagrix-a4773",
    storageBucket: "nagrix-a4773.firebasestorage.app",
    messagingSenderId: "451638071831",
    appId: "1:451638071831:web:ec7976c234fad5afd44252",
    measurementId: "G-4Y146V35HT"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);


// ============================================================
// INITIALIZE SERVICES
// ============================================================

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ============================================================
// EXPORT
// ============================================================

export {
    app,
    auth,
    db,
    storage,

    // Firestore
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    onSnapshot,

    // Storage
    ref,
    uploadBytes,
    getDownloadURL,

    // Authentication
    onAuthStateChanged
};


// ============================================================
// CONNECTION TEST
// ============================================================

console.log("🔥 NAGRIX Firebase Connected Successfully");