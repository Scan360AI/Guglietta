/**
 * SCAN - Strategic Corporate Analysis Navigator
 * Funzioni comuni JS
 * Versione 1.2 - Robusta
 */

/**
 * Funzione per gestire il login (base)
 * @param {Event} event - Evento submit del form
 */
function handleLogin(event) {
    if (event) event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!usernameInput || !passwordInput) {
        console.error("Elementi username o password non trovati nel form.");
        alert('Errore nel form di login.');
        return false;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    // --- VALIDAZIONE CREDENZIALI ---
    // Sostituisci questa logica con una verifica sicura se necessario.
    // Accetta le credenziali predefinite o qualsiasi coppia per la demo.
    if ((username === 'AdminGugliettaGlobal ' && password === 'GugliettaGlobal 2025') || (username && password)) {
        console.log('Login successful per', username);
        // Salva stato login (localStorage è per demo, NON sicuro per produzione)
        try {
            localStorage.setItem('scanUserLoggedIn', 'true');
            localStorage.setItem('scanUsername', username);
            window.location.href = 'index.html'; // Reindirizza alla dashboard principale
        } catch (e) {
            console.error("Errore durante il salvataggio in localStorage:", e);
            alert("Impossibile salvare lo stato del login. Verifica le impostazioni del browser.");
        }
    } else {
        alert('Credenziali non valide. Riprova.');
        try {
            localStorage.removeItem('scanUserLoggedIn');
            localStorage.removeItem('scanUsername');
        } catch (e) {
             console.error("Errore durante la rimozione da localStorage:", e);
        }
    }
    return false; // Previene il submit standard del form
}

/**
 * Funzione per gestire il logout
 */
function logout() {
    console.log("Logout in corso...");
    try {
        // Rimuovi stato login
        localStorage.removeItem('scanUserLoggedIn');
        localStorage.removeItem('scanUsername');
        // Reindirizza alla pagina di login
        window.location.href = '../login-page.html';
    } catch (e) {
        console.error("Errore durante il logout:", e);
        // Anche se c'è un errore nel localStorage, prova a reindirizzare
        window.location.href = '/login-page.html';
    }
}

/**
 * Funzione per verificare se l'utente è loggato
 * **NOTA: Controllo base e NON sicuro per produzione.**
 * In un'applicazione reale, usare token JWT o sessioni server-side.
 */
function checkLoginStatus() {
    let loggedIn = false;
    try {
        loggedIn = localStorage.getItem('scanUserLoggedIn') === 'true';
    } catch (e) {
        console.error("Impossibile accedere a localStorage:", e);
        // Considera l'utente non loggato se localStorage non è accessibile
    }

    // Se non siamo sulla pagina di login E l'utente NON risulta loggato, reindirizza
    if (!window.location.pathname.endsWith('login-page.html') && !loggedIn) {
        console.warn("Utente non loggato o stato perso. Reindirizzamento al login.");
        // ATTENZIONE: Decommenta la riga seguente per attivare il controllo effettivo
        // window.location.href = 'login-page.html';
        console.log("Controllo login disattivato per debug. Riattivare decommentando la linea sopra."); // Messaggio per debug
    } else if (loggedIn) {
        // console.log(`Utente loggato: ${localStorage.getItem('scanUsername')}`); // Log meno invadente
    }
}


/**
 * Funzione per la stampa ottimizzata della pagina corrente
 */
function printDocument() {
    console.log("Avvio stampa...");
    window.print();
}

/**
 * Formatta un numero come valore monetario (Euro, IT)
 * @param {number|string|null|undefined} value - Valore numerico o convertibile
 * @param {number} [digits=0] - Numero di cifre decimali
 * @returns {string} - Stringa formattata (es. "€ 1.234.567") o "N/D"
 */
function formatCurrency(value, digits = 0) {
    const num = parseFloat(value); // Tenta la conversione
    if (value === null || value === undefined || isNaN(num)) {
        return "N/D";
    }
    // Controllo per valori molto piccoli che potrebbero diventare "-0 €"
     if (Math.abs(num) < (1 / Math.pow(10, digits + 1))) {
        value = 0;
    }
    try {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(num);
    } catch (e) {
        console.error("Errore formattazione valuta:", value, e);
        return "Err"; // Valore di errore breve
    }
}

