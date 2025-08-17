import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface WelcomeProps {
    featuredPosts?: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt?: string;
        featured_image?: string;
        reading_time: string;
        author: { name: string };
        category?: { name: string; color: string };
        published_at: string;
    }>;
    stats?: {
        postsCount: number;
        categoriesCount: number;
        authorsCount: number;
    };
    [key: string]: unknown;
}

export default function Welcome({ featuredPosts = [], stats }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to NewsHub - Modern Blog Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
                {/* Navigation */}
                <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
                            <span className="text-sm font-bold text-white">📰</span>
                        </div>
                        <span className="text-xl font-bold text-white">NewsHub</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('blog.index')}
                            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                        >
                            Browse Posts
                        </Link>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                📰 Modern Blog Platform
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Built for Publishers
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                                🚀 A powerful content management system with rich text editing, image uploads, 
                                and role-based permissions. Perfect for news sites, magazines, and blogs.
                            </p>
                            
                            {/* Feature highlights */}
                            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                                    <span>✍️ Rich Text Editor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
                                    <span>🖼️ Image Uploads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-purple-400"></span>
                                    <span>🏷️ Categories & Tags</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-pink-400"></span>
                                    <span>👥 Role-based Access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                                    <span>🌙 Dark Mode</span>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-6">
                                <Link
                                    href={route('blog.index')}
                                    className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-base font-semibold text-white hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                >
                                    🔍 Explore Articles
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg border border-white/20 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                                    >
                                        👤 Join as Writer
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                {stats && (
                    <div className="relative px-6 py-16 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">{stats.postsCount}+</div>
                                    <div className="text-sm text-gray-300">📝 Published Articles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">{stats.categoriesCount}+</div>
                                    <div className="text-sm text-gray-300">📂 Categories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">{stats.authorsCount}+</div>
                                    <div className="text-sm text-gray-300">✍️ Active Writers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Featured Articles Preview */}
                {featuredPosts.length > 0 && (
                    <div className="relative px-6 py-16 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <h2 className="text-2xl font-bold text-white text-center mb-12">
                                🌟 Featured Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredPosts.slice(0, 3).map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('blog.show', post.slug)}
                                        className="group block"
                                    >
                                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                                            {post.featured_image && (
                                                <div className="mb-4 aspect-video bg-gray-700 rounded-lg overflow-hidden">
                                                    <img
                                                        src={`/storage/${post.featured_image}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="mb-3 flex items-center gap-2">
                                                {post.category && (
                                                    <span
                                                        className="px-2 py-1 text-xs rounded-full text-white"
                                                        style={{ backgroundColor: post.category.color }}
                                                    >
                                                        {post.category.name}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-300">{post.reading_time}</span>
                                            </div>
                                            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="mt-4 text-xs text-gray-400">
                                                By {post.author.name}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link
                                    href={route('blog.index')}
                                    className="inline-flex items-center px-6 py-3 border border-white/20 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
                                >
                                    View All Articles →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="relative px-6 py-8 lg:px-8 border-t border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="text-sm text-gray-400">
                            Powered by modern web technologies ⚡ Built with ❤️ by{" "}
                            <a 
                                href="https://app.build" 
                                target="_blank" 
                                className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                app.build
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
