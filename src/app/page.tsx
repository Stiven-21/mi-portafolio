import {
  ContactFormSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
} from "@/components/sections";
import ProfessionalSection from "@/components/sections/ProfessionalSection";

export default function Home() {
  return (
    <>
      <section
        id="home"
        className="mb-6"
      >
        <HeroSection />
      </section>

      <section
        id="about"
        className="overflow-hidden mb-6"
      >
        <ProfessionalSection />
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
