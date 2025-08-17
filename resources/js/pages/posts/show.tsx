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
    status: string;
    status_badge: string;
    published_at?: string;
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
    created_at: string;
    updated_at: string;
}

interface Props {
    post: Post;
    [key: string]: unknown;
}

export default function PostShow({ post }: Props) {
    return (
        <AppShell>
            <Head title={`"${post.title}" - Admin`} />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📄 Post Details
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            View and manage post content
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('posts.edit', post.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            ✏️ Edit Post
                        </Link>
                        <Link
                            href={route('posts.index')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            ← Back to Posts
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Post Header */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-sm">{post.status_badge}</span>
                                {post.category && (
                                    <span
                                        className="px-2 py-1 text-xs font-medium text-white rounded-full"
                                        style={{ backgroundColor: post.category.color }}
                                    >
                                        {post.category.name}
                                    </span>
                                )}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {post.reading_time}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    👁️ {post.views_count} views
                                </span>
                            </div>
                            
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {post.title}
                            </h2>
                            
                            {post.excerpt && (
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                    {post.excerpt}
                                </p>
                            )}
                            
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>By {post.author.name}</span>
                                <span className="mx-2">•</span>
                                <span>
                                    {post.published_at
                                        ? `Published ${new Date(post.published_at).toLocaleDateString()}`
                                        : `Created ${new Date(post.created_at).toLocaleDateString()}`
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    🖼️ Featured Image
                                </h3>
                                <img
                                    src={`/storage/${post.featured_image}`}
                                    alt={post.title}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📝 Content
                            </h3>
                            <div 
                                className="prose prose-lg dark:prose-invert max-w-none prose-purple prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-img:rounded-lg prose-img:shadow-lg"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    🏷️ Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full"
                                            style={{ backgroundColor: tag.color }}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Post Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                🚀 Actions
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('blog.show', post.slug)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                >
                                    👁️ View Live Post
                                </Link>
                                <Link
                                    href={route('posts.edit', post.id)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    ✏️ Edit Post
                                </Link>
                            </div>
                        </div>

                        {/* Post Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📊 Statistics
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Views:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{post.views_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Reading Time:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{post.reading_time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Word Count:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {post.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length} words
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className="font-medium">{post.status_badge}</span>
                                </div>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📅 Dates
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400 block">Created:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400 block">Updated:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(post.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                {post.published_at && (
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400 block">Published:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}