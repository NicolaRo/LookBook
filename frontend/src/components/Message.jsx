/* Componente singolo messaggio

Riceve props:
-role
-text

NON HA logica di STATO */

function Message({role, content}) {
    return (
        <div className={`message ${role === "user" ? "message--user" : "message--assistant"}`}>
            <p>{content}</p>
        </div>
    );
    }

export default Message;