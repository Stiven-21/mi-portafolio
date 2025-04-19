import { getLanguageLocal } from "@/services/language";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLanguageLocal();

  return {
    locale,
    messages: (await import(`../messages/${locale}/${locale}.json`)).default,
  };
});
