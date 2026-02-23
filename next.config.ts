import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: [
      // LinkedIn
      "media.licdn.com",

      // Facebook / Meta
      "scontent.xx.fbcdn.net",
      "graph.facebook.com",
      "platform-lookaside.fbsbx.com",

      // Instagram (Meta)
      "instagram.com",
      "cdninstagram.com",
      "scontent.cdninstagram.com",

      // Google Drive / Google User Content
      "lh3.googleusercontent.com",
      "drive.google.com",

      // GitHub
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",

      // Pinterest
      "i.pinimg.com",

      // Twitter / X
      "pbs.twimg.com",
      "abs.twimg.com",

      // Discord
      "cdn.discordapp.com",
      "media.discordapp.net",

      // Reddit
      "preview.redd.it",
      "i.redd.it",

      // Gravatar
      "secure.gravatar.com",

      // Unsplash / Pexels (muy comunes)
      "images.unsplash.com",
      "images.pexels.com",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
