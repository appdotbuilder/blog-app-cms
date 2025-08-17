import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
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

interface Props {
    post: Post;
    relatedPosts: Post[];
    [key: string]: unknown;
}

export default function BlogShow({ post, relatedPosts }: Props) {
    return (
        <AppShell>
            <Head title={`${post.title} - NewsHub`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm">
                        <Link
                            href={route('blog.index')}
                            className="text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            ← Back to Articles
                        </Link>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            {post.category && (
                                <Link
                                    href={route('categories.show', post.category.slug)}
                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    {post.category.name}
                                </Link>
                            )}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.reading_time}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                👁️ {post.views_count} views
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {post.title}
                        </h1>
                        
                        {post.excerpt && (
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                {post.excerpt}
                            </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        By {post.author.name}
                                    </p>
                                    <time className="text-sm text-gray-500 dark:text-gray-400">
                                        Published on {new Date(post.published_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8">
                            <img
                                src={`/storage/${post.featured_image}`}
                                alt={post.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none prose-purple prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-purple-600 dark:prose-a:text-purple-400"
                            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                        />
                    </article>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                🏷️ Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={route('tags.show', tag.slug)}
                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                📚 Related Articles
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={route('blog.show', relatedPost.slug)}
                                        className="group"
                                    >
                                        <article className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                                            {relatedPost.category && (
                                                <span
                                                    className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mb-2"
                                                    style={{ backgroundColor: relatedPost.category.color }}
                                                >
                                                    {relatedPost.category.name}
                                                </span>
                                            )}
                                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                By {relatedPost.author.name}
                                            </p>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}