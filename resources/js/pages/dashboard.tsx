import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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
    created_at: string;
}

interface DashboardProps {
    totalPosts: number;
    publishedPosts: number;
    totalCategories: number;
    totalTags: number;
    recentPosts?: Post[];
    userPosts?: Post[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    totalPosts, 
    publishedPosts, 
    totalCategories, 
    totalTags,
    recentPosts,
    userPosts 
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = (auth.user as { is_admin?: boolean })?.is_admin;

    const stats = [
        {
            title: 'Total Posts',
            value: totalPosts,
            icon: '📝',
            color: 'bg-blue-500',
        },
        {
            title: 'Published Posts',
            value: publishedPosts,
            icon: '🌟',
            color: 'bg-green-500',
        },
        {
            title: 'Categories',
            value: totalCategories,
            icon: '📂',
            color: 'bg-purple-500',
        },
        {
            title: 'Tags',
            value: totalTags,
            icon: '🏷️',
            color: 'bg-pink-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - NewsHub" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {auth.user?.name}! 👋
                    </h1>
                    <p className="text-purple-100">
                        {isAdmin 
                            ? "Manage your blog content and monitor site activity."
                            : "Welcome to your NewsHub dashboard. Explore the latest articles!"
                        }
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Posts / User Posts */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {isAdmin ? '📝 Recent Posts' : '📖 Your Posts'}
                            </h3>
                            {isAdmin && (
                                <Link
                                    href={route('posts.index')}
                                    className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
                                >
                                    View All
                                </Link>
                            )}
                        </div>
                        <div className="space-y-3">
                            {(recentPosts || userPosts || []).map((post) => (
                                <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs">{post.status_badge}</span>
                                            {post.category && (
                                                <span
                                                    className="inline-block px-2 py-1 text-xs text-white rounded"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        👁️ {post.views_count}
                                    </div>
                                </div>
                            ))}
                            {(recentPosts || userPosts || []).length === 0 && (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    {isAdmin ? 'No posts created yet' : 'You haven\'t created any posts yet'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🚀 Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href={route('blog.index')}
                                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                                    <span className="text-blue-600 dark:text-blue-400">📖</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        Browse All Articles
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Explore the latest blog posts
                                    </div>
                                </div>
                            </Link>

                            {isAdmin && (
                                <>
                                    <Link
                                        href={route('posts.create')}
                                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                                    >
                                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                                            <span className="text-green-600 dark:text-green-400">✍️</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Create New Post
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Write a new blog article
                                            </div>
                                        </div>
                                    </Link>

                                    <Link
                                        href={route('categories.index')}
                                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                                    >
                                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                                            <span className="text-purple-600 dark:text-purple-400">📂</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Manage Categories
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Organize your content
                                            </div>
                                        </div>
                                    </Link>

                                    <Link
                                        href={route('tags.index')}
                                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                                    >
                                        <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg mr-3 group-hover:bg-pink-200 dark:group-hover:bg-pink-800 transition-colors">
                                            <span className="text-pink-600 dark:text-pink-400">🏷️</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Manage Tags
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Create and edit tags
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
