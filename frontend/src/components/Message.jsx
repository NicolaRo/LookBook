/* Componente singolo messaggio

Riceve props:
-role
-text

NON HA logica di STATO */

function Message({role, content}) {
    return (
        <div>{role}:{content}</div>
    );
    }

export default Message;