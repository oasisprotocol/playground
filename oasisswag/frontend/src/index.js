import React from "react";
import {LandingPage} from "./pages";
import * as ReactDOMClient from 'react-dom/client';
import {Web3ContextProvider} from "./providers/Web3Provider";

import "./styles/fonts.css";
import "./styles/main.css";

const root = ReactDOMClient.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <LandingPage/>
    </Web3ContextProvider>
  </React.StrictMode>
)
