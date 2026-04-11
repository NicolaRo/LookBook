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
import ChatAI from './components/Chat';

function App() {
  return (
    <div>
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
