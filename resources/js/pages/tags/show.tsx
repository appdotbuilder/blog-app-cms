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
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    tag: Tag;
    posts: PaginationData;
    [key: string]: unknown;
}

export default function TagShow({ tag, posts }: Props) {
    return (
        <AppShell>
            <Head title={`#${tag.name} - Tags`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Tag Header */}
                <div 
                    className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16"
                    style={{ 
                        backgroundColor: tag.color,
                        backgroundImage: `linear-gradient(45deg, ${tag.color}, ${tag.color}dd)`
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href={route('blog.index')}
                            className="text-white/80 hover:text-white text-sm mb-4 inline-block"
                        >
                            ← Back to Blog
                        </Link>
                        <h1 className="text-4xl font-bold mb-2">
                            🏷️ #{tag.name}
                        </h1>
                        <p className="text-white/70">
                            {posts.total} articles tagged with this topic
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post) => (
                                <Link key={post.id} href={route('blog.show', post.slug)} className="group">
                                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
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
                                            
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            
                                            {post.excerpt && (
                                                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    By {post.author.name}
                                                </span>
                                                <time className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(post.published_at).toLocaleDateString()}
                                                </time>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏷️</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No articles yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                No published articles with this tag yet.
                            </p>
                            <Link
                                href={route('blog.index')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                            >
                                Browse All Articles
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}