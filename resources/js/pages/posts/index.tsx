import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    status_badge: string;
    published_at?: string;
    views_count: number;
    author: {
        name: string;
    };
    category?: {
        name: string;
        color: string;
    };
    tags: Array<{
        id: number;
        name: string;
        color: string;
    }>;
    created_at: string;
    updated_at: string;
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    posts: PaginationData;
    [key: string]: unknown;
}

export default function PostsIndex({ posts }: Props) {
    const handleDelete = (post: Post) => {
        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
            router.delete(route('posts.destroy', post.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <Head title="Manage Posts - Admin" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📝 Manage Posts
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create, edit, and manage all blog posts
                        </p>
                    </div>
                    <Link
                        href={route('posts.create')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        ✍️ Create New Post
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Post
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Views
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {posts.data.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        By {post.author.name}
                                                    </p>
                                                    {post.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {post.tags.slice(0, 3).map((tag) => (
                                                                <span
                                                                    key={tag.id}
                                                                    className="inline-block px-2 py-1 text-xs text-white rounded"
                                                                    style={{ backgroundColor: tag.color }}
                                                                >
                                                                    {tag.name}
                                                                </span>
                                                            ))}
                                                            {post.tags.length > 3 && (
                                                                <span className="text-xs text-gray-400">
                                                                    +{post.tags.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm">{post.status_badge}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {post.category ? (
                                                <span
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No category</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            👁️ {post.views_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString()
                                                : new Date(post.created_at).toLocaleDateString()
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={route('blog.show', post.slug)}
                                                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                                                    title="View Post"
                                                >
                                                    👁️
                                                </Link>
                                                <Link
                                                    href={route('posts.edit', post.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    title="Edit Post"
                                                >
                                                    ✏️
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete Post"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    {posts.current_page > 1 && (
                                        <Link
                                            href={`?page=${posts.current_page - 1}`}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {posts.current_page < posts.last_page && (
                                        <Link
                                            href={`?page=${posts.current_page + 1}`}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Showing page <span className="font-medium">{posts.current_page}</span> of{' '}
                                            <span className="font-medium">{posts.last_page}</span> ({posts.total} total posts)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {posts.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No posts yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Get started by creating your first blog post.
                        </p>
                        <Link
                            href={route('posts.create')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                        >
                            ✍️ Create First Post
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}