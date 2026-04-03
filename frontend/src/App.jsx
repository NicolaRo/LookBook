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
import './App.css'

function App() {
  const dispatch = useDispatch();

  //Legge lo status corrente dall'appSlice
  const status = useSelector((state) =>  state.app.status);

  //Funzione per cambiare lo status
  const goToForm = () => {
    dispatch(setStatus('FORM'));
  };

  return (
    <div className="App">
      <h1>LookBook - Valutazione capi usati con AI</h1>
      <p>Stato attuale: {status}</p>
      <button onClick={goToForm}>Compila la Valutazione</button>
    </div>
  );
}

export default App
