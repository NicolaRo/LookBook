/* Form per creare articolo.

Responsabilità:
-Raccogliere input utente:
-Dispatch createArticle

NON CHIAMA DIRETTAMENTE LE API (idealmente -> via Redux) */

//Importo:
//gli states di React per gestire l'invio del form
//fileToBase64 per la conversione della foto
//submitArticleAndPrice raccoglie gli input utente crea il Json e lo manda all'LLM

import { useState } from "react";
import fileToBase64 from "../../services/utils/fileToBase64";
import { submitArticleAndPrice } from "../features/article/articleSlice";
import { useDispatch } from "react-redux";

import ManLogo from '../assets/icons/Man-logo.png';
import BoyLogo from '../assets/icons/Boy-logo.png';
import WomanLogo from '../assets/icons/Women-logo.png';
import GirlLogo from '../assets/icons/Girl-logo.png';

import ShoesLogo from '../assets/icons/Shoes-logo.png';
import DressLogo from '../assets/icons/Dress-logo.png';
import TshirtLogo from '../assets/icons/T-shirt-logo.png';
import TrousersLogo from '../assets/icons/Trousers-logo.png';
import JacketLogo from '../assets/icons/Jacket-logo.png';
import AccessoriesLogo from '../assets/icons/Accessories-logo.png';
import JeansLogo from '../assets/icons/Jeans-logo.png';



//Funzione principale del componente
function ArticleForm() {

  //Imposto lo stato dei sub-componenti per rendere "cliccati" i bottoni
  const [brand, setBrand] = useState("");
  const [categoria, setCategoria] = useState({ genere: "", tipo: "" });
  const [stato, setStato] = useState("");
  const [foto, setFoto] = useState(null);

  const [fileName, setFileName] = useState("");

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [openGenere, setOpenGenere] = useState(null);
  const [openStato, setOpenStato] = useState(null);

  const [errore, setErrore] = useState("");
  const [loadingFoto, setLoadingFoto] = useState(false);

  //Dispatch comunica il cambio di stato di un componente
  const dispatch = useDispatch();

  //Qui ottengo il file caricato in formato base64 per passarlo all'LLM
  const handleFotoChange = async (file) => {
    setLoadingFoto(true);
    const base64 = await fileToBase64(file);
    setFoto(base64);
    setFileName(file.name);
    setLoadingFoto(false);
  };

  //Carico le informazioni dell'articolo
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
        <div className="category-btn-container">
        <h2>Which apparel are you selling?</h2>
        {/* Quando cliccato, il bottone apre il contenitore catagoria (setCategoriaOpen)*/}
        <button
          className={`button button--category ${categoriaOpen ? "active" : ""}`}
          onClick={() => setCategoriaOpen(!categoriaOpen)}
        >
          <h3 className ="btn-category-text">Category</h3>
        </button>
        </div>
        

        

        {categoriaOpen && (
          <div className="container-tags-genere">
            <h3 className="titolo-categorie">Categories:</h3>
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
             <img className = "gender-category-icons" src={ManLogo} alt="Man icon" />
             Man
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
              <img className = "gender-category-icons" src={WomanLogo} alt="Woman icon" />
            Woman
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
              <img className = "gender-category-icons" src={BoyLogo} alt="Boy icon" />
           Boy
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
              <img className = "gender-category-icons" src={GirlLogo} alt="Girl icon" />
             Girl
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
            ><img className = "product-category-icons" src={TrousersLogo} alt="Trousers icon" />
              Trousers
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Jeans" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Jeans" })}
            ><img className = "product-category-icons" src={JeansLogo} alt="Jeans icon" />
            Jeans
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "T-Shirt" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "T-Shirt" })}
            ><img className = "product-category-icons" src={TshirtLogo} alt="T-shirt icon" />
              T-Shirt
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Abito" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Abito" })}
            ><img className = "product-category-icons" src={DressLogo} alt="Dress icon" />
              Dress
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Giacca" ? "active" : ""
              }`}
              onClick={() => setCategoria({ ...categoria, tipo: "Giacca" })}
            ><img className = "product-category-icons" src={JacketLogo} alt="Jacket icon" />
              Jacket
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Calzature" ? "active" : ""
              }`}
              onClick={() =>
                setCategoria({ ...categoria, tipo: "Calzature" })
              }
            ><img className = "product-category-icons" src={ShoesLogo} alt="Shoes icon" />
              Shoes
            </button>

            <button
              className={`tag-categoria ${
                categoria.tipo === "Accessori" ? "active" : ""
              }`}
              onClick={() =>
                setCategoria({ ...categoria, tipo: "Accessori" })
              }
            ><img className = "product-category-icons" src={AccessoriesLogo} alt="Accessories icon" />
              Accessories
            </button>
          </div>
        )}
        </div>
          </div>
          
        )}
        {/* FOTO */}
        <div className="container-indicazioni-foto">
        <h3 className="titolo-indicazioni-foto">Which picture should I upload?</h3>
          <div className="indicazioni-foto">
          <p className="UI-text">To allow me to make an accurate assessment, photograph the garment on a <strong>neutral and uniform background</strong>.</p>
          <p className="UI-text">Make sure the <strong>photo</strong> is <strong>well-lit</strong> and that the colors captured reflect the actual ones.</p>
          <p className="UI-text">Finally, check that the focus produces a <strong>sharp, detailed photo</strong>.</p>
          <p className="UI-text">For further guidance, use the chat.</p>
          </div>
        </div>
        <div className="upload-foto-container UI-text">
        <label className="file-upload-label" htmlFor="foto-upload">
          Choose photo
        </label>
        <input
          id="foto-upload"
          type="file"
          className="file-upload-input"
          onChange={(e) => handleFotoChange(e.target.files[0])}
        />
        <span className="UI-text-light">{fileName || "No file selected"}</span>
        {errore && <p>{errore}</p>}
      </div>
      {/* BRAND */}
      <div className="container-brand">
        <h3>Indicate the brand:</h3>
        <input
          className="input-textarea"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Ie. Zara, Nike..."
        />
      </div>

      {/* STATO */}
      <h3>Select the condition:</h3>
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
    Brand new
  </button>

  <button
    className={`button ${openStato === "Buono" ? "active" : ""}`}
    onClick={() => {
      const newState = openStato === "Buono" ? null : "Buono";
      setOpenStato(newState);
      setStato(newState ? "Buono" : "");
    }}
  >
    Good conditions
  </button>

  <button
    className={`button ${openStato === "Usato" ? "active" : ""}`}
    onClick={() => {
      const newState = openStato === "Usato" ? null : "Usato";
      setOpenStato(newState);
      setStato(newState ? "Usato" : "");
    }}
  >
    Used
  </button>
</div>
      </div>
      <div className="container-button-valuta">
      <button className="button-valuta" onClick={handleSubmit}>
          Estimate value
        </button>
      </div>
      </div>
    </>
  );
}

export default ArticleForm;