import { getCookieValue, setCookieValue } from "@/lib/server/cookies";

export const themes = ["light", "dark", "system"] as const;
export type Theme = (typeof themes)[number];

const COOKIE_THEME = "COOKIE_JAM_DEV_THEME";

export async function getTheme(): Promise<Theme> {
  return getCookieValue<Theme>({
    key: COOKIE_THEME,
    defaultValue: "system",
    allowedValues: themes,
  });
}

export async function saveTheme(theme: Theme): Promise<void> {
  return setCookieValue<Theme>({
    key: COOKIE_THEME,
    value: theme,
    allowedValues: themes,
  });
}
