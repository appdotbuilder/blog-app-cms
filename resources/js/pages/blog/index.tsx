import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    published_at: string;
    reading_time: string;
    views_count: number;
    author: {
        name: string;
    };
    category?: {
        name: string;
        color: string;
        slug: string;
    };
    tags: Array<{
        id: number;
        name: string;
        color: string;
        slug: string;
    }>;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    published_posts_count: number;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    published_posts_count: number;
}

interface Props {
    featuredPosts: Post[];
    latestPosts: Post[];
    categories: Category[];
    popularTags: Tag[];
    [key: string]: unknown;
}

export default function BlogIndex({ featuredPosts, latestPosts, categories, popularTags }: Props) {
    return (
        <AppShell>
            <Head title="NewsHub - Modern Blog Platform" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            📰 Welcome to NewsHub
                        </h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                            Discover insightful articles, breaking news, and expert opinions 
                            from our community of writers and industry professionals.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                🌟 Featured Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredPosts.map((post) => (
                                    <PostCard key={post.id} post={post} featured />
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                📖 Latest Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {latestPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📂 Categories
                                    </h3>
                                    <div className="space-y-3">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={route('categories.show', category.slug)}
                                                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    ></div>
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {category.published_posts_count}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Tags */}
                            {popularTags.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        🏷️ Popular Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {popularTags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={route('tags.show', tag.slug)}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
                                                style={{ backgroundColor: tag.color }}
                                            >
                                                {tag.name}
                                                <span className="ml-1 text-xs">
                                                    ({tag.published_posts_count})
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
    return (
        <Link href={route('blog.show', post.slug)} className="group block">
            <article className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow ${featured ? 'ring-2 ring-purple-200 dark:ring-purple-700' : ''}`}>
                {post.featured_image && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                            src={`/storage/${post.featured_image}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                        {post.category && (
                            <span
                                className="px-2 py-1 text-xs font-medium text-white rounded-full"
                                style={{ backgroundColor: post.category.color }}
                            >
                                {post.category.name}
                            </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.reading_time}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            👁️ {post.views_count}
                        </span>
                    </div>
                    
                    <h2 className={`font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
                        {post.title}
                    </h2>
                    
                    {post.excerpt && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}
                    
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                By {post.author.name}
                            </span>
                        </div>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.published_at).toLocaleDateString()}
                        </time>
                    </div>
                    
                    {post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag.id}
                                    className="inline-block px-2 py-1 text-xs text-white rounded"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}