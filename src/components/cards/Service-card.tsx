import { Service } from "@/interfaces/service.interface";
import { memo } from "react";

type ServiceCardProps = {
  service: Service;
  t: (key: string) => string;
};

const ServiceCard = memo(function ServiceCard({
  service,
  t,
}: ServiceCardProps) {
  const { Icon, title, description, titleCode, descriptionCode } = service;

  return (
    <div className="group p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] text-left">
      {/* ICON */}
      <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700 dark:text-blue-600 mb-6 transition group-hover:bg-blue-600/20">
        <Icon className="w-8 h-8" />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-4">{t(titleCode) || title}</h3>

      {/* DESCRIPTION */}
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
        {t(descriptionCode) || description}
      </p>
    </div>
  );
});

export default ServiceCard;
