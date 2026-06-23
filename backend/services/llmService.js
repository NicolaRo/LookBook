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

//Istanzio il client OpenAI
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callLLM = async ({ categoria, brand, stato, foto, messages }) => {
  //Validazione foto prima di inviare all'LLM
  if (foto && !isValidBase64Image(foto)) {
    console.error("❌ LLM call aborted: invalid base64 image");
    throw new Error("Invalid base64 image format");
  }

  
  const categoriaStr = `${categoria.genere || ""}, ${categoria.tipo || ""}`;

  const tempMessages = [
    {
      role: "system",
      content:
        "You are an expert in second-hand fashion. Your task is to evaluate clothing items and provide a market-consistent price estimate. Respond ONLY with a valid JSON object, with no additional text, no markdown, and no backticks. The structure must be exactly as follows: { suggested_price: <numero>, range: { min: <numero>, max: <numero> }, motivation: <stringa>, selling_tips: [<stringa>, <stringa>]}, use english as main language",
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
  
  const messages = [
    {
      role: "system",
      content: `
You are an expert in second-hand fashion pricing. You must explain in a simple and clear way how the suggested price was assigned. DO NOT recalculate the price. If you need additional information for a more thorough evaluation, ASK THE USER for it and DO NOT INVENT ANYTHING. Stay focused on the specific item. ALWAYS RESPOND IN ENGLISH as the primary language.

Do not invent data, prices, or information you do not have. Keep your response brief and conversational, with a maximum of 3–4 sentences.

Respond in JSON:
{
  explaination: string
}
`,
    },
    {
      role: "user",
      content: `
Article:
- Category: ${article.categoria.genere} ${article.categoria.tipo}
- Brand: ${article.brand}
- Condition: ${article.stato}

Pricing:
- Suggested price: ${pricing.suggested_price}
- Range: ${pricing.range.min}-${pricing.range.max}
- Why: ${pricing.motivation}

Domanda utente:
${question}
`,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  const raw = response.choices[0].message?.content;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Invalid explain JSON", raw);
    throw new Error("LLM explain returned invalid JSON");
  }
};

module.exports = { callLLM, explainPricing };
