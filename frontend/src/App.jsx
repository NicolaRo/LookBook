/* ORCHESTRATORE PRINCIPALE

Responsabilità:
Monta l'applicazione*/


import React from 'react';
import ChatAI from './components/Chat';

function App() {
  return (
    <div>
      <ChatAI
        form={true}
        pricing={true}
      />
    </div>
  );
}
export default App
