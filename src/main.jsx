// src\main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import "./index.css";

// Mount the main React tree
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
      <Header />
      <main>
        <App />
      </main>
      <Footer />
    </AuthProvider>
  </StrictMode>
);
