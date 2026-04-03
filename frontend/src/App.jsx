/* ORCHESTRATORE PRINCIPALE

Responsabilità:
-Gestire flusso logico
-Dispatch azioni Redux
Collegare UI e stato

Qui avvengono:
-handleUserMessage
-handleCreateArticle
-handlePricing */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus } from './features/appSlice';
import ChatAI from './components/Chat';

function App() {
  const dispatch = useDispatch();

  //Legge lo status corrente dall'appSlice
  const status = useSelector((state) =>  state.app.status);

  //Funzione per cambiare lo status
  const goToForm = () => {
    dispatch(setStatus('FORM'));
  };

  return (
    <div>
      <p>Status corrente: {status}</p>
  
      <button onClick={goToForm}>
        Vai al form
      </button>
  
      <ChatAI
        inizio={true}
        form={true}
        pricing={true}
        valutato={true}
      />
    </div>
  );
}
console.log(ChatAI);
export default App
