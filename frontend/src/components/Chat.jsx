/* Componente principale della UI chat.

Responsabilità
-Mostra i messaggi
-Decide cosa renderizzare (form, pricing, loading)

Legge: 
-Status (appSlice)
-Messages (chatSlice)

Renderizza: 
-Message
-ArticleForm
-PricingResult */

//Importo:
//useSelector per leggere i Redux
//Message
//ArticleForm

import { useSelector } from "react-redux";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import PricingResult from "./PricingResult";
import { useState } from "react";
import { explainPricing } from "../../services/api";

function Chat() {
  const messages = useSelector((state) => state.chat.messages);
  const status = useSelector((state) => state.app.status);
  const articleId = useSelector((state) => state.article.articleId);

  const [question, setQuestion] = useState("");
  const [explaination, setExplaination] = useState(null);

  const handleExplain = async () => {
    console.log("STEP 1 - click ok");

    if (!articleId) {
        console.log("NO ARTICLE ID");
      alert("Article ID mancante");
      return;
    }
    {explaination && (
    <div style={{ marginTop: "10px" }}>
        {explaination}
    </div>
)}
    
    console.log("ARTICLE ID:", articleId);
    console.log("QUESTION:", question);

    const res = await explainPricing(articleId, question);
    console.log("STEP 2 - response:", res);


    setExplaination(res.explaination);
    
  };

  return (
    <div className="assistente-AI-container">
      <h1 className="chat-title">LookBook Assistente di vendita</h1>
      <div className="display-chat">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
      </div>
      {status === "IDLE" && <ArticleForm />}
      <PricingResult />
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Hai una domanda sulla valutazione ricevuta?"
      />
      <button onClick={handleExplain} type="button">
        Invia
      </button>
      {explaination && <div style={{ marginTop: "10px" }}>{explaination}</div>}
    </div>
  );
}

export default Chat;
