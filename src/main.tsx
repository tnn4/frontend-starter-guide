/**
 * import React */ 
import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * import App component from App.tsx so we can render in the DOM */ 
import App from './App.tsx';
/**
 *  import css styling */
import './style.css';

/** 
 * Create a `root` object by invoking `ReactDOM.createRoot`  with an element from our `index.html`.
 * Invoke the `render` method which is attached to `root` object
 */

// HTMLElement  -> Element
// see: https://stackoverflow.com/questions/56016696/argument-of-type-htmlelement-is-not-assignable-to-parameter-of-type-canvasima
ReactDOM.createRoot(document.getElementById('root') as Element ).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)