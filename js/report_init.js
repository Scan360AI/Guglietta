/**
 * SCAN - Initializzazione Grafici Report Dettagliati (report/parteX_*.html)
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inizializzazione grafici report (se presenti)...");

    // --- PARTE 1: Sintesi ---
    if (document.getElementById('mainMetricsChart')) {
        try {
            const data = getMainMetricsData(); // Da charts_config.js
            const options = {
                ...commonChartOptions,
                scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Valori in €000' }, ticks: { callback: function(v) { return v.toLocaleString('it-IT');} } } },
                plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Evoluzione Ricavi, EBITDA e Patrimonio Netto' } }
            };
            initChart('mainMetricsChart', 'bar', data, options);
        } catch(e) { console.error("Errore grafico mainMetricsChart:", e); }
    }
    if (document.getElementById('currentAssetsLiabilitiesChart')) {
         try {
             const data = getCurrentAssetsLiabilitiesData();
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Valore (€)' }, ticks: { callback: function(v) { return formatCurrency(v); } } } }, // Usa formattazione valuta
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Andamento Attivo e Passivo Corrente' } }
             };
             initChart('currentAssetsLiabilitiesChart', 'bar', data, options);
         } catch(e) { console.error("Errore grafico currentAssetsLiabilitiesChart:", e); }
    }

    // --- PARTE 2: Economico ---
     if (document.getElementById('economicTrendChart')) {
         try {
             const data = getEconomicTrendData();
             const options = {
                ...commonChartOptions,
                scales: {
                     y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Valori in €000' }, ticks: { callback: function(v) { return v.toLocaleString('it-IT');} } },
                     y1: { position: 'right', title: { display: true, text: 'EBITDA %' }, grid: { drawOnChartArea: false }, suggestedMin: 0, suggestedMax: 15, ticks: { callback: function(v) { return v + '%';}} }
                 },
                plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Andamento Ricavi ed EBITDA 2022-2024' } }
             };
             initChart('economicTrendChart', 'bar', data, options); // Tipo misto definito nei dati
         } catch(e) { console.error("Errore grafico economicTrendChart:", e); }
     }
     if (document.getElementById('marginalityChart')) {
         try {
             const data = getMarginalityData();
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Percentuale sui Ricavi (%)' }, suggestedMax: 25, ticks: { callback: function(v) { return v + '%';}} } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Evoluzione delle Marginalità' } }
             };
             initChart('marginalityChart', 'line', data, options);
         } catch(e) { console.error("Errore grafico marginalityChart:", e); }
     }
     if (document.getElementById('profitabilityIndicesChart')) { // Rinominato da profitabilityChart
         try {
            const data = getProfitabilityIndicesData(); // Assicurati che la funzione esista in config
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Percentuale (%)' }, suggestedMin: 0, suggestedMax: 40, ticks: { callback: function(v) { return v + '%';}} } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Andamento Indici di Redditività' } }
             };
             initChart('profitabilityIndicesChart', 'line', data, options);
         } catch(e) { console.error("Errore grafico profitabilityIndicesChart:", e); }
     }
     if (document.getElementById('leverageChart')) {
          try {
             const data = getLeverageData(); // Assicurati che la funzione esista
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Percentuale (%)' }, ticks: { callback: function(v) { return v + '%';}} } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Confronto ROI vs ROE' } }
             };
             initChart('leverageChart', 'bar', data, options);
         } catch(e) { console.error("Errore grafico leverageChart:", e); }
     }


    // --- PARTE 3: Patrimoniale ---
     if (document.getElementById('assetsChart')) {
         try {
             const data = getAssetsData();
             initChart('assetsChart', 'pie', data, pieChartOptions); // Usa opzioni Torta
         } catch(e) { console.error("Errore grafico assetsChart:", e); }
     }
     if (document.getElementById('liabilitiesChart')) {
         try {
            const data = getLiabilitiesData();
             initChart('liabilitiesChart', 'pie', data, pieChartOptions);
         } catch(e) { console.error("Errore grafico liabilitiesChart:", e); }
     }
      if (document.getElementById('investmentsStructureChart')) {
         try {
             const data = getInvestmentsStructureData();
             const options = {
                ...commonChartOptions,
                 scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Valori in Euro' }, ticks: { callback: function(v) { return formatCurrency(v); } } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Evoluzione Struttura Investimenti' } }
             };
             initChart('investmentsStructureChart', 'bar', data, options);
         } catch(e) { console.error("Errore grafico investmentsStructureChart:", e); }
     }
      if (document.getElementById('equityCompositionChart')) {
         try {
             const data = getEquityCompositionData();
             initChart('equityCompositionChart', 'doughnut', data, doughnutChartOptions); // Usa opzioni Ciambella
         } catch(e) { console.error("Errore grafico equityCompositionChart:", e); }
     }
     if (document.getElementById('financialDebtChart')) {
         try {
             const data = getFinancialDebtSourcesData();
              initChart('financialDebtChart', 'doughnut', data, doughnutChartOptions);
         } catch(e) { console.error("Errore grafico financialDebtChart:", e); }
     }
     if (document.getElementById('pfnTrendChart')) {
          try {
             const data = getPfnTrendData();
             const options = {
                 ...commonChartOptions,
                  scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Valori in Euro' }, ticks: { callback: function(v) { return formatCurrency(v); } } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Andamento Posizione Finanziaria Netta (Stack: Debiti vs Liquidità)' } }
             };
             // Modifica tipo per PFN in linea, sovrapposto a barre stacked
              data.datasets.forEach(ds => {
                  if (ds.label === 'PFN') ds.type = 'line';
                  else ds.type = 'bar';
              });

             initChart('pfnTrendChart', 'bar', data, options); // Tipo base bar per stacked
         } catch(e) { console.error("Errore grafico pfnTrendChart:", e); }
     }

    // --- PARTE 4: Bancabilità ---
    if (document.getElementById('debtSustainabilityChart')) {
         try {
            const data = getDebtSustainabilityData();
            initChart('debtSustainabilityChart', 'radar', data, radarChartOptions); // Usa opzioni Radar
         } catch(e) { console.error("Errore grafico debtSustainabilityChart:", e); }
    }
     if (document.getElementById('debtCostChart')) {
         try {
            const data = getDebtCostData();
             const options = {
                 ...commonChartOptions,
                 scales: {
                     y: { ...commonChartOptions.scales.y, type: 'linear', position: 'left', title: { display: true, text: 'Valore (€000)' }, ticks: { callback: function(v) { return v.toLocaleString('it-IT'); } } },
                     y1: { type: 'linear', position: 'right', title: { display: true, text: 'Capacità Teorica Indebitamento (€000)' }, grid: { drawOnChartArea: false }, suggestedMin: 0, ticks: { callback: function(v) { return v.toLocaleString('it-IT'); } } }
                 },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'EBITDA e Capacità di Indebitamento' } }
             };
            initChart('debtCostChart', 'bar', data, options); // Tipo misto configurato nei dati
         } catch(e) { console.error("Errore grafico debtCostChart:", e); }
    }

    // --- PARTE 5: Circolante e Flussi ---
    if (document.getElementById('workingCapitalCycleChart')) {
         try {
            const data = getWorkingCapitalCycleData();
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Giorni' } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Ciclo del Capitale Circolante vs Benchmark' } }
             };
            initChart('workingCapitalCycleChart', 'bar', data, options);
         } catch(e) { console.error("Errore grafico workingCapitalCycleChart:", e); }
    }
     if (document.getElementById('cashFlowWaterfallChart')) {
         try {
            const data = getCashFlowWaterfallData();
            const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Euro' }, ticks: { callback: function(v) { return formatCurrency(v); } } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Composizione Flussi di Cassa 2024' }, legend: {display: false} }
            };
            initChart('cashFlowWaterfallChart', 'bar', data, options); // Usiamo 'bar' come approssimazione
         } catch(e) { console.error("Errore grafico cashFlowWaterfallChart:", e); }
    }
     if (document.getElementById('cashFlowTrendChart')) {
         try {
            const data = getCashFlowTrendData();
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Euro' }, ticks: { callback: function(v) { return formatCurrency(v); } } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Evoluzione Flussi di Cassa' } }
             };
            initChart('cashFlowTrendChart', 'line', data, options);
         } catch(e) { console.error("Errore grafico cashFlowTrendChart:", e); }
    }
     if (document.getElementById('cashFlowProjectionChart')) {
         try {
            const data = getCashFlowProjectionData();
             const options = {
                ...commonChartOptions,
                scales: {
                     y: { ...commonChartOptions.scales.y, type: 'linear', position: 'left', title: { display: true, text: 'Flussi (€)' }, ticks: { callback: function(v) { return formatCurrency(v); } } },
                     y1: { type: 'linear', position: 'right', title: { display: true, text: 'Liquidità Finale (€)' }, grid: { drawOnChartArea: false }, ticks: { callback: function(v) { return formatCurrency(v); } } }
                 },
                plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Proiezioni Finanziarie 2024-2028' } }
             };
            initChart('cashFlowProjectionChart', 'bar', data, options); // Tipo misto configurato nei dati
         } catch(e) { console.error("Errore grafico cashFlowProjectionChart:", e); }
    }

    // --- PARTE 6: Rischi ---
     if (document.getElementById('zscoreChart')) {
         try {
            const data = getZscoreData();
             const options = {
                 ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Z-Score' }, suggestedMin: 0, suggestedMax: 4 } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Evoluzione Z-Score e Soglie di Riferimento' } }
             };
            initChart('zscoreChart', 'line', data, options);
         } catch(e) { console.error("Errore grafico zscoreChart:", e); }
    }
    if (document.getElementById('riskIndicatorsChart')) {
         try {
            const data = getRiskIndicatorsData();
            initChart('riskIndicatorsChart', 'radar', data, radarChartOptions);
         } catch(e) { console.error("Errore grafico riskIndicatorsChart:", e); }
    }
     if (document.getElementById('sensitivityChart')) {
         try {
            const data = getSensitivityData();
            const options = {
                ...commonChartOptions,
                 scales: { y: { ...commonChartOptions.scales.y, title: { display: true, text: 'Variazione percentuale critica (%)' }, ticks: { callback: function(v) { return v + '%'; } } } },
                 plugins: { ...commonChartOptions.plugins, title: { display: true, text: 'Analisi di Sensitività - Variazioni Critiche' } }
            };
            initChart('sensitivityChart', 'bar', data, options);
         } catch(e) { console.error("Errore grafico sensitivityChart:", e); }
    }

    console.log("Inizializzazione grafici report completata (per elementi presenti).");
});
