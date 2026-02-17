import { getLanguage } from "@/lib/server/language";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLanguage();

  return {
    locale,
    messages: (await import(`./messages/${locale}/${locale}.json`)).default,
  };
});
