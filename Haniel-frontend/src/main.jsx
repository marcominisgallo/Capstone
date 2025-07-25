import React from "react";
import ReactDOM from "react-dom/client"; // Importa il nuovo metodo createRoot
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
