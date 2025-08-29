import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
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
