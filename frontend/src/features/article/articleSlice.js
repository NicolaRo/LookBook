/* Gestisce i dati dell'articolo creato.

Contiene:
articleId
(eventualmente dati articolo)

Relazioni:
-articleForm.jsx dispatcha createArticle
-usato per chiamare pricing API
 */

//Importo createSlice da Redux Toolkit
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {createArticle, getArticlePricing} from '../../../services/api';


//Definisco l'initialState ed eventuale errore
const initialState = {
    status: 'IDLE',
    error: null,
    articleId: null,
    pricingResult: null
};

//THUNK - Coordinatore asincrono dei cambi di state
export const submitArticle = createAsyncThunk (
    'article/createArticle',
    async (formData) => {
        const data = await createArticle(formData) // Chiama api.js
        return data //il return va in action.payload di fulfilled
    }
)

export const submitPricing = createAsyncThunk (
    'article/submitPricing',
    async (articleId) => {
        const data = await getArticlePricing(articleId)
        return data
    }
)

export const submitArticleAndPrice = createAsyncThunk (
    'article/submitArticleAndPrice',
    async (formData, {dispatch}) => {

        //Step 1 - crea articolo
        const articleResult = await dispatch (submitArticle(formData))
        const articleId = articleResult.payload._id

        //Step 2 - chiedi pricing utilizzando l'id appena ricevuto
        await dispatch (submitPricing(articleId))
    }
)
//Creo la slice con i reducers base: 
const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload; // Aggiorna lo status

        },
        setError: (state, action) => {
            state.error = action.payload; //Aggiorna l'errore
        },
        resetApp: (state) => {
            state.status = 'IDLE';
            state.error = null; 
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(submitArticle.pending, (state) => {
            state.status = 'LOADING'
        })
        .addCase(submitArticle.fulfilled, (state, action)=> {
            state.status = 'SUCCEEDED'
            state.articleId = action.payload._id //salval'id dal backend
        })
        .addCase(submitArticle.rejected, (state, action) => {
            state.status = 'FAILED'
            state.error = action.error.message
        })
        .addCase(submitPricing.pending, (state)=> {
            state.status= 'LOADING'
        })
        .addCase(submitPricing.fulfilled,(state, action) => {
            state.status = 'SUCCEEDED'
            state.pricingResult = action.payload
        })
        .addCase(submitPricing.rejected, (state, action)=> {
            state.status = 'FAILED'
            state.error = action.error.message
        })

    }
});



export const {setStatus, setError} = articleSlice.actions;

//Reducer per lo store 
export default articleSlice.reducer