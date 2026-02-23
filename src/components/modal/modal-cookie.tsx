import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useLanguage } from "@/provider/language.provider";

export default function ModalCookie() {
  const { t_cookie } = useAppTranslations();
  const [language] = useLanguage();
  return (
    <main className="max-w-4xl mx-auto py-6 px-6  space-y-10">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        {t_cookie("COOKIE_TITLE")}
      </h1>

      <section className="space-y-4">
        <p>{t_cookie("COOKIE_DESCRIPTION")} </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_cookie("COOKIE_ONE_ITEM")}
        </h2>
        <p>{t_cookie("COOKIE_ONE_ITEM_DESCRIPTION")}</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>{t_cookie("COOKIE_ONE_ITEM_LANGUAGE_PREFERENCE")}</li>
          <li>{t_cookie("COOKIE_ONE_ITEM_THEME_PREFERENCE")}</li>
        </ul>
        <p>{t_cookie("COOKIE_ONE_ITEM_DESCRIPTION_2")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_cookie("COOKIE_TWO_ITEM")}
        </h2>
        <p>{t_cookie("COOKIE_TWO_ITEM_DESCRIPTION")} </p>
        <p>
          <a
            className="text-blue-600 dark:text-blue-500 hover:text.blue-700 hover:dark:text-blue-600"
            href={`https://policies.google.com/technologies/cookies?hl=${language || "en"}`}
            target="_blank"
            rel="noreferrer"
          >
            {t_cookie("COOKIE_TWO_ITEM_GOOGLE_ANALYTICS")}
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {t_cookie("COOKIE_THREE_ITEM")}
        </h2>
        <p>{t_cookie("COOKIE_THREE_ITEM_DESCRIPTION")} </p>
      </section>
    </main>
  );
}
