/* store.js è il "contenitore" dello stato.

Qui creo lo store Redux globale.

1. Importo tutti gli slice (app, chat, article, pricing) e li combino.

Relazioni:
-usato da main.jsx (Provider)
-contiene tutti gli slice */

//Importo configureStore ed il reducer della slice
import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';

//Creo lo store
const store = configureStore ({
    reducer: {
        app: appReducer, //Collego la slice "app" allo store
    },
});
export default store;

/* RIASSUNTO DEL FILE
configureStore crea un Redux pronto all'uso.
reducer accetta un oggetto: ogni chiave diventa una slice dello state (store.getState().app).
posso aggiungere altre slices in futuro (srticle, chat, pricing) importandole ed aggiungendole all'oggetto reducer. */