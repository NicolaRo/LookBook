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
import { useState, useRef, useEffect } from "react";
import { explainPricing } from "../../services/api";
import { useDispatch } from "react-redux";
import { addMessage, updateLastMessage } from "../features/chat/chatSlice";

function Chat() {
  const messages = useSelector((state) => state.chat.messages);
  const status = useSelector((state) => state.app.status);
  const articleId = useSelector((state) => state.article.articleId);
  const bottomRef = useRef(null);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior: "smooth"});
  },[messages]);

  const dispatch = useDispatch();


  const [question, setQuestion] = useState("");

  const handleExplain = async () => {
    console.log("STEP 1 - click ok");

    if (!articleId) {
        console.log("NO ARTICLE ID");
      alert("Article ID mancante");
      return;
    }

    //Salvo il messaggio dell'utente
    dispatch(addMessage({
      role:"user",
      content: question
    }));
    
    //Mostro messaggio di loading
    dispatch(addMessage({
        role: "assistant",
        content: "Elaboro risposta..."
    }));
    
    console.log("ARTICLE ID:", articleId);
    console.log("QUESTION:", question);

    //Chiamata API
    const res = await explainPricing(articleId, question);
    console.log("STEP 2 - response:", res);


    //Sostituisco messaggio di loading con la risposta e richiamo le lettere di
    //risposta ogni 0,2sec
    const fullText = res.explaination;
    let currentText = "";
    for (let i = 0; i < fullText.length; i++) {
      setTimeout(() => {
        currentText += fullText[i];
        dispatch(updateLastMessage({content: currentText}));
      }, i*20);
    }
    dispatch(updateLastMessage({
        content: res.explaination
    }));
    setQuestion("");

  };

  return (
    <div className="assistente-AI-container">
      
      <h1 className="chat-title">LookBook</h1>
      <div className ="image-container">
      <img className="img-AI-assistent" src="LookBook-AI-agent.png" alt="Illustrazione assistente artificiale fashion"/>
      <h1 className="chat-title">Il tuo Assistente AI di vendita</h1>
      </div>
      
  {status === "PRICING_LOADING" &&  <p>Valutando l'articolo...</p>}
  {status === "PRICING_LOADING" && (
    <div className="spinner"></div>
  )}
  {status === "PRICED" && <PricingResult/>}
      {/* CHAT */}
      {messages.length > 0 && (
        <div className="display-chat">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={bottomRef} />
      </div>
      )}
      
      {/* FORM */}
      {status === "IDLE" && <ArticleForm />}

      
  
      {/* EXPLAIN INPUT */}
      <div className="container-textarea">
         <textarea className="chat-textarea"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Hai una domanda sulla valutazione ricevuta?"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleExplain()
          }
        }}
      />
      <button className="button-send" onClick={handleExplain} type="button">
        ➤
      </button>
      </div>
     
    </div>
  );  
}

export default Chat;
