"use client";

import { Toaster } from "react-hot-toast";

export function ToasterConfig() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          fontSize: "14px",
          padding: "12px 16px",
        },
        success: {
          style: {
            background: "#276EF1",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#276EF1",
          },
        },
        error: {
          style: {
            background: "#E74C3C",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#E74C3C",
          },
        },
      }}
    />
  );
}
