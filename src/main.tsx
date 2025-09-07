import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#4F46E5",
          colorPrimaryForeground: "#FFFFFF",
        },
      }}
      publishableKey={import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
