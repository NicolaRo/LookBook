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
import { useDispatch } from "react-redux";
import { addMessage, updateLastMessage } from "../features/chat/chatSlice";

function Chat() {
  const messages = useSelector((state) => state.chat.messages);
  const status = useSelector((state) => state.app.status);
  const articleId = useSelector((state) => state.article.articleId);
  const dispatch = useDispatch();

  const [question, setQuestion] = useState("");

  const handleExplain = async () => {
    console.log("STEP 1 - click ok");

    if (!articleId) {
        console.log("NO ARTICLE ID");
      alert("Article ID mancante");
      return;
    }

    //1. Messaggio di loading
    dispatch(addMessage({
        role: "assistant",
        content: "Elaboro risposta..."
    }));
    
    console.log("ARTICLE ID:", articleId);
    console.log("QUESTION:", question);

    //2. Chiamata API
    const res = await explainPricing(articleId, question);
    console.log("STEP 2 - response:", res);


    //3. Sostituisco messaggio di loading con la risposta
    dispatch(updateLastMessage({
        content: res.explaination
    }));

  };

  return (
    <div className="assistente-AI-container">
      <h1 className="chat-title">LookBook Assistente di vendita</h1>
  
      {/* CHAT */}
      <div className="display-chat">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
{/*   
        {status === "LOADING" && (
          <Message role="assistant" content="Valutando l'articolo..." />
        )} */}
      </div>
  
      {/* FORM */}
      {status === "IDLE" && <ArticleForm />}

      <PricingResult/>
  
      {/* EXPLAIN INPUT */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Hai una domanda sulla valutazione ricevuta?"
      />
  
      <button onClick={handleExplain} type="button">
        Invia
      </button>
    </div>
  );  
}

export default Chat;
