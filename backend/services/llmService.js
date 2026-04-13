/* Responsabilità di llmService.js
1. Istanziare il client OpenAI con la API key dal .env
2. Costruire un prompt con i dati dell'articolo
    2.1 System prompt  — chi è l'LLM e cosa deve fare
    2.2 User message   — i dati dell'articolo + la foto in base64
3. Chiamata API   — openai.chat.completions.create(...)
4. Parsing        — JSON.parse della risposta
*/

//Funzione per validare /l'immagine base64
function isValidBase64Image(data) {
  if (!data || typeof data !== "string") return false;

  return typeof data === "string" && data.length > 100;
}

const callLLM = async ({ categoria, brand, stato, foto, messages }) => {
  //Validazione foto prima di inviare all'LLM
  if (foto && !isValidBase64Image(foto)) {
    console.error("❌ LLM call aborted: invalid base64 image");
    throw new Error("Invalid base64 image format");
  }

  //Istanzio il client OpenAI
  const OpenAI = require("openai");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const categoriaStr = `${categoria.genere || ""}, ${categoria.tipo || ""}`;

  const tempMessages = [
    {
      role: "system",
      content:
        "Sei un esperto di moda second hand. Il tuo compito è valutare capi di abbigliamento e restituire una stima di prezzo coerente col mercato. Rispondi SOLO con un oggetto JSON valido, senza testo aggiuntivo, senza markdown, senza backtick. La struttura deve essere esattamente questa: { suggested_price: <numero>, range: { min: <numero>, max: <numero> }, motivation: <stringa>, selling_tips: [<stringa>, <stringa>]}",
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Valuta questo articolo: ${categoriaStr}, brand ${brand}, stato ${stato}, Immagine inclusa`,
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/png;base64,${foto}`,
          },
        },
      ],
    },
  ];
  //Chiamata LLM
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: tempMessages,
    });
    const raw = response.choices[0].message.content;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Invalid LLM JSON:", raw);
      throw new Error("LLM returned invalid JSON");
    }
  } catch (error) {
    console.error("LLM ERROR:", error.message);
    throw new Error(`LLM error: ${error.message}`);
  }
};

const explainPricing = async ({ article, pricing, question }) => {
  const OpenAI = require("openai");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const messages = [
    {
      role: "system",
      content: `
Sei un esperto di pricing di moda second hand. Devi spiegare in modo semplice e chiaro come hai assegnato il prezzo suggerito. NON devi ricalcolare il prezzo. Se Ti mancano dati per una valutazione più approfondita CHIEDILI all'utente NON INVENTARE NULLA. Rimani focalizzato sull'articolo specifico. RISPONDI SEMPRE IN ITALIANO.

NON inventare dati, prezzi o informazioni che non hai. Rispondi in modo breve e conversazionale, massimo 3-4 frasi.

Rispondi in JSON:
{
  explaination: string
}
`,
    },
    {
      role: "user",
      content: `
Articolo:
- Categoria: ${article.categoria.genere} ${article.categoria.tipo}
- Brand: ${article.brand}
- Stato: ${article.stato}

Pricing:
- Prezzo suggerito: ${pricing.suggested_price}
- Range: ${pricing.range.min}-${pricing.range.max}
- Motivazione: ${pricing.motivation}

Domanda utente:
${question}
`,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });
  console.log("OPENAI RAW:", response);

  const raw = response.choices[0].message?.content;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Invalid explain JSON", raw);
    throw new Error("LLM explain returned invalid JSON");
  }
};

module.exports = { callLLM, explainPricing };
