/* Qui gestisco lo stato globale dell'app (state machine).

Contiene gli status (IDLE, FORM, CREATED, PRICING_LOADING, PRICED).

Serve per controllare il flusso della UI.

Relazioni:
-letto da Chat.jsx per decidere cosa mostrare
-aggiornato dopo azioni (form submit, pricing, ecc.). */