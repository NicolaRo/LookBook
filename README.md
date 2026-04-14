📦 AI Pricing Assistant
Applicazione web che sfrutta l’intelligenza artificiale per suggerire il prezzo ottimale di capi d’abbigliamento destinati alla vendita online, migliorando velocità e probabilità di vendita.

🚀 Panoramica
L’app analizza diversi fattori relativi a un prodotto e restituisce:
un prezzo consigliato
un range realistico (min/max)
una spiegazione del risultato
suggerimenti pratici per ottimizzare la vendita

L’obiettivo è supportare l’utente nel prendere decisioni più consapevoli e rapide durante la pubblicazione di un annuncio.

🧠 Funzionalità principali
📊 Valutazione intelligente del prezzo
Basata su categoria, brand, condizioni, stagione, rarità e domanda

💬 Motivazione del prezzo
L’AI spiega in modo chiaro e strutturato il risultato
⚡ Consigli per vendere più velocemente
Miglioramento delle foto
Ottimizzazione del prezzo
Timing di pubblicazione

🧩 Gestione dello stato con Redux Toolkit
Stato globale centralizzato e organizzato in slice
Flusso dei dati prevedibile e facilmente tracciabile

🛠️ Tech Stack
Frontend: React + Vite
Backend: NodeJS + Express
State Management: Redux Toolkit + React-Redux
AI Integration: (OpenAI API)

🧱 Architettura
Redux Store
Stato globale gestito tramite slice modulari

Provider 
Espone lo store a tutta l’applicazione

Componenti React
Consumano lo stato e dispatchano azioni

🔐 Note sulla gestione dei dati
L’app utilizza una gestione centralizzata dello stato per garantire coerenza e controllo del flusso dei dati.
Le configurazioni sensibili e la logica AI sono isolate e non modificabili direttamente dall’interfaccia utente.

## 📸 Screenshot

![App Screenshot](./screenshot/Screenshot LookBook.png)

Link all'App - LookBook - Assistente AI moda
https://ailookbook.netlify.app/

▶️ Utilizzo
Inserisci le informazioni del capo (categoria, brand, condizioni)
Carica una foto dell'articolo in vendita
Avvia l’analisi
Visualizza:
prezzo suggerito
range
spiegazione
consigli
Chatta con l'assistente per ottenere più dettagli o ulteriori consigli

🎯 Obiettivi del progetto
Migliorare la user experience nella vendita online
Ridurre l’incertezza nella definizione del prezzo
Applicare AI in un contesto reale e pratico
