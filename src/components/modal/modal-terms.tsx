import { useAppTranslations } from "@/hooks/translations/useAppTranslations";

export default function ModalTerms() {
  const { t_terms } = useAppTranslations();
  return (
    <main className="max-w-4xl mx-auto py-6 px-6 space-y-10">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        {t_terms("TERMS_TITLE")}
      </h1>

      <section className="space-y-4">
        <p>{t_terms("TERMS_DESCRIPTION")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_terms("TERMS_ONE_ITEM")}
        </h2>
        <p>{t_terms("TERMS_ONE_ITEM_DESCRIPTION")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_terms("TERMS_TWO_ITEM")}
        </h2>
        <p>{t_terms("TERMS_TWO_ITEM_DESCRIPTION")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_terms("TERMS_THREE_ITEM")}
        </h2>
        <p>{t_terms("TERMS_THREE_ITEM_DESCRIPTION")}</p>
      </section>
    </main>
  );
}
