import { Service } from "@/interfaces/service.interface";
import { BiSupport } from "react-icons/bi";
import { FaGlobe, FaPlugCircleCheck } from "react-icons/fa6";
import { IoLayers, IoSettings } from "react-icons/io5";
import { MdOutlinePhonelink } from "react-icons/md";

export const services: Service[] = [
  {
    Icon: FaGlobe,
    title: "Web Development",
    description:
      "Interfaces modernas, ultra rápidas y optimizadas para SEO utilizando tecnologías de vanguardia.",
    titleCode: "SERVICE_WEB_DEVELOPMENT",
    descriptionCode: "SERVICE_WEB_DEVELOPMENT_DESCRIPTION",
  },
  {
    Icon: IoLayers,
    title: "Full Stack Apps",
    description:
      "Aplicaciones complejas de extremo a extremo, escalables y seguras para cualquier sector.",
    titleCode: "SERVICE_FULL_STACK_APPS",
    descriptionCode: "SERVICE_FULL_STACK_APPS_DESCRIPTION",
  },
  {
    Icon: FaPlugCircleCheck,
    title: "API Integration",
    description:
      "Diseño y consumo de servicios RESTful y GraphQL con foco en eficiencia y seguridad.",
    titleCode: "SERVICE_API_INTEGRATION",
    descriptionCode: "SERVICE_API_INTEGRATION_DESCRIPTION",
  },
  {
    Icon: IoSettings,
    title: "Maintenance",
    description:
      "Soporte continuo, actualizaciones y monitoreo proactivo para garantizar estabilidad.",
    titleCode: "SERVICE_MAINTENANCE",
    descriptionCode: "SERVICE_MAINTENANCE_DESCRIPTION",
  },
  {
    Icon: MdOutlinePhonelink,
    title: "Design UI/UX",
    description:
      "Diseño de interfaces atractivas y experiencias de usuario intuitivas para maximizar la satisfacción del cliente.",
    titleCode: "SERVICE_DESINGN_UI_UX",
    descriptionCode: "SERVICE_DESINGN_UI_UX_DESCRIPTION",
  },
  {
    Icon: BiSupport,
    title: "Consultoria tecnológica",
    description:
      "Soluciones integrales para elevar tu presencia digital y optimizar tus procesos tecnológicos.",
    titleCode: "SERVICE_TECHNOLOGY_CONSULTING",
    descriptionCode: "SERVICE_TECHNOLOGY_CONSULTING_DESCRIPTION",
  },
];
