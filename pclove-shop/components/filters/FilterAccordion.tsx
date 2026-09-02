"use client"

import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

function FilterAccordion({
    title,
    children,
    defaultOpen = true,
}: Props) {
    const [open, setOpen] = useState(defaultOpen);


  return (
    <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
        <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between py-2 font-semibold text-gray-900 transition hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
            {title}

            <ChevronDown 
                size={18}
                className={`transition-transform duration-300 ease-in-out ${open? "rotate-180" : ""}`}
            />
        </button>

              <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`max-h-56 overflow-y-auto pr-2 scrollbar-hide transition-all duration-500 ease-in-out ${
              open ? "mt-3 opacity-100" : "mt-0 opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterAccordion