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

import {useSelector} from 'react-redux';
import Message from './Message';
import ArticleForm from './ArticleForm';
import PricingResult from './PricingResult';

function Chat() {
    const messages = useSelector ((state)=> state.chat.messages);
    const status = useSelector((state)=> state.app.status);

    return (
        <div className="assistente-AI-container">
            <h1 className="chat-title">LookBook Assistente di vendita</h1>
            <div className="display-chat">
                {messages.map((msg,index)=> (
                    <Message key={index} role={msg.role} content={msg.content}/>
                ))}
                </div>
                {status === 'IDLE' && <ArticleForm/>}
                <PricingResult/>
            </div>
    );
}

export default Chat;