"use client";

import { useState } from "react";
import { loginWithGoogle } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return; // 🔹 blokada wielokrotnego kliknięcia
    setLoading(true);

    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/cancelled-popup-request") {
        console.warn("Popup anulowany lub blokowany, spróbuj ponownie.");
      } else {
        console.error("Błąd logowania:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Zaloguj się</h2>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-72 mx-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6 object-contain"
          />
          <span className="font-medium">{loading ? "Ładowanie..." : "Zaloguj się przez Google"}</span>
        </button>
      </div>
    </div>
  );
}
