import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // LinkedIn
      { protocol: "https", hostname: "media.licdn.com" },

      // Facebook / Meta
      { protocol: "https", hostname: "scontent.xx.fbcdn.net" },
      { protocol: "https", hostname: "graph.facebook.com" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com" },

      // Instagram (Meta)
      { protocol: "https", hostname: "instagram.com" },
      { protocol: "https", hostname: "cdninstagram.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },

      // Google
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },

      // GitHub
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },

      // Pinterest
      { protocol: "https", hostname: "i.pinimg.com" },

      // Twitter / X
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },

      // Discord
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "media.discordapp.net" },

      // Reddit
      { protocol: "https", hostname: "preview.redd.it" },
      { protocol: "https", hostname: "i.redd.it" },

      // Gravatar
      { protocol: "https", hostname: "secure.gravatar.com" },

      // Unsplash / Pexels
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
