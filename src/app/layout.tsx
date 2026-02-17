import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import ThemeProvider from "@/provider/theme.provider";
import LanguageProvider from "@/provider/language.provider";
import { getTheme } from "@/lib/server/theme";
import { Language } from "@/lib/server/language";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const theme = await getTheme();

  const script = `
    (function() {
      const theme = "${theme}";
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
    })();
  `;
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-950 dark:text-white from-slate-50 to-slate-100 0 bg-radial dark:from-slate-900 from-20% dark:to-slate-950 transition-colors flex flex-col min-h-screen overflow-auto `}
      >
        <ThemeProvider initialTheme={theme}>
          <LanguageProvider initialLanguage={locale as Language}>
            <NextIntlClientProvider>
              <main className="grow">
                <Navbar />
                {children}
              </main>
              <Footer />
            </NextIntlClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
