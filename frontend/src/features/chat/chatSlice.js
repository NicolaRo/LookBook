/* Gestisce i messaggi della chat.

Array di messaggi: {role: "user / "assistant, text}

Relazioni: 
-chat.jsx legge i messaggi
-message.jsx li renderizza
 */

//Importo createSlice da Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

//Definisco l'initialState ed eventuale errore
const initialState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); //Aggiunge i messaggi dei rispettivi role: "user" ed "assistant"
    },
    updateLastMessage: (state, action) => { //Aggiorna il messaggio 
        const lastIndex = state.messages.length-1;
        if(lastIndex >=0) {
            state.messages[lastIndex] = {
                ...state.messages[lastIndex],
                ...action.payload
            };
        }
      },
      resetChat: state => { //Ripulisce la chat
        state.messages = [];
      },
  },
});

export const { addMessage, updateLastMessage, resetChat } = chatSlice.actions;

//Reducer per lo store
export default chatSlice.reducer;
