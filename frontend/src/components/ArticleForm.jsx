/* Form per creare articolo.

Responsabilità:
-Raccogliere input utente:
-Convertire immagine in base64
-Dispatch createArticle

NON CHIAMA DIRETTAMENTE LE API (idealmente -> via Redux) */

//Importo:
//gli states di React per gestire l'inviio del form
//fileToBase64 per la conversione della foto
//sumbmitArticleAndPrice per gestire loading nella UI
//useDispatch
import { useState } from "react";
import fileToBase64 from "../../services/utils/fileToBase64";
import { submitArticleAndPrice } from "../features/article/articleSlice";
import { useDispatch } from "react-redux";

function ArticleForm() {
  const [brand, setBrand] = useState("");
  const [categoria, setCategoria] = useState({ genere: "", tipo: "" });
  const [stato, setStato] = useState("");
  const [foto, setFoto] = useState(null);

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [openGenere, setOpenGenere] = useState(null);
  const [openStato, setOpenStato] = useState(null);

  const [errore, setErrore] = useState("");
  const [loadingFoto, setLoadingFoto] = useState(false);

  const dispatch = useDispatch();

  const handleFotoChange = async (file) => {
    setLoadingFoto(true);
    const base64 = await fileToBase64(file);
    setFoto(base64);
    setLoadingFoto(false);
  };

  const handleSubmit = () => {
    if (loadingFoto) {
      setErrore("Caricamento foto in corso, attendere...");
      return;
    }

    if (!categoria.genere || !categoria.tipo || !brand || !foto) {
      setErrore("Compila tutti i campi e riprova");
      return;
    }

    dispatch(submitArticleAndPrice({ categoria, brand, stato, foto }));
  };

  return (
    <>
      {/* CATEGORIE */}
      <div className="categoria-genere-container">
        <h3>Scegli la categoria articolo</h3>

        <button
          className={`button ${categoriaOpen ? "active" : ""}`}
          onClick={() => setCategoriaOpen(!categoriaOpen)}
        >
          Categorie
        </button>

        {categoriaOpen && (
          <div className="container-tags-genere">
            <div className="tags-genere">
            <button
              className={`tag-genere ${openGenere === "uomo" ? "active" : ""}`}
              onClick={() => {
                const newState = openGenere === "uomo" ? null : "uomo";
                setOpenGenere(newState);

                setCategoria({
                  ...categoria,
                  genere: newState ? "Abbigliamento uomo" : "",
                });
              }}
            >
              🕺 Uomo
            </button>

            <button
              className={`tag-genere ${openGenere === "donna" ? "active" : ""}`}
              onClick={() => {
                const newState = openGenere === "donna" ? null : "donna";
                setOpenGenere(newState);

                setCategoria({
                  ...categoria,
                  genere: newState ? "Abbigliamento donna" : "",
                });
              }}
            >
              💃 Donna
            </button>

            <button
              className={`tag-genere ${openGenere === "bambino" ? "active" : ""}`}
              onClick={() => {
                const newState = openGenere === "bambino" ? null : "bambino";
                setOpenGenere(newState);

                setCategoria({
                  ...categoria,
                  genere: newState ? "Abbigliamento bambino" : "",
                });
              }}
            >
              👦🏻 Bambino
            </button>

            <button
              className={`tag-genere ${openGenere === "bambina" ? "active" : ""}`}
              onClick={() => {
                const newState = openGenere === "bambina" ? null : "bambina";
                setOpenGenere(newState);

                setCategoria({
                  ...categoria,
                  genere: newState ? "Abbigliamento bambina" : "",
                });
              }}
            >
             👧 Bambina
            </button>
            </div>
            
          {/* CATEGORIE PER GENERE */}
        <div className="container-categoria">
        {openGenere && (
          <div className="container-tags-categoria">
            <button
              className={`tag-categoria ${
                categoria.tipo === "Pantaloni" ? "active" : ""
              }`}
              onClick={() =>
                setCategoria({ ...categoria, tipo: "Pantaloni" })
              }
            >
              👖 Pantaloni
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Jeans" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Jeans" })}
            >
              👖 Jeans
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "T-Shirt" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "T-Shirt" })}
            >
             👕 T-Shirt
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Abito" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Abito" })}
            >
             👗 Abito
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Giacca" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Giacca" })}
            >
             🧥 Giacca
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Calzature" ? "active" : ""
              }`}
              onClick={() =>
                setCategoria({ ...categoria, tipo: "Calzature" })
              }
            >
             👞 Calzature
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Accessori" ? "active" : ""
              }`}
              onClick={() =>
                setCategoria({ ...categoria, tipo: "Accessori" })
              }
            >
             👜 Accessori
            </button>
          </div>
        )}
        </div>
          </div>
          
        )}
        {/* FOTO */}
      <div className="upload-foto-container">
        <input
          type="file"
          onChange={(e) => handleFotoChange(e.target.files[0])}
        />
        {errore && <p>{errore}</p>}
      </div>
      {/* BRAND */}
      <div className="container-brand">
        <h3>Indica il brand dell'articolo:</h3>
        <input
          className="input-textarea"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Es. Zara, Nike..."
        />
      </div>

      {/* STATO */}
      <h3>Indica lo stato:</h3>
      <div className="container-stato">
      <div className="container-tag-stato">
  <button
    className={`button ${openStato === "Nuovo" ? "active" : ""}`}
    onClick={() => {
      const newState = openStato === "Nuovo" ? null : "Nuovo";
      setOpenStato(newState);
      setStato(newState ? "Nuovo" : "");
    }}
  >
    Nuovo
  </button>

  <button
    className={`button ${openStato === "Buono" ? "active" : ""}`}
    onClick={() => {
      const newState = openStato === "Buono" ? null : "Buono";
      setOpenStato(newState);
      setStato(newState ? "Buono" : "");
    }}
  >
    Buono
  </button>

  <button
    className={`button ${openStato === "Usato" ? "active" : ""}`}
    onClick={() => {
      const newState = openStato === "Usato" ? null : "Usato";
      setOpenStato(newState);
      setStato(newState ? "Usato" : "");
    }}
  >
    Usato
  </button>
</div>
      </div>
      <div className="container-button-valuta">
      <button className="button-valuta" onClick={handleSubmit}>
          Valuta articolo
        </button>
      </div>
      </div>
    </>
  );
}

export default ArticleForm;