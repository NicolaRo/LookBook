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
import {useState} from 'react';
import fileToBase64 from '../../services/utils/fileToBase64';
import { submitArticleAndPrice } from '../features/article/articleSlice';
import {useDispatch} from 'react-redux';

function ArticleForm () {
    // salvo gli states
    const [brand, setBrand] = useState('');
    const [categoria, setCategoria] = useState({genere: '', tipo:''});
    const [stato, setStato] = useState('');
    const [foto, setFoto] = useState(null);
    const [categoriaOpen, setCategoriaOpen] = useState(false);
    const [errore, setErrore] = useState('');
    const [loadingFoto, setLoadingFoto] = useState(false);

    //inizializzo dispatch
    const dispatch = useDispatch ();
    
    //Ottengo la foto convertita in stringa da fileToBase64.js
    const handleFotoChange = async (file) => {
        setLoadingFoto(true);//✅ Inizio caricamento
        const base64 = await fileToBase64(file);
        setFoto(base64);
        setLoadingFoto(false); //✅ Fine caricamento
    }

    //Comunico cambio di state
    const handleSubmit = () => {
        if(loadingFoto){
            setErrore('Caricamento foto in corso, attendere...');
            return;
        }
        //Controllo che tutti i campi siano presenti
        if(!categoria.genere || !categoria.tipo || !brand || !foto) {
            setErrore('Compila tutti i campi e riprova');
            return;
        }

        // Set loading globale
        dispatch({type: "app/setStatus", payload: "LOADING"});

        dispatch(submitArticleAndPrice({categoria, brand, stato, foto }));
    }

    return (
        <>
        <div className="categoria-genere-ontainer">
            <p>Scegli la categoria articolo</p>
            <input
            type="button"
            name="Categoria"
            id="Categoria"
            required
            placeholder="Categoria"/>
            <button onClick={()=> setCategoriaOpen(!categoriaOpen)}>Scegli categoria</button>
            {categoriaOpen && (
                <div>
                    <button className="tag-genere" onClick={() => setCategoria({ ...categoria, genere: 'Abbigliamento uomo'})}>
                        Uomo
                    </button>
                    <button onClick={() => setCategoria({...categoria, genere: 'Abbigliamento donna'})}>
                        Donna
                    </button>
                    <button onClick={() => setCategoria({...categoria, genere: 'Abbigliamento bambino'})}>
                        Bambino
                    </button>
                    <button onClick={() => setCategoria({...categoria, genere: 'Abbigliamento bambina'})}>
                        Bambina
                    </button>
                </div>
            )}
        </div>
        <div className="container-categoria">
            <p>Scegli </p>
            <input
                type="button"
                name="Tipo"
                id="Tipo"
                required
                placeholder="Tipo"/>
                {categoria.genere && (
                    <div>
                        <button onClick={() => setCategoria({...categoria, tipo:'Pantaloni'})}>Pantaloni</button>
                        <button onClick= {() => setCategoria({...categoria, tipo:'Jeans'})}> Jeans</button>
                        <button onClick={() => setCategoria({...categoria, tipo:'T-Shirt'})}>T-Shirt</button>
                        <button onClick= {() => setCategoria({...categoria, tipo:'Abito'})}> Abito</button>
                        <button onClick={() => setCategoria({...categoria, tipo:'Giacca'})}>Giacca</button>
                        <button onClick= {() => setCategoria({...categoria, tipo:'Calzature'})}> Calzature</button>
                        <button onClick= {() => setCategoria({...categoria, tipo:'Accessori'})}> Accessori</button>
                    </div>
                )}
            </div>
        <div className="upload-foto-container">
            <div>
                <input type = "file" onChange={(e) => handleFotoChange(e.target.files[0])}/>
                {errore && <p>{errore}</p>}
            </div>
        </div>
        <div className ="container-brand">
        <input
            type="text"
            value ={brand}
            onChange ={ (e) => setBrand(e.target.value)}
            placeholder="Es. Zara, Nike..."
            />
        </div>
        <div className="container-stato">
            <button onClick={() => setStato('Nuovo')}>Nuovo</button>
            <button onClick={() => setStato('Buono')}>Buono</button>
            <button onClick={() => setStato('Usato')}>Usato</button>
            
        </div>
        <button onClick =  {handleSubmit}>Invia</button>
        
        </>
        
    )
}

export default ArticleForm;