import { Icons } from "@/components/icons";

export const themeOptions: {
  value: "light" | "dark" | "system";
  icon: React.ReactNode;
}[] = [
  {
    value: "light",
    icon: <Icons.sun className="h-5 w-5" />,
  },
  {
    value: "dark",
    icon: <Icons.moon className="h-5 w-5" />,
  },
  {
    value: "system",
    icon: <Icons.laptop className="h-5 w-5" />,
  },
];
