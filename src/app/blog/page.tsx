import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, guides, and insights about mobile sauna rentals, cold plunge experiences, contrast therapy, and planning wellness events.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
        <p className="text-stone-600 text-lg mb-10">
          Guides, tips, and inspiration for planning your next sauna or cold plunge event.
        </p>

        {posts.length === 0 ? (
          <div className="card p-12 text-center">
            <h2 className="font-display text-xl font-semibold mb-2">Coming soon</h2>
            <p className="text-stone-500">We&apos;re working on our first posts. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card hover:border-stone-300 transition-colors block overflow-hidden">
                <div className="sm:flex">
                  {post.cover_image && (
                    <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-stone-100">
                      <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 256px" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-stone-500 mb-2">
                      {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 className="font-display text-xl font-semibold mb-2">{post.title}</h2>
                    {post.excerpt && <p className="text-stone-600 line-clamp-2">{post.excerpt}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
