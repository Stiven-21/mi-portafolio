"use server";

import { Theme, saveTheme } from "@/lib/server/theme";

export async function setThemeAction(theme: Theme) {
  await saveTheme(theme);
}
