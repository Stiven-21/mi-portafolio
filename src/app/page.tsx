import { Translations } from "@/common/Translations/translations";
import ContactFormSection from "@/components/sections/contactForm";
import EducationSection from "@/components/sections/educationSection";
import ExperienceSection from "@/components/sections/experienceSection";
import ProjectsSection from "@/components/sections/projectsSection";
import { SocialLinks } from "@/components/social/social-links";
import SkillsSection from "@/components/sections/SkillsSection";
import ScrollAnimator from "@/utils/ScrollAnimator";
import Image from "next/image";

export default function Home() {
  const { t_index } = Translations();
  return (
    <>
      <section
        id="about"
        className="pt-20 px-10 lg:px-20"
      >
        <ScrollAnimator
          direction="down"
          delay={0.2}
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-4 md:px-0">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center md:justify-start lg:justify-end lg:mr-10">
              <ScrollAnimator
                direction="right"
                delay={0.2}
              >
                <Image
                  src="/images/perfil.jpg"
                  alt="Personal Image"
                  width={150}
                  height={150}
                  className="rounded-full w-auto h-auto select-none shadow-md opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
              </ScrollAnimator>
            </div>

            <div className="md:w-3/4 flex flex-col">
              <ScrollAnimator
                direction="left"
                delay={0.2}
              >
                <h1 className="text-3xl font-bold mb-1">{t_index("title")}</h1>
                <p className="text-lg mb-3 italic text-gray-700">
                  {t_index("description")}
                </p>
              </ScrollAnimator>
              <SkillsSection />
              <SocialLinks />
            </div>
          </div>
        </ScrollAnimator>
      </section>

      <section
        id="projects"
        className="px-10 py-20 lg:px-20 overflow-hidden"
      >
        <ProjectsSection />
      </section>

      <main className="px-10 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="education">
          <EducationSection />
        </section>
      </main>

      <ContactFormSection />
    </>
  );
}
