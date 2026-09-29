import React from "react";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

interface UrbaniaBreadcrumbProps {
  city?: string;
}

export default function UrbaniaBreadcrumb({
  city = "Noida",
}: UrbaniaBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-slate-100 bg-white px-4 py-3 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <ol className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] font-medium text-slate-500 sm:text-xs">
          {/* Home */}
          <li className="shrink-0">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-1.5
                transition
                hover:text-primary
              "
            >
              <FaHome className="text-[10px]" />
              Home
            </Link>
          </li>

          <li className="shrink-0 text-slate-300">
            <FaChevronRight className="text-[8px]" />
          </li>

          {/* Current Page */}
          <li
            aria-current="page"
            className="truncate font-bold text-slate-800"
          >
            Urbania Traveller
          </li>
        </ol>
      </div>
    </nav>
  );
}