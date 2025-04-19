"use client";
import React, { useState } from "react";
import { educationData, Education } from "@/data/education.data";
import Modal from "@/components/ui/modal";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { Translations } from "@/common/Translations/translations";

const MAX_VISIBLE_ITEMS = 3;

const EducationSection = () => {
  const { t_education, t_common } = Translations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayItems = educationData.slice(0, MAX_VISIBLE_ITEMS);
  const showSeeMore = educationData.length > MAX_VISIBLE_ITEMS;

  return (
    <>
      <div className="container relative mx-auto max-w-4xl h-full flex flex-col">
        <ScrollAnimator>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t_education("title")}
          </h2>
        </ScrollAnimator>

        <div className={`space-y-8 ${showSeeMore ? "mb-20" : ""}`}>
          {displayItems.map((item, index) => (
            <ScrollAnimator
              key={item.id}
              delay={index * 0.1}
            >
              <EducationItem item={item} />
            </ScrollAnimator>
          ))}
        </div>

        {showSeeMore && (
          <ScrollAnimator
            delay={0.4}
            className="text-center mt-10 absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900 font-semibold py-2 px-6 rounded transition duration-300"
            >
              {t_common("view_more")} ({educationData.length})
            </button>
          </ScrollAnimator>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t_education("all_education")}
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 py-6 pr-3 custom-scrollbar">
          {educationData.map((item) => (
            <EducationItem
              key={item.id}
              item={item}
              isModal={true}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

interface EducationItemProps {
  item: Education;
  isModal?: boolean;
}

const EducationItem: React.FC<EducationItemProps> = ({
  item,
  isModal = false,
}) => (
  <div
    className={`p-4 md:p-5 rounded-lg shadow-lg ${
      isModal
        ? "bg-gray-100 dark:bg-gray-700"
        : "bg-white dark:bg-gray-900 border border-slate-300 dark:border-slate-800 scale-100"
    }`}
  >
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
      <h3 className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400">
        {item.degree}
      </h3>
      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded mt-1 sm:mt-0 self-start sm:self-center">
        {item.type}
      </span>
    </div>

    <p className="text-md px-1 font-medium text-gray-800 dark:text-gray-300 mb-1 mt-1 sm:mt-0 self-start sm:self-center">
      {item.institution}
    </p>

    <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
      {item.startDate} - {item.endDate ?? Translations().t_common("in_process")}
    </p>

    {isModal && item.description && (
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {item.description}
      </p>
    )}
  </div>
);

export default EducationSection;
