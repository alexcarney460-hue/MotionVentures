import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, H1, Lead, Section } from "@/components/ui";
import { getAllPosts } from "@/lib/blog-posts";

export const metadata = {
  title: "Blog",
  description:
    "Tips on web design, AI automation, and growing your local business in Fresno and the Central Valley.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SiteHeader />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Blog</H1>
            <div className="mt-5">
              <Lead>
                Practical advice on websites, AI automation, and digital growth
                for Fresno and Central Valley businesses.
              </Lead>
            </div>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[var(--mv-primary)]/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3 text-xs text-white/45">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-white/90 group-hover:text-white">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
