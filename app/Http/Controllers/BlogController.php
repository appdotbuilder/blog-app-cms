<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the blog homepage with latest posts.
     */
    public function index()
    {
        $featuredPosts = Post::published()
            ->with(['author', 'category', 'tags'])
            ->orderBy('views_count', 'desc')
            ->take(3)
            ->get();

        $latestPosts = Post::published()
            ->with(['author', 'category', 'tags'])
            ->latest('published_at')
            ->take(9)
            ->get();

        $categories = Category::whereHas('publishedPosts')
            ->withCount(['publishedPosts'])
            ->orderBy('published_posts_count', 'desc')
            ->take(6)
            ->get();

        $popularTags = Tag::whereHas('publishedPosts')
            ->withCount(['publishedPosts'])
            ->orderBy('published_posts_count', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('blog/index', [
            'featuredPosts' => $featuredPosts,
            'latestPosts' => $latestPosts,
            'categories' => $categories,
            'popularTags' => $popularTags,
        ]);
    }

    /**
     * Display a single blog post.
     */
    public function show(Post $post)
    {
        // Only show published posts to regular users
        if ($post->status !== 'published' && !auth()->user()?->is_admin) {
            abort(404);
        }

        $post->load(['author', 'category', 'tags']);
        $post->increment('views_count');

        // Get related posts
        $relatedPosts = Post::published()
            ->with(['author', 'category'])
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                if ($post->category_id) {
                    $query->where('category_id', $post->category_id);
                }
                if ($post->tags->count() > 0) {
                    $query->orWhereHas('tags', function ($q) use ($post) {
                        $q->whereIn('tags.id', $post->tags->pluck('id'));
                    });
                }
            })
            ->take(3)
            ->get();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}