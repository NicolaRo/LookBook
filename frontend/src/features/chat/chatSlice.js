/* Gestisce i messaggi della chat.

Array di messaggi: {role: "user / "assistant, test}

Relazioni: 
-chat.jsx legge i messaggi
-message.jsx li renderizza
-app.jsx dispatcha nuovi messaggi  */

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
      state.messages.push(action.payload); // Aggiorna lo status
    },
    updateLastMessage: (state, action) => {
        const lastIndex = state.messages.length-1;
        if(lastIndex >=0) {
            state.messages[lastIndex] = {
                ...state.messages[lastIndex],
                ...action.payload
            };
        }
      },
      resetChat: state => {
        state.messages = [];
      },
  },
});

export const { addMessage, updateLastMessage, resetChat } = chatSlice.actions;

//Reducer per lo store
export default chatSlice.reducer;
