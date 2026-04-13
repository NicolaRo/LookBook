/* Qui gestisco lo stato globale dell'app (state machine).

Contiene gli status (IDLE, PRICING_LOADING, PRICED).

Serve per controllare il flusso della UI.

Relazioni:
-letto da Chat.jsx per decidere cosa mostrare
-aggiornato dopo azioni (submit, pricing, ecc.). */

//Importo createSlice da Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

//Definisco l'initialState ed eventuale errore
const initialState = {
    status: 'IDLE', // IDLE | PRICING_LOADING | PRICED
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
        resetApp: (state) => { //Resetta lo stato dell'app
            state.status = 'IDLE';
            state.error = null;
        }
    }
});

//Esporto le azioni ed il Reducer
export const {setStatus, setError, resetApp} = appSlice.actions;

//Reducer per lo store
export default appSlice.reducer;