/* Gestisce il risultato di pricing AI.

Contiene
Data (suggested_price, range, ecc.).
loading
error

Relazioni:
-pricingResult.jsx legge data
*/

//Importo createSlice da Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';
import {submitPricing} from '../article/articleSlice';

//Definisco l'initialState ed eventuale errore
const initialState = {
    status: 'IDLE',
    error: null,
    pricingResult: null
};

//pricingSlice per gestire i casi di caricamento, successo o fallimento della visualizzazione della valutazione
const pricingSlice = createSlice ({ 
    name:'pricing',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(submitPricing.pending, (state)=>{
            state.status = 'LOADING'
        })
        .addCase(submitPricing.fulfilled, (state, action) => {
            state.pricingResult = action.payload
            state.status = 'SUCCEEDED'
        })
        .addCase(submitPricing.rejected, (state,action) => {
            state.error = action.error.message
            state.status = 'FAILED'
        })
    }
})
export default pricingSlice.reducer;