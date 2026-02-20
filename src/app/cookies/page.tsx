export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-6 text-slate-300 space-y-10">
      <h1 className="text-4xl font-bold text-white">Política de Cookies</h1>

      <section className="space-y-4">
        <p>
          Este sitio web utiliza cookies propias y de terceros para mejorar la
          experiencia del usuario y analizar el tráfico.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Cookies propias</h2>
        <p>Se utilizan cookies técnicas para guardar:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Preferencia de idioma</li>
          <li>Modo claro/oscuro</li>
        </ul>
        <p>
          Estas cookies son necesarias para el funcionamiento correcto del
          sitio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          2. Cookies de terceros
        </h2>
        <p>
          Este sitio utiliza Google Analytics, un servicio de Google LLC, que
          instala cookies para recopilar información anónima sobre el uso del
          sitio (número de visitas, páginas vistas, ubicación aproximada).
        </p>
        <p>
          Puedes consultar más información en la política de privacidad de
          Google.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          3. Desactivación de cookies
        </h2>
        <p>
          El usuario puede configurar su navegador para bloquear o eliminar
          cookies en cualquier momento.
        </p>
      </section>
    </main>
  );
}
