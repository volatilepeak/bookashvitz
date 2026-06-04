import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/data'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt || `Read "${post.title}" on the BookAShvitz blog.`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/blog" className="hover:text-stone-700">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800 line-clamp-1">{post.title}</span>
        </nav>

        {post.cover_image && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 mb-8">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        )}

        <p className="text-sm text-stone-500 mb-2">
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {post.author && ` · ${post.author}`}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{post.title}</h1>

        <div
          className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-a:text-stone-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="border-t mt-12 pt-8 text-center">
          <h2 className="font-display text-xl font-semibold mb-3">Ready to book?</h2>
          <p className="text-stone-600 mb-4">Get free quotes from local sauna and cold plunge vendors.</p>
          <Link href="/get-quotes" className="btn-primary">Get Free Quotes</Link>
        </div>
      </div>
    </div>
  )
}
