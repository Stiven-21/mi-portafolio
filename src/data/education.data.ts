export interface Education {
  id: number;
  institution: string;
  degree: string;
  type:
    | "Educación Media"
    | "Pregrado"
    | "Postgrado"
    | "Curso"
    | "Certificación"
    | "Diplomado";
  startDate: string;
  endDate: string | null;
  description?: string;
}

export const educationData: Education[] = [
  {
    id: 5,
    institution: "Servicio Nacional de Aprendizaje (SENA)",
    degree: "Tecnologo en animación 3D",
    type: "Pregrado",
    startDate: "2025",
    endDate: null,
  },
  {
    id: 4,
    institution: "Institución Universitaria del Putumayo",
    degree: "Ingeniería de sistemas",
    type: "Pregrado",
    startDate: "2021",
    endDate: "2022",
  },
  {
    id: 3,
    institution: "Instituto Tecnológico del Putumayo",
    degree: "Estructura y arquitectura de software",
    type: "Diplomado",
    startDate: "2020",
    endDate: "2020",
  },
  {
    id: 2,
    institution: "Instituto Tecnológico del Putumayo",
    degree: "Tecnologo en desarrollo de software",
    type: "Pregrado",
    startDate: "2018",
    endDate: "2021",
  },
  {
    id: 1,
    institution: "Institución edacativa Ciudad Mocoa",
    degree: "Bachillerato",
    type: "Educación Media",
    startDate: "2006",
    endDate: "2017",
    description: "Educación primaria, secundaria y media.",
  },
];
