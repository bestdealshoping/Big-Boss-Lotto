import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtFPW384zZ7JPQnl7hZG3nzA6Z8mdy-2U",
    authDomain: "big-boss-lotto.firebaseapp.com",
    projectId: "big-boss-lotto",
    storageBucket: "big-boss-lotto.firebasestorage.app",
    messagingSenderId: "942815480492",
    appId: "1:942815480492:web:3c56db0495adcb53d22d09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUser = null;

// Gérer la Connexion
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('login-id').value;
    const code = document.getElementById('secret-code').value;

    const q = query(collection(db, "users"), where("loginId", "==", id), where("secretCode", "==", code));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        currentUser = querySnapshot.docs[0].data();
        currentUser.id = querySnapshot.docs[0].id;
        document.getElementById('user-display').innerText = "Vendeur: " + currentUser.nom;
        switchPage('vendeur-page');
    } else {
        alert("Idantifyan oubyen Kòd la pa bon!");
    }
});

// Fonksyon pou vann yon Ticket
window.processSale = async () => {
    const num = document.getElementById('lotto-numbers').value;
    const price = document.getElementById('lotto-amount').value;
    
    if(!num || !price) return alert("Ranpli tout bwat yo");

    const ticketCode = "BBL-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
        await addDoc(collection(db, "tickets"), {
            vendeurId: currentUser.id,
            numbers: num,
            amount: parseFloat(price),
            state: document.getElementById('lotto-state').value,
            code: ticketCode,
            date: serverTimestamp()
        });
        
        document.getElementById('ticket-preview').innerHTML = `
            <div style="background: white; color: black; padding: 10px; margin-top: 10px;">
                <h4>BIG BOSS LOTTO</h4>
                <p>Kòd: ${ticketCode}</p>
                <p>Nimewo: ${num}</p>
                <p>Pri: ${price} HTG</p>
            </div>
        `;
        document.getElementById('lotto-numbers').value = "";
    } catch (e) {
        console.error(e);
    }
};

// Navigasyon
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

window.showTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
}
