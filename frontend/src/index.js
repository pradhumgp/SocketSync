import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./context/ChatProvider.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </ChatProvider>
);
