import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, Section } from "@/components/ui";
import { getPostBySlug, getAllPosts } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mb-4 mt-10 text-xl font-bold text-white/90"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="mb-3 mt-8 text-lg font-semibold text-white/85"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- **")) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-white/70 leading-relaxed">
          <span
            dangerouslySetInnerHTML={{
              __html: line
                .slice(2)
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90">$1</strong>'),
            }}
          />
        </li>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-white/70 leading-relaxed">
          {line.slice(2)}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={i} className="ml-4 list-decimal text-white/70 leading-relaxed">
          {line.replace(/^\d+\.\s/, "")}
        </li>
      );
    } else if (line.startsWith("---")) {
      elements.push(
        <hr key={i} className="my-8 border-white/10" />
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      elements.push(
        <p
          key={i}
          className="mb-4 text-white/70 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90">$1</strong>')
              .replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" class="text-[var(--mv-primary)] hover:underline">$1</a>'
              ),
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/45 transition hover:text-white/70"
            >
              <span>&larr;</span> Back to blog
            </Link>

            <div className="flex items-center gap-3 text-xs text-white/45">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>{post.readTime} read</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-white/95 sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-white/60">
              {post.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <article className="mt-10">{renderMarkdown(post.content)}</article>

            <div className="mt-12 rounded-2xl border border-[var(--mv-primary)]/20 bg-[var(--mv-primary)]/5 p-6 text-center">
              <h3 className="text-lg font-semibold text-white/90">
                Ready to upgrade your online presence?
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Get a free assessment of your website and see where you stand.
              </p>
              <Link
                href="/assessment"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]"
              >
                Free AI Assessment
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
