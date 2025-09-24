/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as Label from "@radix-ui/react-label";
// import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import GoogleIcon from "@/public/Logo_google_g_icon.svg";
import { getUserSignIn } from "@/services/auth-service";

type SignInForm = {
  email: string;
  password: string;
};

type Notice = {
  type: "success" | "error" | "info";
  message: string;
};

export default function SignInForm() {
  const router = useRouter();

  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  // Auto–dismiss de toast
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const validate = () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      return "Ingresá un correo válido.";
    }
    if (!form.password || form.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setNotice(null);

    const v = validate();
    if (v) {
      setErrorMsg(v);
      setNotice({ type: "error", message: v });
      return;
    }

    try {
      setLoading(true);

      // Flujo NextAuth (credentials) con redirect manual para capturar errores
      // console.log("Iniciando sesión con:", JSON.stringify(form))
      // alert("Iniciando sesión con: " + JSON.stringify(form))
      // const result = await signIn("credentials", {
      //   email: form.email,
      //   password: form.password,
      //   redirect: false,
      // });
      
const result = await getUserSignIn(form)
      // const data = await response.json();
console.log('🔐 Tokens recibidos: FRONT', result);

      // const result = true

if (!result) {
  throw new Error("No se pudo procesar la solicitud.");
}
if (!result.success) {
  setErrorMsg(result.message || "Credenciales incorrectas.");
  setNotice({ type: "error", message: result.message || "Credenciales incorrectas." });
  return;
}

      setSuccessMsg("Has iniciado sesión correctamente. Redirigiendo…");
      setNotice({ type: "success", message: "Inicio de sesión exitoso." });

      // Redirección controlada (ajusta destino)
      router.push("/dashboard");
    } catch (err: unknown) {
      let msg = "Ocurrió un error inesperado.";
      if (err && typeof err === "object" && "message" in err && typeof (err as { message?: unknown }).message === "string") {
        msg = (err as { message: string }).message;
      }
      setErrorMsg(msg);
      setNotice({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setGoogleLoading(true);
      // Con redirect true no puedes capturar errores aquí; el proveedor redirige
      await signIn("google", { callbackUrl: "/dashboard" });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section
      className="relative w-80 rounded-lg bg-[#f5f5f5] p-8 shadow-md space-y-6"
      id="signIn"
      aria-labelledby="signin-title"
    >
      {/* Toast simple y accesible */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={[
            "pointer-events-none absolute -top-3 left-1/2 z-50 -translate-y-full -translate-x-1/2 rounded-md px-3 py-2 text-sm shadow-md",
            notice.type === "success" &&
              "bg-emerald-50 text-emerald-700 border border-emerald-200",
            notice.type === "error" &&
              "bg-red-50 text-red-700 border border-red-200",
            notice.type === "info" &&
              "bg-sky-50 text-sky-700 border border-sky-200",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {notice.message}
        </div>
      )}

      {/* Encabezado */}
      <header className="text-center space-y-2">
        <h2 id="signin-title" className="text-xl font-semibold text-gray-900">
          Welcome back
        </h2>
        <p className="text-gray-600 text-sm">
          Sign in to access your dashboard and manage your account.
        </p>
      </header>

      {/* Botón Google */}
      {/* <div className="rounded-lg bg-[#18a0fb] p-4 shadow-sm">
        <Button
          onClick={onGoogle}
          disabled={googleLoading}
          className="w-full bg-white text-gray-900 flex items-center justify-center gap-2 font-medium hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#18a0fb] disabled:opacity-70"
        >
          <Image src={GoogleIcon} alt="Google" width={20} height={20} />
          <span>{googleLoading ? "Redirigiendo…" : "Sign in with Google"}</span>
        </Button>
      </div> */}

      {/* Separador visual */}
      {/* <div className="flex items-center gap-3 text-gray-500 text-xs uppercase">
        <span className="flex-1 h-px bg-gray-300" />
        or
        <span className="flex-1 h-px bg-gray-300" />
      </div> */}

      {/* Formulario */}
      <form
        className="bg-white p-6 rounded-lg shadow-sm space-y-4"
        onSubmit={onSubmit}
        noValidate
      >
        {/* Email */}
        <div className="space-y-2">
          <Label.Root
            htmlFor="emailIn"
            className="text-sm font-medium text-zinc-800"
          >
            Correo electrónico
          </Label.Root>
          <Input
            id="emailIn"
            name="emailIn"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="tu@email.com"
            aria-invalid={!!errorMsg && !form.email ? "true" : "false"}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label.Root
            htmlFor="passwordIn"
            className="text-sm font-medium text-zinc-800"
          >
            Contraseña
          </Label.Root>
          <Input
            id="passwordIn"
            name="passwordIn"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
            placeholder="Mínimo 8 caracteres"
            aria-invalid={!!errorMsg && form.password.length < 8 ? "true" : "false"}
          />
          <p className="text-xs text-zinc-500">Usá al menos 8 caracteres.</p>
        </div>

        {/* Mensajes de error/éxito inline */}
        {errorMsg && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div
            role="status"
            className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {successMsg}
          </div>
        )}

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-[#18a0fb] focus:ring-[#18a0fb]"
            />
            Remember me
          </label>
          <a
            href="/forgot-password"
            className="text-[#18a0fb] hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#18a0fb] rounded-sm"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#18a0fb] hover:bg-[#1590eb] text-white font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#18a0fb] disabled:opacity-70"
        >
          {loading ? "Ingresando…" : "Sign In"}
        </Button>
      </form>
    </section>
  );
}