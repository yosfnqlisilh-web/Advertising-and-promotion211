import Link from 'next/link';

const articles = [
    {
        slug: 'how-to-choose-sign',
        title: 'كيف تختار اللوحة الإعلانية المناسبة لنشاطك التجاري في الرياض؟',
        excerpt: 'دليلك الشامل لفهم الفروقات بين أنواع لوحات المحلات، من الحروف البارزة إلى الزنكور، وكيف تضمن جذب انتباه عملائك ليلاً ونهارًا.'
    },
    {
        slug: 'why-cladding-is-best-for-riyadh',
        title: 'لماذا يعتبر الكلادينج الخيار الأفضل لواجهات المباني في جو الرياض الحار؟',
        excerpt: 'اكتشف كيف تساهم واجهات الكلادينج في عزل الحرارة، مقاومة الغبار، والحفاظ على مظهر مبناك التجاري عصريًا لسنوات طويلة مع ضمان يصل إلى 15 عامًا.'
    },
    {
        slug: 'riyadh-municipality-conditions',
        title: 'شروط بلدية الرياض الجديدة لتركيب اللوحات الإعلانية للمحلات',
        excerpt: 'قبل أن تدفع ريالاً واحدًا، تعرّف على أحدث معايير ومقاسات البلدية لتجنب المخالفات وضمان تركيب لوحة قانونية وجذابة لمشروعك.'
    }
];

const BlogIndexPage = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold animated-gradient-text">مدونة فن الإعلان</h1>
                    <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">مقالات من خبراء لمساعدتك على اتخاذ القرارات الصحيحة لنمو أعمالك في الرياض.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <Link href={`/blog/${article.slug}`} key={article.slug}>
                            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transform hover:-translate-y-2 transition-all duration-300 ease-in-out h-full flex flex-col">
                                <div className="p-8 flex-grow">
                                    <h2 className="text-2xl font-bold text-yellow-400 mb-4">{article.title}</h2>
                                    <p className="text-gray-300 leading-relaxed">{article.excerpt}</p>
                                </div>
                                <div className="p-8 pt-0">
                                     <span className="text-yellow-500 font-semibold hover:text-yellow-300 transition-colors duration-200">اقرأ المزيد ←</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogIndexPage;

// Trigger rebuild
