import Link from "next/link";
import { HeartIcon } from "./icons";

const links = [
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/donate", label: "Donate" }
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cloud/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-normal text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cloud">
            <HeartIcon className="h-4 w-4" />
          </span>
          KindBridge
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-ink/72 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/donate" className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cloud transition hover:bg-moss focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-cloud">
          Give now
        </Link>
      </nav>
    </header>
  );
}
