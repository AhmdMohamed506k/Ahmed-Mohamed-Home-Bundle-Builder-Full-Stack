import React from 'react';

const AccordionItem = ({ title, icon, children, stepNumber, selectedCount, isOpen, onToggle }) => {
  return (
    <div>
      <span className="text-[10px] font-semibold text-[#6F7882] px-3 uppercase tracking-wider  transition-all duration-300">
        {stepNumber}
      </span>
      <div className="w-full border-y border-[#6F7882]">

        <div onClick={onToggle} className="px-3 py-4 flex items-center justify-between cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-black font-semibold text-[17px]">{title}</h2>
          </div>

          <div className="flex items-center gap-3">

            {selectedCount > 0 && (
              <span className="text-purple-600 font-bold text-sm ">
                {selectedCount} selected
              </span>
            )}

            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </div>


        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden bg-[#EDF4FF]">
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AccordionItem;