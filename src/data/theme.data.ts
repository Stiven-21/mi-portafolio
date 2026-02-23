import { MdLightMode, MdDarkMode } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { Theme } from "@/interfaces/theme.interface";

export const themeOptions: Theme[] = [
  {
    value: "light",
    icon: MdLightMode,
  },
  {
    value: "dark",
    icon: MdDarkMode,
  },
  {
    value: "system",
    icon: GrPersonalComputer,
  },
];
