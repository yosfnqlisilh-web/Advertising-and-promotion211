import { posts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@/components/icons';

export default function PostPage() {
  const slug = 'cladding-comparison-saudi-usa-chinese';
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = posts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div className="bg-gray-900 text-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center">
        <Image 
          src={post.image} 
          alt={post.title} 
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        <div className="relative z-20 container px-4">
          <h1 className="text-4xl md:text-6xl font-black animated-gradient-text leading-tight max-w-4xl mx-auto">{post.title}</h1>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-colors">
            <ArrowRightIcon className="w-5 h-5 rotate-180" />
            <span>العودة إلى كل المقالات</span>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <div className="container px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

       {/* Other Posts Section */}
      <div className="bg-gray-800/50 py-24">
        <div className="container px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 animated-gradient-text">مقالات أخرى قد تهمك</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {otherPosts.map(p => (
                    <Link href={`/blog/${p.slug}`} key={p.slug} className="block bg-gray-800 rounded-3xl overflow-hidden group border border-white/10 hover:border-yellow-500/50 transition-all transform hover:-translate-y-2 duration-300">
                        <div className="relative h-60">
                            <Image src={p.image} alt={p.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8 text-right">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">{p.title}</h3>
                            <span className="flex items-center gap-3 font-semibold text-yellow-500">اقرأ المزيد <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
