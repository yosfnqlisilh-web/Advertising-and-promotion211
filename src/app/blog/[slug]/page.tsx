
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '../../../lib/blog-data';
import AnimatedSection from '../../../components/AnimatedSection';
import Link from 'next/link';

// This function tells Next.js which routes to pre-render
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-900 text-gray-200">
      <div className="relative h-96 sm:h-[500px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <AnimatedSection id="post-header">
                    <p className="text-lg text-yellow-400 mb-2">{post.date}</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        {post.title}
                    </h1>
                </AnimatedSection>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
            <AnimatedSection id="post-content">
                 <div
                    className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:text-white prose-a:text-yellow-400 prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                 />
             </AnimatedSection>

             <AnimatedSection id="back-to-blog" className="mt-20">
                <div className="text-center">
                    <Link href="/blog" className="inline-flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">
                        العودة إلى المدونة
                    </Link>
                </div>
             </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
