import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Props {
    categories: Category[];
    tags: Tag[];
    [key: string]: unknown;
}

// Form data interface for type checking

export default function CreatePost({ categories, tags }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: null as File | null,
        status: 'draft',
        category_id: '',
        tag_ids: [] as number[],
        published_at: '',
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData({
            ...data,
            title,
            slug: generateSlug(title),
        });
    };

    const handleTagToggle = (tagId: number, checked: boolean) => {
        const newTagIds = checked 
            ? [...data.tag_ids, tagId]
            : data.tag_ids.filter(id => id !== tagId);
        
        setData('tag_ids', newTagIds);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AppShell>
            <Head title="Create New Post - Admin" />
            
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ✍️ Create New Post
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Write and publish a new blog post with rich content
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    📝 Post Title *
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter an engaging post title..."
                                    className={errors.title ? 'border-red-500' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <Label htmlFor="slug">
                                    🔗 URL Slug *
                                </Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="url-friendly-slug"
                                    className={errors.slug ? 'border-red-500' : ''}
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-600">{errors.slug}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    This will be the URL: /blog/{data.slug || 'your-post-slug'}
                                </p>
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">
                                    📄 Post Excerpt
                                </Label>
                                <Textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Write a brief description that will appear in post previews..."
                                    rows={3}
                                    className={errors.excerpt ? 'border-red-500' : ''}
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-red-600">{errors.excerpt}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    {data.excerpt.length}/160 characters (recommended for SEO)
                                </p>
                            </div>

                            {/* Rich Text Editor */}
                            <div className="space-y-2">
                                <Label>
                                    📝 Post Content *
                                </Label>
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(content) => setData('content', content)}
                                    placeholder="Start writing your amazing content here... You can format text, add images, and more!"
                                    minHeight="400px"
                                    className={errors.content ? 'border-red-500' : ''}
                                />
                                {errors.content && (
                                    <p className="text-sm text-red-600">{errors.content}</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Settings */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    🚀 Publish Settings
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">🟡 Draft</SelectItem>
                                                <SelectItem value="published">🟢 Published</SelectItem>
                                                <SelectItem value="archived">🔴 Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {data.status === 'published' && (
                                        <div>
                                            <Label htmlFor="published_at">Publish Date</Label>
                                            <Input
                                                id="published_at"
                                                type="datetime-local"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    🖼️ Featured Image
                                </h3>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('featured_image', e.target.files?.[0] ?? null)}
                                    className={errors.featured_image ? 'border-red-500' : ''}
                                />
                                {errors.featured_image && (
                                    <p className="text-sm text-red-600 mt-1">{errors.featured_image}</p>
                                )}
                                <p className="text-sm text-gray-500 mt-2">
                                    Upload a high-quality image that represents your post
                                </p>
                            </div>

                            {/* Category */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    📂 Category
                                </h3>
                                <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <div 
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    {category.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tags */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    🏷️ Tags
                                </h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {tags.map((tag) => (
                                        <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
                                            <Checkbox
                                                checked={data.tag_ids.includes(tag.id)}
                                                onCheckedChange={(checked) => handleTagToggle(tag.id as number, !!checked)}
                                            />
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: tag.color }}
                                                />
                                                <span className="text-sm">{tag.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Select tags that best describe your content
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? (
                                        <>🔄 Creating...</>
                                    ) : data.status === 'published' ? (
                                        <>🚀 Publish Post</>
                                    ) : (
                                        <>💾 Save Draft</>
                                    )}
                                </Button>
                                
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="w-full"
                                >
                                    ← Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}