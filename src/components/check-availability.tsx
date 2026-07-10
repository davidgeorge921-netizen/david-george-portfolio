import Link from "next/link";

// The site's single primary action. Styled to match the existing pill buttons
// (project "Open" link, About skills), so it reads as part of the original design.
export function CheckAvailability({
  href = "/#inquire",
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-wideTesla transition duration-300 hover:bg-white hover:text-black light:border-black/25 light:hover:bg-black light:hover:text-white ${className}`}
    >
      Check Availability
    </Link>
  );
}
