/* Gestisce i messaggi della chat.

Array di messaggi: {role: "user / "assistant, test}

Relazioni: 
-chat.jsx legge i messaggi
-message.jsx li renderizza
-app.jsx dispatcha nuovi messaggi  */

//Importo createSlice da Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

//Definisco l'initialState ed eventuale errore
const initialState = {
    messages: []
};

export const chatSlice = createSlice({
        name: 'chat',
        initialState,
        reducers: {
            addMessage: (state, action) => {
                state.messages.push(action.payload); // Aggiorna lo status
            },            
        }
    })

    


export const {addMessage} = chatSlice.actions;

//Reducer per lo store
export default chatSlice.reducer;