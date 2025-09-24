"use client";

import { useState, FormEvent } from "react";
import * as Label from "@radix-ui/react-label";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Separator from "@radix-ui/react-separator";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import GoogleIcon from "@/public/Logo_google_g_icon.svg";
import { createUserSignUp} from "@/services/auth-service";
import { Card } from "@radix-ui/themes";
import Link from "next/link";


type SignUpForm = {
  email: string;
  name: string;
  password: string;
  code: string;
  accept: boolean;
};

export function SignUp() {
  const [form, setForm] = useState<SignUpForm>({ name:"",email: "", password: "",code:"", accept: false });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validación mínima en cliente
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMsg("Ingresá un correo válido.");
      return;
    }
    if (!form.password || form.password.length < 8) {
      setErrorMsg("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!form.accept) {
      setErrorMsg("Debes aceptar los Términos y la Política de Privacidad.");
      return;
    }

    try {
      setLoading(true);
      // Ajustá la URL/acción a tu backend o Server Action

      const res = await createUserSignUp({
      email: form.email,
      name: form.name,
      password: form.password,
      code: form.code,
      });
      // alert("Respuesta"+JSON.stringify(res))
      
      // if (!res.ok) {
      //   const data = await res.json().catch(() => ({}));
      //   throw new Error(data?.message || "No se pudo crear la cuenta.");
      // }

      setSuccessMsg("Cuenta creada. Te estamos iniciando sesión...");
      // Opcional: iniciar sesión automáticamente con credenciales si está configurado
      // Ajusta provider/flow según tu NextAuth
      // await signIn("credentials", {
      //   email: form.email,
      //   password: form.password,
      //   redirect: true,
      //   callbackUrl: "/",
      // });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message || "Ocurrió un error inesperado.");
      } else {
        setErrorMsg("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid w-full grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:px-8">
      {/* Columna izquierda (copy) */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Creá tu cuenta
        </h1>
        <p className="mt-3 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
          Empezá tu prueba gratuita y explorá todas las funciones. Sin tarjeta de crédito.

<br />
          {/* <label htmlFor="">Cliente id {process.env.GOOGLE_CLIENT_ID}</label> */}
          {/* <br /> */}
          {/* <label htmlFor="">Cliente id {process.env.NEXT_PUBLIC_API_URL}</label> */}
          {/* <label htmlFor="">Cliente id {process.env.}</label> */}
        </p>

        {/* Opcional: credenciales demo */}
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <p className="font-medium">Demo rápida</p>
          <p className="mt-1">
            Email: <span className="font-semibold">admin@sime.com</span> · Pass:{" "}
            <span className="font-semibold">admin123</span>
          </p>
        </div>
      </div>

      {/* Columna derecha (card de signup) */}
      <Card className="w-full">
        <div className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            Crear una cuenta
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Completá tus datos o continuá con Google.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                  {/* name */}
            <div className="space-y-2">
              <Label.Root htmlFor="user-name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Nombre
              </Label.Root>
              <input
                id="user-name"
                name="user-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-sky-950"
                placeholder="tu nombre"
                aria-invalid={!!errorMsg && !form.name ? "true" : "false"}
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label.Root htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Correo electrónico
              </Label.Root>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-sky-950"
                placeholder="tu@email.com"
                aria-invalid={!!errorMsg && !form.email ? "true" : "false"}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label.Root htmlFor="password" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Contraseña
              </Label.Root>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-sky-950"
                placeholder="Mínimo 8 caracteres"
                aria-invalid={!!errorMsg && form.password.length < 8 ? "true" : "false"}
              />
              <p className="text-xs text-zinc-500">Usá al menos 8 caracteres.</p>
            </div>
            {/* code subscription */}
                 <div className="space-y-2">
              <Label.Root htmlFor="code" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Codigo de suscripción
              </Label.Root>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="text"
                value={form.code}
                onChange={(e) => setForm((s) => ({ ...s, code: e.target.value }))}
                className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-sky-950"
                placeholder="tu codigo"
                aria-invalid={!!errorMsg && !form.code ? "true" : "false"}
              />
            </div>

            {/* Aceptación términos */}
            <div className="flex items-start gap-3">
              <Checkbox.Root
                id="accept"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border border-zinc-300 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:border-zinc-700"
                checked={form.accept}
                onCheckedChange={(v) => setForm((s) => ({ ...s, accept: Boolean(v) }))}
                aria-describedby="terms-help"
              >
                <Checkbox.Indicator className="flex items-center justify-center text-white">
                  {/* simple check "✓" sin librerías adicionales */}
                  <span className="text-[11px] leading-none">✓</span>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Label.Root
                htmlFor="accept"
                className="cursor-pointer text-sm text-zinc-700 dark:text-zinc-300"
              >
                Acepto los{" "}
                <Link href="/terms" className="text-sky-700 underline hover:no-underline dark:text-sky-400">
                  Términos y la  Política de Privacidad
                </Link>{" "}
  
                .
              </Label.Root>
            </div>
            <p id="terms-help" className="sr-only">
              Debes aceptar los términos para continuar.
            </p>

            {/* Mensajes de error/éxito */}
            {errorMsg && (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300"
              >
                {errorMsg}
                {errorMsg.includes("correo") }
              </div>
            )}
            {successMsg && (
              <div
                role="status"
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                {successMsg}
              </div>
            )}

            {/* Botón principal */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-sky-950"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            {/* Separador */}
            <div className="flex items-center gap-3">
              <Separator.Root className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-xs text-zinc-500">o</span>
              <Separator.Root className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Social Google */}
            {/* <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus:ring-sky-950"
            >
              <Image src={GoogleIcon} alt="Google" width={18} height={18} />
              Continuar con Google
            </button> */}
          </form>

          {/* Meta: link a login si ya tiene cuenta */}
          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            ¿Ya tenés cuenta?{" "}
          
          <Link href={'#sigIn'} className="font-medium text-sky-700 hover:underline dark:text-sky-400"> 
          
           Iniciá sesión</Link>
            {/* <a href="#sigIn" > */}
             
            {/* </a> */}
          </p>
        </div>
      </Card>
    </section>
  );
}