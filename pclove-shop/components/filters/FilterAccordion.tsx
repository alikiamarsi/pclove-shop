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
    <div className="border-b pb-4">
        <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between py-2 font-semibold"
        >
            {title}

            <ChevronDown 
                size={18}
                className={`transition-transform ${open? "rotate-180" : ""}`}
            />
        </button>

        {open && (
            <div className="mt-3 max-h-56 overflow-y-auto pr-2">
                {children}
            </div>
        )}
    </div>
  )
}

export default FilterAccordion