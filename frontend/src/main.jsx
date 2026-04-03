/* ENTRY POINT REACT

Responsabilità:
-montare App.jsx nel DOM
-Collegare Redux store tramite Provider

Relazioni:
-Importa store ./app/store.js
-Importa App.jsx come componente principale
 */

import React from 'react'; //Necessario perchè JSX viene trasformato in React.createElement
import { StrictMode } from 'react' //Wrapper che aiuta a rilevate problemi in fase di sviluppo
import ReactDOM from 'react-dom/client'; //Accede al DOM e monta l'app in un nodo specifico
import {Provider} from 'react-redux'; //Provider serve ad "iniettare" lo store Redux in tutta l'app
import './index.css';
import App from './App.jsx';





import store from './app/store.js';

//Intuisco che questo serva ad includere provider store={store} nella gestione del DOM? Mi spieghi questo passaggio per favore?
ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.strictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.strictMode>
);
