"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { socialLinks } from "@/data/social.data";
import ScrollAnimator from "@/utils/ScrollAnimator";

export const SocialLinks = () => {
  return (
    <ScrollAnimator
      direction="left"
      delay={0.2}
    >
      <div className="flex justify-center md:justify-start items-center gap-4 mt-2">
        {socialLinks.map((link, index) => (
          <Button
            asChild
            key={index}
            variant="light"
            className=" "
          >
            <Link
              href={link.url}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="w-6 h-6" />
            </Link>
          </Button>
        ))}
      </div>
    </ScrollAnimator>
  );
};
