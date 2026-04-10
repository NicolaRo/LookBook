/* Responsabibilità del file: pricingController

1. createPricing
    1.1 Recupera l'articolo dal DB usando articleId
    1.2 Passa dati e foto all'LLM
    1.3 Riceve pricing suggerito, motivazione e selling tips
    1.4 Aggiorna l'articolo con il pricing e salva
    1.5 Risponde al frontend con l'articolo aggiornato
*/

//Import l'oggetto dal modello
const Article = require("../models/Article");
const llmService = require("../services/llmService");

// ### --- CREO UN PRICING --- ###

//1. Creo il pricing
const createPricing = async (req, res) => {
  console.log("🔥 createPricing chiamata");

  //Estraggo i dati dalla request
  const { articleId } = req.params;
  console.log("📦 articleId:", articleId);

  //Dichiaro variabile artiche visibile in tutto il try
  let article;

  try {
    //Recupero articolo dl DB
    article = await Article.findById(articleId);

    if (!article)
      return res.status(404).json({ message: "Articolo non trovato" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const categoria = article.categoria;
  const brand = article.brand;
  const stato = article.stato;
  const foto = article.foto;

  try {
    //Preparo input per LLM
    const llmInput = {
      categoria,
      brand,
      stato,
      foto: null,
    };
    //Pulizia e validazione foto
    if (foto && typeof foto === "string") {
      //Estrae payload base64
      let base64Payload = foto.includes(",") ? foto.split(",")[1] : foto;

      //Rimozione spazi, newline, tab
      base64Payload = base64Payload.replace(/\s/g, "");

      //Verifica dimensione foto (4MB)
      const sizeInMB = (base64Payload.length * 3) / 4 / (1024 * 1024);
      if (sizeInMB > 4) {
        console.warn(`⚠️ foto troppo grande (${sizeInMB.toFixed(2)} MB)`);
      }
      //Ricostruisco la stringa completa per LLM
      let mimeType = "image/png"; //default
      if (foto.includes(",")) {
        const prefix = foto.split(",")[0];
        if (prefix.includes("image/")) {
          mimeType = prefix.split(",")[0].replace("data:", "");
        }
      }

      llmInput.foto = base64Payload;
    } else {
      console.warn("⚠️ foto non valida o mancante");
    }

    const llmRaw = await llmService.callLLM(llmInput);
    console.log("🤖 chiamata LLM con:", llmInput);

    let llmResponse;

    try {
      llmResponse = JSON.parse(JSON.stringify(llmRaw));
    } catch (parseErr) {
      console.error("❌ JSON parsing LLM failed:", parseErr.message);
      return res.status(500).json({ message: "Errore parsing risposta LLM" });
    }

    // Aggiorno articolo e session
    article.pricing = llmResponse;
    await article.save();

    console.log("🤖 risposta LLM:", llmResponse);

    res.status(200).json({ article});
  } catch (err) {
    console.error("❌ LLM call failed:", err.message);
    res.status(500).json({ message: "Errore chiamata LLM" });
  }
};
module.exports = {
  createPricing,
};
