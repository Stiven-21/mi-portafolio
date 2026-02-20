export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 px-6 space-y-10">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        Política de Privacidad
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          1. Responsable
        </h2>
        <p>
          El responsable del tratamiento de los datos es [TU NOMBRE O MARCA],
          con correo de contacto: contacto@tudominio.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          2. Datos recopilados
        </h2>
        <p>
          A través del formulario de contacto se recopilan los siguientes datos:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Nombre</li>
          <li>Correo electrónico</li>
          <li>Mensaje enviado</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          3. Finalidad del tratamiento
        </h2>
        <p>
          Los datos se utilizan exclusivamente para responder a las consultas
          realizadas por los usuarios.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          4. Analítica web
        </h2>
        <p>
          Este sitio utiliza Google Analytics, un servicio de analítica web
          proporcionado por Google LLC, que permite analizar el uso del sitio
          web y obtener estadísticas sobre visitas, ubicación aproximada y
          comportamiento de navegación.
        </p>
        <p>Google puede utilizar cookies para recopilar esta información.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          5. Conservación de datos
        </h2>
        <p>
          Los datos enviados mediante el formulario se conservarán únicamente el
          tiempo necesario para gestionar la consulta.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          6. Derechos del usuario
        </h2>
        <p>
          El usuario puede solicitar el acceso, rectificación o eliminación de
          sus datos enviando un correo a contacto@tudominio.com
        </p>
      </section>
    </main>
  );
}
