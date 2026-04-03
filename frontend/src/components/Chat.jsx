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

function ChatAI ({ inizio, form, pricing, valutato}) {
    if(!inizio || !form || !pricing || !valutato) {
        return <p>Caricamento Assistente di vendita, attendere prego...</p>
    }

    return (
        <div className="assistente-AI-container">
            <h1 className="chat-title">LookBook Assistente di vendita</h1>
            <div className="display-chat">
            <textarea
                className="text-input"
                placeholder="Scrivi qui all'assistente AI..."
            />
            <button className="bottone-invia">Invia messaggio</button>
            </div>
        </div>
    );
}

export default ChatAI;