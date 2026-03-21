import Link from "next/link";

const NAV_COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "CrowdTest", href: "/intelligence/crowdtest" },
      { label: "Think Tank", href: "/intelligence/thinktank" },
      { label: "Intelligence Suite", href: "/intelligence" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Premium Web", href: "/services" },
      { label: "Automation", href: "/services" },
      { label: "Venture Building", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Free Assessment", href: "/assessment" },
    ],
  },
];

export default function DarkFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="font-[var(--font-sora)] text-lg font-bold text-white">
              Motion Ventures
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#666]">
              AI venture studio building what&apos;s next.
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#555]">
                {col.title}
              </div>
              <nav className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="animated-underline inline-block text-sm text-[#888] transition-colors duration-200 hover:text-white w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-[#444] sm:flex-row">
          <div>&copy; {new Date().getFullYear()} Motion Ventures. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/contact" className="transition hover:text-[#888]">Contact</Link>
            <Link href="/blog" className="transition hover:text-[#888]">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
