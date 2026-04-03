/* Qui gestisco lo stato globale dell'app (state machine).

Contiene gli status (IDLE, FORM, CREATED, PRICING_LOADING, PRICED).

Serve per controllare il flusso della UI.

Relazioni:
-letto da Chat.jsx per decidere cosa mostrare
-aggiornato dopo azioni (form submit, pricing, ecc.). */

//Importo createSlice da Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

//Definisco l'initialState ed eventuale errore
const initialState = {
    status: 'IDLE', // IDLE | FORM | CREATED | PRICING_LOADING | PRICED
    error: null
};

//Creo la slice con i reducers base: setStatus, setError, resetApp.

const appSlice = createSlice ({
    name: 'app', //nome della slice
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload; //Aggiorna lo status
        },
        setError: (state, action) => {
            state.error = action.payload; //Aggiorna l'errore
        },
        resetApp: (state) => {
            state.status = 'IDLE';
            state.error = null;
        }
    }
});

//Esporto le azioni ed il Reducer
export const {setStatus, setError, resetApp} = appSlice.actions;

//Reducer per lo store
export default appSlice.reducer;


/* 
RIASSUNTO DEL FILE:
- Ho separato dati (state) da azioni (reducers) → chiarezza e manutenibilità.
- Gli action creators (setStatus, ecc.) sono già pronti per essere dispatch-ati nei componenti.
- resetApp permette di riportare l’app allo stato iniziale senza riscrivere codice ogni volta. */