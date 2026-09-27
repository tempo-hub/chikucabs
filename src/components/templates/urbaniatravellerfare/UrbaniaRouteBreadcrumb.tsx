import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

export default function UrbaniaRouteBreadcrumb({
  fromCity,
  toCity,
}: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className=" bg-white px-4 py-3 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] sm:text-xs">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 font-semibold text-slate-500 transition hover:text-primary"
        >
          <FaHome className="text-[10px]" />
          Home
        </Link>

        <FaChevronRight className="shrink-0 text-[8px] text-slate-300" />

        <Link
          href="/urbania"
          className="shrink-0 font-semibold text-slate-500 transition hover:text-primary"
        >
          Urbania Traveller
        </Link>

        <FaChevronRight className="shrink-0 text-[8px] text-slate-300" />

        <span className="shrink-0 font-bold text-slate-800">
          {fromCity} to {toCity}
        </span>
      </div>
    </nav>
  );
}