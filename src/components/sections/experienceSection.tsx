"use client";
import React, { useState } from "react";
import { experienceData, Experience } from "@/data/experience.data";
import Modal from "@/components/ui/modal";
import ScrollAnimator from "@/utils/ScrollAnimator";
import AnimatedListItem from "@/components/ui/animatedListItem";
import { Translations } from "@/common/Translations/translations";

const MAX_VISIBLE_ITEMS = 3;

const ExperienceSection = () => {
  const { t_experience, t_common } = Translations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayItems = experienceData.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <>
      <div className="container relative mx-auto max-w-4xl h-full flex flex-col">
        <ScrollAnimator>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t_experience("title")}
          </h2>
        </ScrollAnimator>

        <div className={`space-y-8 mb-20`}>
          {displayItems.map((item, index) => (
            <ScrollAnimator
              key={item.id}
              delay={index * 0.1}
            >
              <AnimatedListItem>
                {" "}
                <ExperienceItem item={item} />
              </AnimatedListItem>
            </ScrollAnimator>
          ))}
        </div>

        <ScrollAnimator
          delay={0.4}
          className="text-center mt-10 absolute bottom-0 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900 font-semibold py-2 px-6 rounded transition duration-300"
          >
            {t_common("view_more")} ({experienceData.length})
          </button>
        </ScrollAnimator>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t_experience("all_experience")}
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 py-6 pr-3">
          {" "}
          {experienceData.map((item) => (
            <ExperienceItem
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

export default ExperienceSection;

const ExperienceItem = ({
  item,
  isModal = false,
}: {
  item: Experience;
  isModal?: boolean;
}) => (
  <div
    className={`p-4 md:p-5 rounded-lg shadow-lg ${
      isModal
        ? "bg-gray-100 dark:bg-gray-700"
        : "bg-white dark:bg-gray-900 border border-slate-300 dark:border-slate-800 scale-100"
    }`}
  >
    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
      {item.role}
    </h3>
    <p className="text-md font-medium text-gray-800 dark:text-gray-300 px-1 py-0.5 rounded mt-1 sm:mt-0 self-start sm:self-center">
      {item.company}{" "}
      <span className="text-sm text-gray-500 mb-1">- {item.location}</span>
    </p>
    <p className="text-sm text-gray-400 mb-2">
      {item.startDate} - {item.endDate ?? Translations().t_common("current")}
    </p>
    {isModal && (
      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-2">
        {item.description.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>
    )}
  </div>
);