/**
 * Formatta un numero come percentuale (IT)
 * @param {number|string|null|undefined} value - Valore numerico (es. 8.8 per 8,8%)
 * @param {number} [digits=1] - Numero di cifre decimali
 * @returns {string} - Stringa formattata (es. "8,8%") o "N/D"
 */
function formatPercentage(value, digits = 1) {
     const num = parseFloat(value); // Tenta la conversione
     if (value === null || value === undefined || isNaN(num)) {
        return "N/D";
    }
     try {
        // Intl.NumberFormat si aspetta un valore tra 0 e 1 per le percentuali (es. 0.088 per 8.8%)
        return new Intl.NumberFormat('it-IT', {
            style: 'percent',
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(num / 100);
     } catch(e) {
         console.error("Errore formattazione percentuale:", value, e);
         return "Err"; // Valore di errore breve
     }
}

/**
 * Recupera i dati per un grafico cercando una funzione globale definita in charts_config.js
 * @param {string} functionName - Nome della funzione globale (es. 'getEconomicTrendData')
 * @returns {object|null} - Oggetto dati restituito dalla funzione o null in caso di errore/mancanza.
 */
function getChartData(functionName) {
    try {
        if (typeof window[functionName] === 'function') {
            // console.log(`Eseguo funzione dati globale: ${functionName}()`); // Log meno invadente
            const data = window[functionName]();
            // Validazione base della struttura dati
            if (data && typeof data === 'object' && Array.isArray(data.labels) && Array.isArray(data.datasets)) {
                return data;
            } else {
                 console.error(`La funzione ${functionName} non ha restituito dati validi per Chart.js.`);
                 return null;
            }
        } else {
             console.warn(`Funzione dati globale non trovata: ${functionName}`);
             return null;
        }
    } catch (error) {
        console.error(`Errore durante l'esecuzione della funzione dati ${functionName}:`, error);
        return null;
    }
}

/**
 * Funzione base per inizializzare un grafico Chart.js, con gestione errori migliorata.
 * @param {string} canvasId - ID dell'elemento <canvas>
 * @param {string} chartType - Tipo di grafico ('bar', 'line', 'pie', 'doughnut', 'radar')
 * @param {object} chartData - Oggetto dati recuperato (da getChartData o globale)
 * @param {object} chartOptions - Oggetto opzioni per Chart.js
 */
function initChart(canvasId, chartType, chartData, chartOptions) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        // console.warn(`Canvas non trovato per il grafico: ${canvasId}`);
        return; // Esce silenziosamente se il canvas non esiste (la pagina potrebbe non averlo)
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`Impossibile ottenere il contesto 2D per il canvas: ${canvasId}`);
        return;
    }

    // Validazione dati più robusta
    if (!chartData || typeof chartData !== 'object' || !Array.isArray(chartData.labels) || !Array.isArray(chartData.datasets)) {
         console.error(`Dati non validi o mancanti forniti a initChart per: ${canvasId}. Dati ricevuti:`, chartData);
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.font = '14px Titillium Web, sans-serif';
         ctx.fillStyle = '#dc3545'; // Colore danger
         ctx.textAlign = 'center';
         ctx.fillText('Errore: Dati grafico non validi.', canvas.width / 2, canvas.height / 2);
        return;
    }

    try {
        // Distruggi grafico esistente se presente
        const existingChart = Chart.getChart(canvasId);
        if (existingChart instanceof Chart) {
            existingChart.destroy();
        }
        // Crea il nuovo grafico
        new Chart(ctx, { // Usa ctx invece di canvas per maggiore compatibilità
            type: chartType,
            data: chartData,
            options: chartOptions
        });
        // console.log(`Grafico ${canvasId} (${chartType}) inizializzato.`); // Log meno invadente
    } catch (error) {
        console.error(`Errore durante l'inizializzazione del grafico ${canvasId}:`, error);
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.font = '14px Titillium Web, sans-serif';
         ctx.fillStyle = '#dc3545';
         ctx.textAlign = 'center';
         ctx.fillText(`Errore inizializzazione grafico.`, canvas.width / 2, canvas.height / 2);
    }
}


// Esecuzione all'avvio di ogni pagina (tranne login)
document.addEventListener('DOMContentLoaded', function() {
    // console.log("SCAN Common JS DOMContentLoaded.");
    checkLoginStatus(); // Verifica sempre lo stato del login

    // Aggiungi listener al pulsante di stampa generico, se esiste
    const printBtn = document.querySelector('.print-button button');
    if (printBtn) {
        printBtn.addEventListener('click', printDocument);
    }
});
