// /js/dashboard_init.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inizializzazione grafici dashboard...");

    // Tenta di inizializzare il grafico Trend Ricavi/EBITDA
    try {
        // Chiama direttamente la funzione definita in charts_config.js
        const trendRicEbitdaData = getTrendRicaviEbitdaData_Dashboard();
        if (trendRicEbitdaData) {
            const trendRicEbitdaOptions = {
                 responsive: true, maintainAspectRatio: false,
                 scales: {
                     y: { // Asse principale (sinistra) per Valori Assoluti
                         beginAtZero: true, // Parte da zero
                         title: { display: true, text: 'Valore (€)' },
                         position: 'left',
                         ticks: { // Formattazione asse Y
                             callback: function(value) {
                                 if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + ' M';
                                 if (Math.abs(value) >= 1000) return (value / 1000).toFixed(0) + ' K';
                                 return value;
                             }
                         }
                     },
                     y1: { // Asse secondario (destra) per Percentuale
                         beginAtZero: true, // Parte da zero
                         title: { display: true, text: 'EBITDA Margin (%)' },
                         position: 'right',
                         grid: { drawOnChartArea: false }, // Non disegnare griglia per l'asse destro
                         suggestedMin: 0,
                         suggestedMax: 15, // Adatta se necessario
                         ticks: {
                             callback: function(value) { return value.toFixed(1) + '%'; }
                         }
                     }
                 },
                 plugins: {
                      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } },
                      title: { display: true, text: 'Trend Ricavi, EBITDA e Margine', font: { size: 14, weight: 'bold' } },
                      tooltip: { // Tooltip comuni sono già in commonChartOptions, ma possiamo personalizzare
                           mode: 'index', intersect: false, // Mostra tooltip per tutti i punti sullo stesso indice
                           callbacks: {
                              label: function(context) {
                                  let label = context.dataset.label || '';
                                  if (label) label += ': ';
                                  const rawValue = context.raw; // Valore originale dai dati

                                  if (rawValue !== null && rawValue !== undefined) {
                                      if (context.dataset.yAxisID === 'y1') { // Asse %
                                          label += formatPercentage(rawValue); // Usa la funzione comune
                                      } else { // Asse Valuta
                                           label += formatCurrency(rawValue, 0); // Usa la funzione comune
                                      }
                                  } else {
                                      label += 'N/D';
                                  }
                                  return label;
                              }
                           }
                      }
                 },
                 animation: { duration: 400 } // Animazione leggera
            };
            // Non è necessario pre-processare i dati qui perché i tooltip usano rawValue e le scale sono configurate
            initChart('trendRicaviEbitdaChart', 'bar', trendRicEbitdaData, trendRicEbitdaOptions); // Usa initChart da common.js
        } else {
             console.error("Dati non trovati per trendRicaviEbitdaChart");
             // Gestione errore nel canvas è già in initChart
             initChart('trendRicaviEbitdaChart', 'bar', null, {}); // Chiama con null per mostrare errore
        }
    } catch (error) {
        console.error("Errore inizializzazione grafico Trend Ricavi/EBITDA:", error);
         initChart('trendRicaviEbitdaChart', 'bar', null, {}); // Mostra errore sul canvas
    }

    // Tenta di inizializzare il grafico Trend PFN/EBITDA
    try {
        // Chiama direttamente la funzione definita in charts_config.js
        const trendPfnEbitdaData = getTrendPfnEbitdaData_Dashboard();
         if (trendPfnEbitdaData) {
            const trendPfnEbitdaOptions = {
                 responsive: true, maintainAspectRatio: false,
                 scales: {
                     y: { // Scala per il rapporto
                         beginAtZero: false, // Il rapporto può variare
                         suggestedMin: 0,
                         suggestedMax: 4, // Adatta il range se necessario
                         title: { display: true, text: 'Rapporto PFN/EBITDA (x)' }
                     },
                      x: { grid: { display: false } } // Nasconde griglia asse X
                 },
                 plugins: {
                      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } },
                      title: { display: true, text: 'Evoluzione PFN/EBITDA vs Soglia', font: { size: 14, weight: 'bold' } },
                      tooltip: { // Usa tooltip comune ma il callback specifico per 'x' è utile
                          callbacks: {
                             label: function(context) {
                                 let label = context.dataset.label || '';
                                 if (label) label += ': ';
                                  if (context.parsed.y !== null) {
                                     label += context.parsed.y.toFixed(2) + 'x';
                                  } else {
                                      label += 'N/D';
                                  }
                                 return label;
                             }
                          }
                      }
                 },
                 animation: { duration: 400 }
            };
            initChart('trendPfnEbitdaChart', 'line', trendPfnEbitdaData, trendPfnEbitdaOptions); // Usa initChart da common.js
         } else {
             console.error("Dati non trovati per trendPfnEbitdaChart");
             initChart('trendPfnEbitdaChart', 'line', null, {}); // Mostra errore
         }
    } catch (error) {
         console.error("Errore inizializzazione grafico Trend PFN/EBITDA:", error);
          initChart('trendPfnEbitdaChart', 'line', null, {}); // Mostra errore
    }

    console.log("Inizializzazione grafici dashboard completata.");
});