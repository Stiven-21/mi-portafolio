import { useAppTranslations } from "@/hooks/translations/useAppTranslations";

export default function ModalPrivacy() {
  const { t_privacy } = useAppTranslations();
  const professionalEmail = process.env.NEXT_PUBLIC_PROFESSIONAL_EMAIL;
  return (
    <main className="max-w-4xl mx-auto py-6 px-6 space-y-10">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        {t_privacy("PRIVACY_TITLE")}
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_ONE_ITEM")}
        </h2>
        <p>
          {t_privacy("PRIVACY_ONE_ITEM_DESCRIPTION")} {professionalEmail || ""}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_TWO_ITEM")}
        </h2>
        <p>{t_privacy("PRIVACY_TWO_ITEM_DESCRIPTION")}</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>{t_privacy("PRIVACY_TWO_ITEM_NAME")}</li>
          <li>{t_privacy("PRIVACY_TWO_ITEM_EMAIL")}</li>
          <li>{t_privacy("PRIVACY_TWO_ITEM_MESSAGE")}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_THREE_ITEM")}
        </h2>
        <p>{t_privacy("PRIVACY_THREE_ITEM_DESCRIPTION")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_FOUR_ITEM")}
        </h2>
        <p>{t_privacy("PRIVACY_FOUR_ITEM_DESCRIPTION")}</p>
        <p>{t_privacy("PRIVACY_FOUR_ITEM_ANALYTICS")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_FIVE_ITEM")}
        </h2>
        <p>{t_privacy("PRIVACY_FIVE_ITEM_DESCRIPTION")} </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_privacy("PRIVACY_SIX_ITEM")}
        </h2>
        <p>
          {t_privacy("PRIVACY_SIX_ITEM_DESCRIPTION")} {professionalEmail || ""}
        </p>
      </section>
    </main>
  );
}
