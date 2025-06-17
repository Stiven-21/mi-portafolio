export interface Experience {
  id: number;
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    id: 2,
    company: "FUNDACIÓN PARA EL DESARROLLO SOCIAL (FUPADESO)",
    location: "Mocoa, Colombia",
    role: "Técnico administrativo",
    startDate: "2023-02",
    endDate: null,
    description: [
      "Efectuar los podidos, compras de suministros para la ejecución del Programa de alimentación escolar - PAE en el departamento del Putumayo.",
      "Realizar remisión de entrega de víveres para cada institución educativa en los formatos establecidos por el MEN de acuerdo con los cupos asignados para cada una. De dichos formatos se debe remitir copia para que repose en los comedores escolares.",
      "Realizar las actividades necesarias para reposición de los faltantes de alimentos o las devoluciones de los mismos que no cumplan con las características establecidas en las fichas técnicas.",
      "Apoyar en el seguimiento de los proveedores de grano para su facturación y consolidado general mensual.",
      "Participar y apoyar a FUNDACION PARA EL DESARROLLO SOCIAL - FUPADESO en todas las reuniones a las que éste lo convoque relacionadas con la ejecución del contrato.",
      "Apoyar en las actividades administrativas en la ejecución del contrato.",
      "Apoyar en la gestión documental de los informes y demás información en la ejecución del contrato.",
      "Las demás que se deriven que sean propias de! cumplimiento del objeto del contrato.",
    ],
  },
  {
    id: 1,
    company: "DISPROEL",
    location: "Mocoa, Colombia",
    role: "Soporte técnico",
    startDate: "2021-11",
    endDate: "2022-6",
    description: [
      "Despliegue, instalación, actualización, administración y control de las aplicaciones necesarias para realizar los Escrutinios en los 13 municipios del departamento del Putumayo según la asignación a cada funcionario.",
      "Soporte, montaje, administración y configuración de los canales de Internet, servicios y configuraciones necesarias para la comunicación con la Registraduría Nacional del Estado Civil para el desarrollo del proceso de escrutinios a nivel departamental.",
      "Logística de Instalación de equipos tecnológicos en los sitios asignados para el proceso de escrutinios en cada uno de los municipios asignados ",
      "Soporte técnico de primer nivel a los equipos de cómputo, impresoras, escáneres, lectores biométricos, equipos de telecomunicaciones y sistemas de proyección para el proceso de escrutinios según municipio asignado",
      "Realización de informes, evidencias y entregables solicitados por la Registraduría Nacional del Estado Civil.",
    ],
  },
];
