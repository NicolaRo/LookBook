/* ENTRY POINT REACT

Responsabilità:
-montare App.jsx nel DOM
-Collegare Redux store tramite Provider

Relazioni:
-Importa store ./app/store.js
-Importa App.jsx come componente principale
 */

//Import componenti
import React from 'react'; //Necessario perchè JSX viene trasformato in React.createElement
import ReactDOM from 'react-dom/client'; //Accede al DOM e monta l'app in un nodo specifico
import {Provider} from 'react-redux'; //Provider serve ad "iniettare" lo store Redux in tutta l'app
import 'normalize.css';

//Import files:
import App from './App.jsx';
import './style/main.scss';
import store from './app/store.js';

//Monto root dentro a l'app React per farlo apparire nel browser
ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
