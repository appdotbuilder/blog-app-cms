import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color: string;
    posts_count: number;
    created_at: string;
    updated_at: string;
}

interface PaginationData {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    categories: PaginationData;
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    const handleDelete = (category: Category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"? This will remove the category from all associated posts.`)) {
            router.delete(route('categories.destroy', category.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <Head title="Manage Categories - Admin" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📂 Manage Categories
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Organize your content with categories
                        </p>
                    </div>
                    <Link
                        href={route('categories.create')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        ➕ Create New Category
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Posts Count
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: category.color }}
                                                ></div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                        /{category.slug}
                                                    </p>
                                                    {category.description && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                                            {category.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                📝 {category.posts_count} posts
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(category.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={route('categories.show', category.slug)}
                                                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                                                    title="View Category"
                                                >
                                                    👁️
                                                </Link>
                                                <Link
                                                    href={route('categories.edit', category.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    title="Edit Category"
                                                >
                                                    ✏️
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete Category"
                                                    disabled={category.posts_count > 0}
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
                </div>

                {categories.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📂</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No categories yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Create your first category to organize your content.
                        </p>
                        <Link
                            href={route('categories.create')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                        >
                            ➕ Create First Category
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}