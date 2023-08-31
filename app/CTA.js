import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-10 px-2 bg-purple-50">
      <p className="text-center text-2xl text-purple-900">
        Olvídate del estrés de hacer tu CV.<br/>
        Usa IA para crear un currículum que impresiona en segundos.<br/>
        Elige tu diseño, llena tus datos, ¡y a triunfar!
      </p>
      <p className="py-3 px-4 bg-purple-600 shadow-md shadow-orange-300 text-white font-semibold rounded hover:bg-purple-800 mt-5 text-2xl">
        <Link href="/templates">Crear CV</Link>
      </p>
    </div>
  );
}